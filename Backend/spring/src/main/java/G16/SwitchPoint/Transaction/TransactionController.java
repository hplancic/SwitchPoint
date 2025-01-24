package G16.SwitchPoint.Transaction;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsRepository;
import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;
    private final UserVinylsRepository userVinylRepository;
    private final UserService userService;
    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionService transactionService, UserVinylsRepository userVinylRepository, UserService userService, TransactionRepository transactionRepository) {
        this.transactionService = transactionService;
        this.userVinylRepository = userVinylRepository;
        this.userService = userService;
        this.transactionRepository = transactionRepository;
    }
    @PostMapping("/initiate")
    public Transaction initiateTrade(
            Principal principal,
            @RequestParam Set<Long> senderUserVinylIds,
            @RequestParam Long receiverId,
            @RequestParam Set<Long> receiverUserVinylIds) {

        // Get logged-in user (sender) from the Principal
        User sender = userService.getUserByUsername(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));

        // Look up the receiver by ID
        User receiver = userService.getUserById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        // Validate ownership of sender's vinyls
        Set<UserVinyls> senderVinyls = validateVinylOwnership(senderUserVinylIds, sender);

        // Validate ownership of receiver's vinyls
        Set<UserVinyls> receiverVinyls = validateVinylOwnership(receiverUserVinylIds, receiver);

        // Proceed with the trade
        return transactionService.initiateTrade(sender, senderVinyls, receiver, receiverVinyls);
    }

    private Set<UserVinyls> validateVinylOwnership(Set<Long> vinylIds, User owner) {
        Set<UserVinyls> vinyls = new HashSet<>(userVinylRepository.findAllById(vinylIds));

        // Check 1: All provided vinyl IDs exist in the database
        if (vinyls.size() != vinylIds.size()) {
            throw new IllegalArgumentException("One or more vinyls do not exist");
        }

        // Check 2: All vinyls belong to the specified owner
        if (vinyls.stream().anyMatch(v -> !v.getUser().equals(owner))) { // <-- Fix here
            throw new IllegalArgumentException("One or more vinyls do not belong to the owner");
        }

        return vinyls;
    }

    @PostMapping("/complete/{transactionId}")
    public Transaction completeTrade(@PathVariable Long transactionId, Principal principal) {
        Transaction transaction = transactionService.getTransactionById(transactionId);
        User user = userService.getUserByUsername(principal.getName())
                .orElseThrow(() -> new SecurityException("User not found"));
        if (!transaction.getReceiver().equals(user)) {
            throw new SecurityException("Only the receiver can complete the transaction");
        }
        return transactionService.completeTrade(transactionId);
    }

    @PostMapping("/cancel/{transactionId}")
    public Transaction cancelTrade(@PathVariable Long transactionId) {
        return transactionService.cancelTrade(transactionId);
    }

    @GetMapping("/sent")
    public List<Transaction> getSentTransactions(
            Principal principal,
            @RequestParam(required = false) TransactionStatus status) {

        // Get the logged-in user
        User loggedInUser = userService.getUserByUsername(principal.getName())
                .orElseThrow(() -> new SecurityException("User not found"));

        // Fetch transactions for the logged-in user
        if (status != null) {
            return transactionService.getTransactionsSentByUserIdAndStatus(loggedInUser.getUserId(), status);
        } else {
            return transactionService.getTransactionsSentByUserId(loggedInUser.getUserId());
        }
    }


    @GetMapping("/received/{userId}")
    public List<Transaction> getReceivedTransactions(@PathVariable Long userId,
                                                     @RequestParam(required = false) TransactionStatus status) {
        if (status != null) {
            return transactionService.getTransactionsReceivedByUserIdAndStatus(userId, status);
        } else {
            return transactionService.getTransactionsReceivedByUserId(userId);
        }
    }
    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> getTransaction(
            @PathVariable Long transactionId,
            Principal principal) {

        Transaction transaction = transactionService.getTransactionById(transactionId);
        if (principal == null) {
            throw new SecurityException("You are not authorized to view this transaction, log in first.");
        }

        String loggedInUsername = principal.getName(); // Get the logged-in user's username
        User loggedInUser = userService.getUserByUsername(loggedInUsername)
                .orElseThrow(() -> new SecurityException("User not found"));

        if (!transaction.getSender().getUserId().equals(loggedInUser.getUserId()) &&
                !transaction.getReceiver().getUserId().equals(loggedInUser.getUserId())) {
            throw new SecurityException("You are not authorized to view this transaction.");
        }

        return ResponseEntity.ok(transaction);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<Transaction> editTransaction(
            @PathVariable Long transactionId,
            @RequestBody Transaction editedTransaction,
            Principal principal) {

        Transaction transaction = transactionService.getTransactionById(transactionId);

        // Security check: Only the sender or receiver can edit the transaction
        if (principal == null) {
            throw new SecurityException("You are not authorized to edit this transaction, log in first.");
        }

        String loggedInUsername = principal.getName(); // Get the logged-in user's username
        User loggedInUser = userService.getUserByUsername(loggedInUsername)
                .orElseThrow(() -> new SecurityException("User not found"));

        if (!transaction.getSender().getUserId().equals(loggedInUser.getUserId()) &&
                !transaction.getReceiver().getUserId().equals(loggedInUser.getUserId())) {
            throw new SecurityException("You are not authorized to edit this transaction.");
        }

        transaction.setUserVinylsOfferedBySender(editedTransaction.getUserVinylsOfferedBySender());
        transaction.setUserVinylsOfferedByReceiver(editedTransaction.getUserVinylsOfferedByReceiver());
        transactionRepository.save(transaction);

        return ResponseEntity.ok(transaction);
    }


    @DeleteMapping("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(
            @PathVariable Long transactionId,
            Principal principal) {

        // Get the logged-in user
        User loggedInUser = userService.getUserByUsername(principal.getName())
                .orElseThrow(() -> new SecurityException("User not found"));

        // Fetch the transaction
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found"));

        // Check if the logged-in user is the sender, receiver, or an admin
        boolean isSender = transaction.getSender().getUserId().equals(loggedInUser.getUserId());
        boolean isReceiver = transaction.getReceiver().getUserId().equals(loggedInUser.getUserId());
        boolean isAdmin = "admin".equals(loggedInUser.getUsername()); // Check if the user is an admin

        if (!isSender && !isReceiver && !isAdmin) {
            throw new SecurityException("You are not authorized to delete this transaction.");
        }

        // Delete the transaction
        try {
            transactionRepository.delete(transaction);
            return ResponseEntity.ok("Transaction deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting transaction: " + e.getMessage());
        }
    }

}

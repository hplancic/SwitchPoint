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
    public Transaction initiateTrade(@RequestParam Long senderId,
                                     @RequestParam Set<Long> senderUserVinylIds,
                                     @RequestParam Long receiverId,
                                     @RequestParam Set<Long> receiverUserVinylIds) {
        User sender = userService.getUserById(senderId).orElseThrow(
                ()->new IllegalArgumentException("User not found")
        );
        User receiver = userService.getUserById(receiverId).orElseThrow(
                ()->new IllegalArgumentException("User not found")
        );

        Set<UserVinyls> senderUserVinyls = new HashSet<>( userVinylRepository.findAllById(senderUserVinylIds) );
        Set<UserVinyls> receiverUserVinyls = new HashSet<>( userVinylRepository.findAllById(receiverUserVinylIds) );

        return transactionService.initiateTrade(sender, senderUserVinyls, receiver, receiverUserVinyls);
    }

    @PostMapping("/complete/{transactionId}")
    public Transaction completeTrade(@PathVariable Long transactionId) {
        return transactionService.completeTrade(transactionId);
    }

    @PostMapping("/cancel/{transactionId}")
    public Transaction cancelTrade(@PathVariable Long transactionId) {
        return transactionService.cancelTrade(transactionId);
    }

    @GetMapping("/sent/{userId}")
    public List<Transaction> getSentTransactions(@PathVariable Long userId,
                                                 @RequestParam(required = false) TransactionStatus status) {
        if (status != null) {
            return transactionService.getTransactionsSentByUserIdAndStatus(userId, status);
        } else {
            return transactionService.getTransactionsSentByUserId(userId);
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
    public ResponseEntity<String> deleteTransaction(@PathVariable Long transactionId) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(transactionId);

        if (transactionOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Transaction not found");
        }

        Transaction transaction = transactionOpt.get();

        try {
            transactionRepository.delete(transaction);

            return ResponseEntity.ok("Transaction deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting transaction: " + e.getMessage());
        }
    }

}

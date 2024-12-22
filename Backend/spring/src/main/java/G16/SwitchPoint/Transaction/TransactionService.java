package G16.SwitchPoint.Transaction;

import G16.SwitchPoint.Email.EmailService;
import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsRepository;
import G16.SwitchPoint.users.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserVinylsRepository userVinylsRepository;
    @Autowired
    private final EmailService emailService;
    public TransactionService(TransactionRepository transactionRepository, UserVinylsRepository userVinylsRepository, EmailService emailService) {
        this.transactionRepository = transactionRepository;
        this.userVinylsRepository = userVinylsRepository;
        this.emailService = emailService;
    }

    @Transactional
    public Transaction initiateTrade(User sender, Set<UserVinyls> senderUserVinyls,
                                     User receiver, Set<UserVinyls> receiverUserVinyls) {
        for (UserVinyls userVinyl : senderUserVinyls) {
            if (!userVinyl.getUser().equals(sender)) {
                throw new IllegalArgumentException("Sender does not own the vinyl: " + userVinyl.getVinyl().getVinylTitle());
            }
        }
        for (UserVinyls userVinyl : receiverUserVinyls) {
            if (!userVinyl.getUser().equals(receiver)) {
                throw new IllegalArgumentException("Receiver does not own the vinyl: " + userVinyl.getVinyl().getVinylTitle());
            }
        }
        Transaction transaction = new Transaction();
        transaction.setSender(sender);
        transaction.setReceiver(receiver);
        transaction.setUserVinylsOfferedBySender(senderUserVinyls);
        transaction.setUserVinylsOfferedByReceiver(receiverUserVinyls);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.PENDING);

        String subject = "SwitchPoint - NOVA PONUDA";
        String link = "https://switchpointx-3993d389768a.herokuapp.com/transactions/"+transaction.getTransactionId();
        String body = "Poštovani,\n stigla vam je nova ponuda za zamjenu u aplikaciji SwtichPoint:\n"+link+"\nSwitchPoint inc.";
        emailService.sendEmail(receiver.getEmail(), subject, body);

        return transactionRepository.save(transaction);
    }
    @Transactional
    public Transaction completeTrade(Long transactionId){
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(
                () -> new IllegalArgumentException("Transaction does not exist: " + transactionId)
        );
    if (transaction.getStatus() != TransactionStatus.PENDING) {
        throw new IllegalStateException("Transaction status is not PENDING");
    }
    //Ponovna provjera ownershipa
    for (UserVinyls userVinyl : transaction.getUserVinylsOfferedBySender()) {
        if (!userVinyl.getUser().equals(transaction.getSender())) {
            throw new IllegalArgumentException("Sender no longer owns the vinyl: " + userVinyl.getVinyl().getVinylTitle());
        }
    }

    for (UserVinyls userVinyl : transaction.getUserVinylsOfferedByReceiver()) {
        if (!userVinyl.getUser().equals(transaction.getReceiver())) {
            throw new IllegalArgumentException("Receiver no longer owns the vinyl: " + userVinyl.getVinyl().getVinylTitle());
        }
    }
    for (UserVinyls userVinyl : transaction.getUserVinylsOfferedBySender()) {
        userVinyl.setUser(transaction.getReceiver());
        userVinylsRepository.save(userVinyl);
    }
    for (UserVinyls userVinyl : transaction.getUserVinylsOfferedByReceiver()) {
        userVinyl.setUser(transaction.getSender());
        userVinylsRepository.save(userVinyl);
    }

    transaction.setTimestamp(LocalDateTime.now());
    transaction.setStatus(TransactionStatus.COMPLETED);

    return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction cancelTrade(Long transactionId){
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(
                () -> new IllegalArgumentException("Transaction does not exist: " + transactionId));
        if (transaction.getStatus() != TransactionStatus.PENDING) {
            throw new IllegalStateException("Transaction status is not PENDING");
        }
        transaction.setStatus(TransactionStatus.CANCELED);
        return transactionRepository.save(transaction);
    }



    public List<Transaction> getTransactionsSentByUserId(Long senderId) {
        return transactionRepository.findBySender_UserId(senderId);
    }


    public List<Transaction> getTransactionsReceivedByUserId(Long receiverId) {
        return transactionRepository.findByReceiver_UserId(receiverId);
    }

    public List<Transaction> getTransactionsSentByUserIdAndStatus(Long senderId, TransactionStatus status) {
        return transactionRepository.findBySender_UserIdAndStatus(senderId, status);
    }


    public List<Transaction> getTransactionsReceivedByUserIdAndStatus(Long receiverId, TransactionStatus status) {
        return transactionRepository.findByReceiver_UserIdAndStatus(receiverId, status);
    }

    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId).orElseThrow(
                () -> new IllegalArgumentException("Transaction does not exist: " + transactionId)
        );
    }
}
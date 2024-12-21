package G16.SwitchPoint.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByReceiver_UserIdAndStatus(Long receiverId, TransactionStatus status);

    List<Transaction> findBySender_UserIdAndStatus(Long senderId, TransactionStatus status);

    List<Transaction> findByReceiver_UserId(Long receiverId);

    List<Transaction> findBySender_UserId(Long senderId);
}

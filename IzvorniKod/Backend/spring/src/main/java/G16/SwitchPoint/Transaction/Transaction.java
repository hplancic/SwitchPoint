package G16.SwitchPoint.Transaction;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.users.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TransactionId;
    @ManyToOne(cascade = CascadeType.ALL)
    private User sender;
    @ManyToOne(cascade = CascadeType.ALL)
    private User receiver;

    @ManyToMany
    @JoinTable(
            name = "transaction_sender_uservinyls",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "uservinyl_id")
    )
    private Set<UserVinyls> userVinylsOfferedBySender;

    @ManyToMany
    @JoinTable(
            name = "transaction_receiver_uservinyls",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "uservinyl_id")
    )
    private Set<UserVinyls> userVinylsOfferedByReceiver;

    private LocalDateTime timestamp;
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    public Transaction() {}

    public Long getTransactionId() {
        return TransactionId;
    }

    public void setTransactionId(Long transactionId) {
        TransactionId = transactionId;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Set<UserVinyls> getUserVinylsOfferedBySender() {
        return userVinylsOfferedBySender;
    }

    public void setUserVinylsOfferedBySender(Set<UserVinyls> userVinylsOfferedBySender) {
        this.userVinylsOfferedBySender = userVinylsOfferedBySender;
    }

    public Set<UserVinyls> getUserVinylsOfferedByReceiver() {
        return userVinylsOfferedByReceiver;
    }

    public void setUserVinylsOfferedByReceiver(Set<UserVinyls> userVinylsOfferedByReceiver) {
        this.userVinylsOfferedByReceiver = userVinylsOfferedByReceiver;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
}

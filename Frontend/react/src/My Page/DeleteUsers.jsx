import axios from 'axios'
import { useEffect, useState } from 'react'
import "../styles/MypageContent.css"

export default function DeleteUsers() {

    const [users, setUsers] = useState(null);
    const [flag, setFlag] = useState(false);

    const deleteUser = (id) => {
        axios.delete("/api/users/" + id)
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.log("Deleting user ERROR:", error);
            })
    }

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log("Getting all users ERROR:", error);
            })
    }, []);

    useEffect(() => {
        if (users) setFlag(true);
        console.log(users);
    }, [users]);

    return (
        <>
            <div>
                {!flag && <h2>Učitavanje korisnika...</h2>}
                {flag && users.map((user, index) => (
                    <div className='delete-user-row' key={index}>
                        <div className='delete-user-username'>{user.username}</div>
                        <button onClick={() => deleteUser(user.userId)}>Delete user</button>
                    </div>
                ))}
            </div>
        </>
    )
}
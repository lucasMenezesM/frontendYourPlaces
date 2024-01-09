import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

export default function UserList({ users }) {
  if (users.length === 0) {
    return (
      <Card className="center">
        <h2>Users not found.</h2>
      </Card>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

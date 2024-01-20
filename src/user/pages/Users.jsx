import { useEffect, useState } from "react";

import axios from "axios";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "users/"
        );
        setUsers(response.data.users);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
      setIsLoading(false);
    }

    getUsers();
  }, []);

  return (
    <>
      <ErrorModal error={error} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UserList users={users} />}
    </>
  );
}

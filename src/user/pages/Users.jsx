import { useEffect, useState } from "react";

import axios from "axios";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "lucas",
    image:
      "https://img2.storyblok.com/1920x1200/filters:quality(88):focal(960x600:961x601)/f/102671/1920x1200/a5d82b8cff/ca_van_skyline_water_trees.jpg",
    places: 3,
  },
];
export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/users/");
        setUsers(response.data.users);
        console.log(response.data.users);
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

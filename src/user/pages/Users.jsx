import { Link } from "react-router-dom";
import UserList from "../components/UserList";

export default function Users() {
  const USERS = [
    {
      id: "u1",
      name: "lucas",
      image:
        "https://img2.storyblok.com/1920x1200/filters:quality(88):focal(960x600:961x601)/f/102671/1920x1200/a5d82b8cff/ca_van_skyline_water_trees.jpg",
      places: 3,
    },
  ];
  return <UserList users={USERS} />;
}

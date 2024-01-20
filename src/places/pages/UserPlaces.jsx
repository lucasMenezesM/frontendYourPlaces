import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useEffect, useState } from "react";
import axios from "axios";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

export default function UserPlaces() {
  const { userId } = useParams();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getPlaces() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}places/user/${userId}`
        );
        setPlaces(response.data.places);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data ? err.response.data.message : err.message);
        setIsLoading(false);
      }
    }
    getPlaces();
  }, [userId]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorModal
          onClear={() => {
            setError(null);
          }}
          error={error}
        />
      )}
      {!isLoading && places && <PlaceList places={places} />}
    </>
  );
}

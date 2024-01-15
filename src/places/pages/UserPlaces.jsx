import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useEffect, useState } from "react";
import axios from "axios";

import { useGetPlaces } from "../../shared/hooks/getPlaces-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Maracana",
    description: "Um estádio legalzinho até",
    image:
      "https://prefeitura.rio/wp-content/uploads/2022/05/52096569354_389578c97a_w.jpg",
    address:
      "Av. Pres. Castelo Branco, Portão 3 - Maracanã, Rio de Janeiro - RJ, 20271-130",
    coordinates: {
      lat: "-22.9121089",
      lng: "-43.2327307",
    },
    user_id: "u1",
  },
  {
    id: "p2",
    title: "Maracana 2",
    description: "Um estádio legalzinho até",
    image:
      "https://prefeitura.rio/wp-content/uploads/2022/05/52096569354_389578c97a_w.jpg",
    address:
      "Av. Pres. Castelo Branco, Portão 3 - Maracanã, Rio de Janeiro - RJ, 20271-130",
    coordinates: {
      lat: "-22.9121089",
      lng: "-43.2327307",
    },
    user_id: "u2",
  },
];

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
          `http://localhost:5000/api/places/user/${userId}`
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

// const places = DUMMY_PLACES.filter((place) => place.user_id === userId);

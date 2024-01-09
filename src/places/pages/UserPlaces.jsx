import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

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
  const places = DUMMY_PLACES.filter((place) => place.user_id === userId);
  return <PlaceList places={places} />;
}

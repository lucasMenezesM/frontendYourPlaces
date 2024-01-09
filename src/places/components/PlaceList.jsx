// import Card from "../../shared/Components/UIElements/Card";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

export default function PlaceList({ places }) {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places Found.</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
}

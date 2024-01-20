import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormEelements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import useAuth from "../../shared/hooks/auth";

import "./PlaceItem.css";
import { useState } from "react";

export default function PlaceItem({ place }) {
  const { token, userId } = useAuth();

  const navigate = useNavigate();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);

  const handleShowDeleteWarning = () => setShowConfirmModal(true);
  const handleCancelDeleteWarning = () => setShowConfirmModal(false);

  const handleDeletePlace = async () => {
    console.log("deleting...");

    try {
      //prettier-ignore
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}places/${place.id}`, {headers: {'Authorization': "Bearer "+token}, data: {currentUserId: userId}});

      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <Modal
        onCancel={handleCloseMap}
        show={showMap}
        header={place.address}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={<Button onClick={handleCloseMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <iframe
            title="map"
            width="100%"
            height="100%"
            src={
              "https://maps.google.com/maps?q=" +
              place.coordinates.lat.toString() +
              "," +
              place.coordinates.lng.toString() +
              "&t=&z=15&ie=UTF8&iwloc=&output=embed"
            }
          ></iframe>
          <script
            type="text/javascript"
            src="https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165"
          ></script>
        </div>
      </Modal>

      <Modal
        onCancel={handleCancelDeleteWarning}
        show={showConfirmModal}
        header={"Are you sure?"}
        footerClass="place-items__modal-actions"
        footer={
          <>
            <Button inverse onClick={handleCancelDeleteWarning}>
              CANCEL
            </Button>
            <Button danger onClick={handleDeletePlace}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Note that this action
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img
              src={process.env.REACT_APP_BACKEND_ASSET_URL + `${place.image}`}
              // src={process.env.REACT_APP_ASSET_URL + place.image}
              alt={place.title}
            />
          </div>

          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>

          <div className="place-item__actions">
            <Button inverse onClick={handleShowMap}>
              VIEW ON MAP
            </Button>
            {userId && place.user_id === userId && (
              <>
                <Button to={`/places/${place.id}`}>EDIT</Button>{" "}
                <Button danger onClick={handleShowDeleteWarning}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

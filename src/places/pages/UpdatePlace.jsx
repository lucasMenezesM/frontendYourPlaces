import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormEelements/Input";
// import Button from "../../shared/Components/FormEelements/Button";
import Button from "../../shared/components/FormEelements/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
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

export default function UpdatePlace() {
  const { placeId } = useParams();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [updatedPlace, setUpdatedPlace] = useState();
  const [initialPlaceValues, setInitialPlaceValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getPlace() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/places/${placeId}`
        );

        const placeUpdated = response.data.place;

        setUpdatedPlace(placeUpdated);

        setInitialPlaceValues({
          title: placeUpdated.title,
          description: placeUpdated.description,
        });

        setIsLoading(false);
      } catch (err) {
        setError(
          err.response.data.message || "Something went wrong. Try Again Later"
        );
        console.log(err);
        setIsLoading(false);
      }
    }
    getPlace();
  }, [placeId, navigate]);

  return (
    <div>
      {error && (
        <ErrorModal
          error={error}
          onClear={() => {
            setError(null);
          }}
        />
      )}
      {!isLoading ? (
        <Formik
          initialValues={initialPlaceValues}
          validationSchema={Yup.object({
            title: Yup.string().required("This field is required"),
            description: Yup.string()
              .min(5, "Must have at least 5 characters")
              .required("This field is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setIsLoading(true);
              const response = await axios.patch(
                `http://localhost:5000/api/places/${placeId}`,
                { title: values.title, description: values.description },
                { headers: { Authorization: "Bearer " + auth.token } }
              );
              setIsLoading(false);
              navigate(`/${auth.userId}/places`);
            } catch (err) {
              console.log(err);
              setError(
                err.response.data.message ||
                  "Something Went Wrong, Try Again Later."
              );
            }
            setSubmitting(false);
          }}
        >
          <Form className="place-form">
            <Input name={"title"} label={"Update the place's title"} />
            <Input
              name={"description"}
              label={"Update the place's description"}
            />
            <Button type="submit">UPDATE PLACE</Button>
          </Form>
        </Formik>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </div>
  );
}

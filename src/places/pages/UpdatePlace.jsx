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
import useAuth from "../../shared/hooks/auth";

export default function UpdatePlace() {
  const { token, userId } = useAuth();
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [initialPlaceValues, setInitialPlaceValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getPlace() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`
        );

        const placeUpdated = response.data.place;

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
                `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`,
                { title: values.title, description: values.description },
                { headers: { Authorization: "Bearer " + token } }
              );
              setIsLoading(false);
              navigate(`/${userId}/places`);
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

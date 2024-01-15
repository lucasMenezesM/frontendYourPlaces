import { useState, useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Input from "../../shared/components/FormEelements/Input.jsx";
import Button from "../../shared/components/FormEelements/Button";
import "./NewPlace.css";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

export default function NewPlace() {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  console.log(`Current user: ${auth.userId}`);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return navigate("/");
    }
  }, [navigate, auth]);

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", address: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required("This field is required"),
          description: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
          address: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setIsLoading(true);
            const response = await axios.post(
              "http://localhost:5000/api/places/",
              {
                title: values.title,
                description: values.description,
                address: values.address,
                user_id: auth.userId,
              }
            );
            // if (!response.ok) {
            //   throw Error("Deu erro aqui mané");
            // }
            console.log(response.data);
            setIsLoading(false);
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(err.response.data.message);
            setIsLoading(false);
          }
          setSubmitting(false);
        }}
      >
        <>
          <ErrorModal
            error={error}
            onClear={() => {
              setError(null);
            }}
          />

          <Form className="place-form">
            {isLoading && <LoadingSpinner asOverLay />}
            <Input name={"title"} label={"Enter the place's title"} />
            <Input
              name={"description"}
              label={"Enter the place's description"}
            />
            <Input name={"address"} label={"Enter the place's address"} />
            <Button type="submit">SEND</Button>
          </Form>
        </>
      </Formik>
    </div>
  );
}

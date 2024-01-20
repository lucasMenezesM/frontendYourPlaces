import { useState, useContext, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Input from "../../shared/components/FormEelements/Input.jsx";
import Button from "../../shared/components/FormEelements/Button";
import "./NewPlace.css";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import useAuth from "../../shared/hooks/auth.js";

export default function NewPlace() {
  const { userId, token } = useAuth();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   if (!auth.isLoggedIn) {
  //     return navigate("/");
  //   }
  // }, [navigate, auth]);

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", address: "", image: null }}
        validationSchema={Yup.object({
          title: Yup.string().required("This field is required"),
          image: Yup.mixed().required("Image is required."),
          description: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
          address: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();

          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("address", values.address);
          formData.append("user_id", userId);
          formData.append("image", values.image);

          try {
            setIsLoading(true);

            //prettier-ignore
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"places/", formData, {headers: {'Authorization': "Bearer "+token}});

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
            {isLoading && <LoadingSpinner asOverlay />}
            <Input name={"title"} label={"Enter the place's title"} />

            <Field name="image">
              {({ field, form }) => (
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    form.setFieldValue("image", file);
                  }}
                />
              )}
            </Field>

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

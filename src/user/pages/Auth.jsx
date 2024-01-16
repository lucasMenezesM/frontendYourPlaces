import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormEelements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormEelements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function handleSwitchLoginMode() {
    setIsLoginMode((cur) => !cur);
  }

  if (!isLoginMode)
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "", image: null }}
        validationSchema={Yup.object({
          name: Yup.string().required("This filed is required"),
          image: Yup.mixed().required("Image is required"),
          email: Yup.string()
            .email("Type a valid email")
            .required("This field is required"),
          password: Yup.string()
            .min(6, "Must have at least 6 characters")
            .required("This field is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("image", values.image);

            //prettier-ignore
            const response = await axios.post("http://localhost:5000/api/users/signup", formData );

            console.log(response.data);
            setIsLoading(false);
            auth.login(response.data.user.id);
            navigate("/");
          } catch (err) {
            //prettier-ignore
            setError(err.response.data.message || "Something went wrong, please try again later.");
            console.log(err.response);
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
          <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <Form>
              <div className="form-control">
                <Input name={"name"} label={"Enter your name"} />

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

                {/* <ImageUpload name="image" type="file" /> */}
                <Input name={"email"} label={"Enter your email"} />
                <Input
                  name={"password"}
                  type={"password"}
                  label={"Enter your password"}
                />

                <Button type="submit">Submit</Button>
              </div>
            </Form>

            <Button onClick={handleSwitchLoginMode}>
              SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
            </Button>
          </Card>
        </>
      </Formik>
    );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Type a valid email")
          .required("This field is required"),
        password: Yup.string()
          .min(5, "Must have at least 5 characters")
          .required("This field is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "http://localhost:5000/api/users/login",
            {
              email: values.email,
              password: values.password,
            }
          );

          console.log(response.data.user);
          setIsLoading(false);
          auth.login(response.data.user.id);
          navigate("/");
        } catch (err) {
          setIsLoading(false);
          //prettier-ignore
          setError(err.response.data.message || "Something went wrong, please try again.")
          console.log(err.response);
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
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <Form>
            <div className="form-control">
              <Input name={"email"} label={"Enter your email"} />
              <Input
                name={"password"}
                type={"password"}
                label={"Enter your password"}
              />

              <Button type="submit">Submit</Button>
            </div>
          </Form>

          <Button onClick={handleSwitchLoginMode}>
            SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
          </Button>
        </Card>
      </>
    </Formik>
  );
}

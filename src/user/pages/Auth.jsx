import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/Components/FormEelements/Input";
import Button from "../../shared/Components/FormEelements/Button";
import Card from "../../shared/Components/UIElements/Card";

import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);

  function handleSwitchLoginMode() {
    setIsLoginMode((cur) => !cur);
  }

  if (!isLoginMode)
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("This filed is required"),
          email: Yup.string()
            .email("Type a valid email")
            .required("This field is required"),
          password: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values));
          auth.login();
          navigate("/");
          setSubmitting(false);
        }}
      >
        <Card className="authentication">
          <Form>
            <div className="form-control">
              <Input name={"name"} label={"Enter your name"} />
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
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values));
        auth.login();
        navigate("/");
        setSubmitting(false);
      }}
    >
      <Card className="authentication">
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
    </Formik>
  );
}

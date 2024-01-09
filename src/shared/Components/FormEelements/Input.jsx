import { ErrorMessage, Field } from "formik";

import "./Input.css";

export default function Input({ name, label, type }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} />
      <ErrorMessage name={name} />
    </div>
  );
}

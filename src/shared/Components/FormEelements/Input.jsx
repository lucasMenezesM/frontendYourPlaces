import { ErrorMessage, Field } from "formik";

import "./Input.css";

export default function Input({ name, label, type, style, accept = null }) {
  return (
    <div style={style} className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} />
      <ErrorMessage name={name} />
    </div>
  );
}

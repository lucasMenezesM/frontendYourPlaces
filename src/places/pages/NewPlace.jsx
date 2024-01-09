import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../shared/Components/FormEelements/Input";
import Button from "../../shared/Components/FormEelements/Button";
import "./NewPlace.css";

// export default function NewPlaces() {
//   const [title, setTitle] = useState("");
//   const [address, setAddress] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   function handleFormSubmit(e) {
//     e.preventDefault();
//     const newPlace = {
//       title,
//       description,
//       address,
//       image,
//     };
//     console.log(newPlace);
//   }
//   return (
//     <form onSubmit={handleFormSubmit} className="place-form">
//       <Input
//         element={"input"}
//         type={"text"}
//         label={"title"}
//         value={title}
//         setValue={setTitle}
//       />

//       <Input
//         element={"input"}
//         type={"text"}
//         label={"Address"}
//         value={address}
//         setValue={setAddress}
//       />

//       <Input
//         element={"textarea"}
//         type={"text"}
//         label={"Description"}
//         value={description}
//         setValue={setDescription}
//       />

//       <Button>Send</Button>
//     </form>
//   );
// }

export default function NewPlace() {
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
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values));
          alert("submitted");
          setSubmitting(false);
        }}
      >
        <Form className="place-form">
          <Input name={"title"} label={"Enter the place's title"} />
          <Input name={"description"} label={"Enter the place's description"} />
          <Input name={"address"} label={"Enter the place's address"} />
          <Button type="submit">SEND</Button>
        </Form>
      </Formik>
    </div>
  );
}

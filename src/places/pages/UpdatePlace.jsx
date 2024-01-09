import { useParams } from "react-router-dom";
import Input from "../../shared/Components/FormEelements/Input";
import { useState } from "react";
import Button from "../../shared/Components/FormEelements/Button";
import Card from "../../shared/Components/UIElements/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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

// export default function UpdatePlace() {
//   const { placeId } = useParams();
//   const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

//   const [title, setTitle] = useState(identifiedPlace?.title);
//   //   const [address, setAddress] = useState(identifiedPlace.address);
//   const [description, setDescription] = useState(identifiedPlace?.description);
//   //   const [image, setImage] = useState(identifiedPlace.image);

//   function handleFormSubmit(e) {
//     e.preventDefault();
//     const updatedPlace = {
//       ...identifiedPlace,
//       description: description,
//       title: title,
//     };
//     console.log(updatedPlace);
//   }

//   if (!identifiedPlace)
//     return (
//       <div className="center">
//         <Card>
//           <h2>Could not find any place!</h2>
//         </Card>
//       </div>
//     );

//   return (
//     <div>
//       <form className="place-form" onSubmit={handleFormSubmit}>
//         <Input
//           value={title}
//           type={"text"}
//           element={"input"}
//           label={"title"}
//           setValue={setTitle}
//         />

//         <Input
//           value={description}
//           type={"text"}
//           element={"input"}
//           label={"Address"}
//           setValue={setDescription}
//         />

//         <Button disabled={!(title.length > 0 && description.length > 0)}>
//           Update Place
//         </Button>
//       </form>
//     </div>
//   );
// }

export default function UpdatePlace() {
  const { placeId } = useParams();
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  console.log(identifiedPlace);
  return (
    <div>
      <Formik
        initialValues={{
          title: identifiedPlace.title,
          description: identifiedPlace.description,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("This field is required"),
          description: Yup.string()
            .min(5, "Must have at least 5 characters")
            .required("This field is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values));
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
    </div>
  );
}

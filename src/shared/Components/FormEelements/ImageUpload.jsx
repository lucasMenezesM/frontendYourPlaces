import { useEffect, useRef, useState } from "react";

import Button from "./Button";

import "./ImageUpload.css";
import Input from "./Input";
import { Field } from "formik";
export default function ImageUpload({
  id,
  center = null,
  errorText = null,
  name,
  type,
}) {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [file, setFile] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  function pickedHandler(event) {
    console.log(event);
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log(event);
    console.log(file);
    // onInput(id, pickedFile, fileIsValid);
  }

  function handlePickImage() {
    filePickerRef.current.click();
  }
  return (
    <div className="form-control">
      {/* <Input
        name={"image"}
        label={""}
        type="file"
        style={{ display: "none" }}
      /> */}
      <Field
        id={name}
        name={name}
        type={type}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        // ref={filePickerRef}
        // style={{ display: "none" }}
      />
      {/* <input
        ref={filePickerRef}
        type="file"
        id={id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      /> */}
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={handlePickImage}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
}

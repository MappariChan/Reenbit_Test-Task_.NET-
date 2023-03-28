import React, { useState, useReducer, useEffect } from "react";

import classes from "./FileUploadForm.module.css";

import Button from "../UI/Button";

const emailReducer = (state, action) => {
  if (action.type == "INPUT_CHANGE") {
    return {
      email: action.email,
      isValid: undefined,
    };
  } else if (action.type == "INPUT_BLUR") {
    return {
      email: state.email,
      isValid: state.email.includes("@"),
    };
  } else {
    return {
      email: "",
      isValid: false,
    };
  }
};

const fileReducer = (state, action) => {
  if (action.type == "FILE_CHANGE" && action.file) {
    const name = action.file.name;
    const indexOfFileExtension = name.lastIndexOf(".");
    const fileExtension = name.substring(indexOfFileExtension + 1);
    return {
      file: action.file,
      isValid: fileExtension == "docx",
    };
  } else {
    return {
      file: null,
      isValid: false,
    };
  }
};

const FileUploadForm = () => {
  const [email, dispatchEmail] = useReducer(emailReducer, {
    email: "",
    isValid: undefined,
  });

  const [file, dispatchFile] = useReducer(fileReducer, {
    file: null,
    isValid: undefined,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(email.isValid && file.isValid);
  }, [email, file]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ email: event.target.value, type: "INPUT_CHANGE" });
  };

  const emailBlurHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const fileChangeHandler = (event) => {
    dispatchFile({ type: "FILE_CHANGE", file: event.target.files[0] });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    alert("We are sending your file to the blob storage!");

    const formData = new FormData();
    formData.append("Email", email.email);
    formData.append("File", file.file);

    fetch("/post", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <input
        type="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        className={`${classes["form-item"]} ${
          email.isValid || email.isValid == undefined
            ? ""
            : classes["form-item-invalid"]
        }`}
        placeholder="Enter email..."
      ></input>
      {!(email.isValid || email.isValid == undefined) && (
        <p className={classes["form-warning"]}>
          You`ve entered wrong email, try to use '@'
        </p>
      )}
      <input
        type="file"
        onChange={fileChangeHandler}
        className={classes["form-item"]}
      ></input>
      {!(file.isValid || file.isValid == undefined) && (
        <p className={classes["form-warning"]}>
          You`ve choosen the wrong file, try to choose file with extension
          '.docx'
        </p>
      )}
      <Button
        type="submit"
        className={classes["form-item"]}
        disabled={!formIsValid}
      >
        Add File to Server
      </Button>
    </form>
  );
};

export default FileUploadForm;

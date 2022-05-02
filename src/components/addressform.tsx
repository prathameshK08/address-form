import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface FormData {
  street: string;
  city: string;
  pin: string;
  state: string;
  country: string;
}

export const Addressform = () => {
  const initialValues: FormData = {
    street: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  };

  const validationSchema = Yup.object({
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pin: Yup.number()
      .min(6, "Enter correct pin code. It must contain 6 numbers")
      .max(6, "Enter correct pin code. It must contain 6 numbers")
      .required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values): void => {
        console.log(values);
      }}
    >
      {(props) => {
        const {
          setFieldValue,
          submitForm,
          values,
          isSubmitting,
          isValid,
          errors,
        } = props;
        console.log(errors);
        return (
          <form>
            <h1>Address Form</h1>
            <label>street</label>
            <input
              type="input"
              name="street"
              onChange={(e): void => {
                setFieldValue("input", e.target.value);
              }}
            />
            <label>City</label>
            <input
              type="input"
              name="city"
              onChange={(e): void => {
                setFieldValue("input", e.target.value);
              }}
            />
            <label>Pin code</label>
            <input
              type="input"
              name="pin"
              onChange={(e): void => {
                setFieldValue("pin", e.target.value);
              }}
            />
            <label>State</label>
            <input
              type="input"
              name="state"
              onChange={(e): void => {
                setFieldValue("state", e.target.value);
              }}
            />
            <label>Country</label>
            <input
              type="input"
              name="country"
              onChange={(e): void => {
                setFieldValue("country", e.target.value);
              }}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              onClick={(): void => {
                console.log(values);
                submitForm();
              }}
            >
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
interface FormData {
  addressType: string;
  street: string;
  city: string;
  pin: string;
  state: string;
  country: string;
}

const getDatafromLS = () => {
  const data = localStorage.getItem("inf");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Addressform = () => {
  const initialValues: FormData = {
    addressType: "",
    street: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  };

  const validationSchema = Yup.object({
    addressType: Yup.string().oneOf(
      ["billing", "dispatch", "mailing"],
      "Invalid address type"
    ).required("Required"),
    street: Yup.string(),
    city: Yup.string().required("Required"),
    pin: Yup.number().min(
      6,
      "Enter correct pin code. It must contain 6 numbers"
    ),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  const [infos, setinfos] = useState(getDatafromLS());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const HandleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let info = {
      street,
      city,
      pin,
      state,
      country,
    };
    setinfos([...infos, info]);
    setStreet("");
    setCity("");
    setPin("");
    setState("");
    setCountry("");

    useEffect(() => {
      localStorage.setItem("infos", JSON.stringify(infos));
    }, []);
  };

  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values): void => {
        const records = localStorage.getItem("addresses");
        console.log("existing", records);
        const result = records ? (JSON.parse(records) as FormData[]) : [];
        console.log("parse", result);
        const newData = result.concat([values]);
        localStorage.setItem("addresses", JSON.stringify(newData));
        console.log(records ? JSON.parse(records) : records);
        // console.log(result);
        console.log(localStorage.getItem("addresses"));
      }}
    >
      {(props) => {
        const {
          setFieldValue,
          submitForm,
          isSubmitting,
          isValid,
          errors,
        } = props;
        console.log(errors);
        return (
          <form autoComplete="off" onSubmit={HandleFormSubmit}>
            {/* <table>
              <thead>
                <tr>
                  <th>Street</th>
                  <th>City</th>
                  <th>Pin</th>
                  <th>State</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table> */}
            <h1>Address Form</h1>
            <br />
            <label>Address Type</label>
            <select
              defaultValue={"default"}
              name="Address Type"
              id="addressType"
            >
              <option value={"default"} disabled>
                Choose an option
              </option>
              <option value="billing">Billing</option>
              <option value="dispatch">Dispatch</option>
              <option value="mailing">Mailing</option>
            </select>
            
            <label>street</label>
            <input
              type="input"
              name="street"
              onChange={(e): void => {
                setFieldValue("street", e.target.value);
              }}
            />
            <label>City</label>
            <input
              type="input"
              name="city"
              onChange={(e): void => {
                setFieldValue("city", e.target.value);
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
              onClick={(onSubmit): void => {
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

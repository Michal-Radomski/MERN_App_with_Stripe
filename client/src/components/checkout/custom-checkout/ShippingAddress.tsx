import React from "react";
import {Formik} from "formik";

const validate = (values: {name: string; email: string; address: string}) => {
  const {name, email, address} = values;
  const errors: {email: string; address: string; name: string} = {
    email: "",
    address: "",
    name: "",
  };
  if (!email) {
    errors.email = "Required";
  }
  if (!name) {
    errors.name = "Required";
  }
  if (!address) {
    errors.address = "Required";
  }
  return errors;
};

const ShippingAddress = ({
  setShipping,
}: {
  setShipping: (values: {email: string; address: string; name: string}) => void;
}): JSX.Element => {
  const initialValues = {
    email: "",
    name: "",
    address: "",
  };

  return (
    <React.Fragment>
      <div>
        <h4>Shipping Address</h4>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => {
            console.log("values", values);
            setShipping(values);
          }}
        >
          {({values, errors, handleChange, handleSubmit}) => {
            const {name, email, address} = errors;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Name"
                    className={"nomad-input " + (name ? "error" : "")}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email"
                    className={"nomad-input " + (email ? "error" : "")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    placeholder="Address"
                    className={"nomad-input " + (address ? "error" : "")}
                  />
                </div>
                <div className="submit-btn">
                  <button type="submit" className="button is-black nomad-btn submit">
                    Continue
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default ShippingAddress;

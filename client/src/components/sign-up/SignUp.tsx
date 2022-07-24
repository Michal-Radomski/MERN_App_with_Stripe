import React from "react";
import {Formik} from "formik";

import Layout from "../shared/Layout";
import "./SignUp.styles.scss";

const SignUp = (): JSX.Element => {
  const initialValues = {
    firstName: "",
    email: "",
    password: "",
  };

  return (
    <React.Fragment>
      <Layout>
        <div className="sign-up">
          <h1>Sign Up</h1>
          <div className="form-container">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log({values});
              }}
            >
              {({values, errors, handleChange, handleSubmit, isSubmitting}) => {
                const {firstName, email, password} = errors;
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                        placeholder="First Name"
                        className={"nomad-input " + (firstName ? "error" : "")}
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
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Password"
                        className={"nomad-input " + (password ? "error" : "")}
                      />
                    </div>
                    <div className="submit-btn">
                      <button type="submit" disabled={isSubmitting} className="button is-black nomad-btn submit">
                        Sign Up
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default SignUp;

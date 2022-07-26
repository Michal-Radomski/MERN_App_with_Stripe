import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";
import {History} from "history";

import Layout from "../shared/Layout";
import {auth, createUserProfileDocument} from "../../firebase/index";
import "./SignUp.styles.scss";

interface CustomError {
  message: string;
}

interface Errors {
  email?: string;
  firstName?: string;
  password?: string;
}

const validate = (values: {email: string; firstName: string; password: string}) => {
  const errors: Errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const SignUp = ({history: {push}}: {history: History}): JSX.Element => {
  const [error, setError] = React.useState<null | CustomError>(null);
  const initialValues = {
    firstName: "",
    email: "",
    password: "",
  };

  const handleSignUp = async (
    values: {firstName: string; email: string; password: string},
    setSubmitting: (arg0: boolean) => void
  ) => {
    const {firstName, email, password} = values;

    console.log({setSubmitting});

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user as any, {displayName: firstName});
      push("/shop");
      // setSubmitting(false);
    } catch (error) {
      console.log("Error", error);
      // setSubmitting(false);
      setError(error as CustomError);
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <div className="sign-up">
          <h1>Sign Up</h1>
          <div className="form-container">
            <Formik
              initialValues={initialValues}
              validate={validate}
              // onSubmit={(values) => {
              //   console.log({values});
              // }}
              onSubmit={handleSignUp as any}
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
                    <div className="error-message">{error && <p>{error.message}</p>}</div>
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

export default withRouter(SignUp as React.FC);

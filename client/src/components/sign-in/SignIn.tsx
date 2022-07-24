import React from "react";
import {withRouter} from "react-router-dom";
import {Formik} from "formik";
import {auth} from "../../firebase";
import {History} from "history";

import Layout from "../shared/Layout";
import "../sign-up/SignUp.styles.scss";

const validate = (values: {email: string}) => {
  const errors: Errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

interface Errors {
  email?: string;
}

interface CustomError {
  message: string;
}

const SignIn = ({history: {push}}: {history: History}): JSX.Element => {
  const [error, setError] = React.useState<null | CustomError>(null);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: {email: string; password: string}, setSubmitting: (arg0: boolean) => void) => {
    console.log("Values", values);
    const {email, password} = values;
    try {
      //SignIn with Firebase
      await auth.signInWithEmailAndPassword(email, password);
      setSubmitting(false);
      push("/shop");
    } catch (error) {
      console.log("error", error);
      setSubmitting(false);
      setError(error as CustomError);
    }
  };

  return (
    <Layout>
      <div className="sign-up">
        <h1>Sign In</h1>
        <div className="form-container">
          <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit as any}>
            {({values, errors, handleChange, handleSubmit, isSubmitting}) => {
              const {email} = errors;
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="Email"
                      className={"nomad-input email " + (email ? "error" : "")}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="Password"
                      className="nomad-input password"
                    />
                  </div>
                  <div className="submit-btn">
                    <button type="submit" disabled={isSubmitting} className="button is-black nomad-btn submit">
                      Submit
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
  );
};

export default withRouter(SignIn as React.FC);

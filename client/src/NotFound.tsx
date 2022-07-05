import React from "react";

import Layout from "./components/shared/Layout";

const NotFound = (): JSX.Element => {
  const style: React.CSSProperties = {
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  };

  return (
    <React.Fragment>
      <Layout>
        <p style={style}>Unfortunately We Can't Find That Page</p>
      </Layout>
    </React.Fragment>
  );
};

export default NotFound;

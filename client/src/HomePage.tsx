import React from "react";

import FeaturedCollection from "./components/featured-collection/FeaturedCollection";
import Hero from "./components/hero/Hero";
import MainSection from "./components/main-section/MainSection";
import Layout from "./components/shared/Layout";

const HomePage = (): JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <Hero />
        <MainSection />
        <FeaturedCollection />
      </Layout>
    </React.Fragment>
  );
};

export default HomePage;

import React from "react";
import Script from "next/script";

const Analytics = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://app.tinyanalytics.io/pixel/${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />
    </>
  );
};

export default Analytics;

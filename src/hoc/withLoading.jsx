import React, { useState } from "react";

const withLoading = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(false);

    return <WrappedComponent loading={loading} setLoading={setLoading} {...props} />;
  };
};

export default withLoading;

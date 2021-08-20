import React, { useEffect, useState } from "react";

import "./imageCheckError.scss";

type PropTypes = {
  children?: any;
  style?: any;
  className?: string;
  src: string;
};

const ImageCheckError = (props: PropTypes) => {
  const { src, ...rest } = props;
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    testImage(src);
  }, []);

  const testImage = (URL: string): any => {
    var tester = new Image();
    tester.onload = imageFound;
    tester.onerror = imageNotFound;
    tester.src = URL;
  };

  function imageFound() {
    setError(false);
  }

  function imageNotFound() {
    setError(true);
  }

  return (
    <>
      {error !== null && (
        <>{error === false ? <img alt="" src={src} {...rest} /> : <></>}</>
      )}
    </>
  );
};

export default ImageCheckError;

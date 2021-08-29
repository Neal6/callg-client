import React, { useEffect, useState, useRef } from "react";

import "./imageCheckError.scss";

type PropTypes = {
  children?: any;
  style?: any;
  className?: string;
  src: string;
  alt?: string;
  imageReplace?: string;
  onLoad?: any;
};

const ImageCheckError = (props: PropTypes) => {
  const { src, alt, imageReplace, onLoad, ...rest } = props;
  const [error, setError] = useState<any>(null);
  const isUnMounted = useRef<any>(false);

  useEffect(() => {
    checkErrorImage(src);
    return () => {
      isUnMounted.current = true;
    };
  }, []);

  const checkErrorImage = (URL: string): any => {
    const image = new Image();
    image.onload = imageFound;
    image.onerror = imageNotFound;
    image.src = URL;
  };

  const imageFound = () => {
    !isUnMounted.current && setError(false);
    onLoad && onLoad(false);
  };

  const imageNotFound = () => {
    !isUnMounted.current && setError(true);
    onLoad && onLoad(true);
  };

  return (
    <>
      {(error === null || error === true) && (
        <div className="image-error-relace">
          <img className="image-error-relace-image" src={imageReplace}></img>
          <div className="image-error-relace-alt">{alt}</div>
        </div>
      )}
      {error === false && <img alt={alt} src={src} {...rest} />}
    </>
  );
};

export default ImageCheckError;

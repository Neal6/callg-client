import React, { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./imageCheckError.scss";

type PropTypes = {
  children?: any;
  style?: any;
  styleReplace?: any;
  className?: string;
  src: string;
  alt?: string;
  imageReplace?: string;
  onLoad?: any;
  isLazy?: boolean;
};

const ImageCheckError = (props: PropTypes) => {
  const {
    src,
    alt,
    imageReplace,
    onLoad,
    style = {},
    styleReplace = {},
    isLazy = false,
    ...rest
  } = props;
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
        <div className={`image-error-relace`} style={{ ...styleReplace }}>
          {imageReplace && (
            <>
              <img className="image-error-relace-image" src={imageReplace} />
              <div className="image-error-relace-alt">{alt}</div>
            </>
          )}
        </div>
      )}
      {error === false && (
        <>
          {isLazy ? (
            <LazyLoadImage
              threshold={window.screen.height}
              effect="blur"
              alt={alt}
              src={src}
              placeholder={<div style={{ ...styleReplace }}></div>}
              {...rest}
            />
          ) : (
            <img alt={alt} src={src} {...rest} />
          )}
        </>
      )}
    </>
  );
};

export default ImageCheckError;

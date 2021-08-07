import React from "react";

import defaultAvatar from "@assets/images/others/defaultAvatar.png";

type PropTypes = {
  children?: any;
  style?: any;
  className?: string;
  src: string;
};

const ImageWithDefault = (props: PropTypes) => {
  const { src, ...rest } = props;

  return <img alt="" src={src || defaultAvatar} {...rest} />;
};

export default ImageWithDefault;

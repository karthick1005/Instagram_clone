import React from "react";
import PropTypes from "prop-types";

const Profile_pic = (props) => {
  return (
    <img className={props.classname} src={props.url} alt={props.altername} />
  );
};

export default Profile_pic;

import React from "react";
import PropTypes from "prop-types";

const FormInlineMessages = ({ content, type }) => (
  <span style={{ color: type === "error" ? "#9f3a38" : "#6597a7" }}>
    {content}
  </span>
);

FormInlineMessages.defaultProps = {
  content: PropTypes.string,
  type: PropTypes.oneOf(["error", "info"]).isRequired
};

FormInlineMessages.defaultProps = {
  content: ""
};

export default FormInlineMessages;

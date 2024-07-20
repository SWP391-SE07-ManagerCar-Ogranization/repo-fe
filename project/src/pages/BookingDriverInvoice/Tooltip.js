import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute hidden group-hover:block bg-black bg-opacity-75 text-white text-xs rounded py-1 px-4 z-10 whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 mb-2">
      {text}
    </div>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;

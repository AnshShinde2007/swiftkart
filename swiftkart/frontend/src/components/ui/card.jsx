
import PropTypes from "prop-types";

export function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// PropTypes validation
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Default props
Card.defaultProps = {
  className: "",
};

CardContent.defaultProps = {
  className: "",
};

import { useState } from "react";
import PropTypes from 'prop-types';
import Star from "./Star";
import classes from "./StarRating.module.css";

const StarRating = ({
  maxRating = 0,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating=0
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating + 1);
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };
  StarRating.propTypes = {
    maxRating:PropTypes.number,
    defaultRating:PropTypes.number,
    size:PropTypes.number,
    messages:PropTypes.array
  }
  return (
    <div className={classes.main}>
      <div className={classes.stars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            key={i}
            onClick={() => handleRating(i)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            size={size}
          />
        ))}messages
      </div>
      <p style={textStyle}>{messages.length === maxRating
      ? messages[tempRating?tempRating-1:rating-1]
      : tempRating|| rating || ""}</p>
    </div>
  );
};

export default StarRating;

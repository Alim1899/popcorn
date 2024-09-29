import fullstar from "../../assets/fullstar.svg";
import emptystar from "../../assets/emptystar.svg";
const Star = ({ onClick, full,onHoverIn,onHoverOut,size }) => {
  const starStyle = {
width:`${size}px`,
height:`${size}px`,
display:'block',
cursor:"pointer"
  }
  return (
    <span
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    
    >
      {full ? (
        <img style={starStyle} src={fullstar} alt="fullstar" />
      ) : (
        <img style={starStyle} src={emptystar} alt="emptystar" />
      )}
    </span>
  );
};

export default Star;

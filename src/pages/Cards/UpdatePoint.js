import "./Score.css";
const UpdatePoint = (props) => {
  return (
    <div className="scores">
      <div className="score">
        <div className="start">
          <h3>{props.text}</h3>
        </div>
      </div>
    </div>
  );
};

export default UpdatePoint;

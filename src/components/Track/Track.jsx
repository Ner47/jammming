import "./Track.css";

function Track(props) {

  const renderAction = () => {
    if(props.isRemoval) {
      return (
        <button className="Track-action" type="button">
          -
        </button>
      );
    }
    return (
      <button className="Track-action" type="button">
        +
      </button>
    );
  }

  return (
      <div className="Track">
        <div className="Track-info">
          <h3>{props.track.name}</h3>
          <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {renderAction()}
      </div>
  );
}

export default Track
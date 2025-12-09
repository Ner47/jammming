import "./Track.css";

function Track(props) {
    return (
        <div className="Track">
          <div className="Track-info">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
          </div>
          <button type="button">+</button>
        </div>
    );
}

export default Track
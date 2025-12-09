import { useCallback } from "react";
import "./Track.css";

function Track({ track, onAdd, onRemove, isRemoval}) {

  const addTrack = useCallback(() => {
    onAdd(track);
  }, [track, onAdd]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [track, onRemove]);

  const renderAction = () => {
    if(isRemoval) {
      return (
        <button className="Track-action" type="button" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" type="button" onClick={addTrack}>
        +
      </button>
    );
  }

  return (
      <div className="Track">
        <div className="Track-info">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {renderAction()}
      </div>
  );
}

export default Track
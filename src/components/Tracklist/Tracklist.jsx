import Track from "../track/Track";

function Tracklist(props) {
  return (
    <div className="Tracklist">
      {props.tracks.map((track) => (
      <Track
        key={track.id}
        track={track}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        isRemoval={props.isRemoval} />
      ))}
    </div>
  );
}

export default Tracklist
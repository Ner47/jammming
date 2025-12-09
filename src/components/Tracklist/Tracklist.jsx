import Track from "../track/Track";

function Tracklist(props) {
    return (
        <div className="Tracklist">
            {props.tracks.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </div>
    );
}

export default Tracklist
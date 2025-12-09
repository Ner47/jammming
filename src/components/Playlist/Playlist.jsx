import Tracklist from "../tracklist/Tracklist"

function Playlist(props) {
    return (<Tracklist tracks={props.playlistTracks} />);
}

export default Playlist
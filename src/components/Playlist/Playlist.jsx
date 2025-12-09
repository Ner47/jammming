import './Playlist.css';

import { useCallback } from 'react';

import Tracklist from '../tracklist/Tracklist'

function Playlist(props) {

  const { onNameChange } = props

  const handleNameChange = useCallback(
    (event) => {
      onNameChange(event.target.value);
    },
    [onNameChange]
  );

  return (
    <div className='Playlist'>
      <input 
        name='playlistName' 
        type='text' 
        value={props.playlistName} 
        onChange={handleNameChange} 
      />
      <Tracklist
        tracks={props.playlistTracks}
        isRemoval={true}
      />
      <button className='Playlist-safe'>Save To Spotify</button>
    </div>
  );
}

export default Playlist
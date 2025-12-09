import { useCallback, useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../playlist/Playlist';
import Spotify from '../../util/Spotify';


const MUSIC = [
  {
    name: 'Pain',
    artist: 'Three Days Grace',
    album: 'Some',
    id: 999,
    uri: '86b4bd57bc0e4668a5bf4ca9e9328354'
  },
  {
    name: 'Zombie',
    artist: 'Bad Wolves',
    album: 'Some',
    id: 112,
    uri: 'spotify:track:0YIi1CqYCtRm7Xw7V30xNq'
  }
];

function App() {
  const [searchResults, setSearchResults] = useState(MUSIC);
  const [playlistName, setplaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const onNameChange = useCallback((value) => {
    setplaylistName(value);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((listTrack) => listTrack.id === track.id)) 
      return
    setPlaylistTracks((prevList) => [track, ...prevList])
    
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => {
      return prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    });
  }, []);

  const savePlaylist = useCallback(() => {
    let trackUris = playlistTracks.map((track) => track.uri);
    console.log(trackUris);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setplaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);
  
  return (
    <>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
            onNameChange={onNameChange}
          />
        </div>
      </div>
    </>
  )
}

export default App

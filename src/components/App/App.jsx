import { useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../playlist/Playlist';


const MUSIC = [
  {
    name: 'Pain',
    artist: 'Three Days Grace',
    album: 'Some',
    id: 999
  },
  {
    name: 'Zombie',
    artist: 'Bad Wolves',
    album: 'Some',
    id: 112
  }
];

function App() {
  const [searchResults, setSearchResults] = useState(MUSIC);
  const [playlistName, setplaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState(MUSIC);
  
  return (
    <>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </>
  )
}

export default App

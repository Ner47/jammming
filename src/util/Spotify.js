const clientId = '86b4bd57bc0e4668a5bf4ca9e9328354'; // Insert client ID here.
const redirectUri = 'http://[::1]:5173/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken = 'BQARtbuwy4Jvand27ZdJ67Y1Z865wCSbeGhWQByVi3h_xk_YHaOH7HrUH9WHhyZds-OVAlZAX8KxUkCQp_No8a5hX1FPkmSxn8JCo6L-ol_UbIVUmr9h4icPQ0mvLjcJ2ayXnPOf_M54l_pA3spxlBRkWCVCzZEkgNfs2RWzTeyo8XclB5fRv3AUkP8_5Ow7sx1Qr35j8XFACvm7eJ41kkN_UH2Hpq6s06Uxhn5lZerLp59xB0RPzn-rcHZ8GR6U5s1LS8ecw_d4ZNJky1Wbv50pR9QhFeDmAFOI7L0Lgh3Ri2sZHHG3iPVPyccT_elgCtX6YBq2';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;

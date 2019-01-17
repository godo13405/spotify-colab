import tools from './tools.js';
import api from './api.js';

const player = {
    connect: stereo => {
        stereo.connect().then(success => {
            if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
            }
        })
    },
    currentState: stereo => {
        stereo.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            let {
                currentTrack,
                next_tracks: [nextTrack]
            } = state.track_window;

            console.log('Currently Playing', currentTrack);
            console.log('Playing Next', nextTrack);
        });
    },
    togglePlay: stereo => {
        stereo.togglePlay().then(() => {
            console.log('Toggled playback!');
        });
    },
    play: stereo => {
        stereo.resume().then(() => {
            console.log('Let\'s play');
        });
    },
    pause: stereo => {
        stereo.pause().then(() => {
            console.log('Let\'s pause');
        });
    },
    init: ({
        spotifyUri,
        playerInstance: {
            _options: {
                getOAuthToken,
                id
            }
        }
    }) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                uris: [spotifyUri]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.checkLogin()}`
            }
        });
    }
};

export default player;
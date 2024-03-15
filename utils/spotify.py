from config import CLIENT_ID, CLIENT_SECRET
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

client_credentials_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


def get_playlist_tracks(playlist_id):
    results = sp.playlist_tracks(playlist_id)
    tracks = results["items"]

    while results["next"]:
        results = sp.next(results)
        tracks.extend(results["items"])

    return tracks


def get_all_song_names(playlist_id):
    tracks = get_playlist_tracks(playlist_id)
    song_names = []
    for track in tracks:
        artist = track["track"]["artists"][0]["name"]
        song_names.append(f"{track['track']['name']} by {artist}")
    return song_names


def get_from_playlist(playlist_id):
    song_names = get_all_song_names(playlist_id)

    for i, song_name in enumerate(song_names, start=1):
        print(f"{i}. {song_name}")
    return song_names

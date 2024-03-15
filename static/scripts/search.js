var queue = [];
var playedSongs = [];

function almostPlaySong(songId, title) {
    var player = document.getElementById("dynamicplayer");
    if (player == null) {
        playSong(songId, title);
    } else {
        queue.push({"yt_id": songId, "title": title});
    }
}

function showAlert(message, type) {
    var alertElement = document.getElementById('alert');
    var messageElement = document.getElementById('alertMessage');
    var iconElement = document.querySelector('.alert i');

    messageElement.textContent = message;
    alertElement.classList.remove('success', 'danger');
    alertElement.classList.add(type);
    alertElement.style.display = 'block';

    setTimeout(function() {
        alertElement.style.display = 'none';
    }, 10000);
}

function playSong(songId, title) {
    var container = document.getElementById('audioPlayerContainer');
    container.innerHTML = '';

    var customPlayerContainer = document.createElement('div');
    customPlayerContainer.id = 'customPlayerContainer';
    customPlayerContainer.classList.add('active');

    var titleElement = document.createElement('h2');
    titleElement.textContent = title;

    var audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = true;
    audio.src = `https://musicbackend.lunes.host/song_from_yt/${songId}`;

    var loopButton = document.createElement('button');
    loopButton.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
    loopButton.onclick = function() {
        audio.loop = !audio.loop;
        loopButton.innerHTML = audio.loop ? '<i class="bi bi-arrow-repeat"></i>' : '<i class="bi bi-arrow-repeat"></i>';
        showAlert(audio.loop ? 'Loop enabled' : 'Loop disabled', 'success');
    };

    var skipButton = document.createElement('button');
    skipButton.innerHTML = '<i class="bi bi-skip-forward"></i>';
    skipButton.onclick = function() {
        playNextSong();
    };

    var rewindButton = document.createElement('button');
    rewindButton.innerHTML = '<i class="bi bi-skip-backward"></i>';
    rewindButton.onclick = function() {
        playNextSong(true);
    };

    customPlayerContainer.appendChild(titleElement);
    customPlayerContainer.appendChild(audio);
    customPlayerContainer.appendChild(loopButton);
    customPlayerContainer.appendChild(skipButton);
    customPlayerContainer.appendChild(rewindButton);
    container.appendChild(customPlayerContainer);
}

function playNextSong(reversed) {
    if (!reversed) {
        if (queue.length > 0) {
            var item = queue.shift();
            console.log(item);
            playSong(item.yt_id, item.title);
        } else {
            showAlert('Queue is empty', 'danger');
        }
    } else {
        if (playedSongs.length > 0) {
            var song_item = playedSongs.pop(); // Use pop instead of indexing to get the last item
            playSong(song_item.yt_id, song_item.title);
        } else {
            showAlert('No previously played songs', 'danger');
        }
    }
}

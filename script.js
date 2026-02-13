
let isPlaying = false;
let currentSongIndex = 0;
let audio;
let playBtn;
let vinyl;

const songs = [
    { title: "wave to earth - love", src: "music/wave to earth - love. (lyrics).mp3" },
    { title: "Jungkook (정국) - My You", src: "music/BTS Jungkook (정국) - My You Lyrics (Color Coded Lyrics).mp3" },
    { title: "BTS Jungkook (정국) 'Still With You' Lyrics", src: "music/BTS Jungkook (정국) 'Still With You' Lyrics.mp3"}
];


const LETTER_PASSWORD = "041619";
let isLetterUnlocked = false;


window.addEventListener('DOMContentLoaded', () => {
    audio = document.getElementById('audioPlayer');
    playBtn = document.getElementById('playBtn');
    vinyl = document.getElementById('vinyl');
    

    const savedVolume = localStorage.getItem('musicVolume');
    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        document.getElementById('volumeSlider').value = savedVolume;
        updateVolumeIcon(savedVolume);
    } else {
        audio.volume = 0.5;
        document.getElementById('volumeSlider').value = 0.5;
    }
    

    const savedIsPlaying = localStorage.getItem('isPlaying');
    const savedSongIndex = localStorage.getItem('currentSongIndex');
    const savedTime = localStorage.getItem('currentTime');
    
 
    if (savedSongIndex !== null) {
        currentSongIndex = parseInt(savedSongIndex);
        loadSong();
    }
    

    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }
    
 
    setTimeout(() => {
   
        audio.play().then(() => {
            isPlaying = true;
            if (playBtn) playBtn.textContent = '⏸️';
            if (vinyl) vinyl.classList.add('playing');
            console.log('🎵 Music started automatically!');
        }).catch(err => {
            console.log('⚠️ Auto-play blocked by browser. User needs to click play button.');
          
            isPlaying = false;
            if (playBtn) playBtn.textContent = '▶️';
        });
    }, 1000);
    
   
    setInterval(() => {
        if (audio) {
            localStorage.setItem('isPlaying', isPlaying);
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('currentTime', audio.currentTime);
        }
    }, 1000);
    
  
    audio.addEventListener('ended', () => {
        nextSong();
    });
    
  
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

function openEnvelope() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const menuScreen = document.getElementById('menuScreen');
    
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        menuScreen.classList.add('active');
    }, 500);
}

function showPhotos() {
    document.getElementById('menuScreen').classList.remove('active');
    document.getElementById('photoGallery').classList.add('active');
}

function showLetter() {
    document.getElementById('menuScreen').classList.remove('active');
    
    if (isLetterUnlocked) {
       
        document.getElementById('letterScreen').classList.add('active');
    } else {
        
        document.getElementById('passwordScreen').classList.add('active');
    }
}

function showMusic() {
    document.getElementById('menuScreen').classList.remove('active');
    document.getElementById('musicScreen').classList.add('active');
}

function backToMenu() {
  
    document.getElementById('photoGallery').classList.remove('active');
    document.getElementById('letterScreen').classList.remove('active');
    document.getElementById('musicScreen').classList.remove('active');
    document.getElementById('passwordScreen').classList.remove('active');
    document.getElementById('menuScreen').classList.add('active');
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    if (passwordInput.value === LETTER_PASSWORD) {
        isLetterUnlocked = true;
        document.getElementById('passwordScreen').classList.remove('active');
        document.getElementById('letterScreen').classList.add('active');
        passwordInput.value = '';
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        passwordInput.value = '';
   
        const passwordBox = document.querySelector('.password-box');
        passwordBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordBox.style.animation = '';
        }, 500);
    }
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶️';
        if (vinyl) vinyl.classList.remove('playing');
    } else {
        audio.play();
        playBtn.textContent = '⏸️';
        if (vinyl) vinyl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
}

function loadSong() {
    const song = songs[currentSongIndex];
    audio.src = song.src;
    document.getElementById('songTitle').textContent = song.title;
    
    if (isPlaying) {
        audio.play();
    }
}

function changeVolume(value) {
    audio.volume = value;
    localStorage.setItem('musicVolume', value);
    updateVolumeIcon(value);
}

function updateVolumeIcon(volume) {
    const volumeIcon = document.getElementById('volumeIcon');
    if (volume == 0) {
        volumeIcon.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}

function toggleMute() {
    const volumeSlider = document.getElementById('volumeSlider');
    if (audio.volume > 0) {
        audio.dataset.previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
    } else {
        const previousVolume = audio.dataset.previousVolume || 0.5;
        audio.volume = previousVolume;
        volumeSlider.value = previousVolume;
        updateVolumeIcon(previousVolume);
        localStorage.setItem('musicVolume', previousVolume);
    }
}


document.addEventListener('DOMContentLoaded', () => {
  
    const polaroids = document.querySelectorAll('.polaroid');
    
    
    const observerOptions = {
        threshold: 0.2,                   
        rootMargin: '0px 0px -50px 0px'  
    };
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    
    polaroids.forEach(polaroid => {
        observer.observe(polaroid);
    });
});
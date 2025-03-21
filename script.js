document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const progressBar = document.getElementById("progress-bar");
    const trackTitle = document.getElementById("track-title");
    const trackCover = document.getElementById("track-cover");

    // Подключение Telegram API
    const tg = window.Telegram.WebApp;
    tg.expand(); // Разворачиваем на весь экран

    // Устанавливаем цвета из темы Telegram
    document.body.style.backgroundColor = tg.themeParams.bg_color || "#141e30";
    document.body.style.color = tg.themeParams.text_color || "#ffffff";

    // Список треков
    const tracks = [
        { name: "Трек 1", src: "music/Dzhigan_feat_Artik_Asti_Niletto_-_KHudi_78454225.mp3", cover: "covers/Худи.jpg" },
        { name: "Трек 2", src: "music/Jakone_feat_Kiliana_-_Asfalt_78454206.mp3", cover: "covers/Асфальт.jpg" },
        { name: "Трек 3", src: "music/Macan_Avg_-_Privykayu_79087037.mp3", cover: "covers/привыкаю.jpg" },
        { name: "Трек 4", src: "music/Navai_feat_Mona_-_Esenin_78454249.mp3", cover: "covers/Есенин.jpg" },
        { name: "Трек 5", src: "music/Wallem_-_KHarizma_78454260.mp3", cover: "covers/Харизма.jpg" }
    ];
    
    let currentTrackIndex = 0;
    
    // Функция загрузки трека
    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.src;
        trackTitle.textContent = track.name;
        trackCover.src = track.cover;
    }
    
    // Функция воспроизведения и паузы
    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = "⏸";
        } else {
            audio.pause();
            playButton.textContent = "▶️";
        }
    }
    
    // Функция переключения на следующий трек
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playButton.textContent = "⏸";
    }
    
    // Функция переключения на предыдущий трек
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play();
        playButton.textContent = "⏸";
    }

    function adjustPlayerSize() {
        const player = document.querySelector(".player");
        const windowHeight = window.innerHeight;
    
        if (windowHeight < 500) {
            player.style.transform = "scale(0.9)";
        } else {
            player.style.transform = "scale(1)";
        }
    }
    
    // Вызываем функцию при изменении размера окна
    window.addEventListener("resize", adjustPlayerSize);
    adjustPlayerSize(); // Вызываем при загрузке
    
    // Обновление прогресс-бара
    audio.addEventListener("timeupdate", () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });
    
    // Перемотка трека
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });
    
    // Автоматическое переключение трека
    audio.addEventListener("ended", nextTrack);
    
    // Назначение обработчиков событий
    playButton.addEventListener("click", togglePlay);
    nextButton.addEventListener("click", nextTrack);
    prevButton.addEventListener("click", prevTrack);

    // Загружаем первый трек
    loadTrack(currentTrackIndex);
});
    


let currentProfileIndex = 0;
let totalLikes =0;
let likesTechnicians = 0;
let likesArtists = 0;
let isIntroPage = true;

const profiles = [
    { type: "technician", image: "technician1.jpg" },
    { type: "technician", image: "technician2.jpg" },
    { type: "technician", image: "technician3.jpg" },
    { type: "technician", image: "technician4.jpg" },
    { type: "technician", image: "technician5.jpg" },
    { type: "artist", image: "artist1.jpg" },
    { type: "artist", image: "artist2.jpg" },
    { type: "artist", image: "artist3.jpg" },
    { type: "artist", image: "artist4.jpg" },
    { type: "artist", image: "artist5.jpg" }
];

function redirectToResults() {
    if (!isIntroPage) {
        totalLikes = likesTechnicians + likesArtists;

        let technicianPercentage = (likesTechnicians / totalLikes) * 100 || 0;
        let artistPercentage = 100 - technicianPercentage;

        // Redirection vers la page des résultats avec les pourcentages en tant que paramètres de l'URL
        window.location.href = `resultats.html?artistPercentage=${artistPercentage.toFixed(0)}&technicianPercentage=${technicianPercentage.toFixed(0)}`;
    }
}


// Fonction pour mélanger un tableau aléatoirement
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const startBtn = document.getElementById('startBtn');
if (startBtn) {
    startBtn.addEventListener('click', startGame);
}

const replayBtn = document.getElementById('replayBtn');
if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}

function startGame() {
    isIntroPage = false;
    shuffleArray(profiles);
    showNextProfile();
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

const card = document.querySelector('.card');
const dislikeBtn = document.getElementById('dislike');
const likeBtn = document.getElementById('like');

if (dislikeBtn) {
    dislikeBtn.addEventListener('click', () => {
        if (currentProfileIndex < profiles.length - 1) {
            currentProfileIndex++;
            showNextProfile();
        } else {
            redirectToResults();
        }
    });
}

if (likeBtn) {
    likeBtn.addEventListener('click', () => {
        const profile = profiles[currentProfileIndex];
        if (profile.type === 'technician') {
            likesTechnicians++;
        } else if (profile.type === 'artist') {
            likesArtists++;
        }


        if (currentProfileIndex < profiles.length - 1) {
            currentProfileIndex++;
            showNextProfile();
        } else {
            redirectToResults();
        }
    });
}

function showNextProfile() {
    const profile = profiles[currentProfileIndex];
    card.innerHTML = `<img src="${profile.image}" alt="${profile.type}">`;
}



document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistPercentage = urlParams.get('artistPercentage');
    const technicianPercentage = urlParams.get('technicianPercentage');

    let resultMessage = `Tu es ${artistPercentage}% artiste et ${technicianPercentage}% technicien !`;

    const resultText = document.getElementById('resultText');
    resultText.textContent = resultMessage;

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'flex';
});

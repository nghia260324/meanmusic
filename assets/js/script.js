const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close"),

    itemAudio = wrapper.querySelector(".item-audio");
let musicIndex = 1;
isMusicPaused = true;
window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `/assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}
function loadItemMuic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `/assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    cdloadimg.play();
}
//pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    // itemAudio.pause();
    cdloadimg.pause();
}
//prev music function
function prevMusic() {
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
   
    if (isPlayItem) {
        musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    } else {
        musicIndex < 1 ? musicIndex = mainMusic.length : musicIndex = musicIndex;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
//next music function
let isPlayRandom = true;
function nextMusic() {
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    if (isPlayItem) {
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    } else {
        musicIndex > mainMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    }
    if (isPlayRandom) {
        loadMusic(musicIndex);
        playMusic();
        playingSong();
    } else {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
        do {
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        } while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
        musicIndex = randIndex; //passing randomIndex to musicIndex
        loadMusic(musicIndex);
        playMusic();
        playingSong();
    }
    console.log(isPlayRandom)

}

// play or pause button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});
//prev music button event
prevBtn.addEventListener("click", () => {
    prevMusic();
});
//next music button event
nextBtn.addEventListener("click", () => {
    nextMusic();
});
// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
    playingSong();
});
//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            isPlayRandom = true;
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            isPlayRandom = false;
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            isPlayRandom = true;
            break;
    }
});

const cdloadimg = musicImg.animate([
    { transform: 'rotate(360deg' }
], {
    duration: 10000,
    iterations: Infinity
})
cdloadimg.pause()
//code for what to do after song ended
mainAudio.addEventListener("ended", () => {
    // we'll do according to the icon means if user has set icon to
    // loop song then we'll repeat the current song and will do accordingly
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            nextMusic(); //calling nextMusic function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; //setting audio current time to 0
            loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
            playMusic(); //calling playMusic function
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
            musicIndex = randIndex; //passing randomIndex to musicIndex
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});
//show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});
const ulTag = wrapper.querySelector(".play__list");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
    //let's pass the song name, artist from the array
    let liTag = `<li li-index="${i + 1}">
                <div class="header__row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio id="main-audio" class="${allMusic[i].src}" src="./assets/songs/${allMusic[i].src}.mp3"></audio>
              </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
    });
}


//play particular song from the list onclick of li tag
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");
    // const allitemTag = listTag.querySelectorAll(".main__music-item");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        //if the li tag index is equal to the musicIndex then add playing class in it
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}
//particular li clicked function
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    loadMusic(musicIndex);
    playMusic();
    playingSong();
    isPlayItem = true;
}

const listUl = wrapper.querySelector(".main__music-list");
for (let h = 0; h < mainMusic.length; h++) {
    let itemTag = `                    
                <div class="main__music-item" li-indexs="${h + 1}" onclick="clickedItem(this)">
                    <img class="main__music-img" src="${mainMusic[h].img}" alt="">
                    <div class="main__music-inf">
                        <p class="main__music-name">${mainMusic[h].name}</p>
                        <p class="main__music-author">${mainMusic[h].artist}</p>
                        <audio class="item-audio" src="/assets/songs/${mainMusic[h].src}.mp3"></audio>
                    </div>
                </div>`
                listUl.insertAdjacentHTML("beforeend", itemTag);
            
}
function playingItem() {
    const itemLi = listUl.querySelectorAll(".main__music-item");
    for (let k = 0; k < itemLi.length; k ++) {
        itemLi[k].setAttribute("onclick", "clickedItem(this)");
    }
}
let isPlayItem = true;
function clickedItem(element) {
    isPlayItem = false;
    if (isPlayItem) {
        musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
    } else {
        musicIndex = Math.floor((Math.random() * mainMusic.length) + 1);
    }
    let getItemIndex = element.getAttribute("li-indexs");
    musicIndex = getItemIndex
    loadMusic(musicIndex)
    playMusic()
}

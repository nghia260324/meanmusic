const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicarea = wrapper.querySelector(".img-area"),
    wcontrolmain = wrapper.querySelector(".w-control-main"),
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

    itemAudio = wrapper.querySelector(".item-audio"),

    ulTag = wrapper.querySelector(".play__list"),
    ulTagusuk = wrapper.querySelector(".usukMusic"),
    ulTagedm = wrapper.querySelector(".edmMusic"),
    ulTaghot = wrapper.querySelector(".hotMusic");
let isPlayMusic;
window.addEventListener("load", () => {
    musicIndex = 17;
    isPlayMusic = 7;
    loadSong(musicIndex,remixSong);
    // fillAllMusic("onclick=" + "clicked(this)",allMusic,ulTag);
});
window.onload = function() {
    fillAllMusic("onclick=" + "clicked(this)",allMusic,ulTag);

    setTimeout(timeLoad,9000,3);
    setTimeout(timeLoad,6000,2);
    setTimeout(timeLoad,3000,1);
    function timeLoad(index) {
        switch(index) {
            case 1: fillAllMusic("onclick=" + "clickedUSUK(this)",songDataUSUK,ulTagusuk);
                    break;
            case 2: fillAllMusic("onclick=" + "clickedEDM(this)",songDataEDM,ulTagedm);
                    break;
            case 3: fillAllMusic("onclick=" + "clickedHOT(this)",remixsongData,ulTaghot);
                    break;
        }
    }
}

function loadSong(indexNumb,arrMusic) {
    musicName.innerText = `${arrMusic[indexNumb - 1].name}`;
    musicArtist.innerText = `${arrMusic[indexNumb - 1].singer}`;
    musicImg.src = `${arrMusic[indexNumb - 1].thumbnail}`;
    mainAudio.src = `${arrMusic[indexNumb - 1].path}`;
    document.title = "Mean Music - " + `${arrMusic[indexNumb - 1].name}`;
}
function loadSongRank(indexNumb) {
    musicName.innerText = `${rankTableData.data.song[indexNumb - 1].name}`;
    musicArtist.innerText = `${rankTableData.data.song[indexNumb - 1].performer}`;
    musicImg.src = `${rankTableData.data.song[indexNumb - 1].thumbnail}`;
    mainAudio.src = `http://api.mp3.zing.vn/api/streaming/audio/${rankTableData.data.song[indexNumb - 1].id}/320`;
    document.title = "Mean Music - " + `${rankTableData.data.song[indexNumb - 1].name}`;
}
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    cdloading.play();
}
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    cdloading.pause();
}
function prevMusic() {
    const itemLi = listUl.querySelectorAll(".main__music-item");
    const itemOneHour = listUlOneHours.querySelectorAll(".onehours__music-item");
    const itemMotivation = listUlMotivation.querySelectorAll(".motivation__songs-item");
    musicIndex--;
   
    switch (isPlayMusic) {
        case 1: prevArr(allMusic);
                playingSong();
                removePlaying(1);break;
        case 2: prevArr(mainMusic);
                playingItem(musicIndex,"clickedItem(this)","li-indexs",itemLi);
                removePlaying(2); break;
        case 3: prevArr(oneHours);
                playingItem(musicIndex,"clickedItemOneHours(this)","li-indexo",itemOneHour);
                removePlaying(3); break;
        case 4: prevArr(motivationSongs);
                playingItem(musicIndex,"clickedItemMotivation(this)","li-indexm",itemMotivation);
                removePlaying(4); break;
        case 5: prevArr(songDataUSUK);
                playingAPI(ulTagusuk)
                removePlaying(1); break;
        case 6: prevArr(songDataEDM);
                playingAPI(ulTagedm)
                removePlaying(1); break;
        case 7: prevArr(remixsongData);break;
        case 8:     
            if (isPlayRandom) {
                musicIndex < 1 ? musicIndex = rankTableData.data.song.length : musicIndex = musicIndex;
            } else {
                musicIndex > rankTableData.data.song.length ? musicIndex = 1 : musicIndex = musicIndex;
                let randIndex = Math.floor((Math.random() * rankTableData.data.song.length) + 1);
                do {
                    randIndex = Math.floor((Math.random() * rankTableData.data.song.length) + 1);
                } while (musicIndex == randIndex);
                musicIndex = randIndex;
            }
            loadSongRank(musicIndex)
            playingAPI(ulTaghot)
            removePlaying(1); break;
    }
    playMusic();
}

let isPlayRandom = true;
let listMusicPlay = new Array();
let checkListPlay = true;
let arrListRandom = new Array();
function nextMusic() {
    const itemLi = listUl.querySelectorAll(".main__music-item");
    const itemOneHour = listUlOneHours.querySelectorAll(".onehours__music-item");
    const itemMotivation = listUlMotivation.querySelectorAll(".motivation__songs-item");
    musicIndex++;
        switch (isPlayMusic) {
            case 1: nextArr1(allMusic);
                    playingSong();
                    removePlaying(1); break;
            case 2: nextArr2(mainMusic,"clickedItem(this)","li-indexs",itemLi);
                    removePlaying(2); break;
            case 3: nextArr2(oneHours,"clickedItemOneHours(this)","li-indexo",itemOneHour);
                    removePlaying(3); break;
            case 4: nextArr2(motivationSongs,"clickedItemMotivation(this)","li-indexm",itemMotivation);
                    removePlaying(4); break;
            case 5: nextArr1(songDataUSUK);
                    playingAPI(ulTagusuk)
                    removePlaying(1); break;
            case 6: nextArr1(songDataEDM);
                    playingAPI(ulTagedm)
                    removePlaying(1); break;
            case 7: if (isPlayRandom) {
                        musicIndex > remixsongData.length ? musicIndex = 1 : musicIndex = musicIndex;
                    } else {
                    musicIndex > remixsongData.length ? musicIndex = 1 : musicIndex = musicIndex;
                        let randIndex = Math.floor((Math.random() * remixsongData.length) + 1);
                    do {
                            randIndex = Math.floor((Math.random() * remixsongData.length) + 1);
                    } while (musicIndex == randIndex);
                    musicIndex = randIndex;
                    }
                    loadSong(musicIndex,remixsongData)
                    break;
            case 8: 
            if (isPlayRandom) {
                musicIndex > rankTableData.data.song.length ? musicIndex = 1 : musicIndex = musicIndex;
            } else {
                musicIndex > rankTableData.data.song.length ? musicIndex = 1 : musicIndex = musicIndex;
                let randIndex = Math.floor((Math.random() * rankTableData.data.song.length) + 1);
                do {
                    randIndex = Math.floor((Math.random() * rankTableData.data.song.length) + 1);
                } while (musicIndex == randIndex);
                musicIndex = randIndex;
            }
            loadSongRank(musicIndex)
            playingAPI(ulTaghot)
            removePlaying(1); break;
        }
        playMusic();
}
function nextArr1(arr) {
    if (isPlayRandom) {
        musicIndex > arr.length ? musicIndex = 1 : musicIndex = musicIndex;
    } else {
        musicIndex > arr.length ? musicIndex = 1 : musicIndex = musicIndex;
        let randIndex = Math.floor((Math.random() * arr.length) + 1);
        do {
            randIndex = Math.floor((Math.random() * arr.length) + 1);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
    }
    loadSong(musicIndex,arr)
}
function nextArr2(arr,clickitem,getIndex,arrItem) {
    if (isPlayRandom) {
        musicIndex > arr.length ? musicIndex = 1 : musicIndex = musicIndex;
    } else {
        musicIndex > arr.length ? musicIndex = 1 : musicIndex = musicIndex;
        let randIndex = Math.floor((Math.random() * arr.length) + 1);
        do {
            randIndex = Math.floor((Math.random() * arr.length) + 1);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
    }
    loadSong(musicIndex,arr)
    playingItem(musicIndex,clickitem,getIndex,arrItem);
}
function prevArr(arr) {
    if (isPlayRandom) {
        musicIndex < 1 ? musicIndex = arr.length : musicIndex = musicIndex;
    } else {
        musicIndex > arr.length ? musicIndex = 1 : musicIndex = musicIndex;
        let randIndex = Math.floor((Math.random() * arr.length) + 1);
        do {
            randIndex = Math.floor((Math.random() * arr.length) + 1);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
    }
    loadSong(musicIndex,arr)
}
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});
prevBtn.addEventListener("click", () => {
    prevMusic();
});
nextBtn.addEventListener("click", () => {
    nextMusic();
});
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration; 
    
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            isPlayRandom = true
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            isPlayRandom = false
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            isPlayRandom = true
            break;
    }
});

const cdloading = musicImg.animate([
{ transform: 'rotate(360deg' }
], {
    duration: 10000,
    iterations: Infinity
})
cdloading.pause()

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            switch (isPlayMusic) {
                case 1: loadSong(musicIndex, allMusic); break;
                case 2: loadSong(musicIndex, mainMusic); break;
                case 3: loadSong(musicIndex, oneHours); break;
                case 4: loadSong(musicIndex, motivationSongs); break;
                case 5: loadSong(musicIndex, songDataEDM); break;
                case 6: loadSong(musicIndex, songDataUSUK); break;
                case 7: loadSong(musicIndex, remixSong); break;
                case 8: 
                    loadSongRank(musicIndex); break;
                case 10: loadSong(musicIndex, arrSearch); break;
            }
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
               randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;

            loadSong(musicIndex,allMusic)
            playMusic();
            playingSong();
            isPlayRandom = true;
            break;
    }
});
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});


function fillAllMusic(click,allMusic,ulTag) {
    for (let i = 0; i < allMusic.length; i++) {
        let liTag = `<li li-index="${i + 1}" ${click}>
                    <div class="header__row">
                      <span>${i + 1}. ${allMusic[i].name}</span>
                      <p>${allMusic[i].singer}</p>
                    </div>
                    <span id="${"s" + allMusic[i].id}" class="audio-duration">3:40</span>
                    <audio id="main-audio" class="${"s" + allMusic[i].id}" src="${allMusic[i].path}"></audio>
                  </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);
        let liAudioDuartionTag = ulTag.querySelector(`#${"s" + allMusic[i].id}`);
        let liAudioTag = ulTag.querySelector(`.${"s" + allMusic[i].id}`);
    
        liAudioTag.addEventListener("loadeddata", () => {
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            };
            liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
            liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
    }
}
function fillRankMusic(click,ulTag) {
    for (let i = 0; i < rankTableData.data.song.length; i++) {
        let liTag = `<li li-index="${i + 1}" ${click}>
                    <div class="header__row">
                      <span>${i + 1}. ${rankTableData.data.song[i].name}</span>
                      <p>${rankTableData.data.song[i].performer}</p>
                    </div>
                    <span id="${"s" + rankTableData.data.song[i].order}" class="audio-duration">3:40</span>
                    <audio id="main-audio" class="${"s" + rankTableData.data.song[i].order}" src="http://api.mp3.zing.vn/api/streaming/audio/${rankTableData.data.song[i].id}/320"></audio>
                  </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);
        let liAudioDuartionTag = ulTag.querySelector(`#${"s" + rankTableData.data.song[i].order}`);
        let liAudioTag = ulTag.querySelector(`.${"s" + rankTableData.data.song[i].order}`);
    
        liAudioTag.addEventListener("loadeddata", () => {
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            };
            liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
            liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
    }
}
let selectRemove;
function removeItem(item, arrSong) {
    for (let n = 0; n < arrSong.length; n++) {
        if (item[n].classList.contains("playing")) {
            item[n].classList.remove("playing");
        }
    }
}
function removePlaying(selectRemove) {
    const itemLi = listUl.querySelectorAll(".main__music-item");
    const itemOneHour = listUlOneHours.querySelectorAll(".onehours__music-item");
    const itemMotivation = listUlMotivation.querySelectorAll(".motivation__songs-item");

    if (selectRemove == 1) {
        removeItem(itemLi,mainMusic)
        removeItem(itemOneHour,oneHours)
        removeItem(itemMotivation,motivationSongs)
    } else if (selectRemove == 2) {
        removeItem(itemOneHour,oneHours)
        removeItem(itemMotivation,motivationSongs)

    } else if ( selectRemove == 3) {
        removeItem(itemLi,mainMusic)
        removeItem(itemMotivation,motivationSongs)
    } else {
        removeItem(itemLi,mainMusic)
        removeItem(itemOneHour,oneHours)
    }
}
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    }
}
function playingAPI(ulTag) {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    }

}
function clicked(element) {
    isPlayMusic = 1;
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadSong(musicIndex,allMusic);
    playMusic();
    playingSong();
    removePlaying(1);
}
const listUl = wrapper.querySelector(".main__music-list");
for (let h = 0; h < mainMusic.length; h++) {
    let itemTag = `                    
                <div class="main__music-item" li-indexs="${h + 1}" onclick="clickedItem(this)">
                    <img class="main__music-img" src="${mainMusic[h].thumbnail}" alt="">
                    <div class="main__music-inf">
                        <p class="main__music-name">${mainMusic[h].name}</p>
                        <p class="main__music-author">${mainMusic[h].singer}</p>
                    </div>
                    <div class="main__music-play">Playing...</div>
                </div>`
                listUl.insertAdjacentHTML("beforeend", itemTag);
            
}
const listUlOneHours = wrapper.querySelector(".onehours__music-list");
for (let h = 0; h < oneHours.length; h++) {
    let itemTag = `                    
                <div  class="main__music-item onehours__music-item" li-indexo="${h + 1}" onclick="clickedItemOneHours(this)">
                    <img class="main__music-img onehours__music-img" src="${oneHours[h].thumbnail}" alt="">
                    <div class="main__music-inf onehours__music-inf">
                        <p class="main__music-name onehours__music-item-name">${oneHours[h].name}</p>
                        <p class="main__music-author onehours__music-author">${oneHours[h].singer}</p>
                    </div>
                    <div class="main__music-play">Playing...</div>
                </div>`
                listUlOneHours.insertAdjacentHTML("beforeend", itemTag);
}
const listUlMotivation = wrapper.querySelector(".motivation__songs-list");
for (let h = 0; h < motivationSongs.length; h++) {
    let itemTag = `                    
                <div class="main__music-item motivation__songs-item" li-indexm="${h + 1}" onclick="clickedItemMotivation(this)">
                    <img class="main__music-img motivation__songs-img" src="${motivationSongs[h].thumbnail}" alt="">
                    <div class="main__music-inf motivation__songs-inf">
                        <p class="main__music-name motivation__songs-list-name">${motivationSongs[h].name}</p>
                        <p class="main__music-author motivation__songs-author">${motivationSongs[h].singer}</p>
                    </div>
                    <div class="main__music-play">Playing...</div>
                </div>`
                listUlMotivation.insertAdjacentHTML("beforeend", itemTag);
}
function playingItem(musicIndex, onClick, getAttribute, item) {
    for (let k = 0; k < item.length; k ++) {
        if (item[k].classList.contains("playing")) {
            item[k].classList.remove("playing");
        }
        if (item[k].getAttribute(getAttribute) == musicIndex) {
            item[k].classList.add("playing");            
        }
        item[k].setAttribute("onclick", onClick);
    }
}
function clickedItem(element) {
    isPlayMusic = 2;
    let getItemIndex = element.getAttribute("li-indexs");
    const itemLi = listUl.querySelectorAll(".main__music-item");
    musicIndex = getItemIndex;
    loadSong(musicIndex,mainMusic);
    playMusic();
    playingItem(musicIndex,"clickedItem(this)","li-indexs",itemLi);
    removePlaying(2);
}
function clickedItemOneHours(element) {
    isPlayMusic = 3;
    let getItemIndex = element.getAttribute("li-indexo");
    const itemOneHour = listUlOneHours.querySelectorAll(".onehours__music-item");
    musicIndex = getItemIndex;
    loadSong(musicIndex,oneHours);
    playMusic();
    playingItem(musicIndex,"clickedItemOneHours(this)","li-indexo",itemOneHour)
    removePlaying(3);
}
function clickedItemMotivation(element) {
    isPlayMusic = 4;
    let getItemIndex = element.getAttribute("li-indexm");
    const itemMotivation = listUlMotivation.querySelectorAll(".motivation__songs-item");
    musicIndex = getItemIndex
    loadSong(musicIndex,motivationSongs)
    playMusic()
    playingItem(musicIndex,"clickedItemMotivation(this)","li-indexm",itemMotivation)
    removePlaying(4)
}
// dark mode - start
var x = screen.width;
const body = document.querySelector("body"),
      btnDark = body.querySelector(".dark__mode-button"),
      btnClose = body.querySelector(".sidebar__header-icon"),
      sidebar = body.querySelector(".sidebar"),
      controls = body.querySelector(".w-controls"),
      selectplaylist = body.querySelector(".select__playlist"),
      fillplaylist = body.querySelector(".select__playlist-list"),
      playListMusic = body.querySelector(".play__list-music"),
      rpsClose = body.querySelector("#sidebar__xmark"),
      ckIcon = body.querySelector(".top-bar-icon");

btnClose.addEventListener("click", () => {
    if (x > 768) {
        sidebar.classList.toggle("close");
        controls.classList.toggle("left");
    }
    if (historySearch.classList.contains("active")) {
        historySearch.classList.remove("active");
    }
    if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active")
    }
});
btnDark.addEventListener("click", () =>{
    body.classList.remove("purple");
    body.classList.toggle("dark");
});
playListMusic.addEventListener("click", () =>{
    if (musicList.classList.contains("show")) {
        musicList.classList.remove("show")
    } else {
        musicList.classList.add("show")
    }
})

      selectplaylist.addEventListener("click", ()=> {
        fillplaylist.classList.toggle("active");
      })
    //   rpsClose.addEventListener("click", ()=> {
    //     sidebar.classList.add("rpsclose")
    //   })

      ckIcon.onclick = function() {
          sidebar.classList.toggle("active");
          if (historySearch.classList.contains("active")) {
            historySearch.classList.remove("active")
          }
      }
      var ckIconMore = document.querySelector(".icon-more");
      ckIconMore.onclick = function() {
          var submenu = document.querySelector(".top-bar-sub-menu");
          // if (sidebarMenu.classList.contains("active")) {
          //     submenu.classList.remove("active");
          // } else {
          //     submenu.classList.toggle("active");
          // }
          removeHistory()
      }
function musiclist(element) {
        isPlayMusic = 1;
        musicIndex = 0;
        addELItem(1)
        fillplaylist.classList.remove("active");
        selectplaylist.innerHTML = 'Music list <i class="fa-solid fa-angle-down"></i>'
        ulTag.classList.remove("hident")
        ulTagusuk.classList.add("hident")
        ulTagedm.classList.add("hident")
        ulTaghot.classList.add("hident")
}
function usukmusic(element) {
        isPlayMusic = 5;
        // musicIndex = 0;
        addELItem(2)
        fillplaylist.classList.remove("active");
        selectplaylist.innerHTML = 'US - UK <i class="fa-solid fa-angle-down"></i>'
        ulTag.classList.add("hident");
        ulTagusuk.classList.remove("hident");
        ulTagedm.classList.add("hident");
        ulTaghot.classList.add("hident");
}
function edm(element) {
        isPlayMusic = 6;
        // musicIndex = 0;
        addELItem(3);
        fillplaylist.classList.remove("active");
        selectplaylist.innerHTML = 'EDM <i class="fa-solid fa-angle-down"></i>'
        ulTag.classList.add("hident");
        ulTagusuk.classList.add("hident");
        ulTagedm.classList.remove("hident");
        ulTaghot.classList.add("hident");
}
function hot(element) {
        isPlayMusic = 8;
        // musicIndex = 0;
        addELItem(4);
        fillplaylist.classList.remove("active");
        selectplaylist.innerHTML = 'HOT <i class="fa-solid fa-angle-down"></i>'
        ulTag.classList.add("hident");
        ulTagedm.classList.add("hident");
        ulTagusuk.classList.add("hident");
        ulTaghot.classList.remove("hident")
}
function addELItem(location) {
    itemPlayList = fillplaylist.querySelectorAll(".select__playlist-item");
    for (let j = 0; j < itemPlayList.length; j++) {
        if (itemPlayList[j].classList.contains("playing")) {
            itemPlayList[j].classList.remove("playing");
        }
        if (itemPlayList[j].getAttribute("li-index") == location) {
            itemPlayList[j].classList.add("playing");
        }
    }
}
function clickedUSUK(element) {
    isPlayMusic = 5;
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadSong(musicIndex,songDataUSUK);
    playMusic();
    playingAPI(ulTagusuk)
    removePlaying(1);
}
function clickedEDM(element) {
    isPlayMusic = 6;
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadSong(musicIndex,songDataEDM);
    playMusic();
    playingAPI(ulTagedm)
    removePlaying(1);
}
function clickedHOT(element) {
    isPlayMusic = 7;
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    // loadSongRank(musicIndex,rankTableData.data.song);
    loadSong(musicIndex,remixsongData)
    playMusic();
    playingAPI(ulTaghot)
    removePlaying(1);
}
// dark mode - end
// search - start
let arrSearch = new Array();
let arrHistory = new Array();
let arrSelect = new Array();
let arrInput = new Array();
let getDataSearch;
let startname = document.querySelector(".startname");
let midname = document.querySelector(".midname");
let endname = document.querySelector(".endname");
const setTextArr = document.querySelector(".arrSearch"),
      inputSearch = document.querySelector(".input__search"),
      listFillSearch = document.querySelector(".search__list"),
      listFillSelect = document.querySelector(".history__search-list");
let dataInput = "";
let textInputSearch;
function searchMusic() {
    textInputSearch = document.querySelector(".input__search").value.trim();
        dataInput = textInputSearch;
        arrSearch.splice(0,arrSearch.length);
        listFillSearch.innerHTML = "";
    
        if (textInputSearch.length != 0) {
            searchArr(textInputSearch,allMusic);
            searchArr(textInputSearch,mainMusic);
            searchArr(textInputSearch,oneHours);
            searchArr(textInputSearch,motivationSongs);
            searchArr(textInputSearch,remixSong);
            searchArr(textInputSearch,songDataEDM);
            searchArr(textInputSearch,songDataUSUK);
        } else {
            setTextArr.innerText = "(0)";
        }
        fillArrSearch()
}
/* <h3>${arrSearch[h].name}</h3> */
function fillArrSearch() {
    if (arrSearch.length != 0 ) {
        for (let h = 0; h < arrSearch.length; h++) {
                let nameMusic = arrSearch[h].name;
                let indexOfFirst = nameMusic.toLowerCase().indexOf(dataInput.toLowerCase());
                startname = nameMusic.slice(0,indexOfFirst)
                midname = nameMusic.slice(indexOfFirst,indexOfFirst + dataInput.length);
                endname = nameMusic.slice(indexOfFirst + dataInput.length, nameMusic.length)

            let itemTag = `                    
                    <li class="search__item" li-indexf="${h + 1}" onclick="clickedItemSearch(this)">
                        <img src="${arrSearch[h].thumbnail}" alt="">
                        <div class="search__item-inf">
                            <h3><span class="startname">${startname}</span><span class="midname">${midname}</span><span class="endname">${endname}</span></h3>
                            <p>${arrSearch[h].singer}</p>
                        </div>
                    </li>`
                    listFillSearch.insertAdjacentHTML("beforeend", itemTag);
        }
        if (arrSearch.length != 0) {
            setTextArr.innerText = "(" + arrSearch.length + ")";
        }
    }
}
function fillArrSelect() {
    if (arrSelect.length > 0) {
        for (let h = 0; h < arrSelect.length; h++) {
            let itemTag = `                    
            <li class="search__item" li-indexf="${h + 1}" onclick="clickedItemSearch(this)">
                <img src="${arrSelect[h].thumbnail}" alt="">
                <div class="search__item-inf">
                    <h3>${arrSelect[h].name}</h3>
                    <p>${arrSelect[h].singer}</p>
                </div>
            </li>`
            listFillSearch.insertAdjacentHTML("beforeend", itemTag);
        }
    }
}
function searchArr(dataSearch,listSearch) {
    for (let i = 0; i < listSearch.length; i++) {
        if (listSearch[i].name.toLowerCase().includes(dataSearch.toLowerCase())) {
            arrSearch.push(listSearch[i]);
        }
    }
}
function clickedItemSearch(element) {
    let getDataSearch = document.querySelector(".input__search").value;
    musicIndex = Math.floor((Math.random() * arrSearch.length) + 1);
    let getItemIndex = element.getAttribute("li-indexf");
    const itemMotivation = listFillSearch.querySelectorAll(".search__item");
    musicIndex = getItemIndex;
    loadSong(musicIndex,arrSearch);
    playMusic();
    playingItem(musicIndex,"clickedItemSearch(this)","li-indexf",itemMotivation);
    removePlaying(1);
    isPlayMusic = 10;
    arrSelect.push(arrSearch[musicIndex - 1]);
    arrInput.push(getDataSearch)
    arrHistory.push(arrInput.pop())
    if (arrSelect.length > 3) {
        arrSelect.shift()
        arrHistory.shift()
    }
    inputSearch.value = "";
    closeSearch.click();
    if (x < 1024) {
        btnClose.click()
    }
}
function fillArrHistory() {
    if (arrHistory.length != 0 ) {
        for (let h = 0; h < arrHistory.length; h++) {
            let itemTag = `                    
                    <li class="history__search-item">
                        <p>${" - " + arrSelect[h].name} </p>
                    </li>`
                    listFillSelect.insertAdjacentHTML("beforeend", itemTag);
        }
    }
}
// ${arrHistory[h] + 
const ckItemSearch = document.querySelector(".sidebar__menu-item-search"),
      historySearch = document.querySelector(".history__search"),
      itemSearch = historySearch.querySelector(".search__item"),
      historySearchItem = historySearch.querySelector(".history__search-item"),
      closeSearch = historySearch.querySelector("#closeSearch");

ckItemSearch.addEventListener("click", () => {
    if (!historySearch.classList.contains("active")) {
        listFillSelect.innerHTML = "";
        listFillSearch.innerHTML = "";
        fillArrHistory();
        fillArrSelect();
        inputSearch.focus()
    }
    historySearch.classList.add("active");
    if (sidebar.classList.contains("close")) {
        btnClose.click();
    }
});
closeSearch.addEventListener("click", () => {
    if (historySearch.classList.contains("active")) {
        historySearch.classList.remove("active");
    }
});
// search - end
const imgArea = document.querySelector(".img-area");

// display start
const display = body.querySelector(".display"),
      displayClick = body.querySelector(".display__on"),
      itemPurple = body.querySelector(".display_purple"),
      closeDisplay = body.querySelector("#close__display");

displayClick.addEventListener("click", ()=> {
    display.classList.toggle("active");
})
itemPurple.addEventListener("click", ()=> {
    body.classList.toggle("purple");
    body.classList.remove("dark");
})
closeDisplay.addEventListener("click", ()=> {
    display.classList.remove("active");
})
// display end

const setstatusicon = document.querySelector("#set__status-icon");
setstatusicon.addEventListener("click", ()=> {
    musicarea.classList.toggle("active")
    setstatusicon.classList.toggle("active")
    wcontrolmain.classList.toggle("avtive")
})

var borderArr = ['50%','0'];
var blursArr = ['1px','3px'];
var colorArr = ['#46aefe','#6330f9','#FF4500'];
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var count = 10;

function createRandom() {
    for (var i = 0; i < count;i++) {
        var randomLeft = Math.floor(Math.random()*width);
        var randomTop = Math.floor(Math.random()*height);
        var colorRandom = Math.floor(Math.random()*colorArr.length);
        var widthRandom = Math.floor(Math.random()*5) + 10;
        var borderRadiusRandom = Math.floor(Math.random()*borderArr.length);
        var blursRandom = Math.floor(Math.random()*blursArr.length);
        var timeRandom = Math.floor(Math.random()*10) + 5;
        var div = document.createElement("div");

        div.style.backgroundColor = colorArr[colorRandom];
        div.style.width = widthRandom + 'px';
        div.style.height = widthRandom + 'px';
        // div.src = './assets/img/site.png';
        div.style.position = 'absolute'
        div.style.zIndex = '100'
        div.style.left = randomLeft + 'px'
        div.style.top = randomTop + 'px'
        div.style.borderRadius = borderArr[borderRadiusRandom]
        div.style.filter = 'blur(' + blursArr[blursRandom] + ')'
        // div.style.transform = 'rotate(45deg)'
        div.style.animation = 'more ' + timeRandom +'s ease-in infinite'
        body.appendChild(div);
    }
}
// createRandom();

// let checkS = 0
// wrapper.addEventListener('scroll', function() {
//     checkS;
//     console.log(x)

// })

// canvasvisualizations

// window.load = function () {

// }


 // var fileElm = document.querySelector("#input-file");

    // mainAudio.src = remixSong[17].path;

 


    // var fileElm = document.querySelector("#input-file");
    // var canvasElm = document.querySelector("#canvas__visualizations");
    // canvasElm.width = window.innerWidth;
    // canvasElm.height = window.innerHeight;

    // console.log(URL.createObjectURL(allMusic[1].path))
    // fileElm.onchange = function() {
    //     var audioElm  = document.querySelector("#canvas__audio");
    //     audioElm.src = URL.createObjectURL(this.files[0]);
    //     audioElm.load();
    //     audioElm.play();

    //     var audioContext = new AudioContext();
    //     // Khởi tạo AudioContext source
    //     var audioContextSrc = audioContext.createMediaElementSource(audioElm);
    //     // Khởi tạo Analyser
    //     var audioAnalyser = audioContext.createAnalyser();
    //     // Khởi tạo 2D canvas
    //     canvasContext = canvasElm.getContext("2d");
        
    //     // Kết nối AudioContext source với Analyser
    //     audioContextSrc.connect(audioAnalyser);
    //     // Kết nối Analyser với AudioDestinationNode
    //     audioAnalyser.connect(audioContext.destination);
        
    //     // Gán FFT size là 256 cho Analyser
    //     // Các bạn có thể xem thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    //     audioAnalyser.fftSize = 256;
        
    //     // Lấy dữ liệu tần số từ Analyser
    //     // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    //     var analyserFrequencyLength = audioAnalyser.frequencyBinCount;
        
    //     // Khởi tạo một mảng số nguyên dương 8-bit có số lượng phần tử bằng analyserFrequencyLength
    //     var frequencyDataArray = new Uint8Array(analyserFrequencyLength);
        
    //     // Lấy width và height của canvas
    //     var canvasWith = canvasElm.width;
    //     var canvasHeight = canvasElm.height;
        
    //     // Tính toán barWidth và barHeight
    //     var barWidth = (canvasWith / analyserFrequencyLength) * 2.5;
    //     var barHeight;
    //     var barIndex = 0;
        
    //     function renderFrame() {
    //       // Thông báo với trình duyệt rằng chúng ta đang chuẩn bị thực hiện một animation với method là như này. Hãy chuẩn bị đi =)
    //       // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    //       window.requestAnimationFrame(renderFrame);
          
    //       // Reset lại barIndex trở về 0
    //       barIndex = 0;
          
    //       // Điền dữ liệu tần số vào mảng
    //       audioAnalyser.getByteFrequencyData(frequencyDataArray);
          
    //       // Vẽ một hình chữ nhật với nền màu đen
    //       canvasContext.fillStyle = "#333";
    //       canvasContext.fillRect(0, 0, canvasWith, canvasHeight);
          
    //       // Chạy lần lượt từ 0 đến hết dữ liệu tần số của Analyser
    //       for (var i = 0; i < analyserFrequencyLength; i++) {
    //         barHeight = frequencyDataArray[i];
    //         // Tạo màu cho thanh bar
    //         var rgbRed = barHeight + (25 * (i / analyserFrequencyLength));
    //         var rgbGreen = 250 * (i / analyserFrequencyLength);
    //         var rgbBlue = 50;
            
    //         // Điền màu và vẽ bar
    //         canvasContext.fillStyle = "rgb("+ rgbRed +", "+ rgbGreen +", "+ rgbBlue +")";
    //         canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);
    
    //         barIndex += (barWidth + 1);
    //       }
    //     }
    //     // Gọi method để render vào canvas
    //     renderFrame();var audioContext = new AudioContext();
    //     // Khởi tạo AudioContext source
    //     var audioContextSrc = audioContext.createMediaElementSource(audioT);
    //     // Khởi tạo Analyser
    //     var audioAnalyser = audioContext.createAnalyser();
    //     // Khởi tạo 2D canvas
    //     canvasContext = canvasElm.getContext("2d");
        
    //     // Kết nối AudioContext source với Analyser
    //     audioContextSrc.connect(audioAnalyser);
    //     // Kết nối Analyser với AudioDestinationNode
    //     audioAnalyser.connect(audioContext.destination);
        
    //     // Gán FFT size là 256 cho Analyser
    //     // Các bạn có thể xem thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    //     audioAnalyser.fftSize = 256;
        
    //     // Lấy dữ liệu tần số từ Analyser
    //     // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    //     var analyserFrequencyLength = audioAnalyser.frequencyBinCount;
        
    //     // Khởi tạo một mảng số nguyên dương 8-bit có số lượng phần tử bằng analyserFrequencyLength
    //     var frequencyDataArray = new Uint8Array(analyserFrequencyLength);
        
    //     // Lấy width và height của canvas
    //     var canvasWith = canvasElm.width;
    //     var canvasHeight = canvasElm.height;
        
    //     // Tính toán barWidth và barHeight
    //     var barWidth = (canvasWith / analyserFrequencyLength) * 2.5;
    //     var barHeight;
    //     var barIndex = 0;
        
    //     function renderFrame() {
    //       // Thông báo với trình duyệt rằng chúng ta đang chuẩn bị thực hiện một animation với method là như này. Hãy chuẩn bị đi =)
    //       // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    //       window.requestAnimationFrame(renderFrame);
          
    //       // Reset lại barIndex trở về 0
    //       barIndex = 0;
          
    //       // Điền dữ liệu tần số vào mảng
    //       audioAnalyser.getByteFrequencyData(frequencyDataArray);
          
    //       // Vẽ một hình chữ nhật với nền màu đen
    //       canvasContext.fillStyle = "#000";
    //       canvasContext.fillRect(0, 0, canvasWith, canvasHeight);
          
    //       // Chạy lần lượt từ 0 đến hết dữ liệu tần số của Analyser
    //       for (var i = 0; i < analyserFrequencyLength; i++) {
    //         barHeight = frequencyDataArray[i];
    //         // Tạo màu cho thanh bar
    //         var rgbRed = barHeight + (25 * (i / analyserFrequencyLength));
    //         var rgbGreen = 250 * (i / analyserFrequencyLength);
    //         var rgbBlue = 50;
            
    //         // Điền màu và vẽ bar
    //         canvasContext.fillStyle = "rgb("+ rgbRed +", "+ rgbGreen +", "+ rgbBlue +")";
    //         canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);
    
    //         barIndex += (barWidth + 1);
    //       }
    //     }
    //     // Gọi method để render vào canvas
    //     renderFrame();
    // }
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const wrapper = document.querySelector(".wrapper")

const loadimg = $('.img__inf')
const loadname = $('.music__inf h1')
const loadauthor = $('.music__inf p')
const loadaudio = $('#audio')
const btnplay = $('.play')
const range = $('#range__song')
const durationSong = $('.duration')
const btnnext = $('.fa-forward')
const btnback = $('.fa-backward')
const btnrepeat = $('.repeat')
const btnrandom = $('.random')


const ckname = $('#item-name')
const ckitem = $('.music-hot-item-name')
// const newIndex = Math.floor(Math.random() * this.songs.length)

const app = {
    currentIndex: 4,
    isPlaying: true,
    isRandom: true,
    isRepeat: true,
    songs: [
        // {
        //     name: 'Wehenkend x Ngẫu Hứng x An Hà Kiều x Asphyxia',
        //     singer: 'MeanMusic',
        //     path: './assets/music/song1.mp3',
        //     image: './assets/img/song/alan-walker.jpg'
        // },
        // {
        //     name: 'LONELY X OUT OUT',
        //     singer: 'MeanMusic',
        //     path: './assets/music/song2.mp3',
        //     image: './assets/img/song/alan-walker.jpg'
        // },
        {
            image: './assets/img/img home music/seetinh.jpg',
            name: 'See Tình',
            author: 'Hoàn Thùy Linh',
            id: '0',
            youtube: 'https://www.youtube.com/watch?v=gJHSDZfJrRY',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX193dp0nVaJov1sORd5u8zqEzsH1bVwGFhlJ00Lb6vVwu7zmwB6g3I6EHAbs5UyBaTQ3VTAReYMbs6wj5aUajv8ESMn7GeLtfltxEDxV8WGVhIzpIHev81xp2TPmkNIKo1Eo0bEQR688pOA2t%2fb9sBy%2be5FA4kc0JtfkmlTI1s9hP93%2b8bLJ31o0&s=youtube&id=&h=1708362620807614298'
        },
        {
            image: 'https://avatar-nct.nixcdn.com/song/2021/08/11/4/7/2/b/1628655927032.jpg',
            name: 'Cưới Thôi',
            author: 'Masiu, Masew',
            id: '1',
            youtube: 'https://www.youtube.com/watch?v=_8ldAdQd9WU',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX18a2ysVbaa%2f%2fRVE1vYVsKt39jVJ%2fe8%2b476%2b3CSNI%2fybHWH7boSFVT0Y9ZBkat4eeEsmctmw3FqiR6e26p6hzF%2fwwDJvVSDWH7W4LHbe4vtWNOmggDW5llfE0E05zNF49fVAxaw9POKcjYloXGqRDCcNR6wPsWuoIRHdg2RzWgisdlCosSfdU0Vc&s=youtube&id=&h=1708362620807614263'
        },
        {
            image: 'https://avatar-nct.nixcdn.com/song/2017/09/07/a/1/a/6/1504776239479.jpg',
            name: 'Túy Âm',
            author: 'Xesi x Masew x Nhatnguyen',
            id: '2',
            youtube: 'https://www.youtube.com/watch?v=EV-91JV4Fws',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX1%2f1yBHMj1i9v6Tlz04AEFYSDyGh0YiO0ykJ5i1NtehrwcQTAU3Wez%2fT7hjAX7BGQWW%2bVP1Etr%2bJ3%2fMMRlF68bQTTcfcFogcrrG%2bPYPYn0aa28s1GNnnZzclFCyDp10dBcShPq7ZEJRj4cOsDDc8oXzarruJstSPcSs%3d&s=youtube&id=&h=1708362620807614263'
        },
        {
            image: 'https://avatar-nct.nixcdn.com/song/2023/04/07/3/9/2/f/1680838848812.jpg',
            name: 'Bật Tình Yêu Lên',
            author: 'Hòa Minzy x Tăng Duy Tân',
            id: '3',
            youtube: 'https://www.youtube.com/watch?v=VHjMJeLsI0o',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX1%2bo6qYm7KbWtzMbGGY1vXO5JfdPDxsN258EmCwK%2b%2ffVXFOPsMh%2flfuqYeJPHMv86omjUvGGfESJMZ7lYTIDJNvUN%2bS2tyaTrRFL6lGkzjNnhv69gIZOuFz0Mie2NsnsSEgGg3ISBNally7tAPfMGCHvQ3jtjGLpiyP2cbFFcU5EdqvUm4jhBXhT&s=youtube&id=&h=1708362620807614263'
        },
        {
            image: 'https://avatar-nct.nixcdn.com/song/2018/02/03/9/c/7/5/1517665066946.jpg',
            name: 'I DO',
            author: '911',
            id: '4',
            youtube: 'https://www.youtube.com/watch?v=pBTp2RWxq-s',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX18PD%2bB6v9UdQrAIHbBlahEnp36SVEFi%2fgPnNLaTNc2THkdXJtjuoPLgOY8FjSoGkbA5FcB31%2fRbwhtlntt%2bQzfZzU21R9%2fePyfYSabzS2r57rcxvGciQCbY7BZOsfKSXxSRkFn2lYjJ0g%3d%3d&s=youtube&id=&h=1708362620807614263'
        },
        {
            image: 'https://avatar-nct.nixcdn.com/song/2022/12/28/a/4/7/d/1672214548521.jpg',
            name: 'Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau',
            author: 'O.lew',
            id: '5',
            youtube: 'https://www.youtube.com/watch?v=sQlQpKpQOpc',
            link: 'https://x2convert.video/Thankyou?token=U2FsdGVkX1%2f7RCSdY6%2fg8Xypc9w4Lsdpi0Gk%2bRYY2Rb4hDheQJeuGT%2b0iq8dAEC4SVqLgQ1pCiOpoxSZLy1W%2b8FThZQmBY%2f%2bcy2Rp8aA%2bxvGBClv5SF%2bt0y2Zcw9I8X7dAPfRjIdqI29hoJmRRJiyMk6%2b7zH6AiYbARURXZC98PIOq2dOZRJY%2fydJquqAFEy&s=youtube&id=&h=1708362620807614263'
        },
    ],


    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="topsongs" index="${index}">
                <img src="${song.image}" alt="">
                <div class="music__hot-item-inf">
                    <h1 class="music-hot-item-name">${song.name}</h1>
                    <p class="music__hot-item-author">${song.author}</p>
                    <a class="music__hot-item-link" href="${song.youtube}">
                        <i class="fa-brands fa-youtube" style="color: #ff0000;"></i>
                    </a>
                </div>
            </div>
            `            
        })
        $('.music__hot-list').innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong',
            {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            }
        )
        // Object.defineProperty(this, 'currentSongIndex',
        //     {
        //         get: function () {
        //             return this.songs[]
        //         }
        //     }
        // )
    },
    handleEvents: function () {
        const _this = this
        // const timeSong = loadaudio.duration
        const cdloadimg =  loadimg.animate([
            {transform: 'rotate(360deg'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdloadimg.pause()

        btnplay.onclick = function () {
            if (_this.isPlaying) {
                loadaudio.play()
            } else {
                loadaudio.pause();
            }
        }
        loadaudio.onplay = function() {
            btnplay.innerHTML = `<i style="padding-left: 13px;" class="fa-solid fa-pause"></i>`;
            _this.isPlaying = false;
            cdloadimg.play()
        }
        loadaudio.onpause = function() {
            btnplay.innerHTML = `<i class="fa-solid fa-play"></i>`;
            _this.isPlaying = true;
            cdloadimg.pause()
        }

        loadaudio.ontimeupdate = function() {
            if (loadaudio.duration) {
                const rangePercent = Math.floor(loadaudio.currentTime / loadaudio.duration * 100)
                range.value = rangePercent
            }
        }
        range.onchange = function(e) {
            const seekTime = loadaudio.duration / 100 * e.target.value
            loadaudio.currentTime = seekTime
        }
        
        btnnext.onclick = function() {
            if (_this.isRandom === false) {
                _this.functionSong(3)
            } else {
                _this.functionSong(1)
            }
            loadaudio.play()
        }
        btnback.onclick = function() {
            if (_this.isRandom === false) {
                _this.functionSong(3)
            } else {
                _this.functionSong(2)
            }
            loadaudio.play()
        }
        btnrandom.onclick = function() {
            if(_this.isRandom) {
                btnrandom.classList.add('active')
                _this.isRandom = false
            } else {
                btnrandom.classList.remove('active')
                _this.isRandom = true
            }
        }
        btnrepeat.onclick = function() {
            if(_this.isRepeat) {
                btnrepeat.classList.add('active')
                _this.isRepeat = false
            } else {
                btnrepeat.classList.remove('active')
                _this.isRepeat = true
            }
        }
        loadaudio.onended = function() {
            if (_this.isRepeat == false) {
                loadaudio.play()
            } else {
                btnnext.click()
            }
        }
        ckitem.onclick = function() {
            _this.clicked()
        }
        // ckitem.onclick = function() {
        // const getList = wrapper.querySelector(".music__hot-list")
        //     const allItem = getList.querySelectorAll(".topsongs")
        //     let getItemIndex = allItem.getAttribute("index")
        //     this.currentIndex = getItemIndex
        //     this.loadCurrentSong
        //     loadaudio.play()
        // }
        // const getList = wrapper.querySelector(".music__hot-list")
        // const allItem = getList.querySelectorAll(".topsongs")
        // let getItemIndex = element.getAttribute("index")
    },
    loadCurrentSong: function () {
        loadimg.src = this.currentSong.image
        loadname.textContent = this.currentSong.name
        loadauthor.textContent = this.currentSong.author
        loadaudio.src = this.currentSong.link
    },
    // loadCurrentSongIndex: function (index) {
    //     loadimg.src = this.currentSong[index].image
    //     loadname.textContent = this.currentSong[index].name
    //     loadauthor.textContent = this.currentSong[index].author
    //     loadaudio.src = this.currentSong[index].link
    // },
    functionSong: function(index) {

        if (index === 1) {
            this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        } else if (index === 2) {
            this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        } else if (index === 3) {
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (newIndex == this.currentIndex)
            this.currentIndex = newIndex
        }
        this.loadCurrentSong()
    },
    playingSong: function() {
        const getList = wrapper.querySelector(".music__hot-list")
        const allItem = getList.querySelectorAll(".topsongs")

        for (let i = 0; i < allItem.length; i++) {
            if(allItem[i].getAttribute("index") == newIndex){
                allItem[i].classList.add("playing");
            }
            allItem[i].setAttribute("onclick", "clicked(this)");
        }
    },
    clicked: function(element) {
        let getLiIndex = element.getAttribute("index");
        this.currentIndex = getLiIndex; //updating current song index with clicked li index
        // loadMusic(musicIndex);
        this.loadCurrentSong()
        // playMusic();
        loadaudio.play()
        this.playingSong();
        console.log(newIndex)
    },
    start: function () {
        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        this.clicked()

    }
}
app.start();
// const smusic = document.querySelector(".audio__music");
// const playbtn = document.querySelector(".play");
// const pdicon = document.querySelector(".fa-play");
// const btnnext = document.querySelector(".fa-forward");
// const btnback = document.querySelector(".fa-backward");
// const musiclist = ["song1.mp3", "song2.mp3"]
// let ckuse = true;
// playbtn.addEventListener("click", playPause);

// let indexSong = 0;
// smusic.setAttribute("src", `./assets/music/${musiclist[indexSong]}`);
// btnnext.addEventListener("click", function() {
//     changeSong(1);
// })
// btnback.addEventListener("click", function() {
//     changeSong(-1);
// })
// function changeSong(dir) {
//     if (dir === 1) {
//         indexSong++;
//         if (indexSong >= musiclist.length) {
//             indexSong = 0;
//         }
//         ckuse = true;
//     } else if (dir === -1) {
//         indexSong--;
//         if (indexSong < 0) {
//             indexSong = musiclist.length - 1;
//         }
//         ckuse = true;
//     }
//     smusic.setAttribute("src", `./assets/music/${musiclist[indexSong]}`);
//     playPause();
// }

// function playPause() {
//     if (ckuse) {
//         smusic.play()
//         playbtn.innerHTML = `<i style="padding-left: 12px;" class="fa-solid fa-pause"></i>`;
//         ckuse = false;

//     } else {
//         smusic.pause();
//         playbtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
//         ckuse = true;
//     }
// }


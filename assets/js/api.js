const PLAYER_STORAGE_KEY = 'ZING_MP3_DEVELOPER'
const songAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/songs'
const singerAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/singers'
const playlistAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/playlist'
const videoAPI = 'https://615950a6601e6f0017e5a15b.mockapi.io/api/videos'
// const songUSUKAPI = 'https://6260ea02f429c20deb979e8a.mockapi.io/USUK'
const songUSUKAPI = 'https://6472c316d784bccb4a3c05c8.mockapi.io/api/USUK'
// const songEDMAPI = 'https://64720b156a9370d5a41af66f.mockapi.io/api/EDM'
const songEDMAPI = 'https://64720b156a9370d5a41af66f.mockapi.io/api/EDM'
// const rankTableAPI = 'https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1'
const remixsongAPI = 'https://64720b156a9370d5a41af66f.mockapi.io/api/RemixSong'
const hottiktokAPI = 'https://6472c316d784bccb4a3c05c8.mockapi.io/api/hottiktok'

var songData = []
var singerData = []
var playlistData = []
var videoData = []
var songDataUSUK = []
var songDataEDM = []
// var rankTableData = []
var remixsongData = []
var hottiktoksongData = []

getData = (api) =>{
    return new Promise((resolve, reject)=>{
        var request = new XMLHttpRequest()
        request.open('GET', api)
        request.onload = () =>{
            if(request.status == 200){
                resolve(request.response)
            }
            else{reject(Error(request.statusText))}
        }
        request.onerror = ()=>{
            return Error('Fetching Data Failed')
        }
        request.send()
    })
}
Promise.all([
            // getData(songAPI), 
            // getData(singerAPI), 
            // getData(playlistAPI), 
            // getData(videoAPI), 
            getData(songUSUKAPI), 
            getData(songEDMAPI), 
            // getData(rankTableAPI),
            getData(remixsongAPI),
            getData(hottiktokAPI)
            ])
.then(([
        // songs,
        // singers,
        // playlists,
        // videos,
        songsUSUK,
        songsEDM,
        // ranksTable,
        remixsong,
        hottiktok]) =>{
    // songData = JSON.parse(songs)
    // singerData = JSON.parse(singers)
    // playlistData = JSON.parse(playlists)
    // videoData = JSON.parse(videos)
    songDataUSUK = JSON.parse(songsUSUK)
    songDataEDM = JSON.parse(songsEDM)
    // rankTableData = JSON.parse(ranksTable)
    remixsongData = JSON.parse(remixsong)
    hottiktoksongData = JSON.parse(hottiktok)
})
.then(()=>app.start())
.catch((err)=>alert(err))


const app = {
    currentIndex: 0,
    configuration: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfiguration: (key, value)=>{
        app.configuration[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.configuration))
    },
    start: ()=> {
        // fillAllMusic("onclick=" + "clickedUSUK(this)",songDataUSUK,ulTagusuk);
        // fillAllMusic("onclick=" + "clickedEDM(this)",songDataEDM,ulTagedm);
        // fillAllMusic("onclick=" + "clickedHOT(this)",remixsongData,ulTaghot);
        // fillRankMusic("onclick=" + "clickedHOT(this)",ulTaghot);
    }
}

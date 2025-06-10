//開發的想法是：各個功能&畫面依序做
//功能區

//定義MusicPlayer會使用到的變數，方便後續操作DOM元素與功能
//使用者觸發click事件，則播放音樂
var myMusic = document.getElementById("myMusic"); // 取得 <audio> 元素，控制音樂播放
var volumeControl = document.getElementById("volumeControl"); // 取得音量控制區塊
var information = document.getElementById("information"); // 取得顯示資訊的區塊
var progressBar = document.getElementById("progressBar"); //取得音樂進度條
var musicList = document.getElementById("musicList"); // 取得音樂清單
var functionButtons = document.getElementById("functionButtons"); // 取得功能按鈕區


var txtVolume = volumeControl.children[3]; // 取得音量顯示的 input 元素
var rangeVolume = volumeControl.children[0]; // 取得音量調整的 range 元素


var musicDuration = information.children[0];
var playStatus = information.children[1];
var btnPlay = functionButtons.children[0]; //播放鈕

var infoStatus = information.children[2]; //單曲循環鈕


/////////////////////////////////////////
function musicStatus() {

    if (infoStatus.innerText == "單曲循環") {
        changeMusic(0); //單曲循環
    }
    else if (infoStatus.innerText == "隨機播放") {
        var n = Math.floor(Math.random() * musicList.length); //隨機在musiclist中選擇一首音樂
        changeMusic(n - musicList.selectedIndex); //隨機播放音樂
    }
    else if (infoStatus.innerText == "全曲循環" && musicList.length == musicList.selectedIndex + 1) {
        changeMusic(0 - musicList.selectedIndex);
    }
    else if (musicList.length == musicList.selectedIndex + 1) { //是否為最後一首歌
        stopMusic();
    }
    else {//不是最後一首歌就播下一首歌
        changeMusic(1);
    }
}


function loopOne() {
    infoStatus.innerHTML = infoStatus.innerHTML == "單曲循環" ? "正常" : "單曲循環";
}
function setRandom() {
    infoStatus.innerHTML = infoStatus.innerHTML == "單曲循環" ? "正常" : "隨機播放";
}
function loopAll() {
    infoStatus.innerHTML = infoStatus.innerHTML == "單曲循環" ? "正常" : "全曲循環";
}//三個按鈕做互斥


function changeMusic(n) {

    var i = musicList.selectedIndex;//選擇的音樂索引
    //console.log(i + n);
    myMusic.src = musicList.children[i + n].value; //更改音樂來源
    myMusic.title = musicList.children[i + n].innerText;
    musicList.children[i + n].selected = true;//選擇的音樂索引


    //console.log(btnPlay.innerText);

    if (btnPlay.innerText == ";") {
        myMusic.onloadeddata = playMusic; //音樂載入完成後，再開始播放音樂
    }

}




//時間格式
function getTimeFormat(t) {
    var min = parseInt(t.toFixed(0) / 60);
    var sec = parseInt(t.toFixed(0) % 60);

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return min + ":" + sec;
}

function setProgress() {
    myMusic.currentTime = progressBar.value / 10000; //更新音樂的當前時間
}


//音樂播放時間
function setMusicDuration() {
    // 更新時間顯示
    musicDuration.innerHTML = getTimeFormat(myMusic.currentTime) + "/" + getTimeFormat(myMusic.duration);

    // 更新進度條的值
    progressBar.value = myMusic.currentTime * 10000;

    // 計算進度百分比
    var w = myMusic.currentTime / myMusic.duration * 100;

    // 更新進度條的背景漸層
    progressBar.style.backgroundImage = `linear-gradient(to right, rgb(245, 161, 64) ${w}%,rgb(239, 221, 189) ${w}%)`;

}



//目前歌曲長度初始化
function ProgressInitial() {
    progressBar.max = myMusic.duration * 10000; // 設置進度條的最大值為音樂的總時長
    setInterval(setMusicDuration, 10);// 每秒更新一次進度條
}

setVolumeByRangeBar(); //初始化音量


//音量調整
function setVolumeByRangeBar() {
    //console.log(event.target.value)
    txtVolume.value = rangeVolume.value;
    myMusic.volume = txtVolume.value / 100; //真正寫入音量屬性值
    //用漸層-處理音量bar隨著button移動(塗音量條的顏色)
    rangeVolume.style.backgroundImage = `linear-gradient(to right, rgb(253, 167, 68) ${rangeVolume.value}%,rgb(255, 255, 255) ${rangeVolume.value}%)`;

}



//音量調整
function changeVolume(v) {
    /* myMusic.Volume = (myMusic.volume * 100 + v) / 100;
    console.log(myMusic.volume); */
    rangeVolume.value = parseInt(rangeVolume.value) + v;
    setVolumeByRangeBar(); //呼叫音量調整的function

}


//靜音
function setMute() {
    myMusic.muted = !myMusic.muted;
    event.target.className = event.target.className == "setMute" ? "" : "setMute";
}

//快轉倒轉同一個按鈕//有參數的function//同一個參數不同結果
function changeTime(s) {
    myMusic.currentTime += s;
}

/*  //倒轉
     function prevTime() {
         myMusic.currentTime -= 5;
     }

     //快轉//比原本時間多5秒
     function nextTime() {
         myMusic.currentTime += 5;
     } */


//更新網頁上顯示的播放狀態資訊
// text 是要顯示的文字內容（例如「目前播放xxx」或「音樂暫停」）
// playStatus 是一個指向網頁上某個元素（通常是 <span> 或 <div>）的變數，用來顯示目前的播放狀態
// playStatus.innerHTML = text; 這行會把這個元素的內容換成傳進來的 text
function updateInfo(text) {
    playStatus.innerHTML = text;
}



//播放音樂
function playMusic() {
    //console.log(event.target);//（註解）可用來檢查是哪個元素觸發事件
    myMusic.play();             // 播放音樂（myMusic 是 <audio> 元素）
    event.target.innerHTML = ";";// 將目前這個按鈕的內容換成「;」（代表暫停圖示）
    event.target.onclick = pauseMusic; // 把這個按鈕的點擊事件改成暫停功能

    ProgressInitial(); // 音樂開始播放時，初始化並開始更新進度條

    //playStatus.innerHTML = "目前播放" + myMusic.title;//（舊寫法）顯示目前播放的歌名
    updateInfo("目前播放" + myMusic.title); // 用 updateInfo 函式更新網頁上的播放狀態
}


//暫停音樂
function pauseMusic() {
    myMusic.pause();
    event.target.innerHTML = "4";
    event.target.onclick = playMusic;
    //playStatus.innerHTML = "音樂暫停";
    updateInfo("音樂暫停");
}

//停止音樂
function stopMusic() {
    //音樂停下，且 進度條歸零
    myMusic.pause();
    myMusic.currentTime = 0; //// 將音樂播放進度設為 0（回到開頭）
    // event.target.previousElementSibling.innerHTML = "4";//抓到上一個兄弟節點
    // event.target.previousElementSibling.onclick = playMusic; //恢復播放音樂的功能
    // 上面兩行是註解：原本設計是讓上一個按鈕（通常是播放/暫停鈕）恢復成播放圖示和功能

    //playStatus.innerHTML = "音樂停止";
    // 舊寫法，直接更新狀態顯示
    updateInfo("音樂停止"); // 用 updateInfo 函式更新網頁上的播放狀態
}

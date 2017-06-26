var radioStations = new Object();

radioStations.P1 = ["http://live-icy.gss.dr.dk/A/A03H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A03L.mp3.m3u",
                    "http://drradio1-lh.akamaihd.net/i/p1_9@143503/master.m3u8"];

radioStations.P2 = ["http://live-icy.gss.dr.dk/A/A04H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A03L.mp3.m3u",
                    "http://drradio2-lh.akamaihd.net/i/p2_9@143504/master.m3u8"];

radioStations.P3 = ["http://live-icy.gss.dr.dk/A/A05H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A05L.mp3.m3u",
                    "http://drradio3-lh.akamaihd.net/i/p3_9@143506/master.m3u8"];

radioStations.P4 = ["http://live-icy.gss.dr.dk/A/A08H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A08L.mp3.m3u",
                    "http://drradio3-lh.akamaihd.net/i/p4kobenhavn_9@143509/master.m3u8"];

radioStations.P5 = ["http://live-icy.gss.dr.dk/A/A25H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A25L.mp3.m3u",
                    "http://drradio1-lh.akamaihd.net/i/p5_9@143530/master.m3u8"];

radioStations.P6 = ["http://live-icy.gss.dr.dk/A/A29H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A29L.mp3.m3u",
                    "http://drradio3-lh.akamaihd.net/i/p6beat_9@143533/master.m3u8"];

radioStations.P7 = ["http://live-icy.gss.dr.dk/A/A21H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A21L.mp3.m3u",
                    "http://drradio1-lh.akamaihd.net/i/p7mix_9@143522/master.m3u8"];

radioStations.P8 = ["http://live-icy.gss.dr.dk/A/A22H.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A22L.mp3.m3u",
                    "http://drradio2-lh.akamaihd.net/i/p8jazz_9@143524/master.m3u8"];

radioStations.Nyheder = ["http://live-icy.gss.dr.dk/A/A02L.mp3.m3u",
                    "http://live-icy.gss.dr.dk/A/A02L.mp3.m3u",
                    "http://drradio2-lh.akamaihd.net/i/drnyheder_9@143532/master.m3u8"];

var audioPlayer = document.getElementById('audioPlayer');
var radioList = document.getElementById('radioMenu');
var quality = 0;
var nowPlaying = "P1";
if (localStorage.nowPlaying != null) {
  nowPlaying = localStorage.nowPlaying;
  audioPlayer.src = radioStations[nowPlaying][quality].replace('.m3u','');
}
initRadio();


// Play and pause controll
function playPause(state) {
  var button = document.getElementById('playPause');
  if (state) {
    button.innerHTML = "Pause";
    audioPlayer.play();
  } else if (button.innerHTML == "Play") {
    button.innerHTML = "Pause";
    audioPlayer.play();
  } else {
    button.innerHTML = "Play";
    audioPlayer.pause();
  }
  playDisplay();
}

document.getElementById('playPause').addEventListener('click', function(){
  playPause();
},false);

// Pop up player
document.getElementById('popUpPlayer').addEventListener('click', function(){
  var popUp = window.open(window.location.href, 'DR Radio Player', 'width=430,height=650');
}, false);

// Display currently playing station
function playDisplay() {
  document.getElementById(nowPlaying).className = nowPlaying.toLowerCase() + " now-playing";
}

// Load radio stations and event handlers
function initRadio() {
  for (var key in radioStations) {
    if (radioStations.hasOwnProperty(key)) {
      var thisStation = key;
      var newStationLi = document.createElement('li');
      var newStationLiA = document.createElement('a');
      var newStationNode = document.createTextNode(key);
      newStationLiA.appendChild(newStationNode);
      newStationLiA.href = "#";
      newStationLi.appendChild(newStationLiA);
      newStationLi.classList.add(key.toLowerCase());
      newStationLi.setAttribute("id",key);
      radioList.appendChild(newStationLi);
      newStationLiA.addEventListener('click', function() {
        document.getElementById(nowPlaying).className = nowPlaying.toLowerCase();
        nowPlaying = this.innerHTML; localStorage.nowPlaying = this.innerHTML;
        audioPlayer.src = radioStations[nowPlaying][quality].replace('.m3u','');
        playPause(true);
        playDisplay();
      }, false);
    }
  }
}


// Change volume
function setVolume(val)
{
    var player = document.getElementById('audioPlayer');
    player.volume = val / 100;
}

// Change audio quality
function setQuality(q) {
  document.getElementsByClassName('quality-selected')[0].className = '';
  switch(q) {
      case "high":
          quality = 0;
          audioPlayer.src = radioStations[nowPlaying][quality].replace('.m3u','');
          document.getElementById('highQuality').className = 'quality-selected';
          break;
      case "low":
          quality = 1;
          audioPlayer.src = radioStations[nowPlaying][quality].replace('.m3u','');
          document.getElementById('lowQuality').className = 'quality-selected';
          break;
      case "apple":
          quality = 2;
          audioPlayer.src = radioStations[nowPlaying][quality];
          document.getElementById('highQuality').className = 'quality-selected';
          break;
      default:
          console.log("Quality selection error");
  }
}

// Settings toggle
document.getElementById('settings-button').addEventListener('click', function(){
  var settings = document.getElementById('settings');
  if (settings.className == 'settings hide') {
    settings.className = 'settings';
  } else {
    settings.className = 'settings hide';
  }
}, false);

document.getElementById('closeSettings').addEventListener('click', function(){
  var settings = document.getElementById('settings');
  settings.className = 'settings hide';
}, false);

document.getElementById('highQuality').addEventListener('click', function(){
  setQuality('high');
}, false);
document.getElementById('lowQuality').addEventListener('click', function(){
  setQuality('low');
}, false);


// Typekit
(function(d) {
  var tkTimeout=3000;
  if(window.sessionStorage){if(sessionStorage.getItem('useTypekit')==='false'){tkTimeout=0;}}
  var config = {
    kitId: 'wix7muh',
    scriptTimeout: tkTimeout
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+"wf-inactive";if(window.sessionStorage){sessionStorage.setItem("useTypekit","false")}},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+="wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

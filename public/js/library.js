var lyricP = document.getElementById("lyricP");

var svgCode =
  '<svg  id="library-svg">' +
  '<line x1="5" y1="17" x2="420" y2="17" class="gLine" />' +
  '<line x1="5" y1="47" x2="420" y2="47" class="gLine" />' +
  '<line x1="5" y1="80" x2="420" y2="80" class="gLine" />' +
  '<line x1="5" y1="112" x2="420" y2="112" class="gLine" />' +
  '<line x1="5" y1="144" x2="420" y2="144" class="gLine" />' +
  '<line x1="5" y1="176" x2="420" y2="176" class="gLine" />' +
  "</svg>";

$("button.proBtn").click(function() {
  var lyrics = this.dataset.lyrics;
  // console.log(lyrics);
  lyricP.value = lyrics;
  // do something with id
  var tabDiv = document.getElementById("tab-lines");

  tabDiv.innerHTML = svgCode;
  // var tab = [];

  // tab.unshift(this.dataset.tab);
  var tab = this.dataset.tab;
  var tabArr = tab.split(",");

  console.log(tabArr);
  var grid = tabGrid(6, 12, function(el, row, col, i) {});
  var tabDiv = document.getElementById("tab-lines");
  tabDiv.appendChild(grid);
  grid.setAttribute("class", "grid2");

  function tabGrid(rows, cols, callback) {
    var i = -1;
    var grid = document.createElement("table");
    grid.className = "grid";

    for (var r = 0; r < rows; ++r) {
      var tr = grid.appendChild(document.createElement("tr"));
      tr.setAttribute("class", "tabRow");
      for (var c = 0; c < cols; ++c) {
        var cell = tr.appendChild(document.createElement("td"));
        cell.setAttribute("class", "cell2");
        i++;

        var tabH1 = document.createElement("h1");
        tabH1.setAttribute("class", "tabNums2");
        cell.appendChild(tabH1);
        // if (tabArr[i] === "") {
        //   tabH1.innerHTML = " ";
        // }
        tabH1.innerHTML = tabArr[i];
        console.log(tabArr[i]);
        // console.log(i);
      }
    }

    return grid;
  }
});

// const dataURItoBlob = (dataURI, callback) => {
//   // convert base64 to raw binary data held in a string
//   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
// };

var modal = document.getElementById("songModal");
var modalTitle = document.getElementById("modal-title");
var TContent = document.getElementById("track-content");
var container = document.getElementById("container");
var close = document.getElementById("modalClose");

var button = document.getElementsByClassName("trackBtn");

var trackArray = [];

var playFnc = e => {
  e.play();
  console.log(e);
  // console.log(x);
};

$("button.trackBtn").click(function(e) {
  // button.onclick = () => {
  // const showModal = () => {
  // var info = e.parentNode;
  // console.log(info);
  var parentDiv = $(this).closest(".row-2nd");
  // console.log(parentDiv);

  var tracks = this.dataset.tracks;
  var title = this.dataset.title;

  // var tracksArr = [];
  var tracksArr = JSON.parse(tracks);
  // console.log(tracksArr.length);

  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", "wrapper");

  container.appendChild(wrapper);

  var myaudio = [];
  var newaudio;

  for (var x = 0; x < tracksArr.length; x++) {
    var tDiv = document.createElement("div");
    tDiv.setAttribute("class", "tDiv");
    // Create the tracks title
    var tracksTitle = document.createElement("h1");
    tracksTitle.setAttribute("class", "TModal-title");
    tracksTitle.innerHTML = tracksArr[x].name;
    // console.log(tracksArr[x]);
    // console.log(x);
    // Create the audio

    var dataURI = tracksArr[x].audio;
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], {
      type: "audio/ogg; codecs=opus"
    });
    // console.log(bb);

    // Creating the audio html elements
    var audio = document.createElement("audio");
    var waveDiv = document.createElement("div");

    audio.setAttribute("class", "libraryClip");
    waveDiv.setAttribute("class", "waveform2");

    // Creating function buttons
    var btnDiv = document.createElement("div");
    var playBtn = document.createElement("button");
    var pauseBtn = document.createElement("button");
    var play = document.createElement("img");
    var pause = document.createElement("img");

    btnDiv.setAttribute("class", "btn-div2");
    playBtn.setAttribute("class", "func-btns");
    pauseBtn.setAttribute("class", "func-btns");

    play.setAttribute("src", "../assets/play-icon.svg");
    play.setAttribute("class", "play-icon");
    pause.setAttribute("src", "../assets/pause-icon.svg");
    pause.setAttribute("class", "pause-icon");

    playBtn.appendChild(play);
    pauseBtn.appendChild(pause);
    btnDiv.appendChild(playBtn);
    btnDiv.appendChild(pauseBtn);

    var audioURL = window.URL.createObjectURL(bb);
    audio.src = audioURL;

    newaudio = new Audio(audioURL);

    myaudio.push(newaudio);

    console.log(myaudio);

    // var playFnc = () => {
    //   myaudio[x].play();
    //   console.log(myaudio[x]);
    //   console.log(x);
    // };
    // console.log(myaudio[x]);

    // console.log(myaudio);
    // var playFnc = p => {
    //   p.play();
    //   console.log("button has been pressed");
    // };
    // var pauseFnc = p => {
    //   myaudio[x].pause();
    //   // wavesurfer.pause();
    //   // console.log(audioURL);
    // };

    // playBtn.setAttribute("onclick", "playFnc()");

    // playBtn.onclick = myaudio => {
    //   console.log(myaudio[x]);
    //   myaudio[x].play();
    // };

    playBtn.onclick = playFnc(myaudio[x]);

    // playBtn.onclick = () => {
    //   myaudio.play();
    //   console.log("Track Play");
    //   console.log(myaudio);
    // };

    // console.log(audioURL);

    // console.log(audioURL);

    modal.style.display = "block";
    modalTitle.innerHTML = title;
    // TContent.appendChild(tracksTitle);
    // TContent.appendChild(audio);

    // console.log(tracksArr[i].audio);
    tDiv.appendChild(tracksTitle);
    tDiv.appendChild(audio);
    tDiv.appendChild(waveDiv);
    tDiv.appendChild(btnDiv);

    var newLength = trackArray.unshift(tDiv);

    for (var w = 0; w < trackArray.length; w++) {
      wrapper.appendChild(trackArray[w]);
    }
    // wrapper.appendChild(tDiv);

    wavesurfer = WaveSurfer.create({
      container: ".waveform2",
      waveColor: "white",
      progressColor: "white",
      barGap: "4",
      barWidth: "3",
      barheight: "1",
      height: "50",
      scrollParent: false,
      cursorWidth: "0",
      interact: "true"
    });
    // console.log(trackArray);
    wavesurfer.load(audioURL);

    tDiv.onclick = e => {};
  }

  close.onclick = e => {
    modal.style.display = "none";

    wrapper.parentNode.removeChild(wrapper);
    trackArray = [];
    // tDiv.parentNode.removeChild(tDiv);
  };

  // $(tDiv).one("click", function() {
  //   parentDiv.empty();
  //   parentDiv.append(tDiv);
  //   tDiv.removeChild(tDiv.childNodes[0]);
  //   tDiv.removeChild(btnDiv);
  //   // parentDiv.css("padding-top", "15px");
  //   // parentDiv.css("height", "60px");

  //   var newBtns = document.createElement("div");
  //   var playBtn = document.createElement("button");
  //   var pauseBtn = document.createElement("button");
  //   var trackBtn = document.createElement("button");
  //   var play = document.createElement("img");
  //   var pause = document.createElement("img");
  //   var trackLns = document.createElement("img");

  //   newBtns.setAttribute("class", "songBtns");
  //   playBtn.setAttribute("class", "func-btns");
  //   pauseBtn.setAttribute("class", "func-btns");
  //   trackBtn.setAttribute("class", "func-btns");

  //   play.setAttribute("src", "../assets/play-blue.svg");
  //   play.setAttribute("class", "play-icon");
  //   pause.setAttribute("src", "../assets/pause-blue.svg");
  //   pause.setAttribute("class", "pause-icon");
  //   trackLns.setAttribute("src", "../assets/tracks-btn.svg");
  //   trackLns.setAttribute("class", "tracks-icon");

  //   playBtn.appendChild(play);
  //   pauseBtn.appendChild(pause);
  //   trackBtn.appendChild(trackLns);

  //   newBtns.appendChild(playBtn);
  //   newBtns.appendChild(pauseBtn);
  //   newBtns.appendChild(trackBtn);

  //   tDiv.appendChild(newBtns);
  //   tDiv.style.marginTop = "15px";
  //   tDiv.style.marginBottom = "0px";

  //   modal.style.display = "none";
  // });
  // tDiv.onclick = e => {
  //   parentDiv.empty();
  //   parentDiv.append(tDiv);
  //   tDiv.removeChild(tDiv.childNodes[0]);
  //   tDiv.removeChild(btnDiv);
  //   // parentDiv.css("padding-top", "15px");
  //   // parentDiv.css("height", "60px");
  //   var newBtns = document.createElement("div");
  //   var playBtn = document.createElement("button");
  //   var pauseBtn = document.createElement("button");
  //   var trackBtn = document.createElement("button");
  //   var play = document.createElement("img");
  //   var pause = document.createElement("img");
  //   var trackLns = document.createElement("img");
  //   newBtns.setAttribute("class", "songBtns");
  //   playBtn.setAttribute("class", "func-btns");
  //   pauseBtn.setAttribute("class", "func-btns");
  //   trackBtn.setAttribute("class", "func-btns");
  //   play.setAttribute("src", "../assets/play-blue.svg");
  //   play.setAttribute("class", "play-icon");
  //   pause.setAttribute("src", "../assets/pause-blue.svg");
  //   pause.setAttribute("class", "pause-icon");
  //   trackLns.setAttribute("src", "../assets/tracks-btn.svg");
  //   trackLns.setAttribute("class", "tracks-icon");
  //   playBtn.appendChild(play);
  //   pauseBtn.appendChild(pause);
  //   trackBtn.appendChild(trackLns);
  //   newBtns.appendChild(playBtn);
  //   newBtns.appendChild(pauseBtn);
  //   newBtns.appendChild(trackBtn);
  //   tDiv.appendChild(newBtns);
  //   tDiv.style.marginTop = "15px";
  //   tDiv.style.marginBottom = "0px";
  //   modal.style.display = "none";
  // };
});

// var rows = document.getElementsByClassName("row-pad");
// var firstRow = rows[0];

// // console.log(firstRow);
// rows[0].style.background = "none";

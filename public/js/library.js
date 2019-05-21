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
  // Retrieving data from the ejs file on button click
  var lyrics = this.dataset.lyrics;
  lyricP.value = lyrics;

  var tabDiv = document.getElementById("tab-lines");

  tabDiv.innerHTML = svgCode;

  var tab = this.dataset.tab;
  var tabArr = tab.split(",");

  // Creating a table to display the tabs
  var grid = tabGrid(6, 12, function(el, row, col, i) {});
  var tabDiv = document.getElementById("tab-lines");
  tabDiv.appendChild(grid);
  grid.setAttribute("class", "grid2");

  function tabGrid(rows, cols, callback) {
    var i = -1;
    var grid = document.createElement("table");
    grid.className = "grid";

    // Creates the table
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

        // Validation: If no data the result would be undefined so changed to empty string
        if (tabArr[i] === undefined) {
          tabH1.innerHTML = "";
        } else {
          // Passing the tab data to h1 elements
          tabH1.innerHTML = tabArr[i];
          console.log(tabArr[i]);
        }
      }
    }
    return grid;
  }
});

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
  var parentDiv = $(this).closest(".row-2nd");

  // Retrieving data from EJS file
  var tracks = this.dataset.tracks;
  var title = this.dataset.title;

  // Parsing the tracks data to an object
  var tracksArr = JSON.parse(tracks);

  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", "wrapper");

  container.appendChild(wrapper);

  var myaudio = [];
  var newaudio;

  var btnA = [];

  for (var x = 0; x < tracksArr.length; x++) {
    var tDiv = document.createElement("div");
    tDiv.setAttribute("class", "tDiv");
    // Create the tracks title
    var tracksTitle = document.createElement("h1");
    tracksTitle.setAttribute("class", "TModal-title");
    tracksTitle.innerHTML = tracksArr[x].name;

    // Converting the base64 back into a blob format
    var dataURI = tracksArr[x].audio;
    var byteString = atob(dataURI.split(",")[1]);
    // Separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    // Writing the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // Writing the ArrayBuffer to a blob
    var bb = new Blob([ab], {
      type: "audio/ogg; codecs=opus"
    });

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

    // Function buttons
    playBtn.onclick = e => {
      // Getting the audio element from going through the parent and child nodes
      var audNode = e.target.parentNode.parentNode.parentNode.childNodes[1];
      audNode.play();
    };
    pauseBtn.onclick = e => {
      var audNode = e.target.parentNode.parentNode.parentNode.childNodes[1];
      audNode.pause();
    };

    modal.style.display = "block";
    modalTitle.innerHTML = title;

    tDiv.appendChild(tracksTitle);
    tDiv.appendChild(audio);
    tDiv.appendChild(waveDiv);
    tDiv.appendChild(btnDiv);

    // Adds new recording to top of array so when displayed on page
    // wavesurfer can identify the correct class name
    var newLength = trackArray.unshift(tDiv);
    for (var w = 0; w < trackArray.length; w++) {
      wrapper.appendChild(trackArray[w]);
    }

    // Initialising wavesurfer
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
    wavesurfer.load(audioURL);
  }
  // Closes Modal
  close.onclick = e => {
    modal.style.display = "none";

    wrapper.parentNode.removeChild(wrapper);
    trackArray = [];
  };
});

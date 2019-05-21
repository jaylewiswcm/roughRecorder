var Switch = 1;
var record = document.getElementById("record");
var soundClips = document.getElementById("track-table");
var recordImg = document.getElementById("record-icon");

// Media Recorder API - records audio from the browser
function handlerFunction(stream) {
  var rec = new MediaRecorder(stream);

  record.onclick = e => {
    // Changes the record icon when recording also allows the start and stop button to be the same icon
    if (Switch === 1) {
      Switch = 2;
      rec.start();
      recordImg.src = "../assets/recording-icon.svg";
    } else if (Switch === 2) {
      Switch = 1;
      rec.stop();
      recordImg.src = "../assets/record-icon.svg";
    }
  };

  var audioChunks = [];

  rec.ondataavailable = e => {
    audioChunks.push(e.data);
  };

  // To display the tracks
  var trackArray = [];
  var i = 0;
  var trackTable = document.getElementById("track-table");
  var trackArr = [];
  var nameProject;

  rec.onstop = e => {
    // Once recording stops display a modal to enter the track name
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var submit = document.getElementsByClassName("trackSubmit")[0];
    var trackInput = document.getElementById("trackName");
    var projectName = document.getElementById("proj-name");

    // Turned off the prediction drop down on input
    trackInput.setAttribute("autocomplete", "off");
    var project = projectName.value;
    modal.style.display = "block";
    trackInput.value = "";

    // On submiting the track name create html elements to display
    // the tracks with waveforms and function buttons
    submit.onclick = function(e) {
      e.preventDefault();
      console.log(trackInput.value);

      // Validation: Track name is needed
      if (trackInput.value === "") {
        console.log("Enter a track name");
        trackInput.setAttribute("id", "trackVal");
      } else {
        trackInput.setAttribute("id", "trackName");
        modal.style.display = "none";

        // Passing the trackInput value to the trackName h1
        var trackName = trackInput.value;

        // Creating the html elements to display the tracks
        var trackContainer = document.createElement("article");
        var trackLabel = document.createElement("p");
        var audio = document.createElement("audio");
        var waveDiv = document.createElement("div");
        var deleteButton = document.createElement("button");

        trackContainer.classList.add("tracks");
        waveDiv.setAttribute("class", "waveform");
        audio.setAttribute("class", "clip");
        deleteButton.setAttribute("class", "delete-btn");
        trackLabel.innerHTML = trackName;
        trackLabel.setAttribute("class", "track-label");

        // Creating function buttons
        var btnDiv = document.createElement("div");
        var playBtn = document.createElement("button");
        var pauseBtn = document.createElement("button");
        var play = document.createElement("img");
        var pause = document.createElement("img");

        btnDiv.setAttribute("class", "btn-div");
        playBtn.setAttribute("class", "func-btns");
        pauseBtn.setAttribute("class", "func-btns");

        play.setAttribute("src", "../assets/play-icon.svg");
        play.setAttribute("class", "play-icon");
        pause.setAttribute("src", "../assets/pause-icon.svg");
        pause.setAttribute("class", "pause-icon");

        // Play and pause functionality
        const playFnc = e => {
          myaudio.play();
          wavesurfer.play();
        };
        const pauseFnc = e => {
          myaudio.pause();
          wavesurfer.pause();
        };

        playBtn.onclick = playFnc;
        pauseBtn.onclick = pauseFnc;

        playBtn.appendChild(play);
        pauseBtn.appendChild(pause);

        btnDiv.appendChild(playBtn);
        btnDiv.appendChild(pauseBtn);
        trackContainer.appendChild(trackLabel);

        trackContainer.appendChild(btnDiv);
        trackContainer.appendChild(audio);
        trackContainer.appendChild(waveDiv);
        trackContainer.appendChild(deleteButton);
        soundClips.appendChild(trackContainer);

        // Creating a new blob from the captured audio
        var blob = new Blob(audioChunks, {
          type: "audio/ogg; codecs=opus"
        });
        audioChunks = [];
        // Creating a url from the blob
        var audioURL = window.URL.createObjectURL(blob);
        // Passing the audioURL through the audio elements src
        audio.src = audioURL;
        // Creating the audio passing the audioURL
        var myaudio = new Audio(audioURL);

        // Adds new recording to top of array so when displayed on page
        // wavesurfer can identify the correct class name
        var newLength = trackArray.unshift(trackContainer);
        for (var x = 0; x < trackArray.length; x++) {
          trackTable.appendChild(trackArray[x]);
        }

        // Delete function for tracks: removes the selected div from trackArray
        // and also removes the audio from the array trackArr
        deleteButton.onclick = e => {
          var evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          var index = trackArray.indexOf(evtTgt.parentNode);
          if (index === 0) {
            trackArr.shift();
            trackArray.shift();
          } else {
            trackArray.splice(index);
            trackArr.splice(index);
          }
        };

        // Converting the blob data to base64 so axios can post the data to the server
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          base64data = reader.result;
          trackArr.push({
            name: trackName,
            audio: base64data
          });
        };

        var saveBtn = document.getElementById("saveBtn");

        // Saving the project functionality
        saveBtn.onclick = e => {
          var lyricsElm = document.getElementById("lyrics");
          var lyricsVal = lyricsElm.value;
          var tabs = document.getElementsByClassName("freshGrid");

          var tabVal = [];
          // Checking if tabs are entered, if not then send an empty string
          // otherwise on the library page it displays the tab data as undefined
          if (tabs.length === 0) {
            console.log("Tabs are not entered");
            // Validation: Project title must be entered
            if (project === "") {
              var val = document.getElementById("title-validation");
              console.log("Error need a title");
              val.style.display = "block";
            } else {
              // axios post request to the projects route
              axios({
                method: "post",
                url: "/projects",
                data: {
                  title: project,
                  tracks: trackArr,
                  lyrics: lyricsVal,
                  tabs: ""
                },
                config: {
                  headers: {
                    // "Content-Type": "application/x-www-form-urlencoded"
                    "Content-Type": "multipart/form-data"
                  }
                }
              })
                .then(function(response) {
                  console.log("Project Saved");
                  // // Pop up box to say its saved
                  // var popBox = document.getElementById("saveBox");
                  // popBox.style.display = "block";
                  // setTimeout(function () {
                  //   popBox.style.display = "none";
                  // }, 2000);
                })
                .catch(function(error) {
                  console.log(error);
                });
              // Displays box saying project saved
              var popBox = document.getElementById("saveBox");
              popBox.style.display = "block";
              setTimeout(function() {
                popBox.style.display = "none";
              }, 2000);
            }
          } else {
            // Send the tab data with the rest of the project
            // Retrieving the h1 values from the tabs childNodes
            for (var a = 0; a < 6; a++) {
              for (var b = 0; b < 12; b++) {
                tabVal.push(
                  tabs[0].childNodes[a].childNodes[b].childNodes[0].innerHTML
                );
              }
            }
            var val = document.getElementById("title-validation");
            // Validation: Project needs a title
            if (project === "") {
              console.log("Error need a title");
              val.style.display = "block";
            } else {
              axios({
                method: "post",
                url: "/projects",
                data: {
                  title: project,
                  tracks: trackArr,
                  lyrics: lyricsVal,
                  tabs: tabVal
                },
                config: {
                  headers: {
                    // "Content-Type": "application/x-www-form-urlencoded"
                    "Content-Type": "multipart/form-data"
                  }
                }
              });
              var popBox = document.getElementById("saveBox");
              popBox.style.display = "block";
              setTimeout(function() {
                popBox.style.display = "none";
              }, 2000);
            }
          }
          // console.log(trackArr);
        };

        // Wavesurfer.js: creates a waveform for the audio
        // it takes in the audioURL and is assigned to the
        // element with the class waveform
        var wavesurfer = WaveSurfer.create({
          container: ".waveform",
          waveColor: "#FFFFFF",
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

        var titleDiv = document.getElementById("title-div");
        titleDiv.style.display = "inherit";
      }
    };
  };
}

// MediaRecorder
navigator.mediaDevices
  .getUserMedia({
    audio: true
  })
  .then(stream => {
    handlerFunction(stream);
  });

// Tab Creation
var lastClicked;
var grid = tabGrid(6, 12, function(el, row, col, i) {});
var tabDiv = document.getElementById("tab-div");
tabDiv.appendChild(grid);

function tabGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
  // Creating the grid with cells containing select elements
  for (var r = 0; r < rows; ++r) {
    var tr = grid.appendChild(document.createElement("tr"));
    for (var c = 0; c < cols; ++c) {
      var cell = tr.appendChild(document.createElement("td"));
      var customSelect = document.createElement("div");
      var select = document.createElement("select");
      var btn = document.createElement("button");
      btn.setAttribute("id", "saveTab");
      btn.innerHTML = "Save";
      customSelect.setAttribute("class", "custom-select");
      select.setAttribute("id", "drop-down");

      var selArr = [];
      selArr = select;
      // Creating the values of the select elements
      for (var n = 0; n <= 26; n++) {
        var nums = document.createElement("option");
        nums.setAttribute("class", "nums");
        if (n === 0) {
          nums.value = "";
          nums.innerHTML += " ";
          select.appendChild(nums);
        } else if (n === 1) {
          nums.value = "x";
          nums.innerHTML += "x";
          select.appendChild(nums);
        } else if (n === 2) {
          nums.value = "0";
          nums.innerHTML += "0";
          select.appendChild(nums);
        } else {
          nums.value = n - 2;
          nums.innerHTML += n - 2;
          select.appendChild(nums);
        }
      }

      // Saving the tab functionality
      btn.onclick = () => {
        var newTable = document.createElement("table");
        newTable.className = "freshGrid";
        // Creating a new table with cells containing h1 elements
        for (var r = 0, n = grid.rows.length; r < n; r++) {
          var tRow = newTable.appendChild(document.createElement("tr"));
          tRow.setAttribute("class", "tabRow");
          for (var c = 0, m = grid.rows[r].cells.length; c < m; c++) {
            var tCell = tRow.appendChild(document.createElement("td"));
            tCell.setAttribute("class", "tabCell");
            var h1 = document.createElement("h1");
            h1.setAttribute("class", "tabNums");
            // Setting the value of the h1 by finding the value of the orginal
            // grid's select elements
            var value = grid.rows[r].cells[c].childNodes[0].childNodes[0].value;
            h1.value = value;
            h1.innerHTML = value;
            tCell.appendChild(h1);
            // console.log(value);
          }
        }
        // Hides the original grid and displays the new one
        var tabDiv = document.getElementById("tab-div");
        tabDiv.appendChild(newTable);
        grid.style.display = "none";
      };

      customSelect.appendChild(select);
      cell.appendChild(customSelect);
    }
  }
  customSelect.appendChild(btn);
  return grid;
}

var Switch = 1;
var record = document.getElementById("record");
var soundClips = document.getElementById("track-table");
var recordImg = document.getElementById("record-icon");

function handlerFunction(stream) {
  var rec = new MediaRecorder(stream);

  record.onclick = e => {
    // console.log("Button has been clicked");

    if (Switch === 1) {
      Switch = 2;

      rec.start();
      // console.log(rec.state);
      // console.log("Started the recording");
      recordImg.src = "../assets/recording-icon.svg";
    } else if (Switch === 2) {
      Switch = 1;

      rec.stop();

      // console.log(rec.state);
      // console.log("Stopped the recording");
      recordImg.src = "../assets/record-icon.svg";
    }
  };

  var audioChunks = [];

  rec.ondataavailable = e => {
    audioChunks.push(e.data);
  };

  var trackArray = [];
  var i = 0;
  var trackTable = document.getElementById("track-table");

  var trackArr = [];
  var nameProject;
  rec.onstop = e => {
    // console.log("Recorder stopped");

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var submit = document.getElementsByClassName("trackSubmit")[0];
    var trackInput = document.getElementById("trackName");
    var projectName = document.getElementById("proj-name");

    trackInput.setAttribute("autocomplete", "off");
    var project = projectName.value;
    modal.style.display = "block";
    trackInput.value = "";

    submit.onclick = function(e) {
      e.preventDefault();
      modal.style.display = "none";

      var trackName = trackInput.value;

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

      var blob = new Blob(audioChunks, {
        type: "audio/ogg; codecs=opus"
      });
      audioChunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      var myaudio = new Audio(audioURL);

      // sendData(blob);

      // var checks = document.querySelectorAll(".tracks");

      // const checkIndex = event => {
      //   console.log(Array.from(checks).indexOf(event.target));
      // };

      // checks.forEach(
      //   (func = check => {
      //     check.addEventListener("click", checkIndex);
      //   })
      // );

      var newLength = trackArray.unshift(trackContainer); // adds new recording to top of array

      for (var x = 0; x < trackArray.length; x++) {
        trackTable.appendChild(trackArray[x]);
      }
      deleteButton.onclick = e => {
        var evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);

        var index = trackArray.indexOf(evtTgt.parentNode);

        // console.log(index);

        if (index === 0) {
          trackArr.shift();
          trackArray.shift();
        } else {
          trackArray.splice(index);
          trackArr.splice(index);
        }

        // console.log(trackArray);
        // console.log(trackArr);
        // console.log(trackArray);
      };

      // console.log(blob);

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        base64data = reader.result;
        // console.log(base64data);
        // var stBlob = JSON.stringify(blob);
        trackArr.push({
          name: trackName,
          audio: base64data
        });
      };

      // trackArr.push({ name: trackName, audio: blob });

      // Adds track data to the end of the array
      // trackArr.push({ name: trackName, audio: base64data });
      var saveBtn = document.getElementById("saveBtn");

      // console.log(project);
      // console.log(blob);

      // freshGrid;

      saveBtn.onclick = e => {
        var lyricsElm = document.getElementById("lyrics");
        var lyricsVal = lyricsElm.value;
        var tabs = document.getElementsByClassName("freshGrid");
        // console.log(tabs);
        var tabVal = [];
        if (tabs.length === 0) {
          console.log("Tabs are not entered");

          // console.log(tabVal);
          if (project === "") {
            var val = document.getElementById("title-validation");
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
                // Pop up box to say its saved
                var popBox = document.getElementById("saveBox");
                popBox.style.display = "block";
                setTimeout(function() {
                  popBox.style.display = "none";
                }, 2000);
              })
              .catch(function(error) {
                console.log(error);

                // Put Validation
              });
            var popBox = document.getElementById("saveBox");
            popBox.style.display = "block";
            setTimeout(function() {
              popBox.style.display = "none";
            }, 2000);
          }
        } else {
          for (var a = 0; a < 6; a++) {
            for (var b = 0; b < 12; b++) {
              tabVal.push(
                tabs[0].childNodes[a].childNodes[b].childNodes[0].innerHTML
              );
            }
          }
          var val = document.getElementById("title-validation");
          // console.log(tabVal);
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
      // console.log(trackArray);
      wavesurfer.load(audioURL);

      var titleDiv = document.getElementById("title-div");

      titleDiv.style.display = "inherit";
    };
  };

  // var sendData = blob => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("POST", "/app", true);

  //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  //   xhr.onreadystatechange = function() {
  //     // Call a function when the state changes.
  //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
  //       // Request finished. Do processing here.
  //     }
  //   };
  //   xhr.send(trackArray);
  // };
  // console.log(trackArray);
}

// var wavesurfer = WaveSurfer.create({
//   container: '#waveform'
// });

var xhr = new XMLHttpRequest();
xhr.onload = function(e) {
  if (this.readyState === 4) {
    console.log("Server returned: ", e.target.responseText);
  }

  var fd = new FormData();
  fd.append("name", "filename.wav");
  fd.append("file", blob);
  xhr.open("POST", "/projects", true);
  xhr.send(fd);
};

navigator.mediaDevices
  .getUserMedia({
    audio: true
  })
  .then(stream => {
    handlerFunction(stream);
  });

//                       Saving project                   //
const saveProj = () => {
  // console.log(trackArr);
};

// function ClientSide() {
//   var info = [];

//   info[0] = "hi";
//   info[1] = "hello";

//   var json = JSON.stringify(info); //pass this

//   $.ajax({
//     type: "post",
//     url: "/save",
//     data: json,
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(html) {
//       // use data
//     }

//   });
// }

// const sendArr = trackArray => {
//   var data = "hello";
//   $.ajax({
//     type: "POST",
//     url: "/array",
//     data: JSON.stringify(data)
//   });
// };

// sendArr();

var lastClicked;
var grid = clickableGrid(6, 12, function(el, row, col, i) {});
var tabDiv = document.getElementById("tab-div");
tabDiv.appendChild(grid);

function clickableGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
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
      // console.log(selArr);

      // Creating select options

      // nums.innerHTML = "";
      // select.appendChild(nums);

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

      btn.onclick = () => {
        var newTable = document.createElement("table");
        newTable.className = "freshGrid";

        for (var r = 0, n = grid.rows.length; r < n; r++) {
          var tRow = newTable.appendChild(document.createElement("tr"));
          tRow.setAttribute("class", "tabRow");
          for (var c = 0, m = grid.rows[r].cells.length; c < m; c++) {
            var tCell = tRow.appendChild(document.createElement("td"));
            tCell.setAttribute("class", "tabCell");
            var h1 = document.createElement("h1");
            h1.setAttribute("class", "tabNums");

            var value = grid.rows[r].cells[c].childNodes[0].childNodes[0].value;
            h1.value = value;
            h1.innerHTML = value;
            tCell.appendChild(h1);
            // console.log(value);
          }
        }
        var tabDiv = document.getElementById("tab-div");
        tabDiv.appendChild(newTable);

        grid.style.display = "none";
      };

      customSelect.appendChild(select);
      // customSelect.appendChild(btn);
      cell.appendChild(customSelect);
    }
  }
  customSelect.appendChild(btn);
  return grid;
}

// function GetCellValues() {}

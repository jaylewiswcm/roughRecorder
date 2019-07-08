//              Repositioning lyrics            //

var lyrics = document.getElementById("lyrics");
var lyricCon = document.getElementById("lyric-con");
var openForm = document.getElementById("openForm");
var crossBtn = document.getElementById("cross-btn");

var saveBtn = document.getElementById("saveBtn");
var lyricTxt = document.getElementById("lyrics");
var hiddenField = document.getElementById("hiddenField");

var columns = document.getElementsByClassName("home-column");
var titleColumns = document.getElementsByClassName("title-column");

var savedTxt;

const rePosLyr = () => {
  lyricCon.style.right = "-80px";
  lyricCon.style.bottom = "-140px";
  lyrics.style.background = "none";
  lyricCon.style.background = "url(../assets/lyrics-full.svg) no-repeat";
  lyricCon.style.backgroundSize = "400px 500px";
  lyricCon.onclick = null;
  openForm.style.display = "none";
  crossBtn.style.display = "inherit";

  columns[0].style.width = "33%";
  columns[1].style.width = "33%";
  titleColumns[0].style.width = "33%";
  titleColumns[1].style.width = "33%";
};

const closeForm = () => {
  lyrics.style.background = "url(../assets/lyrics.png) no-repeat";
  lyrics.style.backgroundSize = "400px 500px";
  lyricCon.style.background = "none";
  lyricCon.style.right = "-280px";
  lyricCon.style.bottom = "-490px";
  crossBtn.style.display = "none";
  openForm.style.display = "inherit";

  columns[0].style.width = "45%";
  columns[1].style.width = "45%";
  titleColumns[0].style.width = "45%";
  titleColumns[1].style.width = "45%";
};

// Functionality to show tabs
var tabs = document.getElementById("tab-div");
var tabTitle = document.getElementById("tab-title");
var helper = document.getElementById("helper-hider");
const showTabs = () => {
  if (tabs.style.display == "none") {
    tabs.style.display = "inline-block";
    tabTitle.style.cursor = "default";
    helper.style.display = "none";
  } else {
    tabs.style.display = "none";
    tabTitle.style.cursor = "cell";
  }
};

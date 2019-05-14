//                    Sign in and Reg                  //
const register = document.getElementById("register");
const signIn = document.getElementById("sign-in");
const regBtn = document.getElementById("reg-btn");
const signBtn = document.getElementById("sign-btn");
const sForm = document.getElementById("sigin-form");
const rForm = document.getElementById("register-form");
const box = document.getElementById("signin-box");

const sSubmit = document.getElementById("sign-submit");
const rSubmit = document.getElementById("reg-submit");

const regClick = () => {
  register.style.backgroundImage = "url(../assets/red-shape.svg";
  regBtn.style.color = "#FFFFFF";
  signIn.style.backgroundImage = "url(../assets/white-shape.svg";
  signBtn.style.color = "#001F3F";
  register.style.zIndex = "3";
  signIn.style.zIndex = "0";

  sForm.style.display = "none";
  rForm.style.display = "block";

  box.style.width = "500px";
  box.style.marginLeft = "-50px";
  box.style.height = "320px";
};

const signClick = () => {
  signIn.style.backgroundImage = "url(../assets/red-shape.svg";
  signBtn.style.color = "#FFFFFF";
  register.style.backgroundImage = "url(../assets/white-shape.svg";
  regBtn.style.color = "#001F3F";
  signIn.style.zIndex = "3";
  register.style.zIndex = "0";

  rForm.style.display = "none";
  sForm.style.display = "block";

  box.style.width = "400px";
  box.style.marginLeft = "0px";
  box.style.height = "280px";
};

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
  // console.log("Area has been clicked");

  // lyrics.style.right = "50px";
  // lyrics.style.bottom = "-180px";
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
  // lyricCon.style.background = "none";
  // lyricCon.style.backgroundSize = "400px 500px";

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

var tabs = document.getElementById("tab-div");
var tabTitle = document.getElementById("tab-title");
const showTabs = () => {
  if (tabs.style.display == "none") {
    tabs.style.display = "inline-block";
    tabTitle.style.cursor = "default";
  } else {
    tabs.style.display = "none";
    tabTitle.style.cursor = "cell";
  }
};
// const saveProj = savedTxt => {
//   savedTxt = lyricTxt.value;
//   hiddenField.value = lyricTxt.value;

//   lyricTxt.value = savedTxt;

//   console.log("Saving in progress");
//   console.log(hiddenField);
//   console.log(savedTxt);
//   // savedLyrics.innerHTML = savedTxt;
// };

// var libraryLyr = document.getElementById("lyric-background");

// const openProj = () => {
//   var lyrP = document.createElement("p");
//   lyrP.setAttribute("class", "lyric-p");
//   libraryLyr.appendChild(lyrP);

//   lyrP.innerHTML = projects[i].title;
// };

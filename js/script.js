let point;
let liv;
const pill1 = document.querySelector("#pill_container1");
const pill2 = document.querySelector("#pill_container2");
const pill3 = document.querySelector("#pill_container3");
const pill4 = document.querySelector("#pill_container4");
const pollen1 = document.querySelector("#pollen_container1");
const pollen2 = document.querySelector("#pollen_container2");

window.addEventListener("load", sidenVises);

// SIDEN VISES
function sidenVises() {
  console.log("sidenVises");
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startSpillet);
}

// START SPILLET
function startSpillet() {
  console.log("startSpillet");
  //Skjul andre skærme
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game").classList.remove("hide");

  document.querySelector("#baggrunds_lyd").volume = 0.1;
  document.querySelector("#baggrunds_lyd").play();

  //Nulstil point og udskriv
  point = 0;
  document.querySelector("#score_board").innerHTML = point;

  //reset liv til 3
  liv = 3;
  document.querySelector("#liv").innerHTML = liv;

  // starter timer-animation når spillet startes
  document.querySelector("#time_sprite").classList.add("time");
  // Når timer-animation er færdig kaldes stopSpillet()
  document.querySelector("#time_container").addEventListener("animationend", stopSpillet);

  pill1.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
  pill2.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
  pill3.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
  pill4.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));

  pollen1.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
  pollen2.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));

  pill1.addEventListener("animationiteration", pillReset);
  pill1.addEventListener("mousedown", clickPillHandler);
  pill2.addEventListener("animationiteration", pillReset);
  pill2.addEventListener("mousedown", clickPillHandler);
  pill3.addEventListener("animationiteration", pillReset);
  pill3.addEventListener("mousedown", clickPillHandler);
  pill4.addEventListener("animationiteration", pillReset);
  pill4.addEventListener("mousedown", clickPillHandler);

  pollen1.addEventListener("animationiteration", pollenReset);
  pollen1.addEventListener("mousedown", clickPollenHandler);
  pollen2.addEventListener("animationiteration", pollenReset);
  pollen2.addEventListener("mousedown", clickPollenHandler);
}

function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#time_sprite").classList.remove("time");
}

// GODE KLIK
function clickPillHandler() {
  this.removeEventListener("mousedown", clickPillHandler);
  point++;
  console.log(point);
  document.querySelector("#score_board").innerHTML = point;

  document.querySelector("#slurp").volume = 0.1;
  document.querySelector("#slurp").currentTime = 0;
  document.querySelector("#slurp").play();

  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  this.addEventListener("animationend", pillReset);
}

function pillReset() {
  this.addEventListener("mousedown", clickPillHandler);
  console.log("pillReset");
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  this.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
}

// ONDE KLIK
function clickPollenHandler() {
  console.log(clickPollenHandler);
  this.removeEventListener("mousedown", clickPollenHandler);
  liv--;
  document.querySelector("#liv").innerHTML = liv;

  document.querySelector("#sneeze").volume = 0.1;
  document.querySelector("#sneeze").currentTime = 0;
  document.querySelector("#sneeze").play();

  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind");
  this.addEventListener("animationend", pollenReset);

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

function pollenReset() {
  console.log("pollenReset");
  this.addEventListener("mousedown", clickPollenHandler);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  this.classList.add("pos" + nytRandomTal(8), "falling", "delay" + nytRandomTal(4));
}

// SPILLET SLUTTER
function stopSpillet() {
  console.log("stopSpillet");
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);

  // fjerner alle klasser på god/ ond
  pill1.classList = "";
  pill1.firstElementChild.classList = "";
  pill2.classList = "";
  pill2.firstElementChild.classList = "";
  pill3.classList = "";
  pill3.firstElementChild.classList = "";
  pill4.classList = "";
  pill4.firstElementChild.classList = "";

  pollen1.classList = "";
  pollen1.firstElementChild.classList = "";
  pollen2.classList = "";
  pollen2.firstElementChild.classList = "";

  // alle lyt fjernes fra god
  pill1.removeEventListener("animationiteration", pillReset);
  pill1.removeEventListener("animationend", pillReset);
  pill1.removeEventListener("mousedown", clickPillHandler);

  pill2.removeEventListener("animationiteration", pillReset);
  pill2.removeEventListener("animationend", pillReset);
  pill2.removeEventListener("mousedown", clickPillHandler);

  pill3.removeEventListener("animationiteration", pillReset);
  pill3.removeEventListener("animationend", pillReset);
  pill3.removeEventListener("mousedown", clickPillHandler);

  pill4.removeEventListener("animationiteration", pillReset);
  pill4.removeEventListener("animationend", pillReset);
  pill4.removeEventListener("mousedown", clickPillHandler);

  // alle lyt fjernes fra ond
  pollen1.removeEventListener("animationiteration", pollenReset);
  pollen1.removeEventListener("animationend", pollenReset);
  pollen1.removeEventListener("mousedown", clickPollenHandler);

  pollen2.removeEventListener("animationiteration", pollenReset);
  pollen2.removeEventListener("animationend", pollenReset);
  pollen2.removeEventListener("mousedown", clickPollenHandler);

  if (liv <= 0) {
    console.log("taber");
    game_over();
  } else if (point >= 35) {
    console.log("vinder");
    level_complete();
  } else {
    game_over();
  }
}

function game_over() {
  console.log("game_over");

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#game").classList.add("hide");
  document.querySelector("#game_over_points").textContent = "Du tabte og fik " + point + " point";

  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startSpillet);
}

function level_complete() {
  console.log("level_complete");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#game").classList.add("hide");
  document.querySelector("#level_complete_points").textContent = "Du vandt og fik " + point + " point";

  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startSpillet);
}

// min random-function med return. bruges i stedet for f.eks 'let rannum'
function nytRandomTal(max) {
  return (minRand = Math.floor(Math.random() * max) + 1);
}

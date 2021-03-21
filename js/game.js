const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let wrongHit = 0
function round() {
  let targetDiv = document.querySelector('.target')
  if (targetDiv) {
    targetDiv.innerText = ''
    targetDiv.classList.remove('target')
  }

  let divSelector = randomDivId();
  let newTarget = document.querySelector(divSelector)
  $(divSelector).addClass("target");
  newTarget.innerText = `${hits + 1}`
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  let reloadButton = document.querySelector('#button-reload')
  reloadButton.classList.remove('d-none')

  let gameNodeList = document.querySelectorAll('.game-field')
  Array.from(gameNodeList).map(el => el.classList.add('d-none'))

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let wrongSpan = document.querySelector('#wrong-hits')
  wrongSpan.innerText = `${wrongHit}`

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  let realTarget = event.target
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    realTarget.classList.add('miss')
    realTarget.innerText = 'WRONG'
    setTimeout(() => {
      realTarget.classList.remove('miss')
      realTarget.innerText = ''
    }, 200)
    wrongHit++
    if (hits > 0) {
      hits--
    }
    round();
  }
}

function init() {
  let startButton = document.querySelector('#button-start')
  startButton.addEventListener('click', () => {
    startButton.classList.add('d-none')
    if (!firstHitTime) {
      firstHitTime = getTimestamp()
    }
    $(".game-field").click(handleClick);
    $("#button-reload").click(function() {
      location.reload();
    });
    round()
  })
}

$(document).ready(init);
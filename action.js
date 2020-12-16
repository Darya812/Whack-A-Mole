const houses = document.querySelectorAll('.house');
  const scoreBoard = document.querySelector('.score');
  const ghosts = document.querySelectorAll('.ghost');
  const name = document.querySelector('#text');
  const submit = document.querySelector('#submit');
  const hello = document.querySelector('.hello');
  const start = document.querySelector('.start');
  const table = document.querySelector('#table');
  const gameOff = document.querySelector('.gameOver');
    let lastHouse;
  let timeUp = false;
  let score = 0;
  let fail = 0;
  let minTime;
    let maxTime;

    const results = localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results')) : [];
 let playerName;

submit.addEventListener('click', () => {
      hello.style.display = "none";
      start.style.display = "block";
      playerName = name.value;
})


  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHouse(houses) {
    const idx = Math.floor(Math.random() * houses.length);
    const house = houses[idx];
    if (house === lastHouse) {
      return randomHouse(houses);
    }
    lastHouse = house;
    return house;
  }

  function peep() {
    

    if (score <= 5) {
      minTime = 1000;
      maxTime = 1700;
    }
    if (score > 5) {
      minTime = 800;
      maxTime = 1400;
    }
    if (score > 10) {
      minTime = 500;
      maxTime = 1000;
    }

    const time = randomTime (minTime, maxTime);
    const house = randomHouse (houses);
    house.classList.add('up');
    setTimeout(() => {
      if (house.classList.contains('up')) {
        house.classList.remove('up');
        fail++;
      }
      if (fail == 5) {
        timeUp = true;
        gameOver();
      }
      if (!timeUp) peep();
    }, time)
  }

  function bonk(e) {
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  ghosts.forEach(ghost => ghost.addEventListener('click', bonk));

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    setTimeout(() => timeUp = true, 50000)
    peep();
   
  }; 


function gameOver () {
  let player = {
    name: playerName,
    result: score
  }
  let newResults = [...results, player].sort((a, b) => {
    return b.result-a.result; 
  }).slice(0, 10);
  localStorage.setItem('results', JSON.stringify(newResults));
gameOff.style.display ="block";
start.style.display = 'none';
showResults(newResults);
}

function showResults(results) {
   results.forEach(result => {
    const element = document.createElement("div");
    element.innerHTML = `${result.name}:  ${result.result}`;
    table.append(element);
  })
}

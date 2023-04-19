/*jshint esversion: 6 */
// Global variables defined to be refered during the code
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const clouds = document.querySelector('.clouds');
const gameItself = document.querySelector('.gameitself');
const startGameButton = document.querySelector('.startButton');
let skin = 'mario'; /* Sets Default skin to Mario **/
let isGameOver; /* Defines isGameOver variable but value will be assigned later */

/* Main Function of the game
Everything is defined inside of it, in order to Function, when called again after an eventual game over,
to restart the game and set all variables according to necessity and avoid having to refresh the screen and losing progress **/

function startGame() {
    isGameOver = 'false'; /* Game starts with a false isGameOver var */
    const playBtn = document.querySelector('.playbtn');
    const gameOver = document.querySelector('.gameover');
    const tryAgain = document.querySelector('.tryagain');
    
    const jump = () => { /* Jump function for animatin character on request */
      mario.classList.add('jump');
      setTimeout(() => {
        mario.classList.remove('jump');
      }, 550);
    };
  
    // Event Listeners adding function jump to clicks and mousedown
    gameBoard.addEventListener('click', jump);
    gameBoard.addEventListener('mousedown', jump);
    document.addEventListener('keydown', jump);
  
    // Defining defaults styles in case startGame gets called again
    gameItself.style.visibility = 'visible';
    playBtn.style.visibility = 'hidden';
    startGameButton.style.visibility = 'hidden';
    pipe.style.visibility = 'visible';
    gameOver.style.visibility = 'hidden';
    tryAgain.style.visibility = 'hidden';
    clouds.style.animation = '';
    pipe.style.left = '';
    pipe.style.right = '';
    mario.style.bottom = '';
    mario.style.marginLeft = '';
    mario.style.marginBottom = '0';
  
    // character source is set according to skin value previously set, in case game is first launched the Mario value is the default
    if (skin === 'mario') {
      mario.src = 'assets/images/mario.webp';
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) { /* Different character width respecting user screen size */
        mario.style.width = '90px';
      } else {
        mario.style.width = '150px';
      }
      mario.style.bottom = '0px';
      pipe.src = 'assets/images/pipe.png';
      if (window.matchMedia("(max-width: 850px)").matches) { /* The same happens with Pipe */
        pipe.style.width = '100px';
      } else {
        pipe.style.width = '170px';
      }
      mario.style.bottom = '-15px';
    } else if (skin === 'pikachu') {
      mario.src = 'assets/images/pikachu.webp';
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '90px';
      } else {
        mario.style.width = '180px';
      }
      mario.style.bottom = '0px';
      pipe.src = 'assets/images/pikachupipe.png';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '140px';
        pipe.style.marginBottom = '-19px';
      } else {
        pipe.style.width = '230px';
      }
  
    } else if (skin === 'sonic') {
      mario.src = 'assets/images/sonic.webp';
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '80px';
      } else {
        mario.style.width = '150px';
      }
      mario.style.bottom = '0px';
      pipe.src = 'assets/images/sonicpipe.png';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '75px';
      } else {
        pipe.style.width = '130px';
      }
      pipe.style.marginBottom = '-30px';
    } else if (skin === 'homer') {
      mario.src = 'assets/images/homer.gif';
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '100px';
      } else {
        mario.style.width = '150px';
      }
      mario.style.bottom = '0px';
      skin = 'homer';
      pipe.src = 'assets/images/homerpipe.webp';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '80px';
      } else {
        pipe.style.width = '130px';
      }
      pipe.style.marginBottom = '-7px';
    } else if (skin === 'mistery') {
      mario.src = 'assets/images/mistery.gif';
      clouds.src = 'assets/images/misterycloud.png';
      gameBoard.style.backgroundImage = 'url(assets/images/misterybg.png)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '100px';
        mario.style.marginBottom = '-5px';
      } else {
        mario.style.width = '150px';
        mario.style.marginBottom = '-10px';
      }
      mario.style.bottom = '0px';
      pipe.src = 'assets/images/misterypipe.png';
      clouds.src = 'assets/images/misterycloud.png';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '60px';
      } else {
        pipe.style.width = '90px';
      }
    }
    mario.style.animation = '';
    pipe.style.animation = 'pipe-animation 1.7s infinite linear';
  
  
  
  
    // Score Loop, adds 15 every 500ms in order to count users score accordingly to time playing without losing
    let scoreLoop = setInterval(() => {
      const scoreSpan = document.querySelector('.score');
      const currentScore = parseInt(scoreSpan.textContent);
      const newScore = currentScore + 15;
      scoreSpan.textContent = newScore.toString();
    }, 500);
    // Coins Loop, adds 3 coins every 800ms and does not reset in case players loses the game
    let coinsLoop = setInterval(() => {
      const coinsSpan = document.querySelector('.coins');
      const currentCoins = parseInt(coinsSpan.textContent);
      const newCoins = currentCoins + 3333; // Value temporarily set to 3333 for testing purposes, REMOVE LATER
      coinsSpan.textContent = newCoins.toString();
    }, 800);

    // Const loop is where the loop of the game happens
    const loop = setInterval(() => {
  
      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
      const cloudPosition = +window.getComputedStyle(clouds).right.replace('px', '');
         
    //   In case pipe position is the same where mario is, in other words, if mario gets hit, the loops stops and the game is over
      if (window.matchMedia("(min-width: 1000px)").matches) { // Different pipe positions for different screen sizes using media query
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
          pipe.style.animation = 'none';
          pipe.style.left = `${pipePosition}px`;
          mario.style.animation = 'none';
          mario.style.bottom = `${marioPosition}px`;
          clouds.style.animation = 'none';
          clouds.style.right = `${cloudPosition}px`;
          if (skin === 'mario') { // Character gets different source when game is over, respecting skin
            mario.src = 'assets/images/gameover.png';
            mario.style.width = '75px';
            mario.style.bottom = `${marioPosition}px`;
            mario.style.marginLeft = '60px';
            mario.style.marginBottom = '0px';
          } else if (skin === 'pikachu') {
            mario.src = 'assets/images/pikaover.png';
            mario.style.width = '150px';
            mario.style.marginLeft = '50px';
            mario.style.bottom = `${marioPosition}px`;
          } else if (skin === 'sonic') {
            mario.src = 'assets/images/sonicover.png';
            mario.style.marginLeft = '50px';
          } else if (skin === 'homer') {
            mario.src = 'assets/images/homerover.png';
            mario.style.marginLeft = '50px';
          } else if (skin === 'mistery') {
            mario.src = 'assets/images/misteryover.png';
            mario.style.marginLeft = '50px';
  
          }
          isGameOver = 'yes';
          gameOver.style.visibility = 'visible';
          tryAgain.style.visibility = 'visible';
          const scoreSpan = document.querySelector('.score');
          const currentScore = parseInt(scoreSpan.textContent);
          const bestScore = currentScore;
          const bestScoreSpan = document.querySelector('.bestScore');
          if (bestScoreSpan.textContent < currentScore) { // in case current score is greater than best score, the new score is moved to bestScoreSpan to be displayed in the page
            bestScoreSpan.textContent = bestScore.toString();
          }
          // intervals are cleared in order of loops to stop
          clearInterval(loop);
          clearInterval(scoreLoop);
          clearInterval(coinsLoop);
          scoreSpan.textContent = '0'; // Score gets reset to 0 when game is over
          if (isGameOver == 'yes'){ // Checks if game is over, and adds a event listener, shortcut for pressing Try Again button, when pressing any key
            document.addEventListener('keydown', startGame);
          }
        }
      } else {
        // Smaller screen conditions
        if (pipePosition <= 50 && pipePosition > 0 && marioPosition < 40) {
          pipe.style.animation = 'none';
          pipe.style.left = `${pipePosition}px`;
          mario.style.animation = 'none';
          mario.style.bottom = `${marioPosition}px`;
          clouds.style.animation = 'none';
          clouds.style.right = `${cloudPosition}px`;
          if (skin === 'mario') {
            mario.src = 'assets/images/gameover.png';
            mario.style.width = '45px';
            mario.style.marginLeft = '20px';
            mario.style.bottom = `${marioPosition + 10}px`;
          } else if (skin === 'pikachu') {
            mario.src = 'assets/images/pikaover.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '10px';
            mario.style.bottom = `${marioPosition}px`;
          } else if (skin === 'sonic') {
            mario.src = 'assets/images/sonicover.png';
          } else if (skin === 'homer') {
            mario.src = 'assets/images/homerover.png';
          } else if (skin === 'mistery') {
            mario.src = 'assets/images/misteryover.png';
  
          }
          isGameOver = 'true';
          gameOver.style.visibility = 'visible';
          tryAgain.style.visibility = 'visible';
          const scoreSpan = document.querySelector('.score');
          const currentScore = parseInt(scoreSpan.textContent);
          const bestScore = currentScore;
          const bestScoreSpan = document.querySelector('.bestScore');
          if (bestScoreSpan.textContent < currentScore) {
            bestScoreSpan.textContent = bestScore.toString();
          }
          clearInterval(loop);
          clearInterval(scoreLoop);
          clearInterval(coinsLoop);
          scoreSpan.textContent = '0';
        }
      }
    }, 10);
  }
    // Functions for setting new character Skins
  function skinMario() {
    const coinsSpan = document.querySelector('.coins');
    const currentCoins = parseInt(coinsSpan.textContent);
    const newCoins = currentCoins - 0;
    if (currentCoins >= 0) { //Checks if current coins is enough for skin to be bought
      if (isGameOver == 'false') { mario.src = 'assets/images/mario.webp'; } else { mario.src = 'assets/images/gameover.png'; } // Checks if the game is over in order to decide what source to apply
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) { // checks screen size in order to apply correct width accordingly
        if (isGameOver == 'false') {
          mario.style.width = '90px';
        } else {
          mario.style.width = '45px';
        }
      } else {
        if (isGameOver == 'false') {
          mario.style.width = '150px';
        } else {
          mario.style.width = '75px';
        }
        
      }
      coinsSpan.textContent = newCoins.toString();
      skin = 'mario';
      pipe.src = 'assets/images/pipe.png';
      if (window.matchMedia("(max-width: 850px)").matches) { //same happens with pipe
        pipe.style.width = '100px';
      } else {
        pipe.style.width = '170px';
      }
      pipe.style.marginBottom = '0px';
    }
  }
  
  function skinSonic() {
    const coinsSpan = document.querySelector('.coins');
    const currentCoins = parseInt(coinsSpan.textContent);
    const newCoins = currentCoins - 80;
    if (currentCoins >= 80) {
      if (isGameOver == 'false') {
        mario.src = 'assets/images/sonic.webp';
      } else {
        mario.src = 'assets/images/sonicover.png';
      }
  
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '80px';
      } else {
        mario.style.width = '150px';
      }
      coinsSpan.textContent = newCoins.toString();
      skin = 'sonic';
      pipe.src = 'assets/images/sonicpipe.png';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '75px';
      } else {
        pipe.style.width = '130px';
      }
      pipe.style.marginBottom = '-30px';
    } else { // In case current coins < needed coins to buy, notEnough paragraph is displayed for 3000 seconds with how many coins the user is short for buying the wanted skin
      const notEnough = document.querySelector('.notEnough');
      notEnough.style.visibility = 'visible';
      const coinsNeededSpan = document.querySelector('.coinsNeeded');
      const shortCoins = 80 - currentCoins;
      coinsNeededSpan.textContent = shortCoins.toString();
      setTimeout(() => {
        notEnough.style.visibility = 'hidden';
      }, 3000);
    }
  }
  
  function skinHomer() {
    const coinsSpan = document.querySelector('.coins');
    const currentCoins = parseInt(coinsSpan.textContent);
    const newCoins = currentCoins - 150;
    if (currentCoins >= 150) {
      if (isGameOver == 'false') {
        mario.src = 'assets/images/homer.gif';
      } else {
        mario.src = 'assets/images/homerover.png';
      }
  
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '100px';
      } else {
        mario.style.width = '150px';
      }
      coinsSpan.textContent = newCoins.toString();
      skin = 'homer';
      pipe.src = 'assets/images/homerpipe.webp';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '80px';
      } else {
        pipe.style.width = '130px';
      }
      pipe.style.marginBottom = '-7px';
    } else {
      const notEnough = document.querySelector('.notEnough');
      notEnough.style.visibility = 'visible';
      const coinsNeededSpan = document.querySelector('.coinsNeeded');
      const shortCoins = 150 - currentCoins;
      coinsNeededSpan.textContent = shortCoins.toString();
      setTimeout(() => {
        notEnough.style.visibility = 'hidden';
      }, 3000);
    }
  }
  
  function skinPika() {
    const coinsSpan = document.querySelector('.coins');
    const currentCoins = parseInt(coinsSpan.textContent);
    const newCoins = currentCoins - 50;
    if (currentCoins >= 50) {
      if (isGameOver == 'false') {
        mario.src = 'assets/images/pikachu.webp';
      } else {
        mario.src = 'assets/images/pikaover.png';
      }
  
      clouds.src = 'assets/images/clouds.png';
      gameBoard.style.backgroundImage = 'linear-gradient(#87CEEB, #E0F6FF)';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '75px';
      } else {
        mario.style.width = '150px';
      }
      coinsSpan.textContent = newCoins.toString();
      skin = 'pikachu';
      pipe.src = 'assets/images/pikachupipe.png';
      mario.style.marginBottom = '0px';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '140px';
        pipe.style.marginBottom = '-19px';
      } else {
        pipe.style.width = '230px';
        pipe.style.marginBottom = '-30px';
      }
  
    } else {
      const notEnough = document.querySelector('.notEnough');
      notEnough.style.visibility = 'visible';
      const coinsNeededSpan = document.querySelector('.coinsNeeded');
      const shortCoins = 50 - currentCoins;
      coinsNeededSpan.textContent = shortCoins.toString();
      setTimeout(() => {
        notEnough.style.visibility = 'hidden';
      }, 3000);
    }
  }
  
  function skinMistery() {
    const coinsSpan = document.querySelector('.coins');
    const currentCoins = parseInt(coinsSpan.textContent);
    const newCoins = currentCoins - 999;
    if (currentCoins >= 999) {
      if (isGameOver == 'false') {
        mario.src = 'assets/images/mistery.gif';
      } else {
        mario.src = 'assets/images/misteryover.png';
      }
  
      gameBoard.style.background = 'url(assets/images/misterybg.png) center center';
      gameBoard.style.backgroundSize = 'contain';
      if (window.matchMedia("(max-width: 850px)").matches) {
        mario.style.width = '100px';
        mario.style.marginBottom = '-5px';
      } else {
        mario.style.width = '150px';
        mario.style.marginBottom = '-10px';
      }
      coinsSpan.textContent = newCoins.toString();
      skin = 'mistery';
      pipe.src = 'assets/images/misterypipe.png';
      pipe.style.marginBottom = '-10px';
      clouds.src = 'assets/images/misterycloud.png';
      if (window.matchMedia("(max-width: 850px)").matches) {
        pipe.style.width = '60px';
      } else {
        pipe.style.width = '90px';
      }
  
    } else {
      const notEnough = document.querySelector('.notEnough');
      notEnough.style.visibility = 'visible';
      const coinsNeededSpan = document.querySelector('.coinsNeeded');
      const shortCoins = 999 - currentCoins;
      coinsNeededSpan.textContent = shortCoins.toString();
      setTimeout(() => {
        notEnough.style.visibility = 'hidden';
      }, 3000);
    }
  }

const cartas  =document.querySelectorAll('.cartas');
const cartaFrentes  =document.querySelectorAll('.carta-frente');
//console.log(cartaFrente[0].src);
let hasFlippedCard = false;
let firstCard, secondCard, lockBoard;

    // Replace ./data.json with your JSON feed
    fetch('https://rickandmortyapi.com/api/character/')
    .then(response => {
        return response.json();
    })
    .then(data => {
        // Work with JSON data here 
        let imgSrc = data.results;
    })
    .catch(err => {
        // Do something for an error here
        console.log('hubo un error' , err);
    })

    //********************************************************************************/
    function flipCard(){
        if(lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard){
            //first click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
            //second click
            hasFlippedCard =false;
            secondCard = this;
            checkForMatch();
        
    }

    function checkForMatch(){
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
            isMatch ? disableCard() : unFlipcards();
    }

    function disableCard(){
        //it's a match!!!
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }
    function unFlipcards(){
        lockBoard = true;
        //not a match
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard(){
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null]
    }
    (function shuffle()  {
        cartas.forEach(carta => {
            let randomPos = Math.floor(Math.random() * 12);
            carta.style.order = randomPos;
        });
    })();

cartas.forEach(carta => carta.addEventListener('click', flipCard));

const section = document.querySelector('section');
const  playerLivesCount = document.querySelector('.lives');
let timerClock = document.querySelector('.timer');
let playerLives = 6;
let TIMER_START = 60;
let countDown;

const getCards = () => [
        // 16 objects
        {src:'./assets/icons8-futurama-bender.svg', name:'futurama'},
        {src:'./assets/icons8-futurama-bender.svg', name:'futurama'},
        {src:'./assets/icons8-homer-simpson-160.svg', name:'homer'},
        {src:'./assets/icons8-homer-simpson-160.svg', name:'homer'},
        {src:'./assets/icons8-jake-160.svg', name:'jake'},
        {src:'./assets/icons8-jake-160.svg', name:'jake'},
        {src:'./assets/icons8-scream-160.svg', name:'ghostface'},
        {src:'./assets/icons8-scream-160.svg', name:'ghostface'},
        {src:'./assets/icons8-spider-man-head-160.svg', name:'spiderman'},
        {src:'./assets/icons8-spider-man-head-160.svg', name:'spiderman'},
        {src:'./assets/icons8-super-mario-160.svg',name:'mario'},
        {src:'./assets/icons8-super-mario-160.svg',name:'mario'},
        {src:'./assets/icons8-walter-white.svg',name:'walter-white'},
        {src:'./assets/icons8-walter-white.svg',name:'walter-white'},
        {src:'./assets/icons8-popeye-160.svg', name:'popeye'},
        {src:'./assets/icons8-popeye-160.svg', name:'popeye'}
    ]

const randomize = () => {
    const cardData = getCards();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

const cardGenetor = () => {
    const cardData = randomize();

    cardData.forEach((item,index) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('back');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.src = item.src;
        card.setAttribute('name',item.name);

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click',(e)=>{
            card.classList.toggle('rotate-card');
            checkCard(e);
        })
    }) 
}

const checkCard = (e) => {
    const clickedCard = e.target;

    console.log(clickedCard)
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped'); 
    if (flippedCards.length === 2){
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log('match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        }
        else{
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('rotate-card'),1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0){
                alert('You lost all lives!');
                clearInterval(countDown);
                timer(TIMER_START);
                restart();
            }
            if (playerLives <= 3){
                document.querySelector('.lives').style.color = 'red';
            }
        }
    if (document.querySelectorAll('.rotate-card').length === 16){
        alert('You won!')
        restart();
    }
};
}

// timer
function timer(seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    console.log({now,then});
    displayTime(seconds);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countDown);
            alert('Times up buddy! Better luck next time.')
            restart();
            timer(TIMER_START);
            return;
        }
        if(secondsLeft < 30) document.querySelector('.timer').style.color = 'orange';
        if(secondsLeft < 15) document.querySelector('.timer').style.color = 'red';
        displayTime(secondsLeft);
    },1000);
}

function displayTime(seconds){
    console.log(seconds);
    document.querySelector('.timer').innerText = seconds;
}

const restart = () => {
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    document.querySelector('.lives').style.color = '#5F7161';
    document.querySelector('.timer').style.color = '#5F7161';
    let cardData = randomize();
    let face = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        setTimeout(()=>{
            cards[index].classList.remove('rotate-card');
            face[index].src = item.src;
            cards[index].setAttribute('name',item.name);
            cards[index].style.pointerEvents = 'all';
            section.style.pointerEvents = 'all';
        },1000);
    })
};


cardGenetor();
timer(TIMER_START);
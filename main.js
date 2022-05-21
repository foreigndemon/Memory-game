const section = document.querySelector('section')

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
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('back');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        face.src = item.src;

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click',(e)=>{
            card.classList.toggle('rotateCard');
            checkCard(e);
        })
    })
}

const checkCard = (e) => {
    const clickedCard = e.target;
    console.log(clickedCard);
}






cardGenetor();



// rock paper scissors game
let buttonRetry = false;            //for state control

function rpsPlayGame(playerChoice) {
    let userChoice, botChoice, results, resultsMessage;
    
    userChoice = playerChoice.id

    botChoice  = randomImageChoice();

    results = decideGameWinner(userChoice, botChoice);

    resultsMessage = generateResultMessage(results);

    makeFrontEndChanges(userChoice, resultsMessage, botChoice);
    buttonRetry = true;
}

//generate a random image choice for the bot
function randomImageChoice() {
    let gameChoices = ['rock', 'paper', 'scissors'];
    
    randomChoice = gameChoices[Math.floor(Math.random() * 3)];

    return randomChoice;
};

//should return an array
function decideGameWinner(user, computer) {
    let userScore, computerScore;
    //database created on basis of what user scores when he picks what choice
    let rpsGameLogicDatabase = {        
        "rock": {"rock" : 0.5, "paper" : 0, "scissors" : 1},
        "paper": {"rock" : 1, "paper" : 0.5, "scissors" : 0},
        "scissors": {"rock" : 0, "paper" : 1, "scissors" : 0.5},
    };

    userScore = rpsGameLogicDatabase[user][computer];
    computerScore = rpsGameLogicDatabase[computer][user];

    return [userScore, computerScore];         

}


function generateResultMessage(resultsArray) {
    let messageObject;          //contains the color attribute for the css styling in the frontend function

    if (resultsArray[0] === 1) {
        messageObject = {"message" : "You won!", "messageColor" : "green"}
    } else if (resultsArray[0] === 0.5) {
        messageObject = {"message" : "You drew", "messageColor" : "yellow"}
    } else {
        messageObject = {"message" : "You Lost!", "messageColor" : "red"}
    }

    return messageObject;
}

function makeFrontEndChanges(userImageChoice, resultsMessageObject, computerImageChoice) {
    //store the sources of the images 
    let rpsGameSrcs = {
        "rock" : document.getElementById('rock').src, 
        "paper" : document.getElementById('paper').src, 
        "scissors" : document.getElementById('scissors').src, 
    }
    //remove all image-divs
    let allElementsInDiv = document.querySelectorAll('#image-element');

    //loop through the all-image-divs array while removing each item
    for (let i=0; i < allElementsInDiv.length; i++) {
        allElementsInDiv[i].remove();
    }
    
    //grab that div so as to add images
    let rpsDiv = document.querySelector('.rps-images-div')

    //add userImageChoice, resultsMessage, botImageChoice
    //first step - create image div elements and the results message h1 element
    let userImageDiv = document.createElement('div');
    userImageDiv.setAttribute('id', 'image-element');       

    let computerImageDiv = document.createElement('div');
    computerImageDiv.setAttribute('id', 'image-element');

    let resultsMessageDiv = document.createElement('div');  //no need to put the h1 in a div
    resultsMessageDiv.setAttribute('id', 'image-element');

    userImageDiv.innerHTML = `<img src="${rpsGameSrcs[userImageChoice]}" height=180 width=180 style='padding: 10px; box-shadow: 0px 10px 50px blue;' alt=${userImageChoice}>'`
    computerImageDiv.innerHTML = `<img src="${rpsGameSrcs[computerImageChoice]}" height=180 width=180 style='padding: 10px; box-shadow: 0px 10px 50px red;' alt=${computerImageChoice}>'`

    //the h1 needs to have a similar id to the divs for the rpsPLayAgain function
    resultsMessageDiv.innerHTML = `<h1 style='color: ${resultsMessageObject['messageColor']}' style='font-size: 55px'>${resultsMessageObject['message']}</h1>`;

    rpsDiv.appendChild(userImageDiv);
    rpsDiv.appendChild(resultsMessageDiv);
    rpsDiv.appendChild(computerImageDiv);

}

//a function for the retry button --- to get things back to the original state
document.getElementById('play-again').addEventListener('click', rpsPlayAgain);

function rpsPlayAgain() {

    if (buttonRetry) {
        //first grab them into an array
        let rpsDivElements = document.querySelectorAll('#image-element');

        //loop through while removing those elements
        for (let i=0; i < rpsDivElements.length; i++) {
            rpsDivElements[i].remove();
        }

        let rpsImageDiv = document.getElementById('rps-images-div');

        let rockImageDiv, paperImageDiv, scissorsImageDiv;

        //recreate divs and assign them the same id as before
        rockImageDiv = document.createElement('div');
        rockImageDiv.setAttribute('id', 'image-element');

        paperImageDiv = document.createElement('div');
        paperImageDiv.setAttribute('id', 'image-element');

        scissorsImageDiv = document.createElement('div');
        scissorsImageDiv.setAttribute('id', 'image-element');

        //edit the innerHTML to include the images and the style
        rockImageDiv.innerHTML = "<img id='rock' src='./images/rock.jpg' height=180 width=180 onclick='rpsPlayGame(this)' alt='rock'>";
        paperImageDiv.innerHTML = "<img id='paper' src='./images/paper.jpg' height=180 width=180 onclick='rpsPlayGame(this)' alt='paper'>";
        scissorsImageDiv.innerHTML = "<img id='scissors' src='./images/scissors.jpg' height=180 width=180 onclick='rpsPlayGame(this)' alt='scissors'>";

        rpsImageDiv.appendChild(rockImageDiv);
        rpsImageDiv.appendChild(paperImageDiv);
        rpsImageDiv.appendChild(scissorsImageDiv);
    }
}

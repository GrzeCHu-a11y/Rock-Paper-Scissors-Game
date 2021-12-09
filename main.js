class UI {
    constructor() {
        this.items = [...document.querySelectorAll('.items__item')];
        this.buttons = [...document.querySelectorAll('.button')];
        this.gameResultH2 = document.getElementById('game-result-h2');
        this.chosenItemH2 = document.querySelector('.chosen-item-h1');
        this.gameResultSign = document.querySelector('#game-result-sign');
    }
}

class GAME{
    constructor(playerSelectedItem, aiSelectedItem, status) {
        this.aiItems = ["paper", "rock", "scissors"]

        this.aiSelectedItem = aiSelectedItem;
        this.playerSelectedItem = playerSelectedItem;

        this.playerSelectedItemHistoryArray = [];
        this.playerGameResultHistoryArray = [];

        this.aiSelectedItemHistoryArray = [];
        this.aiGameResultHistoryArray = [];

        this.status = status;

        this.setEventListeners()
    }

    setEventListeners() {
        ui.items.forEach(function (item) {
            item.addEventListener('click', function (e) {
                    
                    if(this.selectedItem != "") {
                        const selectedIteM = e.target.id;
                        game.playerSelectedItem = selectedIteM;

                        ui.chosenItemH2.textContent = `You chose: ${selectedIteM}`;
                        document.getElementById('start-button').style.backgroundColor = "red";
                    }
                }) 
            }) 
            
            ui.buttons.forEach(function(button) {
                button.addEventListener('click', function (e) {
                    if(e.target.id === "start-button") {
                        game.startGame()
                    }

                    if(e.target.id === "restart-button") {
                        game.restartGame()
                    }
                })
            })
    }

    startGame = () => {
        if(this.playerSelectedItem != undefined) {
            this.computerChoice()
        } else {
            render.createPopup();
        }  
    }

    computerChoice = () => {
        const index = Math.floor(Math.random() * this.aiItems.length);
        this.aiSelectedItem = this.aiItems[index];
        this.gameResults()
    }

    gameResults = () => {
        if(this.playerSelectedItem === this.aiSelectedItem ) {

            this.playerGameResultHistoryArray.push("given" + "");
            this.aiGameResultHistoryArray.push("given" + "");

            this.status = "given";

        } else if ((this.playerSelectedItem === "paper" && this.aiSelectedItem === "rock") || 
        (this.playerSelectedItem === "rock" && this.aiSelectedItem === "scissors") || 
        (this.playerSelectedItem === "scissors" && this.aiSelectedItem === "paper")) {

            this.playerGameResultHistoryArray.push("win" + "");
            this.aiGameResultHistoryArray.push("lose" + "");

            this.status = "win";

        } else {

            this.playerGameResultHistoryArray.push("lose" + "");
            this.aiGameResultHistoryArray.push("win" + "");

            this.status = "lose";
        }

        this.playerSelectedItemHistoryArray.push(this.playerSelectedItem);
        this.aiSelectedItemHistoryArray.push(this.aiSelectedItem);

        render.renderDivs()
        render.winOrLoseSign()
    }
    
    restartGame = () => {
        ui.chosenItemH2.textContent = "choose: paper, rock or scissors";

        this.playerSelectedItem = undefined;
        this.aiSelectedItem = undefined;

        this.playerGameResultHistoryArray = [];
        this.aiGameResultHistoryArray = [];

        this.playerSelectedItemHistoryArray = [];
        this.aiSelectedItemHistoryArray = [];

        this.status = "";

        while(render.divsArray.length > 0) {
            render.gamesHistoryDiv.removeChild(render.gamesHistoryDiv.childNodes[0])
            render.divsArray.pop(-1)
        }      
    }
}

class RENDER {
    constructor(currentGameDivHistory) {
        this.gamesHistoryDiv = document.querySelector('.games-history');
        this.currentGameDivHistory = currentGameDivHistory;
        this.divsArray = [];
    }

    renderDivs = () => {
        this.currentGameDivHistory = document.createElement("div");
        this.currentGameDivHistory.style.width = "100%";
        this.currentGameDivHistory.style.height = "10%";
        this.currentGameDivHistory.style.background = "red";
        this.currentGameDivHistory.style.fontSize = "15px"
        this.currentGameDivHistory.style.color = "white";
        this.currentGameDivHistory.innerHTML = `Computer chose: ${game.aiSelectedItem} You chose: ${game.playerSelectedItem}`;

        this.divsArray.push(this.currentGameDivHistory);

        const lastItem = this.divsArray[this.divsArray.length - 1];
        this.gamesHistoryDiv.appendChild(lastItem);

        if(this.divsArray.length === 11) {
            this.clerDivs()
        } 
    }

    clerDivs = () => {
        this.gamesHistoryDiv.removeChild(this.gamesHistoryDiv.childNodes[0]);
        this.divsArray.pop();
    }

    winOrLoseSign = () => {

        if(game.status == "win") {
           ui.gameResultSign.style.color = "green";
           ui.gameResultSign.textContent = "<";
        } else if(game.status == "lose") {
            ui.gameResultSign.style.color = "red"; 
            ui.gameResultSign.textContent = ">";
        } else if(game.status == "given") {
            ui.gameResultSign.style.color = "white"; 
            ui.gameResultSign.textContent = "=";
        }  
    }

    createPopup = () => {
        const modal = document.querySelector(".modal");
        const closeButton = document.querySelector(".close-button");

        showPopup()
    
        function showPopup() {
            modal.classList.add("show-modal");
        }

        function closePopup() {
            modal.classList.remove("show-modal")
        }
    
        function windowOnClick(event) {
            if (event.target === modal) {
                closePopup()
            }
        }

        closeButton.addEventListener("click", closePopup);
        window.addEventListener("click", windowOnClick);
    } 
}
const ui = new UI();
const game = new GAME();
const render = new RENDER();
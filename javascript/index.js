const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");

const btnContainer = document.querySelector(".button-container")
const resetBtn = document.createElement("button");



const total = document.querySelector(".total > p");     // numbers of total calls
const previous = document.querySelector(".previous > p");    // variable for previous calls
const currentResult = document.querySelector(".current > p");   // variable for curent calls


const bingoLetters = ["B", "I", "N", "G", "O"];
const range = [
    { start: 1 , end: 15},
    { start: 16 , end: 30},
    { start: 31 , end: 45},
    { start: 46 , end: 60},
    { start: 61 , end: 75},
];

for (let i = 0; i < 5; i++) {           // create the BINGO caller (1-75)
    const mainContent = document.createElement("div");
    mainContent.className = "main-content"

    const box = document.createElement("div");
    box.className = "box letter";
    
    const letter = document.createElement("p");
    letter.textContent = bingoLetters[i];

    box.appendChild(letter);
    mainContent.appendChild(box)

    for (let j = range[i].start; j <= range[i].end; j++) {      // create the numbers by range B,I,N,G,O
        const box = document.createElement("div");
        box.className = "box number";
        box.id = `${j}`

        const number = document.createElement("p");
        number.textContent = `${j}`;

        box.appendChild(number);
        mainContent.appendChild(box)
    }

    mainContainer.appendChild(mainContent);
}

let numberHistory = [];     // will hold the number value (1-75)

let totalValue = 0;


const button = document.getElementById("next");     // button that leads in generating the calls

btnContainer.appendChild(button);

button.addEventListener("click", ()=> {
    const boxContainer = document.createElement("div");
    boxContainer.className = "box-container";
    boxContainer.id = "box-container";

    // Check if dark mode is already active when creating the boxContainer
    if (body.classList.contains("darkmode")) {
        boxContainer.classList.add("darkmode");
    } else {
        boxContainer.classList.add("lightmode");
    }

    const wheelContainer = document.createElement("div");       // holds the call's letter and number ex: B 7
    wheelContainer.className = "wheel-container"

    const wheelContainerLetter = document.createElement("p");   // B,I,N,G,O (in wheel)
    wheelContainerLetter.className = "wheel-letter"
    wheelContainerLetter.textContent = ""

    const wheelContainerNumber = document.createElement("p");   // 1-75 (in wheel)
    wheelContainerNumber.className = "wheel-number"
    wheelContainerNumber.textContent = "?"

    wheelContainer.appendChild(wheelContainerLetter);
    wheelContainer.appendChild(wheelContainerNumber);



    const rotateBtn = document.createElement("button");     // button for: rotate & close function
    rotateBtn.textContent = "spin";
    rotateBtn.className = "rotate-btn";

    rotateBtn.addEventListener("click", ()=> {
        if (rotateBtn.textContent === "spin") {     // Rotate the wheel(animation): display the calls(letter and number)
            wheelContainer.classList.add("spin");
            wheelContainerNumber.classList.add("spin");
            rotateBtn.textContent = "close";


            let randomNumber;    // generate number from 1 to 75, then making sure that the number will not repeat
            do {
                randomNumber = Math.floor(Math.random() * 75) + 1;
            } while (numberHistory.includes(randomNumber));

            numberHistory.push(randomNumber);

            if (randomNumber <= 15) {
                wheelContainerLetter.textContent = "B";
                wheelContainerNumber.textContent =  randomNumber;
                currentResult.textContent = "B" + " " + randomNumber;
            } else if (randomNumber > 15 && randomNumber <= 30) {
                wheelContainerLetter.textContent = "I";
                wheelContainerNumber.textContent =  randomNumber;
                currentResult.textContent = "I" + " " + randomNumber;
            }else if (randomNumber > 30 && randomNumber <= 45) {
                wheelContainerLetter.textContent = "N";
                wheelContainerNumber.textContent = randomNumber;
                currentResult.textContent = "N" + " " + randomNumber;
            } else if (randomNumber > 45 && randomNumber <= 60) {
                wheelContainerLetter.textContent = "G";
                wheelContainerNumber.textContent =  randomNumber;
                currentResult.textContent = "G" + " " + randomNumber;
            } else if (randomNumber > 60 && randomNumber <= 75) {
                wheelContainerLetter.textContent = "O";
                wheelContainerNumber.textContent = randomNumber;
                currentResult.textContent = "O" + " " + randomNumber;
            }

            let boxId = document.getElementById(`${randomNumber}`);
            boxId.classList.add("chosen");
            
        } else {
            rotateBtn.textContent = "spin";
            wheelContainerLetter.textContent = "";
            wheelContainerNumber.textContent = "?";

            totalValue++;
            total.textContent = totalValue;
            const previouscall = numberHistory[numberHistory.length - 2];
            if (numberHistory.length > 1) {
                if (previouscall <= 15) {
                    previous.textContent = "B" + " " + previouscall;
                } else if (previouscall > 15 && previouscall <= 30) {
                    previous.textContent = "I" + " " + previouscall;
                } else if (previouscall > 30 && previouscall <= 45) {
                    previous.textContent = "N" + " " + previouscall;
                } else if (previouscall > 45 && previouscall <= 60) {
                    previous.textContent = "G" + " " + previouscall;
                } else if (previouscall > 60 && previouscall <= 75) {
                    previous.textContent = "O" + " " + previouscall;
                }
            }

            
            body.removeChild(boxContainer);
            console.log(totalValue)
        }
        
        
    });
     
    

    boxContainer.appendChild(wheelContainer);
    boxContainer.appendChild(rotateBtn);
    body.appendChild(boxContainer);


    resetBtn.textContent = "reset number"
    resetBtn.id = "reset";
    resetBtn.className = "constant"
    btnContainer.appendChild(resetBtn);

    // Remove the button if totalValue reaches or exceeds 5
    if (totalValue == 74) {
        btnContainer.removeChild(button); // Remove the button
    }
});


// To Clear the shown numbers including the Calls
resetBtn.addEventListener("click", ()=> {
    confirm("Current progress will reset! Are you sure you want to reset?")
    if (confirm) {
        let boxId = document.querySelectorAll(".box");
        boxId.forEach(element => {
            element.classList.remove("chosen")
        });
        
        previous.textContent = "";
        total.textContent = "";
        currentResult.textContent = "";
        totalValue = 0;
        
        btnContainer.removeChild(resetBtn);
        btnContainer.appendChild(button);
    }
    
})


//Dark Mode
// Dark Mode toggle
const darkModeBtn = document.querySelector(".dark-mode");
const mainContent = document.querySelectorAll(".main-content");
const callsContainer = document.querySelectorAll(".content");
const resultContainer = document.querySelector(".result-container");
const buttonContainer = document.querySelectorAll(".content > button");
const link = document.querySelector("nav > a");
const footerContainer = document.querySelector("footer");

darkModeBtn.addEventListener("click", () => {
    if (body.classList.contains("lightmode")) {
        body.classList.remove("lightmode");
        body.classList.add("darkmode");

        mainContainer.classList.remove("lightmode");
        mainContainer.classList.add("darkmode");

        mainContent.forEach((element) => {
            element.classList.remove("lightmode");
            element.classList.add("darkmode");
        });

        callsContainer.forEach((element) => {
            element.classList.remove("lightmode");
            element.classList.add("darkmode");
        });

        resultContainer.classList.remove("lightmode");
        resultContainer.classList.add("darkmode");

        buttonContainer.forEach((element) => {
            element.classList.remove("btnlightmode");
            element.classList.add("btndarkmode");
        });

        link.classList.remove("lightmode");
        link.classList.add("darkmode");

        darkModeBtn.classList.remove("lightmode");
        darkModeBtn.classList.add("darkmode");

        footerContainer.classList.remove("lightmode");
        footerContainer.classList.add("darkmode");

        // Handle dynamic boxContainer
        const dynamicBoxContainer = document.getElementById("box-container");
        if (dynamicBoxContainer) {
            dynamicBoxContainer.classList.remove("lightmode");
            dynamicBoxContainer.classList.add("darkmode");
        }
    } else {
        body.classList.add("lightmode");
        body.classList.remove("darkmode");

        mainContainer.classList.add("lightmode");
        mainContainer.classList.remove("darkmode");

        mainContent.forEach((element) => {
            element.classList.add("lightmode");
            element.classList.remove("darkmode");
        });

        callsContainer.forEach((element) => {
            element.classList.add("lightmode");
            element.classList.remove("darkmode");
        });

        resultContainer.classList.add("lightmode");
        resultContainer.classList.remove("darkmode");

        buttonContainer.forEach((element) => {
            element.classList.add("btnlightmode");
            element.classList.remove("btndarkmode");
        });

        link.classList.add("lightmode");
        link.classList.remove("darkmode");

        darkModeBtn.classList.add("lightmode");
        darkModeBtn.classList.remove("darkmode");

        footerContainer.classList.add("lightmode");
        footerContainer.classList.remove("darkmode");

        // Handle dynamic boxContainer
        const dynamicBoxContainer = document.getElementById("box-container");
        if (dynamicBoxContainer) {
            dynamicBoxContainer.classList.add("lightmode");
            dynamicBoxContainer.classList.remove("darkmode");
        }
    }
});

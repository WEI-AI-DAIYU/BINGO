    /* Main Code
const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");

const bingoLetters = ["B", "I", "N", "G", "O"];

for (let i = 0; i < 5; i++) {
    const subContent = document.createElement("div");
    subContent.className = `sub-content ${bingoLetters[i]}`;
    let box = document.createElement("div");
    box.className = "box";
    const para = document.createElement("p")
    para.textContent = bingoLetters[i];

    box.appendChild(para);
    subContent.appendChild(box);
    mainContainer.appendChild(subContent);
  
}

for (let b = 1; b <= 15; b++) {  //create numbers in B (1 - 15)
    let box = document.createElement("div");
    box.className = "box";
    const container = document.querySelector(".B")
    const para2 = document.createElement("p");
    para2.textContent = `${b}`;
    
    box.appendChild(para2)
    container.appendChild(box)
}
for (let i = 16; i <= 30; i++) {  //create numbers in I (16 - 30)
    let box = document.createElement("div");
    box.className = "box";
    box.id = `${i}`;
    const container = document.querySelector(".I")
    const para2 = document.createElement("p");
    para2.textContent = `${i}`;
    
    box.appendChild(para2)
    container.appendChild(box)
}
for (let n = 31; n <= 45; n++) {  //create numbers in N (31 - 45)
    let box = document.createElement("div");
    box.className = "box";
    box.id = `${n}`;
    const container = document.querySelector(".N")
    const para2 = document.createElement("p");
    para2.textContent = `${n}`;
    
    box.appendChild(para2)
    container.appendChild(box)
}
for (let g = 46; g <= 60; g++) {  //create numbers in G (46 - 60)
    let box = document.createElement("div");
    box.className = "box";
    box.id = `${g}`;
    const container = document.querySelector(".G")
    const para2 = document.createElement("p");
    para2.textContent = `${g}`;
    
    box.appendChild(para2)
    container.appendChild(box)
}for (let o = 61; o <= 75; o++) {  //create numbers in O (61 - 75)
    let box = document.createElement("div");
    box.className = "box";
    box.classId = `${o}`;
    const container = document.querySelector(".O")
    const para2 = document.createElement("p");
    para2.textContent = `${o}`;
    
    box.appendChild(para2)
    container.appendChild(box)
}
    */

const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");

const btnContainer = document.querySelector(".button-container")
const resetBtn = document.createElement("button");



const total = document.querySelector(".total > p"); // variable for total calls
    const previous = document.querySelector(".previous > p")
    const currentResult = document.querySelector(".current > p")


const bingoLetters = ["B", "I", "N", "G", "O"];
const range = [
    { start: 1 , end: 15},
    { start: 16 , end: 30},
    { start: 31 , end: 45},
    { start: 46 , end: 60},
    { start: 61 , end: 75},
];

for (let i = 0; i < 5; i++) { // create the BINGO 
    const mainContent = document.createElement("div");
    mainContent.className = "main-content"

    const box = document.createElement("div");
    box.className = "box letter";
    
    const letter = document.createElement("p");
    letter.textContent = bingoLetters[i];

    box.appendChild(letter);
    mainContent.appendChild(box)

    for (let j = range[i].start; j <= range[i].end; j++) { // create the numbers by range
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

let numberHistory = [];

let totalValue = 0;
const button = document.getElementById("next");
button.addEventListener("click", ()=> {
    const boxContainer = document.createElement("div");
    boxContainer.className = "box-container"

    const wheelContainer = document.createElement("div");
    wheelContainer.className = "wheel-container"

    const wheelContainerLetter = document.createElement("p"); // B,I,N,G,O (in wheel)
    wheelContainerLetter.className = "wheel-letter"
    wheelContainerLetter.textContent = ""

    const wheelContainerNumber = document.createElement("p"); // 1-75 (in wheel)
    wheelContainerNumber.className = "wheel-number"
    wheelContainerNumber.textContent = "?"

    wheelContainer.appendChild(wheelContainerLetter)
    wheelContainer.appendChild(wheelContainerNumber)

    const rotateBtn = document.createElement("button"); //rotate & close function
    rotateBtn.textContent = "spin";
    rotateBtn.className = "rotate-btn";

    
    
    
    rotateBtn.addEventListener("click", ()=> {
        if (rotateBtn.textContent === "spin") {
            wheelContainer.classList.add("spin");
            wheelContainerNumber.classList.add("spin");
            rotateBtn.textContent = "close";

            
            let randomNumber;

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
            console.log(numberHistory);
            
        } else {
            rotateBtn.textContent = "spin";
            wheelContainerLetter.textContent = "";
            wheelContainerNumber.textContent = "?";

            totalValue++;
            total.textContent = totalValue;
            // ************************* unfinished create previous
            const previouscall = numberHistory[numberHistory.length - 2];
            if (previouscall <= 15) {
                previous.textContent = "B" + " " + previouscall
            } else if (previouscall > 15 && previouscall <= 30) {
                previous.textContent = "I" + " " + previouscall
            } else if (previouscall > 30 && previouscall <= 45) {
                previous.textContent = "N" + " " + previouscall
            } else if (previouscall > 45 && previouscall <= 60) {
                previous.textContent = "G" + " " + previouscall
            } else if (previouscall > 60 && previouscall <= 75) {
                previous.textContent = "O" + " " + previouscall
            }
            console.log(totalValue);
            
            body.removeChild(boxContainer);
        }
        
        
    });
     
    

    boxContainer.appendChild(wheelContainer);
    boxContainer.appendChild(rotateBtn);
    body.appendChild(boxContainer);


    resetBtn.textContent = "reset number"
    resetBtn.id = "reset";
    resetBtn.className = "constant"
    btnContainer.appendChild(resetBtn);
});


// To Clear the shown numbers including the Calls
resetBtn.addEventListener("click", ()=> {
    let boxId = document.querySelectorAll(".box");
    boxId.forEach(element => {
        element.classList.remove("chosen")
    });
    
    previous.textContent = "";
    total.textContent = "";
    currentResult.textContent = "";
    
    btnContainer.removeChild(resetBtn);
})


//Dark Mode
const darkModeBtn = document.querySelector(".dark-mode");
const mainContent = document.querySelectorAll(".main-content")
const callsContainer = document.querySelectorAll(".content");
const resultContainer = document.querySelector(".result-container");
const buttonContainer = document.querySelectorAll(".content > button");
const link = document.querySelector("nav > a");
const footerContainer = document.querySelector("footer");



darkModeBtn.addEventListener("click", ()=> {
    if (body.classList.contains("lightmode")) {
        body.classList.remove("lightmode");
        body.classList.add("darkmode");

        mainContainer.classList.remove("lightmode");
        mainContainer.classList.add("darkmode");

        mainContent.forEach(element => {
            element.classList.remove("lightmode");
            element.classList.add("darkmode");
        });

        callsContainer.forEach(element => {
            element.classList.remove("lightmode");
            element.classList.add("darkmode");
        });

        resultContainer.classList.remove("lightmode");
        resultContainer.classList.add("darkmode");

        buttonContainer.forEach(element => {
            element.classList.remove("btnlightmode");
            element.classList.add("btndarkmode");
        });

        link.classList.remove("lightmode");
        link.classList.add("darkmode");

        darkModeBtn.classList.remove("lightmode");
        darkModeBtn.classList.add("darkmode");

        footerContainer.classList.remove("lightmode");
        footerContainer.classList.add("darkmode");
    } else {
        
        body.classList.add("lightmode");
        body.classList.remove("darkmode")

        mainContainer.classList.add("lightmode");
        mainContainer.classList.remove("darkmode");

        mainContent.forEach(element => {
            element.classList.add("lightmode");
            element.classList.remove("darkmode");
        });

        callsContainer.forEach(element => {
            element.classList.add("lightmode");
            element.classList.remove("darkmode");
        });

        resultContainer.classList.add("lightmode");
        resultContainer.classList.remove("darkmode");

        buttonContainer.forEach(element => {
            element.classList.add("btnlightmode");
            element.classList.remove("btndarkmode");
        });

        link.classList.add("lightmode");
        link.classList.remove("darkmode");

        darkModeBtn.classList.add("lightmode");
        darkModeBtn.classList.remove("darkmode");

        footerContainer.classList.add("lightmode");
        footerContainer.classList.remove("darkmode");
    }
});
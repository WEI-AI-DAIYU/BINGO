/*
const bingoNumbers = document.querySelector(".bingo-numbers")

const B = [];
const I = [];
const N = [];
const G = [];
const O = [];

let numberColumn;

function generateBingoCard() {
    const bColumnContainer = document.createElement("div"); //B
    bColumnContainer.className = "column-container";

    for (let b = 1; b <= 5; b++) { 
        const box = document.createElement("div");
        box.className = "box";

        do {
            randomB = Math.floor(Math.random() * 15) + 1;
        } while (B.includes(randomB));
        B.push(randomB);

        let para = document.createElement("p");
        para.textContent = randomB;
        box.appendChild(para);
        bColumnContainer.appendChild(box);
    }

    const iColumnContainer = document.createElement("div"); //I
    iColumnContainer.className = "column-container";
    for (let i = 1; i <= 5; i++) { 
        const box = document.createElement("div");
        box.className = "box";

        do {
            randomI = Math.floor(Math.random() * 15) + 16;
        } while (I.includes(randomI));
        I.push(randomI);

        let para = document.createElement("p");
        para.textContent = randomI;
        box.appendChild(para);
        iColumnContainer.appendChild(box);
    }

    const nColumnContainer = document.createElement("div"); //N
    nColumnContainer.className = "column-container";
    for (let n = 1; n <= 5; n++) { 
        const box = document.createElement("div");
        box.className = "box";

        if (n === 3) {
            let para = document.createElement("p");
            para.textContent = "free";
            box.appendChild(para);
        } else {
            do {
                randomN = Math.floor(Math.random() * 15) + 31;
            } while (N.includes(randomN));
            N.push(randomN);
    
            let para = document.createElement("p");
            para.textContent = randomN;
            box.appendChild(para);
        }
        
        nColumnContainer.appendChild(box);
    }

    const gColumnContainer = document.createElement("div"); //G
    gColumnContainer.className = "column-container";
    for (let g = 1; g <= 5; g++) { 
        const box = document.createElement("div");
        box.className = "box";

        do {
            randomG = Math.floor(Math.random() * 15) + 46;
        } while (G.includes(randomG));
        G.push(randomG);

        let para = document.createElement("p");
        para.textContent = randomG;
        box.appendChild(para);
        gColumnContainer.appendChild(box);
        console.log("G", G)
    }
    
    const oColumnContainer = document.createElement("div"); //G
    oColumnContainer.className = "column-container";
    for (let g = 1; g <= 5; g++) { 
        const box = document.createElement("div");
        box.className = "box";

        do {
            randomO = Math.floor(Math.random() * 15) + 61;
        } while (O.includes(randomO));
        O.push(randomO);

        let para = document.createElement("p");
        para.textContent = randomO;
        box.appendChild(para);
        oColumnContainer.appendChild(box);
        console.log("G", G)
    }


    bingoNumbers.appendChild(bColumnContainer);
    bingoNumbers.appendChild(iColumnContainer);
    bingoNumbers.appendChild(nColumnContainer);
    bingoNumbers.appendChild(gColumnContainer);
    bingoNumbers.appendChild(oColumnContainer);
}
    
    
        
    

    
    


generateBingoCard()

*/
// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// Disable common developer tool shortcuts
document.addEventListener('keydown', function(e) {
    // F12 or Ctrl+Shift+I
    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        e.preventDefault();
    }
}, false);


const bingoNumbers = document.querySelector(".bingo-numbers");

const B = [];
const I = [];
const N = [];
const G = [];
const O = [];

function generateBingoContent(bingoLetterArray, startingNumber, freeSpace = false) {
    const numberColumn = document.createElement("div");
    numberColumn.className = "column-container";

    for (let i = 1; i <= 5; i++) {
        const box = document.createElement("div");
        box.className = "box";

        if (i === 3 && freeSpace) {
            let para = document.createElement("p");
            para.textContent = "free";
            para.className = "free";
            box.appendChild(para);
        } else {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 15) + startingNumber;
            } while (bingoLetterArray.includes(randomNumber));
            
            bingoLetterArray.push(randomNumber);
            
            let para = document.createElement("p");
            para.textContent = randomNumber;
            box.appendChild(para);
        }

        numberColumn.appendChild(box);
    }
    return numberColumn;
}

function generateBingoCard() {
     // Clear the previous card
     bingoNumbers.innerHTML = "";

     // Clear the arrays for new numbers
     B.length = 0;
     I.length = 0;
     N.length = 0;
     G.length = 0;
     O.length = 0;

    bingoNumbers.appendChild(generateBingoContent(B, 1));
    bingoNumbers.appendChild(generateBingoContent(I, 16));
    bingoNumbers.appendChild(generateBingoContent(N, 31,  true));
    bingoNumbers.appendChild(generateBingoContent(G, 46));
    bingoNumbers.appendChild(generateBingoContent(O, 61));

    // After generating the new card, update the theme
    applyTheme();

    clickBoxListener();
}

const refresh = document.querySelector(".mini-container > button");

refresh.addEventListener("click", ()=> {
    const userConfirm = confirm("Do you want to refresh the numbers");
    if (userConfirm) {
        generateBingoCard();
    }
});

// Theme Handling
const bingoCard = document.querySelector(".bingo-card");
const theme = document.getElementById("theme");

function applyTheme() {
    const selectedTheme = theme.value;

    const columnContainer = document.querySelectorAll(".column-container");
    const bingoLetters = document.querySelectorAll(".bingo-letters > p");
    const numberDesign = document.querySelectorAll(".box > p");
    const boxes = document.querySelectorAll(".box");

    // Remove all theme classes
    bingoCard.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    bingoNumbers.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    bingoLetters.forEach(element => {
        element.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    });
    numberDesign.forEach(element => {
        element.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    });
    boxes.forEach(element => {
        element.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    });
    columnContainer.forEach(element => {
        element.classList.remove("default", "black", "robot", "green", "vintage", "stars");
    });

    // Apply the selected theme class
    if (selectedTheme === "default") {
        bingoCard.classList.add("default");
        bingoNumbers.classList.add("default");
        bingoLetters.forEach(element => element.classList.add("default"));
        boxes.forEach(element => element.classList.add("default"));
        columnContainer.forEach(element => element.classList.add("default"));
    } else if (selectedTheme === "black") {
        bingoCard.classList.add("black");
        bingoNumbers.classList.add("black");
        bingoLetters.forEach(element => element.classList.add("black"));
        numberDesign.forEach(element => element.classList.add("black"));
        boxes.forEach(element => element.classList.add("black"));
        columnContainer.forEach(element => element.classList.add("black"));
    } else if (selectedTheme === "robot") {
        bingoCard.classList.add("robot");
        bingoNumbers.classList.add("robot");
        bingoLetters.forEach(element => element.classList.add("robot"));
        numberDesign.forEach(element => element.classList.add("robot"));
        boxes.forEach(element => element.classList.add("robot"));
        columnContainer.forEach(element => element.classList.add("robot"));
    } else if (selectedTheme === "green") {
        bingoCard.classList.add("green");
        bingoNumbers.classList.add("green");
        bingoLetters.forEach(element => element.classList.add("green"));
        numberDesign.forEach(element => element.classList.add("green"));
        boxes.forEach(element => element.classList.add("green"));
        columnContainer.forEach(element => element.classList.add("green"));
    } else if (selectedTheme === "vintage") {
        bingoCard.classList.add("vintage");
        bingoNumbers.classList.add("vintage");
        bingoLetters.forEach(element => element.classList.add("vintage"));
        numberDesign.forEach(element => element.classList.add("vintage"));
        boxes.forEach(element => element.classList.add("vintage"));
        columnContainer.forEach(element => element.classList.add("vintage"));
    } else if (selectedTheme === "stars") {
        bingoCard.classList.add("stars");
        bingoNumbers.classList.add("stars");
        bingoLetters.forEach(element => element.classList.add("stars"));
        numberDesign.forEach(element => element.classList.add("stars"));
        boxes.forEach(element => element.classList.add("stars"));
        columnContainer.forEach(element => element.classList.add("stars"));
    }
}

theme.addEventListener("change", applyTheme);

function clickBoxListener() {
    const selectedBox = document.querySelectorAll(".box");

selectedBox.forEach(element => {
    element.addEventListener("click", ()=> {
        if (element.classList.contains("clicked")) {
            element.classList.remove("clicked");
        } else {
            element.classList.add("clicked");
        }
    });
    
     
});
}

// Initialize card and theme when the page loads
generateBingoCard();



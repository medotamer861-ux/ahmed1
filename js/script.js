let gamename = "Guess The Word";
document.title=gamename;
// document.querySelector("h1").innerHTML = gamename;
document.querySelector("footer").innerHTML = `${gamename} ! this game creat by A7med`



let numberOfTries = 6;
let numberOfLetters = 5;
let curruntTry = 1;
// let numberOfHints = 2;

let WordtoGuess ="";
const words = ["apple","bread","chair","light","phone","watch","house","plant","shark","dream","cloud","music","brain","smile","ghost"];
WordtoGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let messageArea = document.querySelector(".message")

// document.querySelector(".hint span").innerHTML = numberOfHints;
// const getHintButton =document.querySelector(".hint")
// getHintButton.addEventListener("click" , getHint)
function generateInput() {
    const inputsContainer = document.querySelector(".inputs")
    // console.log(inputsContainer)
    for (let i = 1; i <= numberOfTries; i++) {
        const trydiv =document.createElement("div")
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML =`<span>Try ${i}</span>`;

        if (i !==1 ) trydiv.classList.add("disabled-inputs")

        for (let j = 1; j <= numberOfLetters; j++){
            const input = document.createElement("input");
            input.classList.add('input_style')
            
            input.type = "text"
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute("maxlength" , "1");
            
            trydiv.appendChild(input);
        }

        inputsContainer.appendChild(trydiv);
    }
    inputsContainer.children[0].children[1].focus();
     const inputs = document.querySelectorAll("input");
     inputs.forEach((input , index) => {
       input.addEventListener("input" , function (){
        this.value =this.value.toUpperCase();
        const nextInput = inputs[index + 1]
        if (nextInput) nextInput.focus();
       }) ;
       input.addEventListener("keydown",function (event) {
        // console.log(event);
        const curruntIndex = Array.from(inputs).indexOf(this)
        // console.log(curruntIndex)
        if(event.key == "ArrowRight"){
            const nextInput = curruntIndex + 1;
            if(nextInput < input.lenght)input[nextInput].focus()
        }
        if(event.key == "Arrowleft"){
            const prevInput = curruntIndex - 1;
            if(prevInput >=0)input[prevInput].focus()
        }
       })
     })
    }

    const guessButton = document.querySelector(".check")
    guessButton.addEventListener("click" , handleGuessus)
    function handleGuessus() {
        let successGuess = true;
        for(let i =1; i <= numberOfLetters; i++){
            const inputField =document.querySelector(`#guess-${curruntTry}-letter-${i}`);
            const letter = inputField.value.toLowerCase();
            const actualLetter =WordtoGuess[i - 1]

            if(letter == actualLetter){
                inputField.classList.add("key-in-place");
            }
            else if(WordtoGuess.includes(letter) && letter !==''){
                inputField.classList.add("key-not-in-place")
                successGuess =false;
            }
            else {
                inputField.classList.add("key-no")
                successGuess =false;
            }
        }

        if(successGuess){
            messageArea.innerHTML = `You win the word Is (<span>${WordtoGuess}</span>)`;
            let allTries = document.querySelectorAll(".inputs > div")
            console.log(allTries)
            allTries.forEach((trydiv) => trydiv.classList.add("disabled-inputs"));
            guessButton.disabled = true;
            // يعمل reload بعد 5 ثواني
    setTimeout(() => location.reload(), 5000);
        }
        else {
            document.querySelector(`.try-${curruntTry}`).classList.add("disabled-inputs");
            const  curruntTryInputs = document.querySelectorAll(`.try-${curruntTry} input`);
            curruntTryInputs.forEach((input) => (input.disabled = true));

            curruntTry++;

            
             const  nextTryInputs = document.querySelectorAll(`.try-${curruntTry} input`);
            nextTryInputs.forEach((input) => (input.disabled = false));

            let el =document.querySelector(`.try-${curruntTry}`)
            if(el){
                document.querySelector(`.try-${curruntTry}`).classList.remove ("disabled-inputs");
                el.children[1].focus()
            }
            else{
                guessButton.disabled =true;
                messageArea.innerHTML = `sorry! you lose the word is (${WordtoGuess}) `
                // يعمل reload بعد 5 ثواني
    setTimeout(() => location.reload(), 5000);
            }
        }
    }

// function getHint(){
//     if(numberOfHints > 0){
//         numberOfHints--;
//         document.querySelector(".hint span").innerHTML = numberOfHints;
//     }
//     if(numberOfHints == 0){
//         getHintButton.disabled = true;
//     }
//     const enabledInput =document.querySelectorAll("input:not([disabled])")
//     console.log(enabledInput)
// }



window.onload = function () {
    generateInput();
};


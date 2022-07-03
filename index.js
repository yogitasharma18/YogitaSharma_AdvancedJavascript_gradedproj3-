// time limit
let TIME_LIMIT = 60;

// Dummy text to be used
let dummys_array = [
    "It is Front End Graded Project Assignment from Great Learning.",
    "It is Speed Testing Application designed using HTML/CSS and Javascript."
];

// DOM Elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let dummy_text = document.querySelector(".dummy_text");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_dummy = "";
let dummyNo = 0;
let timer = null;

function updatedummy() {
    dummy_text.textContent = null;
    current_dummy = dummys_array[dummyNo];
    current_dummy.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        dummy_text.appendChild(charSpan)
    })
    
    if (dummyNo < dummys_array.length - 1)
        dummyNo++;
    else
        dummyNo = 0;
    }

    function processCurrentText() {
        curr_input = input_area.value;
        curr_input_array = curr_input.split('');
        characterTyped++;
        errors = 0;
        let dummySpanArray = dummy_text.querySelectorAll('span');
        dummySpanArray.forEach((char, index) => {
            let typedChar = curr_input_array[index]
        
            if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        
            } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        
            } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
            }
        });
        
        // display errors
        error_text.textContent = total_errors + errors;
        
        // update accuracy text
        let correctCharacters = (characterTyped - (total_errors + errors));
        let accuracyVal = ((correctCharacters / characterTyped) * 100);
        accuracy_text.textContent = Math.round(accuracyVal);
        
        if (curr_input.length == current_dummy.length) {
            updatedummy();
        
            // update total errors
            total_errors += errors;
        
            // clear the input area
            input_area.value = "";
        }
    }

    function startGame() {

        resetValues();
        updatedummy();
        
        // new timer
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }
            
    function resetValues() {
        timeLeft = TIME_LIMIT;
        timeElapsed = 0;
        errors = 0;
        total_errors = 0;
        accuracy = 0;
        characterTyped = 0;
        dummyNo = 0;
        input_area.disabled = false;
        
        input_area.value = "";
        dummy_text.textContent = 'Click on the area below to start the game.';
        accuracy_text.textContent = 100;
        timer_text.textContent = timeLeft + 's';
        error_text.textContent = 0;
        restart_btn.style.display = "none";
        cpm_group.style.display = "none";
        wpm_group.style.display = "none";
    }

    function updateTimer() {
        if (timeLeft > 0) {
            // decrease the current time left
            timeLeft--;
        
            // increase the time elapsed
            timeElapsed++;
        
            // update the timer text
            timer_text.textContent = timeLeft + "s";
        }
        else {
            // finish the game
            finishGame();
        }
        }

    function finishGame() {
        clearInterval(timer);
        input_area.disabled = true;
        dummy_text.textContent = "Click on restart to start a new game.";
        restart_btn.style.display = "block";
        cpm = Math.round(((characterTyped / timeElapsed) * 60));
        wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
        cpm_text.textContent = cpm;
        wpm_text.textContent = wpm;
        cpm_group.style.display = "block";
        wpm_group.style.display = "block";
    }
                    

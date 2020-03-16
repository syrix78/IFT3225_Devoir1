/*
Question/Answer Generation
*/
var in_order_notes = ["DO",
                      "DO#",
                      "RÉ",
                      "RÉ#",
                      "MI",
                      "FA",
                      "FA#",
                      "SOL",
                      "SOL#",
                      "LA",
                      "LA#",
                      "SI"]
var tones = ["m", "M"]
var bemoles = ["", "b"]
var fifthClycle = [["7b", "6b", "5b", "4b", "3b", "2b", "1b", "0", "1#", "2#", "3#", "4#", "5#", "6#", "7#"],
                   ["DOb", "SOLb", "RÉb", "LAb", "MIb", "SIb", "FA", "DO", "SOL", "RÉ", "LA", "MI", "SI", "FA#", "DO#"],
                   ["LAb", "MIb", "SIb", "FA", "DO", "SOL", "RÉ", "LA", "MI", "SI", "FA#", "DO#", "SOL#", "RÉ#", "LA#"]
                  ]


function generate_accord_question(){
    var random_note_index = Math.floor(Math.random() * in_order_notes.length);
    var note = in_order_notes[random_note_index];
    var bemol = Math.round(Math.random());
    var tone = Math.round(Math.random());

    var question = "Quelle sont les notes de l'accord de " + note + bemoles[bemol] + tones[tone] + " ?";

    if(tone == 0){
        var note_index = random_note_index - bemol;
        var answer = [note_index, (note_index + 3) % in_order_notes.length, (note_index + 3 + 4) % in_order_notes.length];
    }
    else{
        var note_index = random_note_index - bemol;
        var answer = [note_index, (note_index + 4) % in_order_notes.length, (note_index + 4 + 3) % in_order_notes.length];
    }

    answer = answer.map(function(e) { 
        e = in_order_notes[e]; 
        return e;
    });

    return [question, answer, 0, 100, 300, false]
}

function generate_major_question(){
    var random_major_index = Math.floor(Math.random() * fifthClycle[1].length);
    var note = fifthClycle[1][random_major_index];

    var question = "Quelle sont les notes de l'accord de " + fifthClycle[1][random_major_index] + "M" + " ?";
    var answer = fifthClycle[2][random_major_index]

    if(answer.slice(-1) == "b"){
        var note_index = (in_order_notes.indexOf(answer.slice(0, -1)) - 1 + in_order_notes.length) % in_order_notes.length;
        var answer = [in_order_notes[note_index]];
    }
    else{
        answer = [answer]
    }


    return [question, answer, 0, 100, 100, false]
}

function generate_minor_question(){
    var random_minor_index = Math.floor(Math.random() * fifthClycle[2].length);
    var note = fifthClycle[2][random_minor_index];

    var question = "Quelle sont les notes de l'accord de " + fifthClycle[2][random_minor_index] + "m" + " ?";
    var answer = fifthClycle[1][random_minor_index]

    if(answer.slice(-1) == "b"){
        var note_index = (in_order_notes.indexOf(answer.slice(0, -1)) - 1 + in_order_notes.length) % in_order_notes.length;
        var answer = [in_order_notes[note_index]];
    }
    else{
        answer = [answer]
    }


    return [question, answer, 0, 100, 100, false]
}

function generate_tone_question(){
    var major = Math.round(Math.random() + 1);
    var random_index = Math.floor(Math.random() * fifthClycle[major].length);
    var answer = random_index;

    if(major == 1){
        var question = "Quel est le nombre et la nature des altérations portées à l'armure de la tonalité de " + fifthClycle[1][random_index] + " majeur" + " ?";
    }
    else{
        var question = "Quel est le nombre et la nature des altérations portées à l'armure de la tonalité de " + fifthClycle[1][random_index] + " mineur" + " ?";
    }

    return [question, fifthClycle[0], answer, 100, 100, true]
}

function generate_questions(questionAmount){
    var answers = []
    for(var i=0; i<questionAmount; i++){
        switch (Math.round(Math.random() * 4)) {
            case 0:
                answers.push(generate_accord_question());
                break;
            case 1:
                answers.push(generate_major_question())
                break;
            case 2:
                answers.push(generate_minor_question())
                break;
            case 3:
                answers.push(generate_tone_question())
                break;
        }
    }
    return answers
}


/*
Questions/Answers Engine
*/

var questionList = null
var questionPointer = null
var globalScore = null
var answerScore = null
var scoreDecreaser = null
var canAnswerQuestion = false;
var currentAnswer = [];
var keylist = [];
var currentAnswerLength = 1;


function start() {
    questionList = generate_questions(10)
    questionPointer = 0
    globalScore = 0
    answerScore = 0
    questionOrchestrator(questionList[0])
}

function questionOrchestrator(questionItems) {
    question = questionItems[0]
    answers = questionItems[1]
    correct = questionItems[2]
    timerStart = questionItems[3]
    intervalDecrease = questionItems[4]
    choiceQuestion = questionItems[5]
    document.getElementById("playArea").innerHTML = ""
    var questionElement = document.createElement("p")
    questionElement.innerHTML = question
    playArea.appendChild(questionElement)
    if(choiceQuestion == true){
        for (let answerCount = 0; answerCount < answers.length; answerCount++){
            var answerElement = document.createElement("button")
            answerElement.innerHTML = answers[answerCount]
            answerElement.id = answerCount.toString()
            answerElement.setAttribute("onclick", "answerQuestion(" + (answerCount == correct).toString() + ")");
            playArea.appendChild(answerElement)
        }
    }
    var scoreText = document.createElement("p")
    scoreText.innerHTML = "Votre score:"
    playArea.appendChild(scoreText)
    var scoreCount = document.createElement("p")
    scoreCount.innerHTML = timerStart
    scoreCount.id = "scoreCount"
    playArea.appendChild(scoreCount)
    answerScore = timerStart
    if(choiceQuestion == false){
        currentAnswerLength = answers.length;
        captureAnswer();
        currentAnswer = answers;
    }
    scoreDecreaser = setInterval(decreaseScore, intervalDecrease)
    textDecreaser = setInterval(decreaseText, intervalDecrease)
}

function answerQuestion(answer) {
    clearInterval(scoreDecreaser)
    clearInterval(textDecreaser)
    canAnswerQuestion = false;
    keylist = [];
    document.getElementById("playArea").innerHTML = ""
    if(answer == true){
        globalScore += answerScore
        textGenerator(["Vrai!", "Vous gagnez " + answerScore.toString() + " points!", "Votre pointage est maintenant " + globalScore.toString() + "."])
    } else if (answer == "timeout") {
        textGenerator(["Vous n'avez plus de temps!", "Vous ne gagnez pas de points.", "Votre pointage est toujours " + globalScore.toString() + "."])
    } else {
        textGenerator(["FAUX!", "Vous gagnez AUCUN point.", "Votre pointage est toujours " + globalScore.toString() + "."])
    }
    if (questionPointer == questionList.length - 1){
        var finishTest = document.createElement("button")
        finishTest.innerHTML = "Finir le Test"
        finishTest.setAttribute("onclick", "finishTest()");
        playArea.appendChild(finishTest)
    } else {
        questionPointer++
        var nextQuestion = document.createElement("button")
        nextQuestion.innerHTML = "Prochaine Question"
        nextQuestion.setAttribute("onclick", "questionOrchestrator(questionList[" + questionPointer.toString() + "])");
        playArea.appendChild(nextQuestion)
    }
}

function finishTest() {
    document.getElementById("playArea").innerHTML = ""
    textGenerator(["Vous avez complété le test!", "Votre score final est " + globalScore.toString() + " points.", "Woohoo!"])
    var testAgain = document.createElement("button")
    testAgain.innerHTML = "Recommencer le Test"
    testAgain.setAttribute("onclick", "start()");
    playArea.appendChild(testAgain)
}

function textGenerator(listOfText) {
    for (let textCount = 0; textCount < listOfText.length; textCount++){
        var questionElement = document.createElement("p")
        questionElement.innerHTML = listOfText[textCount]
        playArea.appendChild(questionElement)
    }
}

function decreaseScore(){
    answerScore--
    if(answerScore == 0){
        answerQuestion("timeout")
    }
}

function decreaseText(){
    document.getElementById('scoreCount').innerHTML = answerScore
}



function captureAnswer(answerLength){
    canAnswerQuestion = true;
}

https://gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/
function arraysMatch(arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    // Otherwise, return true
    return true;

};

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('javascriptContent').style.display='block';
});



/*
Javascript Piano
*/

//https://codepen.io/gabrielcarol/full/rGeEbY
document.addEventListener("DOMContentLoaded", function(event) { 

    var englishToFrenchNotesDict = {
        "C":"DO",
        "D": "RÉ",
        "E": "MI",
        "F": "FA",
        "G": "SOL",
        "A": "LA",
        "B": "SI",
        "C#": "DO#",
        "D#": "RÉ#",
        "F#":"FA#",
        "G#":"SOL#",
        "A#": "LA#"
    };

    const keys = document.querySelectorAll(".key"),
          note = document.querySelector(".nowplaying"),
          hints = document.querySelectorAll(".hints");

    function playNote(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
              key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

        if (!key) return;

        const keyNote = key.getAttribute("data-note");

        if(canAnswerQuestion){
            var keyMusicCode = englishToFrenchNotesDict[keyNote];
            if(keylist.length == currentAnswerLength - 1){
                keylist.push(keyMusicCode);
                answerQuestion(arraysMatch(currentAnswer, keylist));
            }
            else{
                keylist.push(keyMusicCode);
            }


        }

        key.classList.add("playing");
        note.innerHTML = englishToFrenchNotesDict[keyNote];
        audio.currentTime = 0;
        audio.play();
    }

    function playNoteOnClick(e) {

        const audio = document.querySelector(`audio[data-key="${e}"]`),
              key = document.querySelector(`.key[data-key="${e}"]`);

        if (!key) return;

        const keyNote = key.getAttribute("data-note");

        key.classList.add("playing");
        note.innerHTML = englishToFrenchNotesDict[keyNote];
        audio.currentTime = 0;
        audio.play();
    }

    function removeTransition(e) {
        //console.log(e.propertyName);
        if (e.propertyName !== "transform") return;
        this.classList.remove("playing");
    }

    function hintsOn(e, index) {
        e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
    }


    hints.forEach(hintsOn);

    keys.forEach(key => key.addEventListener("transitionend", removeTransition));
    keys.forEach(key => key.addEventListener("click", function (event) {
        var keyPressed = event.target.innerText;


        if(keyPressed == ';'){
            if(canAnswerQuestion){
                var keyMusicCode = englishToFrenchNotesDict[document.querySelector(`.key[data-key="${186}"]`).getAttribute("data-note")];
                if(keylist.length == currentAnswerLength - 1){
                    keylist.push(keyMusicCode);
                    answerQuestion(arraysMatch(currentAnswer, keylist));
                }
                else{
                    keylist.push(keyMusicCode);
                }


            }
            playNoteOnClick(186)
        }
        else{
            keyPressed = keyPressed.charCodeAt(0);
            if(canAnswerQuestion){
                var keyMusicCode = englishToFrenchNotesDict[document.querySelector(`.key[data-key="${keyPressed}"]`).getAttribute("data-note")];
                if(keylist.length == currentAnswerLength - 1){
                    keylist.push(keyMusicCode);
                    answerQuestion(arraysMatch(currentAnswer, keylist));
                }
                else{
                    keylist.push(keyMusicCode);
                }
            }
            playNoteOnClick(keyPressed)
        } 
    }));

    window.addEventListener("keydown", playNote);


});
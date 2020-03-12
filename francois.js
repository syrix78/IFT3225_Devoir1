document.addEventListener("DOMContentLoaded", function(event) { 
    var questionList = [["Is mayonnaise an instrument?", ["Yes", "No"], 0, 100, 100], ["hey", ["a", "b"], 1, 100, 2000], ["click on 7", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 7, 200, 100]]
    var questionPointer = null
    var globalScore = null
    var answerScore = null
    var scoreDecreaser = null

    function start() {
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
        document.getElementById("playArea").innerHTML = ""
        var questionElement = document.createElement("p")
        questionElement.innerHTML = question
        playArea.appendChild(questionElement)
        for (let answerCount = 0; answerCount < answers.length; answerCount++){
            var answerElement = document.createElement("button")
            answerElement.innerHTML = answers[answerCount]
            answerElement.id = answerCount.toString()
            answerElement.addEventListener("onclick", answerQuestion((answerCount == correct).toString()));
            //Is necessary?
            //answerElement.setAttribute("onclick", "answerQuestion(" + (answerCount == correct).toString() + ")");
            playArea.appendChild(answerElement)
        }
        var scoreText = document.createElement("p")
        scoreText.innerHTML = "Votre score:"
        playArea.appendChild(scoreText)
        var scoreCount = document.createElement("p")
        scoreCount.innerHTML = timerStart
        scoreCount.id = "scoreCount"
        playArea.appendChild(scoreCount)
        answerScore = timerStart
        scoreDecreaser = setInterval(decreaseScore, intervalDecrease)
        textDecreaser = setInterval(decreaseText, intervalDecrease)
    }

    function answerQuestion(answer) {
        clearInterval(scoreDecreaser)
        clearInterval(textDecreaser)
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
            finishTest.addEventListener("onclick", finishTest);
            //finishTest.setAttribute("onclick", "finishTest()");
            playArea.appendChild(finishTest)
        } else {
            questionPointer++
            var nextQuestion = document.createElement("button")
            nextQuestion.innerHTML = "Prochaine Question"
            nextQuestion.addEventListener("onclick", questionOrchestrator(questionList[questionPointer.toString()]));
            //Not sure if necessary
            //nextQuestion.setAttribute("onclick", "questionOrchestrator(questionList[" + questionPointer.toString() + "])");
            playArea.appendChild(nextQuestion)
        }
    }

    function finishTest() {
        document.getElementById("playArea").innerHTML = ""
        textGenerator(["Vous avez completez le test!", "Votre score final est " + globalScore.toString() + " points.", "Woohoo!"])
        var testAgain = document.createElement("button")
        testAgain.innerHTML = "Refaire le Test"
        testAgain.addEventListener("onclick", start);
        //testAgain.setAttribute("onclick", "start()");
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
    
    button = document.getElementById('startButton').addEventListener("onclick", start);

    
    

});

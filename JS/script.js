const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice"));
const scoreEl = document.querySelector(".score_value")


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "What is 2 + 2?",
        choice1: "5",
        choice2: "4",
        choice3: "8",
        choice4: "6",
        answer: 2
    },
    {
        question: "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "London",
        answer: 1
    },
    {
        question: "What percent of American adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 3
    },
    {
        question: "How many stripes are there on the US flag?",
        choice1: "15",
        choice2: "10",
        choice3: "12",
        choice4: "13",
        answer: 4
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;


function getNewQuestion(){
    if(availableQuestions.length == 0){
        finishGame()
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML = currentQuestion.question;
    
    choices.forEach(choice => {
        var selectedchoice = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + selectedchoice]
    })
    
    availableQuestions.splice(questionIndex,1)
    
    acceptingAnswers = true;

}

function startGame(){
    questionCounter = 0
    score = 0
    availableQuestions = [...questions];
    getNewQuestion();
}

function finishGame(){
    localStorage.setItem("mostRecentScore",score)
    
    return window.location.assign("./end.html")
}


choices.forEach(choice => {
    choice.parentElement.addEventListener("click",e =>{
        if(!acceptingAnswers) return
        
        acceptingAnswers = false;
        const selectedChoice = e.target.children[0];
        const selectedAnswer = selectedChoice.dataset["number"];
        
        let classToApply = selectedAnswer == currentQuestion.answer ? "true" : "false";
        if (classToApply == "true"){
            score += SCORE_POINTS;
        }else{
            choices.forEach(choice => {
                if(choice.dataset["number"] == currentQuestion.answer){
                    choice.parentElement.classList.add("true")
                    setTimeout(function(){
                        choice.parentElement.classList.remove("true");
                    },1000);
                }
            })
        }
        
        scoreEl.innerHTML = score;
        e.target.classList.add(classToApply);
        setTimeout(function(){
            e.target.classList.remove(classToApply);
            getNewQuestion()
        },1000);
    })
})


startGame()


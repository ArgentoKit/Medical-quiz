const start__button = document.querySelector(".start__button button")
const info__box = document.querySelector(".info__box")
const exit = document.querySelector(".info__button .exit")
const continue__button = document.querySelector(".continue")
const quiz__box = document.querySelector(".quiz__box")
const result__box = document.querySelector(".result__box")
const next__que = document.querySelector(".total__que button")
const complete__button = document.querySelector(".complete__button button")
const next__btn = document.querySelector(".next-button")
const bottom_ques_counter = document.querySelector(".total__que")
const option__list = document.querySelector(".option__list")
const restart__quiz = document.querySelector(".restart")

start__button.onclick = () => {
    info__box.classList.add("activeInfo")
}

exit.onclick = () => {
    info__box.classList.remove("activeInfo")
}

continue__button.onclick = () => {
    info__box.classList.remove("activeInfo")
    quiz__box.classList.add("activeQuiz")
    showQuestions(0)
    queCounter(1)
}

let que__count = 0;
let que__numb = 1;
let userScore = 0;

restart__quiz.onclick = () => {
    quiz__box.classList.add("activeQuiz")
    result__box.classList.remove("activeResult")
    let que__count = 0;
    let que__numb = 1;
    let userScore = 0;
    showQuestions(que__count)
    queCounter(que__numb)
    next__btn.style.display = "none"
}

next__btn.onclick = () => {
    if(que__count < questions.length - 1) {
        que__count++
        que__numb++
        showQuestions(que__count)
        queCounter(que__numb)
        next__btn.style.display = "none"
    }
    else {
        showResultBox()
    }
}

function showQuestions(index) {
    const que__text = document.querySelector(".question")
    let que__tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>'
    let option__tag =     '<div class="option"><span class="option__item">'+ questions[index].options[0] +'</span></div>'
                        + '<div class="option"><span class="option__item">'+ questions[index].options[1] +'</span></div>'
                        + '<div class="option"><span class="option__item">'+ questions[index].options[2] +'</span></div>'
                        + '<div class="option"><span class="option__item">'+ questions[index].options[3] +'</span></div>'
                        + '<div class="option"><span class="option__item">'+ questions[index].options[4] +'</span></div>'
    que__text.innerHTML = que__tag
    option__list.innerHTML = option__tag
    const option = option__list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}


let tickIcon = '<div class="icon true"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon false"><i class="fas fa-times"></i></div>'


function optionSelected(answer) {
    let userAns = answer.textContent
    let correctAns = questions[que__count].answer
    let allOptions = option__list.children.length
    if(userAns == correctAns) {
        userScore += 1
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
    } else {
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)

        for (let i = 0; i < allOptions; i++) {
            if(option__list.children[i].textContent == correctAns) {
                option__list.children[i].setAttribute("class", "option correct")
                option__list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option__list.children[i].classList.add("disabled")
    }
    next__btn.style.display = "block"
}


function queCounter(index) {
    let totalQuesCountTag = '<span><p>'+ index +'</p>з<p>'+ questions.length +'</p>питань</span>'
    bottom_ques_counter.innerHTML = totalQuesCountTag
}

function showResultBox() {
    info__box.classList.remove("activeInfo")
    quiz__box.classList.remove("activeQuiz")
    result__box.classList.add("activeResult")
    const scoreText = document.querySelector(".score__text")
    if(userScore > 1) {
        let scoreTag = '<span>Твій результат <p>'+ userScore +'</p>з<p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag
    }
}
var userScores = document.querySelector('#userscore');
    compScores = document.querySelector('#compscore');
    messages = document.querySelector('.messages h2');
    rock = document.querySelector('#r');
    scissor = document.querySelector('#s');
    paper = document.querySelector('#p');
    moves = document.querySelector('.moves');
    userScoreNum = 0;
    compScoreNum = 0;

    moves.addEventListener('click', function(e){
        if(e.target.parentElement.classList.contains('move')){
            var userMove = getUserMove(e.target.parentElement);
            var compMove = getCompMove();
            var combination = `${userMove}` + `${compMove}`;
            switch(combination){
                case 'rs':
                case 'pr':
                case 'sp':
                increaseUserScore();
                message('You Win!');
                changeColor(e.target.parentElement, 'green', messages);
                break;
                case 'sr':
                case 'rp':
                case 'ps':
                increaseCompScore();
                message('You Lost!');
                changeColor(e.target.parentElement, 'red', messages);
                break;
                case 'ss':
                case 'rr':
                case 'pp':
                message('Match Draw!');
                changeColor(e.target.parentElement, 'grey', messages);
                break;
            }
            comp_Move(compMove);
        }
});

function getUserMove(element){
        if(element.classList.contains('r')){
           scissor.style.display = 'none';
           paper.style.display = 'none';
           return('r');
        }
        else if(element.classList.contains('s')){ 
            rock.style.display = 'none';
            paper.style.display = 'none';
            return('s');
        }
        else {
            scissor.style.display = 'none';
            rock.style.display = 'none';
            return('p');
        }
}

function getCompMove(){
    var choise = 'rsp';
    return choise[Math.floor(Math.random()*3)]
}

function increaseUserScore(){
    userScoreNum++;
    userScores.textContent = `${userScoreNum} `;
}

function increaseCompScore(){
    compScoreNum++;
    compScores.textContent = ` ${compScoreNum}`;
}

function message(newMessage){
    messages.textContent = `${newMessage}`;
}

function comp_Move(getMove){
    if(moves.lastElementChild.classList.contains('cMove')){
        moves.lastChild.remove();
    }
    var newDiv = document.createElement('div');
    newDiv.classList  = 'move cMove';
    newDiv.innerHTML = `<img src="images/${getMove}.jpg" alt="">`
    moves.appendChild(newDiv);
    document.querySelectorAll('.move').forEach(function(element){
        element.style.pointerEvents = 'none';
    });
    document.querySelector('.again').style.display = 'block';
}

document.querySelector('.again button').onclick = function(e){
    document.querySelectorAll('.move').forEach(function(element){
        if(element.classList.contains('cMove')){
            element.remove();
        }
        if(element.classList.contains('green')){
            element.classList.remove('green');
            messages.style.color = 'black';
        }
        if(element.classList.contains('red')){
            element.classList.remove('red');
            messages.style.color = 'black';
        }
        if(element.classList.contains('grey')){
            element.classList.remove('grey');
            messages.style.color = 'black';
        }
        element.style.display = 'block';
        document.querySelector('.again').style.display = 'none';
        document.querySelectorAll('.move').forEach(function(element){
            element.style.pointerEvents = 'initial';
        });
    })
    message('Take Your Move');
    e.preventDefault();
}

function changeColor(element, color, heading){
    element.classList.add(color);
    heading.style.color = color;
}
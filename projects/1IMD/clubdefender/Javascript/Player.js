const Playerelement = document.querySelector(".player");
const liveselement = document.querySelector(".lives");
const endpoints = document.querySelector('.endpoints');
const gameover = document.querySelector('.gameover');
var Lives = 3;
var playerspeed = 10;
var left = 175;
var GameOver = true;



//deze functie en eventlistener zorgen voor de playermovement
window.addEventListener("keydown", onKeyboardEvent, false)
function onKeyboardEvent(event){   
        switch (event.keyCode) {
            case 37:
                if(left >= -20){
                    left = left - playerspeed;
                } 
                else{
                    left = left;
                }
                break;
            case 81:
                if(left >= -20){
                    left = left - playerspeed;
                } 
                else{
                    left = left;
                }
                break;
            case 39:
                if(left <= 420){
                    left = left + playerspeed;
                }
                else{
                    left = left;
                }
                break;
            case 68:
                if(left <= 420){
                    left = left + playerspeed;
                }
                else{
                    left = left;
                }
                break;
        }
    Playerelement.style.left = left + "px";
}

//deze functie past de levens in de html aan aan de variabele in js
setInterval(changelives, 100);
function changelives(){
    if(Lives == 3){
        liveselement.innerHTML = "3 places left";
    }
    else if(Lives == 2){
        liveselement.innerHTML = "2 places left";
    }
    
    else if(Lives == 1){
        liveselement.innerHTML = "1 place left";
    }
    else if(Lives == 0){
        GameOver = true;
        liveselement.innerHTML = "Game Over!";
        splashscreen.classList.remove('invisible');
        gameover.classList.remove('invisible');
        endpoints.classList.remove('invisible');
        hitpointselement.innerHTML = Hitpoints;
    }
}
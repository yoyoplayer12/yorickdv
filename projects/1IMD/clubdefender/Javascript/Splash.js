const splashscreen = document.querySelector('.splashscreen');
const sentone = document.querySelector('.sentone');
const senttwo = document.querySelector('.senttwo');
const sentthree = document.querySelector('.sentthree');
const sentfour = document.querySelector('.sentfour');
const sentfive = document.querySelector('.sentfive');
const sentsix = document.querySelector('.sentsix');
const sentseven = document.querySelector('.sentseven');
const senteight = document.querySelector('.senteight');
const continuebutton = document.querySelector('.continue');
const player = document.querySelector('.player');
let timesclickedstart = 0;

//deze functie zorgt voor de overgangen op het splashscreen
function next(){
    if(timesclickedstart == 0){
        sentone.classList.add('invisible');
        senttwo.classList.remove('invisible');
        timesclickedstart = 1;
        return;
    }
    if(timesclickedstart == 1){
        senttwo.classList.add('invisible');
        sentthree.classList.remove('invisible');
        timesclickedstart = 2;
        return;
    }
    if(timesclickedstart == 2){
        sentthree.classList.add('invisible');
        sentfour.classList.remove('invisible');
        timesclickedstart = 3;
        return;
    }
    if(timesclickedstart == 3){
        sentfour.classList.add('invisible');
        sentfive.classList.remove('invisible');
        timesclickedstart = 4;
        return;
    }
    if(timesclickedstart == 4){
        sentfive.classList.add('invisible');
        sentsix.classList.remove('invisible');
        timesclickedstart = 5;
        return;
    }
    if(timesclickedstart == 5){
        sentsix.classList.add('invisible');
        sentseven.classList.remove('invisible');
        timesclickedstart = 6;
        return;
    }
    if(timesclickedstart == 6){
        sentseven.classList.add('invisible');
        senteight.classList.remove('invisible');
        timesclickedstart = 7;
        return;
    }
    if(timesclickedstart == 7){
        splashscreen.classList.add('invisible');
        continuebutton.classList.add('invisible');
        senteight.classList.add('invisible');
        timesclickedstart = 8;
        GameOver = false;
    }
}
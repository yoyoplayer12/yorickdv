let coins = 0;
let bulletDamage = 1;
let upgrade1done = false;
let upgrade2done = false;
let upgrade3done = false;
let price1 = "200 Coins";
let beschrijving1 = "x2 speed"
let price2 = "400 Coins";
let beschrijving2 = "Vizer"
let price3 = "800 Coins";
let beschrijving3 = "x2 damage"
let offset1 = 0;
let offset2 = 0;
let offset3 = 0;
let A = " ";
let Z = " ";
let E = " ";
upgrade1finished = false;
upgrade2finished = false;
upgrade3finished = false;
function information(){
    rectMode(CENTER)
    //wit vak
    noStroke();
    fill(255, 255, 255, 100)
    rect(650, 0, 220, 900)
    
    // punten
    fill("black");
    textSize(40)
    text('Coins: ' + coins, 250, -325);

    //bulletspeed
    fill("black")
    textSize(40);
    text('Bulletspeed: ' + bltSpeed, -600, -325)

    //bulletdamage
    fill("black")
    textSize(40);
    text('Bulletdamage: ' + bulletDamage, -200, -325)

    fill("black")
    textSize(40);
    text('PRESS SPACE TO SHOOT', -220, 300)
}

function upgradeMechanism(){
    upgrade1();
    upgrade2();
    upgrade3();
    if (keyIsDown(65) && coins >= 200 && upgrade1done == false){ //65 staat voor a
        coins = coins - 200;
        SpeedUpgrade()                                           //kogelsnelheid
        bltSpeed = bltSpeed + 50;                                  //bulletspeed verhogen met 10
        upgrade1done = true;
    }
    if (keyIsDown(90) && coins >= 400 && upgrade2done == false){ //90 staat voor z
        coins = coins - 400;
        VizerUpgrade();                                             //vizier upgrade
        upgrade2done = true;
    }
    if (keyIsDown(69) && coins >= 800 && upgrade3done == false){ //69 staat voor e
        coins = coins - 400;
        bulletDamage = bulletDamage + 1;
        upgrade3done = true;
    }

    if (upgrade1done == true){
        upgrade1Bought()
        
        
    }
    if (upgrade2done == true){
        upgrade2Bought()
        upgrade2finished = true;
    }
    if (upgrade3done == true){
        upgrade3Bought()
        upgrade3finished = true;
    }


//fysieke upgrades
    if (upgrade1finished == true){
        bltSpeed = bltSpeed + 50;
        upgrade1finished = true;
    }

//veryfying mechanism
    if (coins >=200){
        A = "A";
    }
    else{
        A = " ";
    }
    if (coins >=400){
        Z = "Z";
    }
    else{
        Z = " ";
    }
    if (coins >=800){
        E = "E";
    }
    else{
        E = " ";
    }
}


function upgrade1(){
    fill(0,0,0,100);
    circle(620, -295, 100);
    fill("black");
    textSize(30);
    text(price1, 550 + offset1, -205);
    textSize(20);
    text(beschrijving1, 580, -180)
    textSize(80);
    fill(0,0,0,100, 0)
    text(A, 595, -265);
}
function upgrade1Bought(){
    fill("black");
    circle(620, -295, 100);
    price1 = "Bought"
    beschrijving1 = " "
    offset1 = 20;
}

function upgrade2(){
    fill(0,0,0,100);
    circle(620, -115, 100);
    fill("black");
    textSize(30);
    text(price2, 550 + offset2, -25);
    textSize(20);
    text(beschrijving2, 595, 0)
    textSize(80);
    fill(0,0,0,100, 0)
    text(Z, 595, -85);
}
function upgrade2Bought(){
    fill("black");
    circle(620, -115, 100);
    price2 = "Bought"
    beschrijving2 = " "
    offset2 = 20;
}

function upgrade3(){
    fill(0,0,0,100);
    circle(620, 65, 100);
    fill("black");
    textSize(30);
    text(price3, 550 + offset3, 155);
    textSize(20);
    text(beschrijving3, 560, 180)
    textSize(80);
    fill(0,0,0,100, 0)
    text(E, 595, 95);
}
function upgrade3Bought(){
    fill("black");
    circle(620, 65, 100);
    price3 = "Bought"
    beschrijving3 = " "
    offset3 = 20;
}

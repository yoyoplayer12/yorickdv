let bullets = [];
let seals = [];
let sealSpeed =  1;
let bltSpeed = 50;
let player = new turret(0, 0, 5);
var SealCoordX;
let side;
var SealCoordY;
let playingmusic = false;
let lostmusic = false;
let lost = false;
let varua = 200; 
let sealskilled = 0;
let doneup = false;
let donedown = false;
let doneleft = false;
let doneright = false;
let enemyHealth = 2;
let sealdead = false

function setup(){
    cursor("mousedot.png", 12.5, 12.5)      //snipermuis
    createCanvas(1400, 750);
    background("#87CEFA");
    angleMode(DEGREES);
    console.log(floor(millis())+ " milliseconds"); //time to load
    SealCoordX = random(-750, 750);
    SealCoordY = random(-375, 375);
    side = round(random(0,3));
}
function draw(){
    background("#019FA5");
    translate(700, 375);
    //alle info
    information();
    //upgradebuttons
    upgradeMechanism();

    


    // de seals displayen
    let seal1 = new seal(100, SealCoordX, SealCoordY, enemyHealth);
    //seals naar het midden laten komen
    //upside
    if (side == 0){
        //checken of de variabele al op de juiste hoogte/breedte staat
        if (doneup == false){
            SealCoordY = -450;
            doneup = true;
            return;
        }
        //starten met bewegingsproces
        if (doneup == true){
            let distancegun = dist(SealCoordX, SealCoordY, player.x, player.y);
            seals.push(seal1.display());
            seals.push(seal1.move());
            //beweging
            if (distancegun > 100){
                if (SealCoordX < 0){
                    SealCoordY = SealCoordY + sealSpeed;
                    SealCoordX = SealCoordX + sealSpeed;
                    if (SealCoordY == 0){
                        SealCoordY = SealCoordY - sealSpeed;
                    }
                }
                if (SealCoordX > 0){
                    SealCoordY = SealCoordY + sealSpeed;
                    SealCoordX = SealCoordX - sealSpeed;
                    if (SealCoordY == 0){
                        SealCoordY = SealCoordY - sealSpeed;
                    }
                }
                if (SealCoordX == 0){
                    SealCoordY = SealCoordY + sealSpeed;
                }
                
            }
            //lose message
            else{
                lost = true;
                fill("#019FA5")
                rect(0, 200, 1500, 900)
                rect(650, 0, 220, 900)
                fill("black");
                textSize(100);
                text("The seals took over!", -450, -150);
                text("You killed " + sealskilled + " Seals, Great job!", -620, 40);
                 
                if (keyPressed == (32)){
                }
                return;
            }
        }
    }


    //downside
    if (side == 1){
         //checken of de variabele al op de juiste hoogte/breedte staat
         if (donedown == false){
            SealCoordY = 450;
            donedown = true;
            return;
        }
        //starten met bewegingsproces
        if (donedown == true){
            let distancegun = dist(SealCoordX, SealCoordY, player.x, player.y);
            seals.push(seal1.display());
            seals.push(seal1.move());
            //beweging
            if (distancegun > 100){
                if (SealCoordX < 0){
                    SealCoordY = SealCoordY - sealSpeed;
                    SealCoordX = SealCoordX + sealSpeed;
                    if (SealCoordY == 0){
                        SealCoordY = SealCoordY + sealSpeed;
                    }
                }
                if (SealCoordX > 0){
                    SealCoordY = SealCoordY - sealSpeed;
                    SealCoordX = SealCoordX - sealSpeed;
                    if (SealCoordY == 0){
                        SealCoordY = SealCoordY + sealSpeed;
                    }
                }
                if (SealCoordX == 0){
                    SealCoordY = SealCoordY - sealSpeed;
                }
                
            }
            //lose message
            else{
                lost = true;
                fill("#019FA5")
                rect(0, 200, 1500, 900)
                rect(650, 0, 220, 900)
                fill("black");
                textSize(100);
                text("The seals took over!", -450, -150);
                text("You killed " + sealskilled + " Seals, Great job!", -620, 40);
                 
                if (keyPressed == (32)){
                }
                return;
            }
        }
    }
    //leftside
    if (side == 2){
        //checken of de variabele al op de juiste hoogte/breedte staat
        if (doneleft == false){
            SealCoordX = -750;
            doneleft = true;
            return;
        }
        //starten met bewegingsproces
        if (doneleft == true){
            let distancegun = dist(SealCoordX, SealCoordY, player.x, player.y);
            seals.push(seal1.display());
            seals.push(seal1.move());
            //beweging
            if (distancegun > 100){
                if (SealCoordY < 0){
                    SealCoordX = SealCoordX + sealSpeed;
                    SealCoordY = SealCoordY + sealSpeed;
                }
                if (SealCoordY > 0){
                    SealCoordX = SealCoordX + sealSpeed;
                    SealCoordY = SealCoordY - sealSpeed;
                }
                if (SealCoordY == 0){
                    SealCoordX = SealCoordX + sealSpeed;
                }
            }
            //lose message
            else{
                lost = true;
                fill("#019FA5")
                rect(0, 200, 1500, 900)
                rect(650, 0, 220, 900)
                fill("black");
                textSize(100);
                text("The seals took over!", -450, -150);
                text("You killed " + sealskilled + " Seals, Great job!", -620, 40);
                  
                if (keyPressed == (32)){
                }
                return;
            }
        }
    }
     //rightside
    if (side == 3){
        //checken of de variabele al op de juiste hoogte/breedte staat
        if (doneright == false){
            SealCoordX = 750;
            doneright = true;
            return;
        }
        //starten met bewegingsproces
        if (doneright == true){
            let distancegun = dist(SealCoordX, SealCoordY, player.x, player.y);
            seals.push(seal1.display());
            seals.push(seal1.move());
            //beweging
            if (distancegun > 100){
                if (SealCoordY < 0){
                    SealCoordX = SealCoordX - sealSpeed;
                    SealCoordY = SealCoordY + sealSpeed;
                }
                if (SealCoordY > 0){
                    SealCoordX = SealCoordX - sealSpeed;
                    SealCoordY = SealCoordY - sealSpeed;
                }
                if (SealCoordY == 0){
                    SealCoordX = SealCoordX - sealSpeed;
                }
            }
            //lose message
            else{
                lost = true;
                fill("#019FA5")
                rect(0, 200, 1500, 900)
                rect(650, 0, 220, 900)
                fill("black");
                textSize(100);
                text("The seals took over!", -450, -150);
                text("You killed " + sealskilled + " Seals, Great job!", -620, 40);
                
                if (keyPressed == (32)){
                }
                return;
            }
        }
    }
    //seals hitdetectie

    if (sealhit == true){
        if (enemyHealth == 2){
            enemyHealth = enemyHealth - bulletDamage;
            return;
        }
    }
    if (sealdead == true && keyIsDown(32) == true && lost == false){
        enemyHealth = 0;
        coins = coins + 50;
        sealskilled = sealskilled + 1;
        SealCoordY = -450;
        sealSpeed = sealSpeed + 0.1;
        side = round(random(0,3));
        SealCoordX = random(-750, 750);
        seal1 = new seal(100, SealCoordX, SealCoordY, enemyHealth);
        doneup = false;
        donedown = false;
        doneleft = false;
        doneright = false;
        sealdead = false;
        enemyHealth = 2;
        sealhit = false;
    }
    island();
    for (let i = 0; i < bullets.length; i++){
        bullets[i].move();
        bullets[i].display();
    }
    player.display();    
    
}
function keyPressed(){
    if (keyCode == 32 && lost == false){                                                 //shooting w spacebar
    const bullet = new Bullet(0, 0, 20, atan2(mouseY - height/2 , mouseX - width/2), bltSpeed, bltSpeed)
    bullets.push(bullet);
    }
}
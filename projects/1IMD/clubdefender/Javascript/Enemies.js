const root = document.documentElement;
const enemy = document.querySelector(".student")
var SpawnInterval = 1000;
var Enemyspeed = 5;
var YposEnemy = -100;
var XposEnemy = 200;
var LostEnemy = false;
var WonEnemy
const enemyWidth = 100;
const enemyHeight = 100;
const hitpointselement = document.querySelector(".points");
const finalhitpointselement = document.querySelector(".points2");
var Hitpoints = 0;
var TotalTouched = 3;
var Upgradespeed = 1;

//deze functie reset de x variabele
setInterval(WinLose, 100);
function WinLose(){
    if(LostEnemy == true){
        XposEnemy = Math.floor(Math.random() * (500 - enemyWidth)) + 1;
        YposEnemy = -100;
        Lives = Lives - 1;
        LostEnemy = false;
    }
    else if(WonEnemy == true){
        XposEnemy = Math.floor(Math.random() * (500 - enemyWidth)) + 1;
        YposEnemy = -100;
        Hitpoints++;
        hitpointselement.innerHTML = Hitpoints;
        Upgradespeed = Upgradespeed + 0.02;
        WonEnemy = false;
    }
    root.style.setProperty('--enemy-x', XposEnemy + "px");
}
//deze functie zorgt voor het spawnen van enemies
setInterval(moveEnemies, Enemyspeed);
function moveEnemies(){
    if(GameOver == true){    //if gameover
        finalhitpointselement.innerHTML = Hitpoints;
    }
    else if (GameOver == false){    //if game not over
            //if enemy on y pos of player
            if(YposEnemy >= 350 && YposEnemy <= 400){
                if(collision(XposEnemy, YposEnemy, 61.5, 100, left, 480, 65, 101) == true){
                    return WonEnemy = true;
                }
            }
            //terugsturen als student club bereikt
            if(YposEnemy >=500){
                return LostEnemy = true;
            }
            else{
                //bijwerken enemy y
                YposEnemy = YposEnemy + Upgradespeed;
                root.style.setProperty('--enemy-y', YposEnemy + "px");
            }
        }
    }




function collision(x1,y1,w1,h1,x2,y2,w2,h2){
	if (((x1 + w1 - 1) < x2) ||
        ((x2 + w2 - 1) < x1) ||
        ((y1 + h1 - 1) < y2) ||
        ((y2 + h2 - 1) < y1)){
		return false;	 
	}
	else {
		return true;
	}
}

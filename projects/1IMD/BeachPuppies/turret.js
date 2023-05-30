let redcircle1 = "#191919";
let greenvizer1 = "#87CEFA";
let greenvizer2 = "#191919";
let lengthvizer1 = 134;                                                          //nullengte
class turret{
    constructor(turretX, turretY, turretSize, turretFollow){
        this.x = turretX;
        this.y = turretY;
        this.size = turretSize
        this.direction = turretFollow
    }
    display(){
        push();
        let turretFollow = atan2(mouseY - height/2 , mouseX - width/2); //volgen van muis
        // console.log(turretFollow);
        fill("#191919");
        noStroke();
        circle(this.x,this.y,this.size*15); //de turret cirkel (zwart)
        fill("#191919")
        rectMode(CENTER)
        rotate(90);
        rotate(turretFollow);  
        rect(this.x, this.y-75, this.size*5, this.size*20, 20);  //groot vierkant
        rect(this.x, this.y-75, this.size*2.5, this.size*22.5, 5);   //kleiner vierkant
        rotate(90);
        

        //upgrade1                                                              Speed Upgrade (Speed + Apperance)
        stroke(redcircle1);
        fill(redcircle1);
        rotate(-90);
        circle(0,0,40)
        rect(this.x, this.y-50, this.size*1, this.size*27, 3);
        fill("#191919");
        circle(0,0,20);

        //upgrade 2 
        noStroke()                                                            //Viser Upgrade (Apperance)
        rotate(90);
        fill(greenvizer2);
        circle(this.x - 130, this.y, this.size*1.5);
        stroke(greenvizer1)
        line(0 - 134, this.y, this.x - lengthvizer1, this.y)
        pop();

        dogDrawing(this.x, this.y, this.size);


        
    }
}

function SpeedUpgrade(){
    redcircle1 = "red";
}
function VizerUpgrade(){
    greenvizer1 = "green";
    greenvizer2 = "green";
    lengthvizer1 = 1000;
}


function dogDrawing(x, y, s){
    fill("#56422A");
    circle(x,y,s * 13)
    fill("white")
    //eye left
    circle(x - 15,y - 5,s*2)
    fill("black");
    circle(x - 15,y - 5,s*1)
    //eye right
    fill("white")
    circle(x + 15,y - 5,s*2)
    fill("black")
    circle(x + 15,y - 5,s*1)
    //nose
    beginShape()
    curveVertex(x - 10, y + 10);
    curveVertex(x + 10, y + 10);
    curveVertex(x, y + 20);
    endShape(CLOSE);
    fill("grey");
    circle(x - 3, y + 13, s*0.5);
    circle(x + 3, y + 13, s*0.5);
    //mouth
    stroke("black")
    line(x, y + 20, x, y + 25);
    line(x, y + 25, x+10, y + 35);
    line(x, y + 25, x-10, y + 35);
}
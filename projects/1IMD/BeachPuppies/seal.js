// let sealX = Math.floor(Math.random()*-1600) +850;
let hitvalue = true;
var sealhit = false;
class seal{
    constructor(sealSize, sealX, sealY, sealHealth){
        this.size = sealSize;
        this.x = sealX;
        this.y = sealY;
        this.health = sealHealth;
    }
    display(){
        sealdrawing(this.x, this.y, this.size, this.health);
    }
    move(){
        if (dist(this.x, this.y, mouseX - 700, mouseY - 400) <= 50 && keyIsDown(32) == true){
            if (upgrade3done == false){
                if (hitvalue == true){
                    sealhit = true;
                }
                if (hitvalue == false){
                    sealdead = true;
                }
            }
            if (upgrade3done == true){
                sealdead = true;
            }
        }
        else{
            sealhit = false;
        }
    }
}
function keyReleased(){
    if (hitvalue == false){
        hitvalue = true;
    }
    else{
        hitvalue = false;
    }
}
function sealdrawing(x, y, s, h){
    fill("grey");
    circle(x, y, s);
    fill("black");
    //eyes
    circle(x - 20, y - 10, s/8);
    circle(x + 20, y - 10, s/8);
    //nose
    beginShape()
    curveVertex(x - 10, y + 10);
    curveVertex(x + 10, y + 10);
    curveVertex(x, y + 20);
    endShape(CLOSE);
    fill("grey");
    circle(x - 3, y + 13, s/40);
    circle(x + 3, y + 13, s/40);

    stroke("black");
    strokeWeight(1)
    //linkermond
    line(x, y + 20, x - 4, y + 25);
    line(x - 4, y + 25, x - 10, y + 25);
    line(x - 10, y + 25, x - 14, y + 28);
    //rechtermond
    line(x, y + 20, x + 4, y + 25);
    line(x + 4, y + 25, x + 10, y + 25);
    line(x + 10, y + 25, x + 14, y + 28);
    //speckles right
    noStroke()
    fill("black")
    circle(x + 20, y + 10, s/30);
    circle(x + 30, y + 11, s/30);
    circle(x + 25, y + 20, s/30);
    //speckles left
    circle(x - 20, y + 10, s/30);
    circle(x - 30, y + 11, s/30);
    circle(x - 25, y + 20, s/30);

    rectMode(CORNER)
    fill("white");
    rect(x - 50, y + 70, 100, 20);
    fill("red");
    rect(x - 50, y + 70, 50*h, 20);
    rectMode(CENTER)
}
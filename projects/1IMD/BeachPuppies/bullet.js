class Bullet {
    constructor(bulletX, bulletY, bulletSize, bulletDirection, bulletSpeedX, bulletSpeedY) {
      this.x = bulletX;
      this.y = bulletY;
      this.size = bulletSize;
      this.rotation = bulletDirection
      this.speedX = bulletSpeedX
      this.speedY = bulletSpeedY;
    }
    display() {
        push();
        rotate(this.rotation - 45);
        fill("white");
        noStroke();
        circle(this.x, this.y, this.size);
        pop();
        
    }
    move(){
      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;
    }
}





// speed x en y heb ik niet meer nodig in de constructor ==> deze laten berekenen op basis van de hoek

  
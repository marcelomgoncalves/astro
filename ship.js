function Ship() {
  this.pos = createVector(width/2, height/2);
  this.r = 15;
  this.heading = -1.5700000000000001 ;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;
  
  this.lifeLost = function() {
    life-=1;
  }
  
  this.getLife = function() {
    return life;
  }
  
  this.update = function() {
    if (this.isBoosting) {
      this.boost();      
   //   line(this.r-15,this.r+20,15,20);
   //   line(this.r-30,this.r+10,-10,20);      
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }
  
  this.boosting = function(b)
  {
    this.isBoosting = b;
  }
  
  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }
  
  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
        return true;
    } else {
      return false;
    }
  }
  
  this.lifeRender = function() {
    push();
    translate(width-70,15);
    fill(255,0,0);
    stroke(255);
    if (this.getLife() == 1)
    {  
      triangle(-10, 10, 10, 10, 0, -10);
    } else if (this.getLife() == 2) {
      triangle(-10, 10, 10, 10, 0, -10);
      translate(25,0);
      triangle(-10, 10, 10, 10, 0, -10)          
    } else {
      triangle(-10, 10, 10, 10, 0, -10);
      translate(25,0);
      triangle(-10, 10, 10, 10, 0, -10)          
      translate(25,0);
      triangle(-10, 10, 10, 10, 0, -10)    
    }
    pop();
  }  
  
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    fill(0 );
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r)    
    if (this.isBoosting) {
  //    line(this.r-10,this.r+10,10,20);
  //    line(this.r-30,this.r+10,-10,20);      
      line(this.r-10,this.r+10,5,20);
      line(this.r-20,this.r+10,-5,20);      
    }    
    pop();
  }
  
  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }    
  }
  
  this.setRotation = function(a) {
    this.rotation = a;
  }
  
  this.turn = function() {
    this.heading += this.rotation;
  }
}
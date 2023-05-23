function Burst(xpos, scolor) {
  this.color = scolor;
  this.length = 10;
  this.count = 36;
  this.name = "burst";
  this.speed = 10;
  this.position = createVector(xpos.x, xpos.y);
  this.b_delete = false;
  this.radius = 0;
  
 
  this.RotatePoint = function (p, center, angle) {
		  return {
			  x: ((p.x-center.x)*cos(angle) - (p.y-center.y)*sin(angle)) + center.x,
			  y: ((p.x-center.x)*sin(angle) + (p.y-center.y)*cos(angle)) + center.y
		  };
  };  
  
  this.Update = function() {
        this.radius += this.speed;
        if (this.radius > width || this.radius > height) {
            this.b_delete = true;
          this.radius = 0;
        }                        
  }
    
  this.Draw = function() {
	 drawingContext.save();
     drawingContext.translate(this.position.x, this.position.y);
	 drawingContext.beginPath();
      for (var i = 0; i < this.count; i++) {
          var v1 = this.RotatePoint({x:0, y:this.radius}, {x:0,y:0}, 2/this.count*i*PI);
          var v2 = this.RotatePoint({x:0, y:this.radius+this.length}, {x:0,y:0}, 2/this.count*i*PI);
         drawingContext.moveTo(v1.x, v1.y);
        drawingContext.lineTo(v2.x, v2.y);
      }
      drawingContext.closePath();
      drawingContext.strokeStyle = this.color;
      drawingContext.shadowColor = this.color;
      drawingContext.shadowBlur = 5;
	  drawingContext.stroke();
	  drawingContext.restore();     
  };
};
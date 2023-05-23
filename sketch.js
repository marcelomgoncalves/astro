let ship;
let asteroids = [];
let lasers = [];
let score = 0; 
let diva;
let life = 3;
let burst;
let ctx;


function setup() {
  canvas = createCanvas(1280, 1024);
  background(0);
  //ctx = canvas.getContext("2d");
  
  //canvas.style("display", "block");
  diva = document.getElementById("score");
  ship = new Ship();
  for (var i=0; i<5; i++)
    {
      asteroids.push(new Asteroid());
    }    
  burst = null; 
}

function restartGame() {
  noLoop();
    ship = null;
    asteroids = [];
    score = 0;
    setup();
    loop();
}

function draw() {
  background(0);

  for (var i = lasers.length-1; i>=0; i--)
  {
    lasers[i].render();      
    lasers[i].update();
    
    // apaga o tiro de laser quando sair da tela
    if (lasers[i].offscreen()){
        lasers.splice(i,1);      
      
    } else {
    
      for (var j = asteroids.length-1; j>=0; j--)
      {    
        if (lasers[i].hits(asteroids[j])){        
          if (asteroids[j].r > 15) {
            var newAsteroids = asteroids[j].breakup();           
            asteroids = asteroids.concat(newAsteroids);
          } else {
            score++;
            burst = new Burst({x:lasers[i].pos.x, y: lasers[i].pos.y},'#F00');
          }
          asteroids.splice(j ,1);
          lasers.splice(i,1);
          break;
        }
        
        // se tivermos somente 2 asteroids, adiciona 5 novamente
        var npos
        if (asteroids.length == 2) {      
          for (var x = 0; x<5; x++){
            if (random(1) == 1) {
              npos = createVector(0, 0);
            }
            else  {
              npos = createVector(width, height);              
            }
            asteroids.push(new Asteroid(npos));          
          }
        }

      }
      
    }
    
        
  }  
  
  if (burst) {
    if (!burst.b_delete){
       burst.Draw();
       burst.Update();        
    }
  }
    
//  diva.innerhtml="SCORE:"+score;
  textSize(15);  
  fill(255, 255, 0);  
  text("PONTUAÇÃO: "+score, 10,15);
  diva.innerText = "PONTUAÇÃO: " + score +"  Vidas:"+life ;
  
  
  //console.log(diva.value);
  
  
  ship.render();
  ship.turn();
  ship.edges();
  ship.update();
  ship.lifeRender();
  
  for (var i = 0; i < asteroids.length; i++)
  {
    if (ship.hits(asteroids[i])) {
      //noLoop()
      if (ship.getLife() > 1) {
        asteroids.splice(i,1);
        burst = new Burst({x:ship.pos.x, y: ship.pos.y}, '#BBE');
        ship.lifeLost();
        break;
        
        //restartGame();

      } else {
        life = 3;
        restartGame();
        break;
      }
    }
    loop();

    asteroids[i].render();      
    asteroids[i].edges();
    asteroids[i].update();
  }
  
    
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}


function keyPressed() {
  if (key == ' ') {    
    lasers.push(new Laser(ship.pos, ship.heading));     
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }  
}


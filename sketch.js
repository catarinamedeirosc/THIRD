let count = 1000;

var particles_a = [];
var particles_b = [];
var particles_c = [];
var fade = 200;
var radius = 3;

const w = 300;
const h = 300;

let noiseScale = 300;
let noiseStrength = 1.2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
  
  for (let i=0; i<count; i++) {
    let loc_a = createVector(random(w) + windowWidth*0.5 - w*0.5, random(h) + windowHeight*0.5 -h*0.5, 2);
    let angle_a = random(TWO_PI);
    let dir_a = createVector(cos(angle_a), sin(angle_a));
    
    let loc_b = createVector(random(w) + windowWidth*0.5 - w*0.5, random(h) + windowHeight*0.5-h*0.5, 2);
    let angle_b = random(TWO_PI);
    let dir_b = createVector(cos(angle_b), sin(angle_b));
    
    let loc_c = createVector(random(w) + windowWidth*0.5 - w*0.5, random(h) + windowHeight*0.5-h*0.5, 2);
    let angle_c = random(TWO_PI);
    let dir_c = createVector(cos(angle_c), sin(angle_c));
    
    particles_a[i] = new Particle(loc_a, dir_a, 0.5);
    particles_b[i] = new Particle(loc_b, dir_b,0.6);
    particles_c[i] = new Particle(loc_c, dir_c, 0.75);
  }
}


function draw() {
  fill(0,5);
  noStroke();
  rect(0,0,width, height);
  
  for (let i=0; i<count; i++) {
    
    fill(191, 19, 99, fade);
    particles_a[i].move();
    particles_a[i].update(radius);
    particles_a[i].checkEdges();
    
    fill (57,166,163, fade);
    particles_b[i].move();
    particles_b[i].update(radius);
    particles_b[i].checkEdges();
    
    fill(222,238,234,fade);
    particles_c[i].move();
    particles_c[i].update(radius);
    particles_c[i].checkEdges();
  }
}

let Particle = function(loc_, dir_, speed_) {
  this.loc = loc_;
  this.dir = dir_;
  this.speed = speed_;
  this.d = 1;
}

Particle.prototype.run = function() {
  this.move();
  this.checkEdges();
  this.update();
}

Particle.prototype.update = function(r) {
  ellipse(this.loc.x, this.loc.y, r);
}

Particle.prototype.checkEdges = function() {
  if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
    this.loc.x = random(w) + windowWidth*0.5 - w*0.5;
    this.loc.y = random(h) + windowHeight*0.5 - h*0.5;
  }
}

Particle.prototype.move = function() {
  this.angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale) * TWO_PI*noiseStrength;
  this.dir.x = cos(this.angle) + sin(this.angle) - sin(this.angle);
  this.dir.y = sin(this.angle) - cos(this.angle)*sin(this.angle);
  this.vel = this.dir.copy();
  this.vel.mult(this.speed*this.d);
  this.loc.add(this.vel);
}


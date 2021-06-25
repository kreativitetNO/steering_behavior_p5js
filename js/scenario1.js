let simulation;
let pursuer;
let target;
let canvasWidth = 800;
let canvasHeight = 600;

function setup()
{
    simulation = new Simulation(canvasWidth, canvasHeight);
    simulation.initialize();

    pursuer = new Vehicle(createVector(random(canvasWidth), random(canvasHeight)), 10);
    pursuer.setMaxSpeed(10);
    pursuer.setColor(255, 0, 0);
    
    target = new Vehicle(createVector(random(canvasWidth), random(canvasHeight)), 10);
    target.setWrapAroundHorizontalLimits(0, canvasWidth - 1);
    target.setWrapAroundVerticalLimits(0, canvasHeight - 1);
    target.setMaxSpeed(4);
    target.setColor(0, 255, 0);

    let pursuerSeekingBehavior = new SeekBehavior(pursuer, target);
    let targetFleeingBehavior = new FleeBehavior(target, pursuer);
    targetFleeingBehavior.setProximityBoost(5, 150, 0.9); 

    pursuer.addSteeringBehavior(pursuerSeekingBehavior);
    target.addSteeringBehavior(targetFleeingBehavior);
    
    
    simulation.addVehicle(pursuer);
    simulation.addVehicle(target);
}

function keyPressed()
{
    target.resetPosition();
}

function draw()
{
    simulation.update();
    simulation.draw();
}
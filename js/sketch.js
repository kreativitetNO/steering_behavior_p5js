// TODO remove "magic numbers"
// TODO find a way to prevent simulation from converging
// TODO implement multiple pursuers and/or targets (auto-retargeting?)

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
    pursuer.setSteeringBehavior(Vehicle.seek);
    pursuer.setMaxSpeed(10);
    pursuer.setColor(255, 0, 0);

    target = new Vehicle(createVector(random(canvasWidth), random(canvasHeight)), 10);
    target.setWrapAroundHorizontalLimits(0, canvasWidth - 1);
    target.setWrapAroundVerticalLimits(0, canvasHeight - 1);
    target.setSteeringBehavior(Vehicle.flee);
    target.setMaxSpeed(4);
    target.setColor(0, 255, 0);

    pursuer.setTarget(target);
    target.setTarget(pursuer);

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
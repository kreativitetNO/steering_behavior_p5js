let simulation;
let pursuer;
let fraidyCat;
let target;
let canvasWidth = 800;
let canvasHeight = 600;

function setup()
{
    simulation = new Simulation(canvasWidth, canvasHeight);
    simulation.initialize();

    pursuer = new Vehicle(createVector(random(canvasWidth), random(canvasHeight)), 10);
    pursuer.setMaxSpeed(2);
    pursuer.setColor(255, 0, 0);
    
    target = new Vehicle(createVector(random(canvasWidth), random(canvasHeight)), 10);
    target.setWrapAroundHorizontalLimits(0, canvasWidth - 1);
    target.setWrapAroundVerticalLimits(0, canvasHeight - 1);
    target.setMaxSpeed(3);
    target.setColor(0, 255, 0);

    fraidyCat = new Vehicle(createVector(canvasWidth / 2, canvasHeight / 2), 10);
    fraidyCat.setWrapAroundHorizontalLimits(0, canvasWidth - 1);
    fraidyCat.setWrapAroundVerticalLimits(0, canvasHeight - 1);
    fraidyCat.setMaxSpeed(10);
    fraidyCat.setColor(255, 255, 0);
    
    let pursuerBehavior = new PursueBehavior(pursuer, target);

    let targetBehavior = new WanderBehavior(target, 50);

    let fraidyCatBehavior1 = new FleeBehavior(fraidyCat, pursuer);
    fraidyCatBehavior1.setProximityBoost(5, 100, 0.9);
    fraidyCatBehavior1.setActivationPredicate(() => {
        let dist = fraidyCat.getPosition().dist(pursuer.getPosition());
        return dist < 200;
    });

    let fraidyCatBehavior2 = new FleeBehavior(fraidyCat, target);
    fraidyCatBehavior2.setProximityBoost(5, 100, 0.9);
    fraidyCatBehavior2.setActivationPredicate(() => {
        let dist = fraidyCat.getPosition().dist(target.getPosition());
        return dist < 200;
    });

    let fraidyCatBehaviorIdle = new StopBehavior(fraidyCat);
    fraidyCatBehaviorIdle.setActivationPredicate(() => {
        let dist1 = fraidyCat.getPosition().dist(pursuer.getPosition());
        let dist2 = fraidyCat.getPosition().dist(target.getPosition());
        return dist1 > 300 && dist2 > 300;
    });

    pursuer.addSteeringBehavior(pursuerBehavior);
    target.addSteeringBehavior(targetBehavior);

    fraidyCat.addSteeringBehavior(fraidyCatBehavior1);
    fraidyCat.addSteeringBehavior(fraidyCatBehavior2);
    fraidyCat.addSteeringBehavior(fraidyCatBehaviorIdle);
    
    simulation.addVehicle(pursuer);
    simulation.addVehicle(target);
    simulation.addVehicle(fraidyCat);
}

function keyPressed()
{
    target.resetPosition();
    fraidyCat.resetPosition();
}

function draw()
{
    simulation.update();
    simulation.draw();
}
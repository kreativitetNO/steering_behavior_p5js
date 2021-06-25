class Simulation
{
    constructor(canvasWidth, canvasHeight)
    {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.vehicles = new Array();
    }

    initialize()
    {
        createCanvas(this.canvasWidth, this.canvasHeight);
        let div = createDiv("Press a key to reset target if simulation converges.");
        div.style('color', '#fff');
        div.style('font-size', '16px');
        div.position(10, this.canvasHeight + 20);
    }

    addVehicle(vehicle)
    {
        this.vehicles.push(vehicle);
    }

    update()
    {
        for (let vehicle of this.vehicles)
        {
            vehicle.update();
        }
    }

    draw()
    {
        background(255, 255, 255, 200);
        for (let vehicle of this.vehicles)
        {
            vehicle.draw();
        }
    }
}
class Vehicle
{
    constructor(initialPosition, size)
    {
        this.initialPosition = initialPosition.copy();
        this.position = initialPosition.copy();
        this.velocity = createVector();
        this.acceleration = createVector();
        this.maxSpeed = 6;
        this.color = color(0, 0, 0);
        this.boost = 1;
        this.maxForce = 0.25;
        this.size = size;
        this.steeringBehavior = null;
        this.target = null;
        this.wrapAroundHorizontalLimits = null;
        this.wrapAroundVerticalLimits = null;
    }

    static seek(vehicle)
    {
        if (vehicle.target == null) return null;

        let force = p5.Vector.sub(vehicle.target.position, vehicle.position);
        force.setMag(vehicle.maxSpeed);
        force.sub(vehicle.velocity);
        force.limit(vehicle.maxForce);
        return force;
    }
    
    static flee(vehicle)
    {
        let dist = vehicle.position.dist(vehicle.target.position);
        if (dist < 150)
            vehicle.applyBoost(5 * 150 / dist);
        else
            vehicle.applyBoost(1);
        return Vehicle.seek(vehicle).mult(-1);
    }

    applyBoost(boost)
    {
        this.boost = boost;
    }
    
    setSteeringBehavior(f)
    {
        this.steeringBehavior = f;
    }

    setTarget(target)
    {
        this.target = target;
    }

    setColor(r, g, b)
    {
        this.color = color(r, g, b);
    }

    setWrapAroundHorizontalLimits(left, right)
    {
        this.wrapAroundHorizontalLimits = { left, right };
    }

    setWrapAroundVerticalLimits(top, bottom)
    {
        this.wrapAroundVerticalLimits = { top, bottom };
    }

    setMaxSpeed(speed)
    {
        this.maxSpeed = speed;
    }

    getPosition()
    {
        return this.position.copy();
    }

    resetPosition()
    {
        this.position = this.initialPosition.copy();
    }

    getSize()
    {
        return this.size;
    }

    wrapAround()
    {
        if (this.wrapAroundHorizontalLimits != null)
        {
            if (this.position.x < this.wrapAroundHorizontalLimits.left - this.size)
                this.position.x = this.wrapAroundHorizontalLimits.right + this.size;
            else if (this.position.x > this.wrapAroundHorizontalLimits.right + this.size)
                this.position.x = this.wrapAroundHorizontalLimits.left - this.size;
        }
        if (this.wrapAroundVerticalLimits != null)
        {
            if (this.position.y < this.wrapAroundVerticalLimits.top - this.size)
                this.position.y = this.wrapAroundVerticalLimits.bottom + this.size;
            else if (this.position.y > this.wrapAroundVerticalLimits.bottom + this.size)
                this.position.y = this.wrapAroundVerticalLimits.top - this.size;
        }
    }

    update()
    {
        if (this.steeringBehavior != null)
        {
            let force = this.steeringBehavior(this);
            this.applyForce(force);
        }
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.wrapAround();
        this.acceleration.set(0, 0);
        this.speedBoost = 1;
    }

    applyForce(force)
    {
        if (force != null)
        {
            this.acceleration.add(force.mult(this.boost));
        }
    }


    draw()
    {
        strokeWeight(1);
        stroke(25);
        fill(this.color);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
        pop();
    }
}
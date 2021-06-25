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
        this.maxForce = 0.25;
        this.size = size;
        this.steeringBehaviors = new Array();
        this.wrapAroundHorizontalLimits = null;
        this.wrapAroundVerticalLimits = null;
    }

    addSteeringBehavior(behavior)
    {
        this.steeringBehaviors.push(behavior);
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

    getVelocity()
    {
        return this.velocity.copy();
    }

    getMaxForce()
    {
        return this.maxForce;
    }

    getMaxSpeed()
    {
        return this.maxSpeed;
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
        let force = createVector();
        let boost = 0;
        for (let steeringBehavior of this.steeringBehaviors)
        {
            if (steeringBehavior.isActive())
            {
                force.add(steeringBehavior.calculateForce().mult(steeringBehavior.getStrength()));
                boost += steeringBehavior.calculateBoost();
            }
        }
        force.limit(this.maxForce * (1 + boost))
        this.applyForce(force);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.wrapAround();
        this.acceleration.set(0, 0);
    }

    applyForce(force)
    {
        this.acceleration.add(force);
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
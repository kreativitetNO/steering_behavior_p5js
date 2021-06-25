class WanderBehavior extends SteeringBehavior
{
    constructor(subject, randomness, strength = 1)
    {
        super(subject, null, strength);
        this.randomness = randomness;
    }

    calculateForce()
    {
        let velocity = this.subject.getVelocity();
        if (velocity.mag() === 0)
        {
            return p5.Vector.random2D().mult(this.subject.getMaxForce());
        }
        else
        {
            velocity.add(p5.Vector.random2D().mult(velocity.mag() * this.randomness));
            return velocity;
        }
    }
}
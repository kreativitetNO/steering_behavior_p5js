class PursueBehavior extends SteeringBehavior
{
    constructor(subject, target, strength = 1)
    {
        super(subject, target, strength);
    }

    calculateForce()
    {
        if (this.target == null) return createVector2D();

        let target = this.target.getPosition();
        let velocity = this.target.getVelocity();
        velocity.mult(10);
        target.add(velocity);

        let desired = p5.Vector.sub(target, this.subject.getPosition());
        desired.setMag(this.subject.maxSpeed);
        let steering = p5.Vector.sub(desired, this.subject.getVelocity());
        return steering;
    }
}
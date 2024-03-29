class SeekBehavior extends SteeringBehavior
{
    constructor(subject, target, strength = 1)
    {
        super(subject, target, strength);
    }

    calculateForce()
    {
        if (this.target == null) return createVector2D();

        let desired = p5.Vector.sub(this.target.getPosition(), this.subject.getPosition());
        desired.setMag(this.subject.maxSpeed);
        let steering = p5.Vector.sub(desired, this.subject.getVelocity());
        return steering;
    }
}
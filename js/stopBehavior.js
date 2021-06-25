class StopBehavior extends SteeringBehavior
{
    constructor(subject)
    {
        super(subject);
    }

    calculateForce()
    {
        return this.subject.getVelocity().mult(-0.1);
    }
}
class FleeBehavior extends SeekBehavior
{
    constructor(subject, target, strength)
    {
        super(subject, target, strength);
    }

    calculateForce()
    {
        return super.calculateForce().mult(-1);
    }
}
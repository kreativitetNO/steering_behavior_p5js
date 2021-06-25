class EvadeBehavior extends PursueBehavior
{
    constructor(subject, target, strength = 1)
    {
        super(subject, target, strength);
    }

    calculateForce()
    {
        return super.calculateForce().mult(-1);
    }
}
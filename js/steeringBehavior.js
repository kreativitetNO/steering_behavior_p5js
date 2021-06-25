class SteeringBehavior
{
    constructor(subject, target = null, strength = 1)
    {
        this.subject = subject;
        this.strength = strength;
        this.target = target;
        this.pred = null;
        this.proximityBoost = { initialBoost: 0, currentBoost: 0, range: 0, decay: 0 };
    }

    setTarget(vector)
    {
        this.target = vector;
    }

    setProximityBoost(initialBoost, range, decay = 0.9)
    {
        this.proximityBoost = { initialBoost, currentBoost: initialBoost, range, decay };
    }

    getStrength()
    {
        return this.strength;
    }

    setActivationPredicate(pred)
    {
        this.pred = pred;
    }

    isActive()
    {
        if (this.pred == null)
            return true;
        else
            return this.pred();
    }

    calculateForce()
    {
        return createVector();
    }

    calculateBoost()
    {
        if (this.target == null) return 0;

        let dist = this.target.position.dist(this.subject.position);
        if (dist <= this.proximityBoost.range)
            this.proximityBoost.currentBoost = this.proximityBoost.initialBoost;

        let boost = this.proximityBoost.currentBoost;
        this.proximityBoost.currentBoost *= this.proximityBoost.decay;
        return boost;
    }
}
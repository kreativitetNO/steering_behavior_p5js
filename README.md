# Alternative implementation of Steering Behavior using p5js

This is a slightly different approach than Dan implements in chapter 5 of his [Nature of Code 2 playlist](https://www.youtube.com/watch?v=70MQ-FugwbI&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM). The main differences are:

- Steering behaviors are implemented as subclasses of a base SteeringBehavior class
- Behaviors can be activated/deactivated using a predicate function
- Multiple behaviors can be attached to each vehicle and all of the behaviors that are active will have their forces accumulated
- Behaviors can include a proximity boost that temporarily increases the maximum force

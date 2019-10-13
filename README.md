# Dove-Hawk-GameTheory-Simulation
Populations of Doves and Hawks compete for food!

Controls:

    P: Play/Pause Animation

    R: Reset animation to the first timestep

    S: Switch scenes

    X: Initialise Dove and Hawk populations

    SPACEBAR: Increment timestep by 1

    BACKSPACE: Decrement timestep by 1

    UP/DOWN: Zoom in/out

    DRAG: Drag the graph/s

    SHIFT: Reposition graph/s

This simulates a market between two species, Doves and Hawks. All D/H search for food each timestep. There are only (MAX=500) pieces of food each timestep. If a creature is the only one to find a piece of food, it gets to keep all the food, if however another creature finds the same piece/s of food also, it must share according to the rules (see gameTheory variable.) The amount of food eaten by a species determines the number of individuals of that species in the next timestep.

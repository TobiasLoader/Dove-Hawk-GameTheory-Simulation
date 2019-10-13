# Hawk-Dove-GameTheory-Simulation
Populations of Hawks and Doves compete for food!

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

This is a simulation of two species, Doves and Hawks, each with differenct traits. The Doves has a tendancy to share, whilst to Hawks are more agressive. All D/H search for food each timestep. There are only (MAX=500) pieces of food each timestep. If a creature is the only one to find a piece of food, it gets to keep all the food, if however another creature finds the same piece/s of food also, it must share according to the rules (see gameTheory variable.) The amount of food eaten by a species determines the number of individuals of that species in the next timestep.

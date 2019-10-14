# Hawk-Dove Game Simulation
Populations of Hawks and Doves compete for food!

Having watched a YouTube video about the concept of the Hawk-Dove model of game theory during the summer of 2019 I was inspired to create my own simulator to help me explore the idea. This tied in nicely with previous work I'd done on modelling predator-prey interactions with differential equations on the graphing calculator Desmos.com.

This is a simulation of population changes over time across two competing species – Hawks and Doves. Each has different traits; Hawks are often agressive, whilst Doves have a tendancy to share. All Hawks and Doves search for food during each timestep. There is a maximum of 500 pieces of food available for consumption by the populations during each timestep. If a Hawk or Dove is the only one to find a piece of food, it gets to keep all of it. If however, another Hawk or Dove finds the same piece of food, they must share that piece according to specific rules (see gameTheory variable below). The total quantity  of food eaten by a given species determines the number of individuals of that species spawning in the subsequent timestep.

A common finding from running my Hawk-Dove simulation is that when there are few of one species and many of the other, the few rapidly catch up to the trend line; there is very little variation about the trendline. This holds true irrespective of the majority species – Hawk or Dove. It therefore appears to be advantageous to be a member of the minority species. By inspection it also appears evident that a general anticlockwise bias exists, particularily noticeable when dealing with extreme (Dove,Hawk) coordinate points, i.e. points far from the trendline. I have noticed this trend before when modelling predator-prey interactions with differential equations.


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
 
 
 Game Theory Variable:
    
    F = 9/4; // Slightly above 2 to allow growth in population size despite waste.
    
    gameTheory = [
	    [ 3*F/6,   2*F/6],   // Dove: D, H
	    [ 4*F/6,   0*F/6]    // Hawk: D, H
	];




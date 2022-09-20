# Angry Balls - An Angry Birds clone
This project is a demonstration of the Matter.js library. Based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
## How to Play
- Knock all the green blocks off screen before the timer runs out
- Click, drag and release the red ball to knock the blocks over
- For addtional balls, press 'b' , the balls will appear wherever the moouse cursor is
- To launch the addtional balls, use the propeller by pressing the left or right arrow keys to spin it. More presses in the same direction = more speed!
## Files
- physics.js - Handles the drawing and phsyics of the objects in the game ( balls, called 'birds', tower blocks etx) and the physics governeing using the matter.js library. 
- sketch.js - The main file of the program. Runs the draw loop and calls the functions from physics.js as well as handles the game over screen, timer, keypressed responses and updates the physics engine
## To do
- The mouse can directly manipudate the boxes, so a new constraint needs to be added to handle that
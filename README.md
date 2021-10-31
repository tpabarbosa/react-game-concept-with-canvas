# React Game Concept with HTML Canvas

🔹 This is a simple game concept made in [React](https://github.com/facebook/react) with [Typescript](https://github.com/Microsoft/TypeScript). I also installed [styled-components](https://github.com/styled-components/styled-components) library to help with css. 🔹 

![game-screenshot](images/game-screenshot.png?raw=true)

🔸 Map and Entities rendering were made in [HTML Canvas elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) with [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). 🔸 

❗ This game was made **to learn React basics** so I dind't use redux to state management but I made my own state control (maybe it's not a good one - but, well, if it works it's good!! 😏). I tried to implement some kind of a *finite state machine* logic without any libraries.  
![code-screenshot](images/levelTransitions-in-LevelState-file.png?raw=true)


##How to play
- **Browers** 
Just hit **Enter** to start, pause, unpause, end level and restart, **wasd** or **arrows** to move. 

- **Mobile** *
Touch **buttons** at the bottom to do everything.

Oh, you are the little girl in the middle, and must collect every coin to get to next level! Monsters will chase you, but from time to time they will take a little rest. Game ends when monsters get you 3 times.

> ### Try it:
> 
> https://react-game-concept-with-canvas.vercel.app/
>
> 🛑 May be laggy in some old or not updated smartphones

## Todo

It's not an original idea, nor a really great game, but I  would like to implement some more details:

- A name for the game;
- More monsters, more items, more heroes;
- A highscore with data saved in localStorage;
- A screen before game starts where players could choose an hero, give it a name, set volume, get high scores;
- Give some kind of power-up to hero, so he/she could fight against monsters or have some defense against them;
- Improve maps and design more levels;

🤔 That's all I can think of by now...


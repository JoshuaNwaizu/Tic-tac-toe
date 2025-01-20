# Tic Tac Toe Game

This is a Tic Tac Toe game built with React and TypeScript. The application allows users to play Tic Tac Toe against another player or against a computer (CPU). 

## Project Structure

- **src/components/Game.tsx**: The main game component that handles the rendering of the game board and player interactions.
- **src/context/TicTacToeContext.tsx**: Defines the context for the game, managing state with React's `useReducer` hook. It includes logic for player and CPU moves.
- **src/types/index.ts**: Contains TypeScript interfaces and types used throughout the application.
- **src/App.tsx**: The entry point of the application, setting up the main structure and providing context to components.
- **tsconfig.json**: TypeScript configuration file specifying compiler options.
- **package.json**: npm configuration file listing dependencies and scripts.

## Features

- Play against another player or the computer.
- Keeps track of scores and game state.
- Responsive design for various screen sizes.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tic-tac-toe
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

Open your browser and go to `http://localhost:3000` to play the game.

## License

This project is licensed under the MIT License.
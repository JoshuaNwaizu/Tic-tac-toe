import { useNavigate } from "react-router";
import Board from "./components/Board";
import Nav from "./components/Nav";
import PlayerInfo from "./components/PlayerInfo";
import { useTicTacToe } from "./contexts/TicTacToeContext";
import { useEffect } from "react";

const GamePage = () => {
  const navigate = useNavigate();
  const { hasSelectedMode } = useTicTacToe(); // Get state from context

  useEffect(() => {
    if (!hasSelectedMode) {
      navigate("/"); // Redirect to home if no mode was selected
    }
  }, [hasSelectedMode, navigate]);

  if (!hasSelectedMode) return null; // Prevent rendering before redirect

  return (
    <div className="mt-5 flex flex-shrink-0 flex-col items-center md:mt-0 md:h-svh md:justify-center">
      <Nav />
      <Board />
      <PlayerInfo />
    </div>
  );
};

export default GamePage;

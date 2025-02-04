import Board from "./components/Board";
// import Modal from "./components/Modal";
import Nav from "./components/Nav";
import PlayerInfo from "./components/PlayerInfo";

const GamePage = () => {
  return (
    <div className="mt-5 flex flex-shrink-0 flex-col items-center md:mt-0 md:h-svh md:justify-center">
      <Nav />
      <Board />
      <PlayerInfo />
    </div>
  );
};

export default GamePage;

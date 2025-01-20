import Board from "./components/Board";
// import Modal from "./components/Modal";
import Nav from "./components/Nav";
import PlayerInfo from "./components/PlayerInfo";

const GamePage = () => {
  return (
    <div className="flex flex-col items-center flex-shrink-0 mt-5 md:mt-0 md:justify-center">
      <Nav />
      <Board />
      <PlayerInfo />
    </div>
  );
};

export default GamePage;

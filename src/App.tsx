import { createBrowserRouter, RouterProvider } from "react-router";
import GamePage from "./game/GamePage";
import Home from "./home/Home";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/game/:mode", element: <GamePage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

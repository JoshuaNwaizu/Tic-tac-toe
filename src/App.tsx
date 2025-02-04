import { createBrowserRouter, RouterProvider } from "react-router";
import GamePage from "./game/GamePage";
import Home from "./home/Home";
import ErrorPage from "./game/ErrorPage";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/game/:mode", element: <GamePage /> },
    { path: "*", element: <ErrorPage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

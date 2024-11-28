import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import HomeTemplate from "./templates/HomeTemplate";
import HomePage from "./pages/HomePage";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return routes;
}

export default App;

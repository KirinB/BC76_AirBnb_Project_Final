import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";

import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: pathDefault.searchPage,
        element: <SearchPage />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return routes;
}

export default App;

import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";

import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import { SearchPageProvider } from "./store/SearchPageContext";

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
        element: (
          <SearchPageProvider>
            <SearchPage />
          </SearchPageProvider>
        ),
      },
      {
        path: pathDefault.roomDetailPage,
        element: <RoomDetail />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return routes;
}

export default App;

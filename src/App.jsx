import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";

import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./templates/HomeTemplate/components/ProfilePage";
import RoomDetail from "./pages/RoomDetail/RoomDetail";

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
      {
        path: pathDefault.roomDetailPage,
        element: <RoomDetail />,
      },
      {
        path: pathDefault.Profile,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: pathDefault.AuthPage,
    element: <AuthPage />,
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return routes;
}

export default App;

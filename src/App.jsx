import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import "react-toastify/dist/ReactToastify.css";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import DashBoard from "./pages/DashBoard/DashBoard";
import ManagerUser from "./pages/ManagerUser/ManagerUser";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import ManagerReservation from "./pages/ManagerReservation/ManagerReservation";
import ManagerRoom from "./pages/ManagerRoom/ManagerRoom";
import SignInAdmin from "./pages/SignInAdmin/SignInAdmin";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./templates/HomeTemplate/components/ProfilePage";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import { SearchPageProvider } from "./store/SearchPageContext";
import { RoomDetailProvider } from "./store/RoomDetailContext";
import { createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const NotificationContext = createContext();

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
        element: (
          <RoomDetailProvider>
            <RoomDetail />
          </RoomDetailProvider>
        ),
      },
      {
        path: pathDefault.Profile,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: pathDefault.signInAdmin,
    element: <SignInAdmin />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: pathDefault.dashBoard, element: <DashBoard /> },
      {
        path: pathDefault.managerUser,
        element: <ManagerUser />,
      },
      {
        path: pathDefault.managerLocation,
        element: <ManagerLocation />,
      },
      {
        path: pathDefault.managerReservation,
        element: <ManagerReservation />,
      },
      {
        path: pathDefault.managerRoom,
        element: <ManagerRoom />,
      },
    ],
  },
  {
    path: pathDefault.AuthPage,
    element: <AuthPage />,
  },
];

function App() {
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const routes = useRoutes(arrRoutes);
  return (
    <>
      <NotificationContext.Provider value={{ handleNotification }}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;

import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import { createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import DashBoard from "./pages/DashBoard/DashBoard";
import ManagerUser from "./pages/ManagerUser/ManagerUser";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import ManagerReservation from "./pages/ManagerReservation/ManagerReservation";
import ManagerRoom from "./pages/ManagerRoom/ManagerRoom";
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
        element: <SearchPage />,
      },
    ],
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
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
];

function App() {
  const routes = useRoutes(arrRoutes);
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

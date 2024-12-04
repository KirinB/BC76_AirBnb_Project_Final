import React, { useEffect, useState } from "react";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import { phongService } from "../../services/phong.service";
import FilterSearch from "./components/FilterSearch";
import RoomSearch from "./components/RoomSearch";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listRoom, setListRoom] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const keyValue = queryParams.get("key");

  // console.log(keyValue);
  useEffect(() => {
    setIsLoading(true);
    if (keyValue) {
      phongService
        .getListRoomById(keyValue)
        .then((res) => {
          console.log(res.data.content);
          setListRoom(res.data.content);
          setIsLoading(false);
        })
        .catch();
    }
  }, []);
  return keyValue ? (
    <div className="min-h-screen">
      <FilterSearch />
      {isLoading ? (
        // <div className="container">
        <LoadingCustom />
      ) : (
        // </div>
        // <div className="container">
        <div className="grid grid-cols-2 relative">
          <div className="px-6">
            <h2 className="my-6">{listRoom.length} trải nghiệm</h2>
            <div className="grid grid-cols-3 gap-5">
              {listRoom.map((item, index) => {
                return <RoomSearch key={index} image={item.hinhAnh} />;
              })}
            </div>
          </div>
          <div className="stick top-0 right-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.733751529093!2d106.67949018359035!3d10.765915810662738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1733132503217!5m2!1svi!2s"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full min-h-screen"
            />
          </div>
        </div>
        // </div>
      )}
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <img src="404_not_found.jpg" />
    </div>
  );
};

export default SearchPage;

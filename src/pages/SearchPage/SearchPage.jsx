import React, { useEffect, useState } from "react";
import LoadingCustom from "../../components/ui/loading/LoadingCustom";
import { phongService } from "../../services/phong.service";
import FilterSearch from "./components/FilterSearch";
import RoomSearch from "./components/RoomSearch";
import { Pagination } from "antd";
import PageNotFound from "../../components/PageNotFound";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
        .catch((err) => {
          // console.log(err);
          setIsError(true);
        });
    }
  }, []);
  console.log(isError);
  return keyValue && !isError ? (
    <div className="min-h-screen">
      <FilterSearch />
      {isLoading ? (
        // <div className="container">
        <LoadingCustom />
      ) : (
        // </div>
        // <div className="container">
        <div className="grid grid-cols-3 relative">
          <div className="px-6 col-span-2">
            <h2 className="my-6 font-semibold">{listRoom.length} chỗ ở</h2>
            <div className="grid grid-cols-3 gap-5">
              {listRoom.map((item, index) => {
                return (
                  <RoomSearch
                    key={index}
                    id={item.id}
                    image={item.hinhAnh}
                    title={item.tenPhong}
                    price={item.giaTien}
                    description={item.moTa}
                  />
                );
              })}
            </div>
            <div className="flex justify-center mt-20 mb-8">
              <Pagination defaultCurrent={1} total={1} />
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.733751529093!2d106.67949018359035!3d10.765915810662738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1733132503217!5m2!1svi!2s"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-screen sticky top-0"
          />
        </div>
      )}
    </div>
  ) : (
    <PageNotFound />
  );
};

export default SearchPage;

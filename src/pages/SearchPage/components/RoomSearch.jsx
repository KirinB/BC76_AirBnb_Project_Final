import React from "react";

const RoomSearch = ({ image }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <img
          src={image}
          alt=""
          className="rounded-md h-[300px] w-[230px] object-cover"
        />
      </div>
    </div>
  );
};

export default RoomSearch;

import { Modal, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { MOCKUP_COMMENT_RANKING } from "../../../common/constant";
import { ButtonOutLine } from "../../../components/ui/button/ButtonCustom";
import { DropdownCustom } from "../../../components/ui/dropdown/DropdownCustom";
import { commentService } from "../../../services/comment.service";
import CommentItem from "./CommentItem";
import LineSpace from "./LineSpace";
import { useRoomDetailContext } from "../../../store/RoomDetailContext";
import { useSelector } from "react-redux";

const CommentRoom = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.UserSlice.user);
  // console.log(user);
  const { listComment, setListComment } = useRoomDetailContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MAX_DISPLAY = 4;
  useEffect(() => {
    commentService
      .getListCommentByIdRoom(id)
      .then((res) => {
        // console.log(res.data.content);
        setListComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <div className="py-6 space-x-6 px-6 md:px-10 lg:px-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {listComment.length} đánh giá
          </h2>
          <p className="text-[#6a6a6a] text-sm">
            Xếp hạng trung bình sẽ được hiển thị sau khi có 3 đánh giá
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-6 lg:gap-6 md:grid-cols-2 mt-10 !mx-0">
          {listComment.slice(0, 4).map((item, index) => {
            return (
              <CommentItem
                avatar={item.avatar}
                key={index}
                ngayBinhLuan={item.ngayBinhLuan}
                noiDung={item.noiDung}
                tenNguoiBinhLuan={item.tenNguoiBinhLuan}
                saoBinhLuan={item.saoBinhLuan}
              />
            );
          })}
        </div>
        {listComment.length > MAX_DISPLAY && (
          <div className="flex mt-6 !mx-0">
            <ButtonOutLine
              children={`Hiển thị tất cả ${listComment.length} đánh giá`}
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={
                "border-[#222] font-semibold px-6 !py-6 text-[#222] hover:!bg-gray-100 hover:shadow-md transition-all duration-200"
              }
            />
            <Modal
              title={null}
              closeIcon={null}
              onCancel={() => {
                setIsModalOpen(false);
              }}
              centered
              open={isModalOpen}
              className="!w-[75%]"
              footer={null}
            >
              <div className="flex flex-col gap-4  max-h-[90vh]">
                <div className="p-4">
                  <div
                    className="p-2 cursor-pointer inline-flex"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    <IoClose size={20} />
                  </div>
                </div>
                <div className="flex gap-10 px-12">
                  <div className="hidden md:block w-1/3 overflow-y-auto">
                    <div className="mb-6">
                      <h2 className="font-semibold text-sm mb-2">
                        Xếp hạng tổng thể
                      </h2>
                      <div className="flex gap-2">
                        <p className="text-sm">5</p>
                        <Progress
                          size={"small"}
                          percent={80}
                          showInfo={false}
                          className="flex-1"
                          strokeColor="#222"
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm">4</p>
                        <Progress
                          size={"small"}
                          percent={20}
                          showInfo={false}
                          className="flex-1"
                          strokeColor="#222"
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm">3</p>
                        <Progress
                          size={"small"}
                          percent={5}
                          showInfo={false}
                          className="flex-1"
                          strokeColor="#222"
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm">2</p>
                        <Progress
                          size={"small"}
                          percent={0}
                          showInfo={false}
                          className="flex-1"
                          strokeColor="#222"
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="text-sm">1</p>
                        <Progress
                          size={"small"}
                          percent={0}
                          showInfo={false}
                          className="flex-1"
                          strokeColor="#222"
                        />
                      </div>
                    </div>
                    <div>
                      {MOCKUP_COMMENT_RANKING.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                              {item.icon}
                              <p className="text-sm">{item.title}</p>
                            </div>
                            <div className="text-xs">{item.rate}</div>
                          </div>
                          <LineSpace className="my-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <div className="max-h-[70vh] overflow-y-auto">
                      <div className="sticky top-0 w-full flex justify-between bg-white z-50 pb-4 border-b border-gray-200">
                        <h3 className="text-2xl font-semibold">
                          {listComment.length} lượt đánh giá
                        </h3>
                        <DropdownCustom
                          placement="bottomRight"
                          children={
                            <p className="inline-block">Gần đây nhất</p>
                          }
                          items={[
                            {
                              label: (
                                <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                  Gần đây nhất
                                </span>
                              ),
                            },
                            {
                              label: (
                                <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                  Có điểm xếp hạng cao nhất
                                </span>
                              ),
                            },
                            {
                              label: (
                                <span className="hover:bg-gray-200 w-full p-2 rounded-md">
                                  Có điểm xếp hạng thấp nhất
                                </span>
                              ),
                            },
                          ]}
                          className={"!py-1"}
                        />
                      </div>
                      <div className="flex flex-col gap-6 pt-6">
                        {listComment.map((item, index) => {
                          return (
                            <CommentItem
                              avatar={item.avatar}
                              key={index}
                              ngayBinhLuan={item.ngayBinhLuan}
                              noiDung={item.noiDung}
                              tenNguoiBinhLuan={item.tenNguoiBinhLuan}
                              saoBinhLuan={item.saoBinhLuan}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentRoom;

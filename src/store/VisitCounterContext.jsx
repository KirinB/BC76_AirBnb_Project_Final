import React, { createContext, useContext, useEffect, useState } from "react";
import { database, ref, get, set } from "../firebase/configFireBase";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const VisitContext = createContext();
export const VisitCounterProvider = ({ children }) => {
  const [todayVisits, setTodayVisits] = useState(0);
  const [weekVisits, setWeekVisits] = useState([]);
  const [labels, setLabels] = useState([]);

  // lấy dữ liệu 7 ngày gần nhất
  const getLast7DaysVisits = async () => {
    let total = [];
    let days = [];

    for (let i = 6; i >= 0; i--) {
      const now = new Date();
      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - i);

      const day = String(pastDate.getDate()).padStart(2, "0");
      const month = String(pastDate.getMonth() + 1).padStart("2", 0);
      const year = pastDate.getFullYear();
      const visitRef = ref(database, `/visits/${year}/${month}/${day}`);
      const snapshot = await get(visitRef);
      total.push(snapshot.exists() ? snapshot.val() : 0);
      days.push(`${day}/${month}`);
    }
    setWeekVisits(total);
    setLabels(days);
  };
  // thêm số truy cập
  const getTodayVisits = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).padStart(2, "0");
    const visitRef = ref(database, `visits/${year}/${month}/${day}`);
    get(visitRef).then((snapshot) => {
      let currentVisits = snapshot.exists ? snapshot.val() : 0;
      set(visitRef, currentVisits + 1);
    });
  };
  useEffect(() => {
    getTodayVisits();
    getLast7DaysVisits();
  }, []);
  if (labels.length === 0 || weekVisits.length === 0) {
    return (
      <div className="bg-white flex justify-center items-center h-screen">
        <Spin tip="Loading" size="large" />
      </div>
    );
  }
  return (
    <VisitContext.Provider value={{ labels, weekVisits }}>
      {children}
    </VisitContext.Provider>
  );
};
export const useVisitCounter = () => useContext(VisitContext);

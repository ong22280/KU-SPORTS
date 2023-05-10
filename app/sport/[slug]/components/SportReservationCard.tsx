"use client";

import { partySize as partySizes, times } from "../../../../data"; // as partySizes is an array of numbers, we can use it as a type
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailabilities from "../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  convertToDisplayTime,
  Time,
} from "../../../../utils/convertToDisplayTime";
// use context to check if user is logged in or not
import { AuthenticationContext } from "../../../context/AuthContext";
import { useContext } from "react";

export default function SportReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const { dataContext, loadingContext } = useContext(AuthenticationContext);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filterTimeBySportOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  return (
    <div className="md:fixed md:w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">ทำการจอง</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">จำนวนคน</label>
        <select
          name=""
          className="py-3 font-light border-b"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => (
            // eslint-disable-next-line react/jsx-key
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">วัน</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="w-24 py-3 font-light border-b text-reg"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">เวลา</label>
          <select
            name=""
            id=""
            className="py-3 font-light border-b"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeBySportOpenWindow().map((time) => (
              // eslint-disable-next-line react/jsx-key
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        {dataContext ? (
          <button
            className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "ค้นหาเวลาที่ว่าง"
            )}
          </button>
        ) : (
          // กรุณาเข้าสู่ระบบก่อนทำการจอง
          <div className="flex items-center justify-center w-full h-16 px-4 font-bold text-white align-middle bg-gray-600 rounded">
            กรุณาเข้าสู่ระบบ
          </div>
        )}
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">เลือกเวลา</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="w-24 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="w-24 p-2 mb-3 mr-3 bg-gray-300 rounded"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

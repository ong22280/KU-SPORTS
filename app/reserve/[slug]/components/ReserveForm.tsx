"use client";

import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useReservation from "../../../hooks/useReservation";

export default function ReserveForm({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="ชื่อจริง"
            value={inputs.bookerFirstName}
            name="bookerFirstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            value={inputs.bookerLastName}
            placeholder="นามสกุล"
            name="bookerLastName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            value={inputs.bookerPhone}
            placeholder="เบอร์"
            name="bookerPhone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            value={inputs.bookerEmail}
            placeholder="อีเมล"
            name="bookerEmail"
            onChange={handleChangeInput}
          />
          {/* <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            name="bookerOccasion"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            name="bookerRequest"
            onChange={handleChangeInput}
          /> */}
          <button
            disabled={disabled || loading}
            className="w-full p-3 font-bold text-white bg-red-600 rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? <CircularProgress color="inherit" /> : "ยืนยันการจอง"}
          </button>
          <p className="mt-4 text-sm">
            เมื่อคลิก &quot;ยืนยันการจอง&quot; แสดงว่าคุณยอมรับข้อกำหนดของ KU
            sports การใช้งานและนโยบายความเป็นส่วนตัว
            คุณสามารถยกเลิกการรับข้อความได้ตลอดเวลา
          </p>
        </>
      )}
    </div>
  );
}

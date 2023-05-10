import {
  convertToDisplayTime,
  Time,
} from "../../../../utils/convertToDisplayTime";
import { format } from "date-fns";

export default function ReserveHeader({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split("T");

  return (
    <div>
      <h3 className="font-bold">ขั้นตอนสุดท้าย</h3>
      <div className="flex mt-5">
        {/* <img src={image} alt="" className="w-32 rounded h-18" /> */}
        {/* use picture tag to display image */}
        <picture>
          <source srcSet={image} />
          <img src={image} alt="" className="w-32 rounded h-18" />
        </picture>

        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "ccc, LLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{partySize} คน</p>
          </div>
        </div>
      </div>
    </div>
  );
}

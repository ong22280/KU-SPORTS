import Link from "next/link";
import { SportCardType } from "../page";
import Price from "./Price";
import Stars from "./Stars";
import Image from "next/image";

interface SportCardProps {
  sport: SportCardType;
}

export default function RestaurantCard({ sport }: SportCardProps) {
  const spellingOfPlurals = () => (sport.reviews.length > 1 ? "s" : "");

  return (
    <div className="w-64 m-3 h-72 overflow-hidden border rounded cursor-pointer sm:min-w-[300px] md:min-w-min">
      <Link href={`/sport/${sport.slug}`}>
        {/* use Image component from next/image instead of img tag
        <img src={sport.main_image} alt="" className="w-full h-36" /> */}
        <Image src={sport.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="mb-2 text-2xl font-bold">{sport.name}</h3>
          <div className="flex items-start">
            <Stars reviews={sport.reviews} />
            <p className="ml-2">
              {sport.reviews.length} review{spellingOfPlurals()}
            </p>
          </div>
          <div className="flex font-light capitalize text-reg">
            <p className="mr-3 ">{sport.type.name}</p>
            <Price price={sport.price} />
            <p>{sport.location.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

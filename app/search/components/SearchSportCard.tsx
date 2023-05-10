import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Type, PRICE, Location, Review } from "@prisma/client";
import Link from "next/link";

interface SearchSportCardProps {
  id: number;
  price: PRICE;
  name: string;
  main_image: string;
  type: Type;
  slug: string;
  location: Location;
  reviews: Review[];
}

export default function SearchSportCard({
  sport,
}: {
  sport: SearchSportCardProps;
}) {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(sport.reviews);
    if (rating > 4) return "Awesome";
    else if (rating > 3) return "Good";
    else if (rating > 0) return "Average";
    else return "";
  };

  return (
    <div className="flex pb-5 ml-4 border-b flex-col md:flex-row text-center md:text-left">
      {/*  img centered, md: img left */}
      {/* <img src={sport.main_image} alt="" className="rounded h-36 w-44 mx-auto md:mx-0" /> */}
      <picture>
        <source media="(min-width: 768px)" srcSet={sport.main_image} />
        <img
          src={sport.main_image}
          alt=""
          className="rounded h-36 w-44 mx-auto md:mx-0"
        />
      </picture>

      <div className="md:pl-5 pl-0">
        <h2 className="text-3xl">{sport.name}</h2>
        <div className="flex md:justify-start justify-center">
          <div className="flex mb-2">
            <Stars reviews={sport.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="md:mb-9 mb-0">
          <div className="flex font-light text-reg justify-center md:justify-start">
            <Price price={sport.price} />
            <p className="mr-4 capitalize">{sport.type.name}</p>
            <p className="mr-4 capitalize">{sport.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/sport/${sport.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
}

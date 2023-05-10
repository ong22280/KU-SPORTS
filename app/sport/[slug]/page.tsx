import SportNavBar from "./components/SportNavBar";
import SportTitle from "./components/SportTitle";
import SportRating from "./components/SportRating";
import SportDescription from "./components/SportDescription";
import SportImages from "./components/SportImages";
import SportReviews from "./components/SportReviews";
import SportReservationCard from "./components/SportReservationCard";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Sport {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  reviews: Review[];
}

const fetchSportBySlug = async (slug: string): Promise<Sport> => {
  const sport = await prisma.sport.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!sport) {
    // throw new Error("Sport not found");
    notFound();
  }

  return sport;
};

// nextjs pass a bunch of props to this page component by default
/* 
`params` is a prop passed to component by Next.js. 
It contains an object with a `slug` property, which is used to fetch the sport data from the database. 
`searchParams` is mentioned in the comment as a prop that Next.js passes to component.
*/
/* example data in props:
{
  params: {
    slug: 'vivaan-fine-indian-type-ottawa' 
  },
  searchParams: {}
}
*/
export default async function SportDetails({
  params,
}: {
  params: { slug: string };
}) {
  const sport = await fetchSportBySlug(params.slug);

  return (
    <>
      <div className="bg-white md:w-[70%] rounded p-3 shadow mt-16 md:mt-0">
        <SportNavBar slug={sport.slug} />
        <SportTitle name={sport.name} />
        <SportRating reviews={sport.reviews} />
        <SportDescription description={sport.description} />
        <SportImages images={sport.images} />
        <SportReviews reviews={sport.reviews} />
      </div>
      <div className="md:w-[27%] relative text-reg w-full">
        <SportReservationCard
          openTime={sport.open_time}
          closeTime={sport.close_time}
          slug={sport.slug}
        />
      </div>
    </>
  );
}

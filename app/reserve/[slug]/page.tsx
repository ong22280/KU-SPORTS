import ReserveHeader from "./components/ReserveHeader";
import ReserveForm from "./components/ReserveForm";
import "../../../app/globals.css";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchSportBySlug = async (slug: string) => {
  const sport = await prisma.sport.findUnique({
    where: {
      slug,
    },
  });

  if (!sport) {
    notFound();
  }

  return sport;
};

export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const sport = await fetchSportBySlug(params.slug);
  return (
    <div className="h-screen border-t">
      <div className="w-3/5 m-auto py-9">
        <ReserveHeader
          image={sport.main_image}
          name={sport.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <ReserveForm
          partySize={searchParams.partySize}
          slug={params.slug}
          date={searchParams.date}
        />
      </div>
    </div>
  );
}
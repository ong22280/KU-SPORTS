import SportNavBar from "../components/SportNavBar";
import SportMenus from "../components/SportMenus";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchSportMenuBySlug = async (slug: string) => {
  const sport = await prisma.sport.findUnique({
    where: {
      slug: slug,
    },
    select: {
      items: true,
    },
  });

  if (!sport) {
    throw new Error("Sport not found");
  }

  return sport.items;
};

export default async function SportMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchSportMenuBySlug(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <SportNavBar slug={params.slug} />
      <SportMenus menu={menu} />
    </div>
  );
}

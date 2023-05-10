import SearchHeader from "./components/SearchHeader";
import SearchSideBar from "./components/SearchSideBar";
import SearchSportCard from "./components/SearchSportCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
  nameSport?: string; // property? means optional
  type?: string;
  price?: PRICE;
  location?: string;
}

const fetchSportsByName = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.nameSport) {
    const nameSport = {
        // equals: searchParams.nameSport,
        contains: searchParams.nameSport.toLowerCase(),
        
    };
    where.name = nameSport;
  }
  if (searchParams.type) {
    const type = {
      name: {
        equals: searchParams.type.toLowerCase(),
      },
    };
    where.type = type;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location.toLowerCase(),
      },
    };
    where.location = location;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    type: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prisma.sport.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchName = async () => {
  return prisma.sport.findMany();
};

const fetchTypes = async () => {
  return prisma.type.findMany();
};

// { params: {}, searchParams: { faculty: 'toronto' } }
export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sports = await fetchSportsByName(searchParams);
  const locations = await fetchLocations();
  const name = await fetchName();
  const types = await fetchTypes();

  const checkSport = () => {
    if (sports.length === 0) {
      return <p>ขออภัย ไม่พบกีฬาดังกล่าว</p>;
    }
    return (
      <>
        {sports.map((sport) => (
          <SearchSportCard key={sport.id} sport={sport} />
        ))}
      </>
    );
  };

  return (
    <>
      <SearchHeader />
      <div className="flex flex-col items-center justify-center w-11/12 py-4 m-auto md:items-start md:justify-between md:flex-row">
        <SearchSideBar
          locations={locations}
          types={types}
          name={name}
          searchParams={searchParams}
        />
        <div className="w-5/6">{checkSport()}</div>
      </div>
    </>
  );
}

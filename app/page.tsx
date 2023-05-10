import Header from "./components/Header";
import SportCard from "./components/SportCard";
import { Type, Location, PRICE, PrismaClient, Review } from "@prisma/client";

// interface is a TypeScript feature that allows you to define the structure of an object.
export interface SportCardType {
  id: number;
  name: string;
  main_image: string;
  type: Type;
  location: Location;
  price: PRICE;
  slug: string; // slug is a unique identifier for a sport
  reviews: Review[];
}

/* `const prisma = new PrismaClient();` 
is creating a new instance of the PrismaClient, 
which is a database client for the Prisma ORM (Object-Relational Mapping) tool. 
This instance can be used to interact with the database and perform CRUD (Create, Read, Update, Delete) operations on the data. */
const prisma = new PrismaClient();

/* example of what the return value looks like:
  [
    {
      id: 123,
      name: 'Vivaan - fine Indian',
      main_image: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/32109459.jpg',
      images: [
        'https://resizer.otstatic.com/v2/photos/xlarge/2/32109461.jpg',
        'https://resizer.otstatic.com/v2/photos/xlarge/1/32459786.jpg',
        'https://resizer.otstatic.com/v2/photos/xlarge/1/32484701.jpg',
        'https://resizer.otstatic.com/v2/photos/xlarge/1/32484708.jpg'
      ],
      description: 'Vivaan is Modern Indian Type serving dishes from different regions of India. We carefully select our ingredients and use them to make authentic Indian recipes and our chef puts his modern flair and twists to the dishes.',
      open_time: '14:30:00.000Z',
      close_time: '21:30:00.000Z',
      slug: 'vivaan-fine-indian-type-ottawa',
      price: 'REGULAR',
      location_id: 28,
      type_id: 28,
      created_at: 2023-04-26T06:13:26.999Z,
      updated_at: 2023-04-26T06:13:26.999Z
    },
    ...
  ]
  */

// `const fetchSports = async () => {` is an asynchronous function that fetches all the sports from the database.
const fetchSports = async (): Promise<SportCardType[]> => {
  // :Promise<SportCardType[]> => means that the function returns a Promise that resolves to an array of SportCardType objects.
  const sports: SportCardType[] = await prisma.sport.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      type: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return sports;
  /* example of what the return value looks like:
  [
    {
      id: 123,
      name: 'Vivaan - fine Indian',
      main_image: 'https://resizer.otstatic.com/v2/photos/wide-huge/1/32109459.jpg',
      type: {
        id: 28,
        name: 'Indian'
      },
      location: {
        id: 28,
        name: 'Ottawa'
      },
      price: 'REGULAR'
    },
    ...
  ]
  */
};

export default async function Home() {
  const sports = await fetchSports();
  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        {sports.map((sport) => (
          <SportCard sport={sport} key={sport.id} />
        ))}
      </div>
    </>
  );
}

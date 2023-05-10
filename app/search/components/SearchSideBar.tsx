import { Type, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({
  locations,
  types,
  searchParams,
}: {
  locations: Location[];
  types: Type[];
  searchParams: { faculty?: string; type?: string; price?: PRICE };
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "w-full p-2 font-light border rounded-l text-reg text-center",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "w-full p-2 font-light border text-reg text-center",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "w-full p-2 font-light border rounded-r text-reg text-center",
    },
  ];

  // generate key for map price
  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };


  return (
    <div className="flex flex-row w-full md:w-1/5 md:flex-col">
      <div className="flex flex-col w-full pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams, // spread operator to copy all the properties of searchParams
                faculty: location.name,
              },
            }}
            className="font-light capitalize text-reg"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col w-full pb-4 mt-0 border-b md:mt-3 md:w-0">
        <h1 className="mb-2">Type</h1>
        {types.map((type) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                type: type.name,
              },
            }}
            className="font-light capitalize text-reg"
            key={type.id}
          >
            {type.name}
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-0 md:mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={className}
              key={generateKey(price)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Item } from "@prisma/client";
import SportMenuCard from "./SportMenuCard";

export default function SportMenus({ menu }: { menu: Item[] }) {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="pb-1 mt-4 mb-1">
          <h1 className="text-4xl font-bold">อุปกรณ์</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => (
              <SportMenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>กีฬานี้ ไม่อุปกรณ์ให้เช่าหรือขาย</p>
          </div>
        )}
      </div>
    </main>
  );
}

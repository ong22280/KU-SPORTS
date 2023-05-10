import Link from "next/link";

export default function SportNavBar({slug}:{slug:string}) {
  return (
    <nav className="flex pb-2 border-b text-reg">
      <Link href={`sport/${slug}`} className="mr-7">
        ภาพรวม
      </Link>
      <Link href={`sport/${slug}/menu`} className="mr-7">
        อุปกรณ์
      </Link>
    </nav>
  );
}

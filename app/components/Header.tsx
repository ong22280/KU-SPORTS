import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f471b] to-[#5f8465] p-2">
      <div className="mt-10 text-center">
        <h1 className="mb-2 font-bold text-white md:text-5xl sm:text-4xl">
          ค้นหากีฬาที่คุณต้องการ
        </h1>
        {/* server component can have a client component */} 
        <SearchBar />
      </div>
    </div>
  );
}

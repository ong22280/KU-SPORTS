export default function SportHeader({ name }: { name: string }) {
  // const renderTitle = () => {
  //   const nameArray = name.split("-");
  //   nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;
  //   return nameArray.join(" ");
  // };

  return (
    <div className="h-48 overflow-hidden md:h-96">
      <div className="bg-center bg-gradient-to-r from-[#0f471b] to-[#5f8465] h-full flex justify-center items-center">
        <h1 className="text-4xl text-center text-white capitalize md:text-7xl text-shadow">
          {name}
        </h1>
      </div>
    </div>
  );
}

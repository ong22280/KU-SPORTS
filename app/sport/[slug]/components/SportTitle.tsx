export default function SportTitle({ name }: { name: string }) {
  return (
    <div className="pb-6 mt-4 border-b">
      <h1 className="font-bold md:text-6xl text-4xl">{name}</h1>
    </div>
  );
}

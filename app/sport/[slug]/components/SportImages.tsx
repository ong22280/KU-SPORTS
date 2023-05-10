export default function SportImages({ images }: { images: string[] }) {
  // const spellingOfPlurals = () => {
  //   return images.length > 1 ? "s" : "";
  // };

  // generates key for each image
  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">
        {images.length} รูป
      </h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="w-56 mb-1 mr-1 h-44" src={image} alt="" key={generateKey(image)} />
        ))}
        
        {/* use picture tag in map function to display */}
        {/* <picture>
          {images.map((image) => (
            <source srcSet={image} key={generateKey(image)} />
          ))}
          <img src={images[0]} alt="" className="w-56 mb-1 mr-1 h-44" />
        </picture> */}
          
      </div>
    </div>
  );
}

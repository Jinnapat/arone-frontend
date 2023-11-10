import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const StorySelectionPage = () => {
  const mockData = [
    {
      name: "มิวเซียมสยาม",
      distance: 0.5,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Museum_Siam_%28III%29.jpg",
        "https://img.wongnai.com/p/1920x0/2021/11/19/4a82b63e10ed400484a403d5df669d67.jpg",
      ],
    },
    {
      name: "มิวเซียมสยาม",
      distance: 0.5,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Museum_Siam_%28III%29.jpg",
        "https://img.wongnai.com/p/1920x0/2021/11/19/4a82b63e10ed400484a403d5df669d67.jpg",
      ],
    },
    {
      name: "มิวเซียมสยาม",
      distance: 0.5,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Museum_Siam_%28III%29.jpg",
        "https://img.wongnai.com/p/1920x0/2021/11/19/4a82b63e10ed400484a403d5df669d67.jpg",
      ],
    },
    {
      name: "มิวเซียมสยาม",
      distance: 0.5,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Museum_Siam_%28III%29.jpg",
        "https://img.wongnai.com/p/1920x0/2021/11/19/4a82b63e10ed400484a403d5df669d67.jpg",
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full max-w-lg flex flex-col p-7 h-full">
        <p className="text-4xl font-bold">เลือกคดีที่คุณสนใจ!</p>
        <p>มาช่วยกันแก้ปริศนากันเถอะ</p>
        <br></br>
        <div className="flex flex-row justify-center gap-2">
          <div className="flex flex-row w-full py-2 rounded-full bg-gray-600 px-4 items-center gap-2">
            <FontAwesomeIcon icon={faSearch} />
            <input
              className="bg-gray-600 outline-none w-full border-0 focus:outline-none p-0 border-transparent focus:border-transparent focus:ring-0"
              type="text"
              placeholder="ค้นหา"
            />
          </div>
          <button className="border-green-400 border-4 rounded-full w-12 flex flex-col justify-center items-center">
            <Image src="/sort.png" alt="sort icon" width={27} height={27} />
          </button>
        </div>
        <br></br>
        <div className="flex flex-col gap-2 overflow-scroll">
          {mockData.map((data, idx) => {
            return (
              <div
                key={idx}
                className="p-4 bg-gray-500 rounded-md flex flex-col"
              >
                <div className="flex flex-row justify-between">
                  <p>{data.name}</p>
                  <p>{data.distance} กม.</p>
                </div>
                <br></br>
                <div className="flex flex-row h-52 relative">
                  {data.images.map((image, idx) => (
                    <Image
                      key={idx}
                      alt={data.name}
                      src={image}
                      className="border-8 rounded-lg"
                      layout="fill"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StorySelectionPage;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MapPage = () => {
  const [currentImage, setCurrentImage] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      setCurrentImage(currentImage < 37 ? currentImage + 1 : 1);
    }, 100);
  }, [currentImage]);

  return (
    <div>
      <Image
        src={
          "/images/1/sc2_1_large-" +
          currentImage.toString().padStart(2, "0") +
          ".jpg"
        }
        alt="game map"
        width={400}
        height={400}
      />
    </div>
  );
};

export default MapPage;

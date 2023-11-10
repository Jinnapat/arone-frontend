"use client";

import { useState } from "react";
import Image from "next/image";
import MainButton from "@/components/main_button";

interface Suspect {
  name: string;
  image: string;
  clues: string[];
}

const VotePage = () => {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect>({
    name: "",
    image: "",
    clues: [],
  });

  const suspects = [
    {
      name: "คุณนายทองสุข1",
      image: "/woman.png",
      clues: [
        "ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ",
      ],
    },
    {
      name: "คุณนายทองสุข2",
      image: "/woman.png",
      clues: [
        "ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ",
        "ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ",
        "ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ",
      ],
    },
    {
      name: "คุณนายทองสุข3",
      image: "/woman.png",
      clues: ["ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ"],
    },
    {
      name: "คุณนายทองสุข4",
      image: "/woman.png",
      clues: ["ไม่สามารถบอกได้ว่าอยู่ที่ไหนในตอนเกิดเหตุ"],
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full max-w-lg p-5 h-screen">
        <p className="text-3xl">ใครคือคนร้ายกันแน่...</p>
        <br></br>
        <div className="flex flex-col gap-5 h-full overflow-y-scroll bg-gray-500 rounded-xl p-2">
          {suspects.map((data, idx) => {
            return (
              <div
                key={idx}
                className={
                  "rounded-lg bg-gray-600 flex flex-col p-4 border-4" +
                  (selectedSuspect.name === data.name
                    ? " border-green-500"
                    : "")
                }
                onClick={() => setSelectedSuspect(data)}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xl">{data.name}</p>
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={50}
                    height={50}
                  />
                </div>
                <br></br>
                <div className="flex flex-col gap-2 border-2 rounded-lg p-4">
                  {data.clues.map((clue, idx) => {
                    return <p key={idx}>- {clue}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
        <MainButton>
          <b>VOTE</b>
        </MainButton>
      </div>
    </div>
  );
};

export default VotePage;

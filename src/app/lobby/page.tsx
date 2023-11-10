"use client";

import MainButton from "@/components/main_button";
import Image from "next/image";
import { useState } from "react";

interface Item {
  name: string;
  image: string;
}

const LobbyPage = () => {
  const mockData = {
    name: "รูปปั้นแมวน้อยที่เปลี่ยนไป",
    description:
      "ไม่นะ! รูปปั้นแมวของเราถูกขโมยไป คนร้ายฉวยโอกาสที่ยามกำลังเปลี่ยนเวรในการเข้ามาขโมยของของเรา คุณช่วยตามหาตัวคนร้ายให้หน่อยสิ",
    code: "15687",
  };
  const items = [
    {
      name: "ไฟฉาย",
      image: "/torch.png",
    },
    {
      name: "เชือก",
      image: "/rope.png",
    },
    {
      name: "ปืน",
      image: "/gun.png",
    },
  ];
  const players = [
    {
      name: "น้องหนูนา",
      profileImage: "/woman.png",
      selectedItem: items[0],
    },
    {
      name: "น้องมาลี",
      profileImage: "/woman.png",
      selectedItem: items[2],
    },
  ];

  const [selectedItem, setSelectedItem] = useState<Item>({
    name: "",
    image: "",
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col p-7">
        <p className="text-3xl font-bold">{mockData.name}</p>
        <p>{mockData.description}</p>
        <br></br>
        <div className="bg-gray-300 rounded-lg p-4">
          <p className="text-black">เลือกหนึ่งอุปกรณ์</p>
          <div className="flex flex-row justify-around">
            {items.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    "bg-gray-800 rounded-full w-24 h-24 flex flex-col items-center justify-center" +
                    (data.name == selectedItem.name
                      ? " border-4 border-green-400"
                      : "")
                  }
                  onClick={() => {
                    setSelectedItem(data);
                  }}
                >
                  <Image
                    src={data.image}
                    alt="item-icon"
                    width={50}
                    height={50}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <br></br>
        <p>ชวนเพื่อนของคุณมาเล่น</p>
        <p>รหัส: {mockData.code}</p>
        <div className="flex flex-col bg-gray-500 p-4 rounded-lg gap-3">
          {players.map((data, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-row bg-white rounded-full p-2 justify-between items-center"
              >
                <Image
                  src={data.profileImage}
                  alt="profile image"
                  width={45}
                  height={45}
                />
                <p className="text-black">{data.name}</p>
                <div className="bg-gray-800 rounded-full w-12 h-12 flex flex-col items-center justify-center">
                  <Image
                    src={data.selectedItem.image}
                    alt="item image"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
        <br></br>
        <MainButton>
          <b>เริ่มเล่นเกม</b>
        </MainButton>
      </div>
    </div>
  );
};

export default LobbyPage;

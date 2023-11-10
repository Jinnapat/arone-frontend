"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

const ChatPage = () => {
    const mockData = {
        title: "รูปปั้นแมวน้อยที่เปลี่ยนไป",
        description: "บรีฟคดี อธิบายสถานที่ สถานการณ์ เหตุการณ์ที่เกิดขึ้น",
    }

    const mockChat = [
        {
            sender: "คุณพ่อบาลาซ",
            message: "ก่อนหน้านี้เขามาเอาของบางอย่างจากพ่อไป",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "ถึงเขาจะไม่มีความเสน่ห์หาในตัวฉัน",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "แล้วผู้หญิงอย่างฉันจะทำอะไรได้อีก...นอกจากยอมเป็นคู่มั่นจอมปลอม!",
            task: false,
            image: ""
        },{
            sender: "คุณ",
            message: "คุณพิมพา...คุณกำลังปิดบังอะไรอยู่",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "แน่จริงก็ลองทายดูสิ555555",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "พิมพาส่งจดหมายการทุจริตของแสงให้คุณดู ที่วางอยู่บนโต๊ะทำงานของแสงแอง",
            task: true,
            image: "/chat/scene/รูปปั้นแมวน้อยที่เปลี่ยนไป/task1.png"
        },{
            sender: "พิมพา",
            message: "แล้วผู้หญิงอย่างฉันจะทำอะไรได้อีก...นอกจากยอมเป็นคู่มั่นจอมปลอม!",
            task: false,
            image: ""
        },{
            sender: "คุณ",
            message: "คุณพิมพา...คุณกำลังปิดบังอะไรอยู่",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "แน่จริงก็ลองทายดูสิ555555",
            task: false,
            image: ""
        },{
            sender: "พิมพา",
            message: "พิมพาส่งจดหมายการทุจริตของแสงให้คุณดู ที่วางอยู่บนโต๊ะทำงานของแสงแอง",
            task: true,
            image: "/chat/scene/รูปปั้นแมวน้อยที่เปลี่ยนไป/task1.png"
        },  
    ];

    return <div className="flex flex-col items-center p-4 h-screen overflow-hidden">
        <p className="text-4xl font-bold">{mockData.title}</p>
        <p>{mockData.description}</p>
        <div className="flex flex-col pt-6 mt-4 bg-gray-300 rounded-lg p-4 sticky">
            {mockChat.map((data, idx)=>{
                if(data.task){
                    return <div key={idx} className="flex flex-col items-center"><div className={"flex pb-4 items-center" + (data.sender == "คุณ" ? " flex-row-reverse" : " flex-row")}>
                        <div className="flex flex-col items-center">
                            <Image 
                                src={"/chat/character/"+data.sender+".png"}
                                alt="item-icon"
                                width={30}
                                height={30}/>
                            <p>{data.sender}</p>
                        </div>
                        <p className="text-stone-950 rounded-full p-4">{data.message}</p>
                    </div>
                    <Image
                        src={data.image}
                        alt="item-icon"
                        width={300}
                        height={300}/>
                    </div>
                    
                } else {
                    return <div key={idx} className={"flex pb-4 items-center" + (data.sender == "คุณ" ? " flex-row-reverse" : " flex-row")}>
                        <div className="flex flex-col items-center">
                            <Image 
                                src={"/chat/character/"+data.sender+".png"}
                                alt="item-icon"
                                width={30}
                                height={30}/>
                            <p>{data.sender}</p>
                        </div>
                        <p className="bg-zinc-50 text-stone-950 rounded-full p-4">{data.message}</p>
                    </div>
                }
                ;
            })}
            <div className="flex flex-col items-center bg-gray-50 absolute">
                <div className="flex flex-row pt-4 pb-4">
                    <p className="mr-4 pr-2 pl-2 pt-2 pb-2 bg-gray-500 rounded-full">ชั้นเชื่อเธอน้าาา อุอิ</p>
                    <p className="pr-2 pl-2 pt-2 pb-2 bg-gray-500 rounded-full">ชั้นไม่เชื่อเธอหรอกนะะ 555+</p>
                </div>
            </div>
            
        </div>
        
    </div>;
};

export default ChatPage;


"use client";

import supabaseClient from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

const HomePage = () => {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const getSessionResult = await supabaseClient.auth.getSession();
      if (getSessionResult.data.session == null) {
        setError("No session found");
        return;
      }
      const userId = getSessionResult.data.session.user.id;
      const getUserResult = await supabaseClient
        .from("user")
        .select("id, username")
        .eq("id", userId);
      if (getUserResult.error || getUserResult.count == 0) {
        setError("Can't get user info");
        return;
      }
      setUser(getUserResult.data[0]);
      console.log(getUserResult.data[0]);
    };
    getSession();
  }, []);

  if (user == null) return <div>loading...</div>;
  return (
    <div className="overflow-x-scroll">
      <div
        className="h-screen bg-[url('/office-background.png')]"
        style={{
          width: "100vh",
        }}
      >
        <div className="relative text-2xl">แผนที่</div>
      </div>
      <div className="fixed top-3 left-3">
        <p className="text-2xl">#{user.id}</p>
        <p className="text-xl">โค้ดเนม: {user.username.toLocaleUpperCase()}</p>
      </div>
    </div>
  );
};

export default HomePage;

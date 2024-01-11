"use client";

import Loading from "@/components/Loading";
import SessionChecker from "@/components/SessionChecker";
import supabaseClient from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    supabaseClient.auth.signOut().then(
      () => {
        router.push("/login");
      },
      () => {
        router.push("/profile");
      }
    );
  });
  return (
    <SessionChecker jumpToIfUnauthenticated="/login">
      <Loading />
    </SessionChecker>
  );
};

export default LogoutPage;

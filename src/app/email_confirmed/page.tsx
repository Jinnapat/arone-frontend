"use client";

import CenterContentCard from "@/components/CenterContentCard";
import Loading from "@/components/Loading";
import MainButton from "@/components/MainButton";
import SessionChecker from "@/components/SessionChecker";
import supabaseClient from "@/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EmailConfirmedPage = () => {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const effectCalled = useRef<boolean>(false);

  useEffect(() => {
    if (effectCalled.current) return;
    const username = searchParams.get("username");
    supabaseClient.auth.getUser().then((response) => {
      if (response.error) {
        setIsError(true);
        return;
      }
      supabaseClient
        .from("accounts")
        .insert({
          id: response.data.user.id,
          username,
        })
        .then((addUserInfoResult) => {
          if (addUserInfoResult.error) {
            setIsError(true);
            return;
          }
          setIsProcessing(false);
          setIsDone(true);
        });
    });
    effectCalled.current = true;
  }, [searchParams]);

  return (
    <SessionChecker jumpToIfUnauthenticated="/register">
      <CenterContentCard>
        {isProcessing && <Loading />}
        {!isProcessing && isDone && (
          <>
            <div>
              <h1 className="font-bold text-4xl text-center">SUCCESS</h1>
              <p className="text-center text-sm">
                Your email is verified! You can book our service with the link
                below.
              </p>
            </div>
            <Link href="/book">
              <MainButton>BOOK NOW</MainButton>
            </Link>
          </>
        )}
        {!isProcessing && isError && (
          <>
            <div>
              <h1 className="font-bold text-4xl text-center">ERROR OCCURED</h1>
              <p className="text-center text-sm">
                Your email verification link is invalid.<br></br> Try register
                again with the link below.
              </p>
            </div>
            <Link href="/register">
              <MainButton>REGISTER AGAIN</MainButton>
            </Link>
          </>
        )}
      </CenterContentCard>
    </SessionChecker>
  );
};

export default EmailConfirmedPage;

import supabaseClient from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

const SessionChecker = ({
  children,
  setUser,
  setIsGettingUser,
  jumpToIfAuthenticated,
  jumpToIfUnauthenticated,
}: {
  children?: React.ReactNode;
  setUser?: Dispatch<SetStateAction<User | null>>;
  setIsGettingUser?: Dispatch<SetStateAction<boolean>>;
  jumpToIfAuthenticated?: string;
  jumpToIfUnauthenticated?: string;
}) => {
  const [isThisGettingUser, setThisIsGettingUser] = useState<boolean>(true);
  const [thisUser, setThisUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getUser().then((response) => {
      setThisUser(response.data.user);
      if (setUser) setUser(response.data.user);
      setThisIsGettingUser(false);
      if (setIsGettingUser) setIsGettingUser(false);
    });
  }, [setUser, setIsGettingUser]);

  if (isThisGettingUser) return <Loading />;
  if (jumpToIfAuthenticated && thisUser) {
    router.push(jumpToIfAuthenticated);
    return <Loading />;
  }
  if (jumpToIfUnauthenticated && !thisUser) {
    router.push(jumpToIfUnauthenticated);
    return <Loading />;
  }
  return <>{children}</>;
};

export default SessionChecker;

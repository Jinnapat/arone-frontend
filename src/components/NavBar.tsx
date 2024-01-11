"use client";

import Link from "next/link";
import supabaseClient from "@/supabase/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";

const FunctionMenu = ({
  session,
  setIsMenuOpened,
}: {
  session: Session | null;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  if (session)
    return (
      <>
        <Link
          href="/book"
          className="hover:text-yellow-400 duration-300"
          onClick={() => setIsMenuOpened(false)}
        >
          book
        </Link>
        <Link
          href="/reservations"
          className="hover:text-yellow-400 duration-300"
          onClick={() => setIsMenuOpened(false)}
        >
          reservations
        </Link>
        <Link
          href="/profile"
          className="hover:text-yellow-400 duration-300"
          onClick={() => setIsMenuOpened(false)}
        >
          profile
        </Link>
        <Link
          href="/logout"
          className="hover:text-yellow-400 duration-300"
          onClick={() => setIsMenuOpened(false)}
        >
          logout
        </Link>
      </>
    );
  return (
    <>
      <Link
        href="/login"
        className="hover:text-yellow-400 duration-300"
        onClick={() => setIsMenuOpened(false)}
      >
        login
      </Link>
      <Link
        href="/register"
        className="hover:text-yellow-400 duration-300"
        onClick={() => setIsMenuOpened(false)}
      >
        register
      </Link>
    </>
  );
};

const NavBar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    supabaseClient.auth.getSession().then((e) => {
      setSession(e.data.session);
      setIsLoading(false);
    });
  }, [params]);

  return (
    <div className="text-white w-full text-center text-xl">
      <div className="w-full flex flex-row justify-between px-8 py-3 bg-green-600 shadow-lg items-center">
        <Link href="/" className="hover:text-yellow-400 duration-300 text-3xl">
          BATTER
        </Link>
        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="sm:flex flex-row gap-5 items-center hidden">
          {!isLoading && (
            <FunctionMenu session={session} setIsMenuOpened={setIsMenuOpened} />
          )}
        </div>
      </div>
      <div
        className={
          "absolute left-0 right-0 z-40 from-green-700 to-blue-700 bg-gradient-to-b flex flex-col sm:hidden shadow-xl transition-transform duration-200 origin-top gap-4 p-4 rounded-b-xl" +
          (isMenuOpened ? "" : " scale-y-0")
        }
      >
        {!isLoading && (
          <FunctionMenu session={session} setIsMenuOpened={setIsMenuOpened} />
        )}
      </div>
    </div>
  );
};

export default NavBar;

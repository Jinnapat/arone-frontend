"use client";

import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import OrWithSeparator from "@/components/OrWithSeparator";
import AuthenWithProviders from "@/components/AuthenWithProviders";
import { useRouter } from "next/navigation";
import validateEmail from "@/helpers/emailValidator";
import supabase from "@/supabase/client";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const signIn = async () => {
    setError("");
    setIsSigningIn(true);
    try {
      const signInResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInResult.error) {
        setError(signInResult.error.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      setEmail("Unexpected error occurred");
    } finally {
      setIsSigningIn(false);
    }
  };

  const validPassword = password !== "";
  const valid = validateEmail(email) && validPassword;

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Head>
        <title>Sign In!</title>
      </Head>
      <div className="w-full max-w-lg p-7">
        <div className="flex flex-row items-center gap-3">
          <p className="text-4xl font-bold mt-3">Hi, welcome!</p>
          <Image
            src="/icon/high-five.png"
            alt="greeting"
            width={40}
            height={40}
          />
        </div>
        <br></br>
        <p className="text-red-600">{error}</p>
        <InputWithLabel
          labelText={"EMAIL"}
          hintText={"Your email"}
          handler={setEmail}
          obsure={false}
          error={!validateEmail(email)}
        ></InputWithLabel>
        <br></br>
        <InputWithLabel
          labelText={"PASSWORD"}
          hintText={"Your password"}
          handler={setPassword}
          obsure={true}
          error={!validPassword}
        ></InputWithLabel>
        <div className="flex flex-row justify-between mt-2 items-center">
          <div className="flex flex-row gap-2 items-center pl-2">
            <input
              type="checkbox"
              className="w-3 h-3"
              onClick={() => setRememberMe(!rememberMe)}
            />
            <p className="text-sm">remember me</p>
          </div>
          <Link
            href="forget_password"
            className="text-sm hover:text-green-400 transition-colors duration-300"
          >
            forget password?
          </Link>
        </div>
        <br></br>
        <MainButton
          handler={signIn}
          loading={isSigningIn}
          disabled={!valid || processing}
        >
          <b>LOG IN</b>
        </MainButton>
        <OrWithSeparator />
        <AuthenWithProviders
          setSigningInWithProvider={setProcessing}
          setError={setError}
          disabled={isSigningIn}
        />
        <div className="text-center mt-6">
          Don&lsquo;t have an account?{" "}
          <Link
            href="/register"
            className="text-amber-200 transition-colors hover:text-amber-400 duration-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

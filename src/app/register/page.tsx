"use client";

import AuthenWithProviders from "@/components/AuthenWithProviders";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import OrWithSeparator from "@/components/OrWithSeparator";
import emailValidator from "@/helpers/emailValidator";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/supabase/client";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [signingInWithProvider, setSigningInWithProvider] =
    useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validEmail = emailValidator(email);
  const validPassword = password !== "";
  const validRepassword = repassword !== "" && password === repassword;
  const valid = validEmail && validRepassword && validRepassword;
  const isProcessing = isSigningUp || signingInWithProvider || isDone;

  const signUp = async () => {
    setError("");
    setIsSigningUp(true);
    try {
      const signUpResult = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpResult.error) {
        setError(signUpResult.error.message);
      } else {
        setIsDone(true);
      }
    } catch (error) {
      setError("Unexpected error occurred");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Head>
        <title>Sign Up!</title>
      </Head>
      <div className="flex flex-col w-full max-w-lg p-7">
        <p className="text-4xl font-bold">Sign Up</p>
        <br></br>
        <p className="text-red-600">{error}</p>
        <InputWithLabel
          labelText="Email"
          hintText="example@gmail.com"
          handler={setEmail}
          obsure={false}
          error={!validEmail}
          disabled={isProcessing}
        />
        <br></br>
        <InputWithLabel
          labelText="Password"
          hintText="password"
          handler={setPassword}
          obsure={true}
          error={!validPassword}
          disabled={isProcessing}
        />
        <br></br>
        <InputWithLabel
          labelText="Confirm password"
          hintText="repeat password"
          handler={setRepassword}
          obsure={true}
          error={!validRepassword}
          disabled={isProcessing}
        />
        <br></br>
        <br></br>
        <MainButton handler={signUp} disabled={!valid} loading={isSigningUp}>
          <b>SIGN UP</b>
        </MainButton>
        <OrWithSeparator />
        <AuthenWithProviders
          setSigningInWithProvider={setSigningInWithProvider}
          setError={setError}
          disabled={isProcessing}
        />
        <div className="text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-amber-200 transition-colors hover:text-amber-400 duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
      <div
        className={`absolute bg-gray-900 border-2 border-green-400 max-w-md p-7 rounded-xl flex flex-col gap-4 top-28 mx-5 left-auto right-auto items-center ${
          isDone ? "" : "hidden"
        }`}
      >
        <Image src="/icon/message.png" width={150} height={150} alt="verify" />
        <h1 className="text-xl font-bold">Verify your email</h1>
        <p>
          We need to verify your email. We&lsquo;ve already sent out the
          verification link to {email}. Please check it and confirm it&lsquo;s
          really you.
        </p>
        <Link
          href="/signin"
          className="rounded-lg border-2 p-4 hover:bg-green-400 transition-colors duration-300"
        >
          back to login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

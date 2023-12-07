"use client";

import AuthenWithProviders from "@/components/AuthenWithProviders";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import OrWithSeparator from "@/components/OrWithSeparator";
import emailValidator from "@/helpers/emailValidator";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import supabase from "@/supabase/client";
import PopupWithImage from "@/components/PopupWithImage";

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
      <PopupWithImage
        show={isDone}
        imageSrc="/icon/message.png"
        headerText="Verify your email"
        message={`We need to verify your email. We&lsquo;ve already sent out the verification link to ${email}. Please check it and confirm it's really you.`}
        redirectTo="/signin"
        actionText="back to login"
      />
    </div>
  );
};

export default RegisterPage;

"use client";

import { InputWithLabel } from "@/components/input_with_label";
import MainButton from "@/components/main_button";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import OrWithSeparator from "@/components/or_with_separator";
import AuthenWithProviders from "@/components/authen_with_providers";
import supabaseClient from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signIn = async () => {
    setError("");
    setProcessing(true);
    setIsSigningIn(true);
    const signInResult = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    setProcessing(false);
    setIsSigningIn(false);
    if (signInResult.error) {
      setError(signInResult.error.message);
      return;
    }
    router.push("/home");
  };

  const validateEmail = () => {
    if (email === "") return false;
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validatePassword = () => {
    return password !== "";
  };

  const validate = () => {
    return validateEmail() && validatePassword();
  };

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Sign In!</title>
      </Head>
      <div className="w-full max-w-lg p-7">
        <div className="flex flex-row items-center gap-3">
          <p className="text-4xl font-bold mt-3">Hi, welcome!</p>
          <Image src="/high-five.png" alt="greeting" width={40} height={40} />
        </div>
        <br></br>
        <p className="text-red-600">{error}</p>
        <InputWithLabel
          labelText={"EMAIL"}
          hintText={"Your email"}
          handler={setEmail}
          obsure={false}
          error={!validateEmail()}
        ></InputWithLabel>
        <br></br>
        <InputWithLabel
          labelText={"PASSWORD"}
          hintText={"Your password"}
          handler={setPassword}
          obsure={true}
          error={!validatePassword()}
        ></InputWithLabel>
        <div className="flex flex-row justify-between mt-2 items-center">
          <div className="flex flex-row gap-2 items-center">
            <input
              type="checkbox"
              className="bg-black rounded-full focus:ring-0"
            />
            <p className="text-sm">remember me</p>
          </div>
          <Link href="reset_password" className="text-sm">
            forget password?
          </Link>
        </div>
        <br></br>
        <MainButton
          handler={signIn}
          loading={isSigningIn}
          enable={validate() && !processing}
        >
          <b>LOG IN</b>
        </MainButton>
        <OrWithSeparator />
        <AuthenWithProviders
          processing={processing}
          setProcessing={setProcessing}
          setError={setError}
        />
        <div className="text-center mt-6">
          Don&lsquo;t have an account?{" "}
          <Link href="signup" className="text-amber-200">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

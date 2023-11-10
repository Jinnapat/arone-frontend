"use client";

import AuthenWithProviders from "@/components/authen_with_providers";
import { InputWithLabel } from "@/components/input_with_label";
import MainButton from "@/components/main_button";
import OrWithSeparator from "@/components/or_with_separator";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import supabaseClient from "../../supabase/supabaseClient";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateEmail = () => {
    if (email === "") return false;
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validateUsername = () => {
    return username !== "";
  };

  const validatePassword = () => {
    return password !== ""; //&& password.length >= 6;
  };

  const validateRepassword = () => {
    return repassword !== "" && password === repassword;
  };

  const validate = () => {
    return (
      validateEmail() &&
      validateUsername() &&
      validateRepassword() &&
      validateRepassword()
    );
  };

  const signUp = async () => {
    setError("");
    setProcessing(true);
    setIsSigningUp(true);
    const signUpResult = await supabaseClient.auth.signUp({
      email,
      password,
    });
    setProcessing(false);
    setIsSigningUp(false);
    if (signUpResult.error) {
      setError(signUpResult.error.message);
      return;
    }
    if (signUpResult.data.user == null) {
      setError("Can't get user information");
      return;
    }
    const addUserResult = await supabaseClient.from("user").insert({
      id: signUpResult.data.user.id,
      username,
    });
    if (addUserResult.error) {
      setError(addUserResult.error.message);
      return;
    }
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center">
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
          error={!validateEmail()}
        />
        <br></br>
        <InputWithLabel
          labelText="Username"
          hintText="your username"
          handler={setUsername}
          obsure={false}
          error={!validateUsername()}
        />
        <br></br>
        <InputWithLabel
          labelText="Password"
          hintText="password 6 characters up"
          handler={setPassword}
          obsure={true}
          error={!validatePassword()}
        />
        <br></br>
        <InputWithLabel
          labelText="Confirm password"
          hintText="repeat password"
          handler={setRepassword}
          obsure={true}
          error={!validateRepassword()}
        />
        <br></br>
        <br></br>
        <MainButton
          handler={signUp}
          enable={validate() && !processing}
          loading={isSigningUp}
        >
          <b>SIGN UP</b>
        </MainButton>
        <OrWithSeparator />
        <AuthenWithProviders
          processing={processing}
          setProcessing={setProcessing}
          setError={setError}
        />
        <div className="text-center mt-6">
          Already have an account?{" "}
          <Link href="signin" className="text-amber-200">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

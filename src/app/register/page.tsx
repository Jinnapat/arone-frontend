"use client";

import CenterContentCard from "@/components/CenterContentCard";
import HorizontalLine from "@/components/HorizontalLine";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import SessionChecker from "@/components/SessionChecker";
import validateEmail from "@/helpers/emailValidator";
import supabaseClient from "@/supabase/client";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  const locked = isProcessing || isDone;
  const validUsername = username != "";
  const validEmail = validateEmail(email);
  const validPassword = password.length >= 6;
  const validRepassword = repassword.length >= 6 && password === repassword;
  const valid = validUsername && validEmail && validPassword && validRepassword;

  const register = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    try {
      const signUpResult = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/email_confirmed?username=${username}`,
        },
      });
      if (signUpResult.error) {
        setErrorMessage(signUpResult.error.message);
        return;
      }
      setIsDone(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SessionChecker jumpToIfAuthenticated="/reservations">
      <CenterContentCard>
        <div>
          <h1 className="font-bold text-4xl text-center">REGISTER</h1>
          <p className="text-center text-sm">
            Lets join Batter and create a greener future together!
          </p>
        </div>
        <HorizontalLine />
        <InputWithLabel
          handler={setUsername}
          labelText="Username"
          hintText="enter your username"
          error={!validUsername}
          disabled={locked}
        />
        <InputWithLabel
          handler={setEmail}
          labelText="Email"
          hintText="enter your email"
          error={!validEmail}
          disabled={locked}
        />
        <InputWithLabel
          handler={setPassword}
          labelText="Password"
          hintText="at least 6 characters"
          obsure={true}
          error={!validPassword}
          disabled={locked}
        />
        <InputWithLabel
          handler={setRepassword}
          labelText="Repeat Password"
          hintText="enter your password again"
          obsure={true}
          error={!validRepassword}
          disabled={locked}
        />
        <br></br>
        <MainButton
          handler={register}
          loading={isProcessing}
          disabled={!valid || locked}
        >
          REGISTER
        </MainButton>
        <p className="text-red-700 text-center">{errorMessage}</p>
        {isDone && (
          <p className="text-center">
            Almost done! Please check your email and verify your account
          </p>
        )}
        <HorizontalLine />
        <p className="text-center">
          Already have an account? login with this{" "}
          <Link
            href="/login"
            className="text-yellow-600 hover:text-yellow-500 transition-colors duration-300"
          >
            link
          </Link>
        </p>
      </CenterContentCard>
    </SessionChecker>
  );
};

export default RegisterPage;

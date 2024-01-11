"use client";

import CenterContentCard from "@/components/CenterContentCard";
import HorizontalLine from "@/components/HorizontalLine";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import SessionChecker from "@/components/SessionChecker";
import validateEmail from "@/helpers/emailValidator";
import supabaseClient from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const validEmail = validateEmail(email);
  const validPassword = password.length >= 6;
  const valid = validEmail && validPassword;

  const login = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    try {
      const loginResult = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (loginResult.error) {
        setErrorMessage(loginResult.error.message);
        return;
      }
      router.push("/reservations");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SessionChecker jumpToIfAuthenticated="/reservations">
      <CenterContentCard>
        <div>
          <h1 className="font-bold text-4xl text-center">LOGIN</h1>
          <p className="text-center text-sm">
            Welcome back! lets log into your account
          </p>
        </div>
        <HorizontalLine />
        <InputWithLabel
          handler={setEmail}
          labelText="Email"
          hintText="enter your email"
          error={!validEmail}
          disabled={isProcessing}
        />
        <div className="flex flex-col w-full items-end">
          <InputWithLabel
            handler={setPassword}
            labelText="Password"
            hintText="at least 6 characters"
            obsure={true}
            error={!validPassword}
            disabled={isProcessing}
          />
          <Link
            href="/forget_password"
            className="hover:text-yellow-500 transition-colors duration-300"
          >
            forget password?
          </Link>
        </div>

        <br></br>
        <MainButton handler={login} loading={isProcessing} disabled={!valid}>
          LOGIN
        </MainButton>
        <p className="text-red-700 text-center">{errorMessage}</p>
        <HorizontalLine />
        <p className="text-center">
          Don&lsquo;t have an account? create one with this{" "}
          <Link
            href="/register"
            className="text-yellow-600 hover:text-yellow-500 transition-colors duration-300"
          >
            link
          </Link>
        </p>
      </CenterContentCard>
    </SessionChecker>
  );
};

export default LoginPage;

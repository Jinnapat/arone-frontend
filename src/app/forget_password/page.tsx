"use client";

import CenterContentCard from "@/components/CenterContentCard";
import HorizontalLine from "@/components/HorizontalLine";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import SessionChecker from "@/components/SessionChecker";
import validateEmail from "@/helpers/emailValidator";
import supabaseClient from "@/supabase/client";
import { useState } from "react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const valid = validateEmail(email);

  const requestPasswordChange = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    const result = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset_password`,
    });
    if (result.error) {
      setErrorMessage(result.error.message);
      setIsProcessing(false);
      return;
    }
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <div>
      <SessionChecker jumpToIfAuthenticated="/reservations">
        <CenterContentCard>
          <div>
            <h1 className="font-bold text-4xl text-center">FORGET PASSWORD</h1>
            <p className="text-center text-sm">
              Don&lsquo;t worry! We can send password change link to your email.
            </p>
          </div>
          <HorizontalLine />
          <InputWithLabel
            handler={setEmail}
            labelText="Email"
            hintText="enter your email"
            error={!valid}
            disabled={isProcessing || isDone}
          />
          <MainButton
            handler={requestPasswordChange}
            loading={isProcessing}
            disabled={!valid || isDone}
          >
            CONTINUE
          </MainButton>
          <p className="text-red-700 text-center">{errorMessage}</p>
          {isDone && (
            <p className="text-center">
              Almost done! Please check your email and use the link inside to
              change your password.
            </p>
          )}
        </CenterContentCard>
      </SessionChecker>
    </div>
  );
};

export default ForgetPasswordPage;

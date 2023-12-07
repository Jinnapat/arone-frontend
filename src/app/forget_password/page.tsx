"use client";

import BackButton from "@/components/BackButton";
import validateEmail from "@/helpers/emailValidator";
import InputWithLabel from "@/components/InputWithLabel";
import MainButton from "@/components/MainButton";
import Head from "next/head";
import { useState } from "react";
import supabase from "@/supabase/client";
import PopupWithImage from "@/components/PopupWithImage";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const resetPassword = async () => {
    setIsProcessing(true);
    try {
      const resetPasswordResult = await supabase.auth.resetPasswordForEmail(
        email
      );
      if (resetPasswordResult.error) {
        setError(resetPasswordResult.error.message);
      } else {
        setIsDone(true);
      }
    } catch (error) {
      setError("Unexpected error occured");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Forget password</title>
      </Head>
      <div className="flex flex-col max-w-lg p-7">
        <BackButton />
        <br></br>
        <p className="text-3xl font-bold">FORGET PASSWORD?</p>
        <br></br>
        <p>
          Don&lsquo;t worry! It happens. Please enter the email associated with
          your account.
        </p>
        <br></br>
        <br></br>
        <InputWithLabel
          handler={setEmail}
          labelText="Email address"
          hintText="Enter your email address"
          error={!validateEmail(email)}
          obsure={false}
        />
        <br></br>
        <br></br>
        <MainButton
          handler={resetPassword}
          loading={isProcessing}
          disabled={!validateEmail(email)}
        >
          <b>SEND CODE</b>
        </MainButton>
        <p className="text-red-600">{error}</p>
      </div>
      <PopupWithImage
        show={isDone}
        imageSrc="/icon/message.png"
        headerText="Reset password email sent"
        message={`We've already sent out the reset password link to ${email}. Please use the link to reset your password.`}
        redirectTo="/signin"
        actionText="back to login"
      />
    </div>
  );
};

export default ForgetPasswordPage;

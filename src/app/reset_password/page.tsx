"use client";

import CenterContentCard from "@/components/CenterContentCard";
import HorizontalLine from "@/components/HorizontalLine";
import InputWithLabel from "@/components/InputWithLabel";
import Loading from "@/components/Loading";
import MainButton from "@/components/MainButton";
import supabaseClient from "@/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [
    isWaitingForPasswordRecoveryEvent,
    setIsWaitingForPasswordRecoveryEvent,
  ] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValidPasswordRecovery, setIsValidPasswordRecovery] =
    useState<boolean>(false);

  const valid = password.length >= 6;

  useEffect(() => {
    supabaseClient.auth.getUser().then((response) => {
      if (response.data.user) {
        setIsValidPasswordRecovery(true);
      }
      setIsWaitingForPasswordRecoveryEvent(false);
    });
  }, []);

  const resetPasswordChange = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    const { data, error } = await supabaseClient.auth.updateUser({
      password,
    });
    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <>
      {isWaitingForPasswordRecoveryEvent && <Loading />}
      {!isWaitingForPasswordRecoveryEvent && !isValidPasswordRecovery && (
        <CenterContentCard>
          <div>
            <h1 className="font-bold text-4xl text-center">
              INVALID RESET PASSWORD
            </h1>
            <p className="text-red-700 text-center text-sm">
              It seems like your password reset link is invalid.
            </p>
          </div>
          <HorizontalLine />
          <Link href="/forget_password">
            <MainButton>TRY AGAIN</MainButton>
          </Link>
        </CenterContentCard>
      )}
      {!isWaitingForPasswordRecoveryEvent && isValidPasswordRecovery && (
        <CenterContentCard>
          <div>
            <h1 className="font-bold text-4xl text-center">RESET PASSWORD</h1>
            <p className="text-center text-sm">
              Set your new password. Make sure to use strong password.
            </p>
          </div>
          <HorizontalLine />
          <InputWithLabel
            handler={setPassword}
            labelText="New Password"
            hintText="enter your new password at least 6 characters"
            error={!valid}
            disabled={isProcessing || isDone}
            obsure={true}
          />
          <MainButton
            handler={resetPasswordChange}
            loading={isProcessing}
            disabled={!valid || isDone}
          >
            CHANGE PASSWORD
          </MainButton>
          <p className="text-red-700 text-center">{errorMessage}</p>
          {isDone && (
            <p className="text-center">
              You password was changed successfully! Go back to{" "}
              <Link
                href="/profile"
                className="text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
              >
                profile
              </Link>
            </p>
          )}
        </CenterContentCard>
      )}
    </>
  );
};

export default ResetPasswordPage;

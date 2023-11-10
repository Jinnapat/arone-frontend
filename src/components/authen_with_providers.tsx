import { Dispatch, SetStateAction, useState } from "react";
import SignInWithProvider from "./signin_with_provider";

interface PropsType {
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

const AuthenWithProviders = ({
  processing,
  setProcessing,
  setError,
}: PropsType) => {
  return (
    <div className="flex flex-row gap-3">
      <SignInWithProvider
        provider="facebook"
        processing={processing}
        setProcessing={setProcessing}
        setError={setError}
      />
      <SignInWithProvider
        provider="google"
        processing={processing}
        setProcessing={setProcessing}
        setError={setError}
      />
    </div>
  );
};

export default AuthenWithProviders;

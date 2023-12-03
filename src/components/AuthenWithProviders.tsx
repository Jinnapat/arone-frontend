import { Dispatch, SetStateAction, useState } from "react";
import SignInWithProvider from "./SigninWithProvider";

const AuthenWithProviders = ({
  processing,
  setProcessing,
  setError,
  disabled,
}: {
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}) => {
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

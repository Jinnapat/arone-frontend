import { Dispatch, SetStateAction, useState } from "react";
import SignInWithProvider from "./SigninWithProvider";

const AuthenWithProviders = ({
  setSigningInWithProvider,
  setError,
  disabled,
}: {
  setSigningInWithProvider: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-row gap-3">
      <SignInWithProvider
        provider="facebook"
        setSigningInWithProvider={setSigningInWithProvider}
        setError={setError}
        disabled={disabled}
      />
      <SignInWithProvider
        provider="google"
        setSigningInWithProvider={setSigningInWithProvider}
        setError={setError}
        disabled={disabled}
      />
    </div>
  );
};

export default AuthenWithProviders;

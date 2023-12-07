import { Dispatch, SetStateAction, useState } from "react";
import MainButton from "./MainButton";
import Image from "next/image";
import supabase from "@/supabase/client";

const SignInWithProvider = ({
  setSigningInWithProvider,
  provider,
  setError,
  disabled,
}: {
  setSigningInWithProvider: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  provider: "facebook" | "google";
  disabled?: boolean;
}) => {
  const [isProcessing, setIsProcess] = useState<boolean>(false);

  const signInWithProviders = async (provider: "facebook" | "google") => {
    setError("");
    setSigningInWithProvider(true);
    setIsProcess(true);
    try {
      const signInResult = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:3000/home",
          queryParams:
            provider == "google"
              ? {
                  access_type: "offline",
                  prompt: "consent",
                }
              : undefined,
        },
      });
      if (signInResult.error) setError(signInResult.error.message);
    } catch (error) {
      setError("Unexpected error occurred");
    } finally {
      setSigningInWithProvider(false);
      setIsProcess(false);
    }
  };

  return (
    <MainButton
      handler={() => signInWithProviders(provider)}
      loading={isProcessing}
      disabled={isProcessing || disabled}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <Image
          src={"/icon/" + provider + ".png"}
          width={15}
          height={0}
          className="w-auto"
          alt={provider + " icon"}
        />
        <p>{provider == "facebook" ? "Facebook" : "Google"}</p>
      </div>
    </MainButton>
  );
};

export default SignInWithProvider;

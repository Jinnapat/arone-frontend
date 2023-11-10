import supabaseClient from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction, useState } from "react";
import MainButton from "./main_button";
import Image from "next/image";

interface PropsType {
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  provider: "facebook" | "google";
}

const SignInWithProvider = ({
  processing,
  setProcessing,
  provider,
  setError,
}: PropsType) => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const signInWithProviders = async (provider: "facebook" | "google") => {
    setError("");
    setProcessing(true);
    setIsSigningIn(true);
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: "/set_user",
      },
    });
    setProcessing(false);
    setIsSigningIn(false);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <MainButton
      handler={() => signInWithProviders(provider)}
      loading={isSigningIn}
      enable={!processing}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <Image
          src={"/" + provider + ".png"}
          width={20}
          height={16}
          alt={provider + " icon"}
        />
        <p>{provider[0].toUpperCase() + provider.slice(1)}</p>
      </div>
    </MainButton>
  );
};

export default SignInWithProvider;

import { Dispatch, SetStateAction, useState } from "react";
import MainButton from "./MainButton";
import Image from "next/image";
import supabase from "@/supabase/client";

const SignInWithProvider = ({
  processing,
  setProcessing,
  provider,
  setError,
}: {
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  provider: "facebook" | "google";
}) => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const signInWithProviders = async (provider: "facebook" | "google") => {
    setError("");
    setProcessing(true);
    setIsSigningIn(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options:
        provider == "facebook"
          ? {
              redirectTo: "/home",
            }
          : {
              queryParams: {
                access_type: "offline",
                prompt: "consent",
              },
            },
    });
    console.log(data);
    console.log(error);
    setProcessing(false);
    setIsSigningIn(false);
    // if (error) {
    //   setError(error.message);
    // }
  };

  return (
    <MainButton
      handler={() => signInWithProviders(provider)}
      loading={isSigningIn}
      enable={!processing}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <Image
          src={"/icon/" + provider + ".png"}
          width={15}
          height={0}
          className="w-auto"
          alt={provider + " icon"}
        />
        <p>{provider[0].toUpperCase() + provider.slice(1)}</p>
      </div>
    </MainButton>
  );
};

export default SignInWithProvider;

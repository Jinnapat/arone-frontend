import Link from "next/link";
import Image from "next/image";

const PopupWithImage = ({
  show,
  headerText,
  message,
  imageSrc,
  redirectTo,
  actionText,
}: {
  show: boolean;
  headerText: string;
  message: string;
  imageSrc: string;
  redirectTo: string;
  actionText: string;
}) => {
  return (
    <div
      className={`transition-transform duration-500 absolute bg-gray-900 border-2 border-green-400 max-w-md p-7 rounded-xl flex flex-col gap-4 top-28 mx-5 left-auto right-auto items-center ${
        show ? "scale-100" : "scale-0"
      }`}
    >
      <Image src={imageSrc} width={150} height={150} alt="icon" />
      <h1 className="text-xl font-bold text-center">{headerText}</h1>
      <p className="text-center">{message}</p>
      <Link
        href={redirectTo}
        className="rounded-lg border-2 p-4 hover:bg-green-400 transition-colors duration-300"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default PopupWithImage;

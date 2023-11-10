import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { error } from "console";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";

interface PropsType {
  labelText: string;
  hintText: string;
  handler: Dispatch<SetStateAction<string>>;
  obsure: boolean;
  error?: boolean;
}

const InputWithLabel = ({
  labelText,
  hintText,
  handler,
  error,
  obsure,
}: PropsType) => {
  const [hidden, setHidden] = useState<Boolean>(true);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    handler(event.currentTarget.value);
  };

  const toggleVisibility = () => {
    setHidden(!hidden);
  };

  return (
    <div className="flex flex-col">
      <span className="text-sm mb-3">{labelText}</span>
      <div
        className={
          "flex flex-row py-2 rounded-full bg-gray-600 px-4 items-center gap-2" +
          (error ? " border-2 border-red-700" : "")
        }
      > 
        <input
          className="bg-gray-600 outline-none w-full border-0 focus:outline-none p-0 border-transparent focus:border-transparent focus:ring-0"
          type={obsure && hidden ? "password" : "text"}
          onChange={changeHandler}
          placeholder={hintText}
        />
        {obsure && (
          <FontAwesomeIcon
            size="1x"
            icon={hidden ? faEyeSlash : faEye}
            onClick={toggleVisibility}
          />
        )}
      </div>
    </div>
  );
};

export { InputWithLabel };

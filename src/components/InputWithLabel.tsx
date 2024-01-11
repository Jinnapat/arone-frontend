import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";

const InputWithLabel = ({
  labelText,
  hintText,
  handler,
  error,
  obsure,
  disabled,
}: {
  labelText: string;
  hintText: string;
  handler: Dispatch<SetStateAction<string>>;
  obsure?: boolean;
  error?: boolean;
  disabled?: boolean;
}) => {
  const [hidden, setHidden] = useState<Boolean>(true);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    handler(event.currentTarget.value);
  };

  const toggleVisibility = () => {
    setHidden(!hidden);
  };

  return (
    <div className="flex flex-col w-full">
      <span className="text-md mb-2">{labelText}</span>
      <div
        className={`flex flex-row py-2 border-2 rounded-full bg-gray-600 pl-4 pr-2 items-center gap-2 transition-colors duration-500 ${
          error ? "border-red-700" : "border-gray-600"
        }`}
      >
        <input
          className="text-white bg-gray-600 outline-none w-full border-0 focus:outline-none p-0 border-transparent focus:border-transparent focus:ring-0 disabled:text-gray-200"
          type={obsure && hidden ? "password" : "text"}
          onChange={changeHandler}
          placeholder={hintText}
          disabled={disabled}
        />
        {obsure && (
          <button className="w-12">
            <FontAwesomeIcon
              size="1x"
              icon={hidden ? faEyeSlash : faEye}
              onClick={toggleVisibility}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputWithLabel;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MainButton = ({
  children,
  handler,
  disabled,
  loading,
}: {
  children: React.ReactNode;
  handler?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <button
      className="rounded-full w-full border-green-400 border-2 p-2 bg-black transition-colors disabled:bg-black disabled:text-gray-400 hover:bg-green-800 duration-300 text-white"
      onClick={handler}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex flex-row gap-2 justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default MainButton;

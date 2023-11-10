import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
interface PropsType {
  children: JSX.Element;
  handler: () => void;
  enable?: boolean;
  loading: boolean;
}

const MainButton = ({ children, handler, enable, loading }: PropsType) => {
  return (
    <button
      className="rounded-full w-full border-green-400 border-2 p-2 shadow-sm shadow-green-400"
      onClick={handler}
      disabled={!enable}
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

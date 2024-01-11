import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      loading...
    </div>
  );
};

export default Loading;

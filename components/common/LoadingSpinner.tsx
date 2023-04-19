import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingSpinner() {
  return (
    <span>
      <AiOutlineLoading3Quarters
        size={"4rem"}
        color="gray"
        className="animate-spin"
      />
    </span>
  );
}

export default LoadingSpinner;

import "./loading-spinner.css";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
};

export function LoadingSpinner({ size = "medium" }: Props) {
  return (
    <svg className={`spinner spinner--${size}`} viewBox="0 0 52 52">
      <circle className="spinner_circle" cx="26" cy="26" r="20" fill="none" />
    </svg>
  );
}

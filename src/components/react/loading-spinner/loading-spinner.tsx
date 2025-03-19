import "./loading-spinner.css";

export function LoadingSpinner() {
  return (
    <svg className="spinner" viewBox="0 0 52 52">
      <circle className="spinner_circle" cx="26" cy="26" r="20" fill="none" />
    </svg>
  );
}

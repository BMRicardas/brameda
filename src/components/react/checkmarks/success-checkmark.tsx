import "./checkmarks.css";

export function SuccessCheckmark() {
  return (
    <svg
      className="checkmark success"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cy="26"
        className="checkmark_circle_success"
        cx="26"
        fill="none"
        r="25"
      />
      <path
        className="checkmark_check"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

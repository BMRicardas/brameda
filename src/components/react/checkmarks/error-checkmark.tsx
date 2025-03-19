import "./checkmarks.css";

export function ErrorCheckmark() {
  return (
    <svg
      className="checkmark error"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cy="26"
        className="checkmark_circle_error"
        cx="26"
        fill="none"
        r="25"
      />
      <path
        className="checkmark_check"
        d="M16 16 36 36 M36 16 16 36"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

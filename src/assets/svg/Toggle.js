export const Toggle = (props) => {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      stroke="#22C55E"
      fill={props.item.isCompleted ? "#22C55E" : "#0d0d0d"}
    >
      <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998"></circle>
    </svg>
  );
};

const Phone = (props: SvgProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.6 7.8C5 10.6 7.4 12.9 10.2 14.4L12.4 12.2C12.7 11.9 13.1 11.8 13.4 12C14.5 12.4 15.7 12.6 17 12.6C17.6 12.6 18 13 18 13.6V17C18 17.6 17.6 18 17 18C7.6 18 0 10.4 0 1C0 0.4 0.4 0 1 0H4.5C5.1 0 5.5 0.4 5.5 1C5.5 2.2 5.7 3.4 6.1 4.6C6.2 4.9 6.1 5.3 5.9 5.6L3.6 7.8Z"
      fill={props.color || "#1432BE"}
    />
  </svg>
);

export default Phone;

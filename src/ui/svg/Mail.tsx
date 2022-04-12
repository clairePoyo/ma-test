const Mail = (props: SvgProps) => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 0.76001H2C0.9 0.76001 0 1.65101 0 2.74001V14.62C0 15.709 0.9 16.6 2 16.6H18C19.1 16.6 20 15.709 20 14.62V2.74001C20 1.65101 19.1 0.76001 18 0.76001ZM18 4.72001L10 9.67001L2 4.72001V2.74001L10 7.69001L18 2.74001V4.72001Z"
      fill={props.color || "#1432BE"}
    />
  </svg>
);

export default Mail;

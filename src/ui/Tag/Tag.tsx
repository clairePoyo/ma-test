import outlinedMailIcon from "../../assets/outlined-mail.svg";

const Tag = ({ nbUnreadMessage }: { nbUnreadMessage: number }) => {
  return (
    <div className={`tag tag${nbUnreadMessage ? "--unread" : "--all-read"}`}>
      <img src={outlinedMailIcon} alt="message counter" />
      {nbUnreadMessage}
    </div>
  );
};

export default Tag;

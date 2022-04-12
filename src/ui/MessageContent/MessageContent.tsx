import moment from "moment";

type MessageContentProps = {
  message: Message;
};

const MessageContent = ({ message }: MessageContentProps) => {
  return (
    <div className="message-content">
      <div>
        <p className="sender">
          {message.contact.firstname} {message.contact.lastname}
        </p>
        <p className="date">
          {moment(message.date).format("D MMM YYYY [à] HH:mm")}
        </p>
      </div>
      <div className="body">
        <p>{message.body}</p>
      </div>
    </div>
  );
};

export default MessageContent;

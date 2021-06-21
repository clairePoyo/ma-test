import moment from "moment";
import { useHistory } from "react-router-dom";

import RealtorsApi from "../../api/realtors";
import MessagesApi from "../../api/message";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCurrentRealtor,
  setSelectedMessages,
  updateMessageInList,
} from "../../store/actions";

import * as Icons from "../svg";
import { Colors } from "../../styles/colors";

const voiceOrSmsTitle = (contact: Contact) => {
  if (contact.firstname && contact.lastname) {
    return (
      <h4>
        <span>
          {contact.firstname} {contact.lastname}
        </span>{" "}
        <span>({contact.phone})</span>
      </h4>
    );
  }
  return <h4>{contact.phone}</h4>;
};

const emailTitle = (contact: Contact) => {
  return (
    <h4>
      {contact.firstname} {contact.lastname}
    </h4>
  );
};

const previewTitle = (messageType: Message["type"], contact: Contact) => {
  switch (messageType) {
    case "email":
      return emailTitle(contact);
    case "sms":
    case "phone":
      return voiceOrSmsTitle(contact);

    default:
      return <h4>Nouveau contact</h4>;
  }
};

const messageIcon = (messageType: Message["type"], isRead: Message["read"]) => {
  switch (messageType) {
    case "phone":
      return "Phone";
    case "email":
    case "sms":
    default:
      if (!isRead) {
        return "Mail";
      }
      return "OpenMail";
  }
};

const computeDate = (date: Message["date"]) => {
  return moment(date).calendar();
};

type MessageTitleProps = Pick<Message, "contact" | "date" | "type" | "read">;

const MessageTitle = ({ type, contact, date, read }: MessageTitleProps) => (
  <div className="message-preview__title">
    {previewTitle(type, contact)}
    <span className={`message-preview__date${read ? "--read" : ""}`}>
      {computeDate(date)}
    </span>
  </div>
);

const MessageIntro = ({ type }: Pick<Message, "type">) => {
  let messagePrefix: string;
  switch (type) {
    case "sms":
      messagePrefix = "SMS";
      break;
    case "phone":
      messagePrefix = "Message vocal";
      break;
    case "email":
    default:
      messagePrefix = "Message";
      break;
  }

  return (
    <p className="message-preview__intro">
      {messagePrefix} sur votre vitrine Meileurs Agents
    </p>
  );
};

const MessageBodyPreview = ({
  body,
  subject,
  type,
}: Pick<Message, "body" | "subject" | "type">) => {
  if (type === "sms" || type === "email") {
    return <p className="message-preview__body">{body}</p>;
  }
  return <p className="message-preview__body">{subject}</p>;
};

const MessagePreview = ({ message }: { message: Message }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const MessageIcons = Icons[messageIcon(message.type, message.read)];
  const currentRealtor = useAppSelector((state) => state.currentRealtor);

  const selectAndUpdateMessage = async () => {
    try {
      let newMessage: Message = message;

      if (!message.read) {
        const updatedMessage = await MessagesApi.updateMessage(
          currentRealtor.id,
          message.id,
          { read: true }
        );
        newMessage = updatedMessage.data;
        dispatch(updateMessageInList(newMessage));
        const updatedRealtor = await RealtorsApi.getOneRealtor(
          currentRealtor.id
        );
        dispatch(setCurrentRealtor(updatedRealtor.data));
      }
      history.push(`/${currentRealtor.id}/${newMessage.id}`);
      dispatch(setSelectedMessages(newMessage));
    } catch (e) {
      // display error message
    }
  };
  return (
    <article
      className={`message-preview message-preview${message.read && "--read"}`}
      onClick={selectAndUpdateMessage}
    >
      <MessageIcons color={message.read ? Colors.darkGrey : Colors.blue} />
      <div className="message-preview__content">
        <MessageTitle
          type={message.type}
          contact={message.contact}
          date={message.date}
          read={message.read}
        />
        <MessageIntro type={message.type} />
        <MessageBodyPreview
          type={message.type}
          body={message.body}
          subject={message.subject}
        />
      </div>
    </article>
  );
};

export default MessagePreview;

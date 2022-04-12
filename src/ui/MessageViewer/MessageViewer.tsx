import { useAppSelector } from "../../store/hooks";

import MessageContent from "../MessageContent/MessageContent";
import SenderInformation from "../SenderInformation/SenderInformation";
import EmptyState from "../EmptyState/EmptyState";

const MessageViewer = () => {
  const selectedMessage = useAppSelector((state) => state.selectedMessage);
  return (
    <main className="message-viewer">
      {selectedMessage ? (
        <>
          <SenderInformation
            contact={selectedMessage.contact}
            type={selectedMessage.type}
          />
          <MessageContent message={selectedMessage} />
        </>
      ) : (
        <EmptyState text="Sélectionnez un message" />
      )}
    </main>
  );
};

export default MessageViewer;

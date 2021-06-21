import { useState, useRef, useEffect } from "react";

import MessagesApi from "../../api/message";
import { getPaginationData } from "../../api/helpers";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import MessagePreview from "../MessagePreview/MessagePreview";
import EmptyState from "../EmptyState/EmptyState";
import { useParams } from "react-router-dom";
import {
  addRealtorMessages,
  setRealtorMessages,
  setSelectedMessages,
} from "../../store/actions";

function isBottom(ref: any) {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const Navigation = () => {
  const dispatch = useAppDispatch();
  const match = useParams<UrlParameters>();
  const contentRef = useRef<HTMLUListElement>(null);

  const { messages, currentRealtor } = useAppSelector((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] =
    useState<MessagesPaginationMetadata>();

  const getMessages = async (
    realtorId: Realtor["id"],
    params?: MessagesRequestParameters
  ) => {
    try {
      const messages = await MessagesApi.getAllMessages(realtorId, params);
      setPaginationData(getPaginationData(messages.headers["x-pagination"]));
      return messages.data;
    } catch (error) {
      //display error message
    }
  };

  const loadMoreMessages = async () => {
    const realtorId = currentRealtor?.id || match.realtorId;

    if (!realtorId) return;
    setIsLoading(true);

    getMessages(realtorId, {
      page: paginationData?.next_page || 1,
      realtor_id: realtorId,
    }).then((newMessages: Message[]) => {
      dispatch(addRealtorMessages(newMessages));
      setIsLoading(false);
    });
  };

  const onScroll = () => {
    const hasMoreData = paginationData
      ? paginationData.total_pages > paginationData.page
      : true;
    if (!isLoading && hasMoreData && isBottom(contentRef)) {
      loadMoreMessages();
    }
  };

  useEffect(() => {
    const realtorId = match?.realtorId && parseInt(match.realtorId, 10);

    if (realtorId) {
      getMessages(realtorId).then((messages: Message[]) => {
        dispatch(setRealtorMessages(messages));

        const selectedMessageId =
          match?.messageId && parseInt(match.messageId, 10);

        if (selectedMessageId) {
          const selectedMessage = messages.find(
            (message: Message) => message.id && message.id === selectedMessageId
          );

          if (selectedMessage) {
            dispatch(setSelectedMessages(selectedMessage));
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.realtorId]);

  return (
    <aside className="navigation" onScroll={onScroll}>
      {messages?.length ? (
        <ul ref={contentRef} className="navigation__list">
          {messages.map((message: Message) => (
            <MessagePreview key={message.id} message={message} />
          ))}
        </ul>
      ) : (
        <EmptyState
          text={"Sélectionnez une agence pour consulter ses messages"}
        />
      )}
    </aside>
  );
};

export default Navigation;

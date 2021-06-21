import axios, { AxiosPromise } from "axios";
import { API_BASE_URL } from "./constants";

const getAllMessages = (
  realtorId: number,
  requestParams?: MessagesRequestParameters
): AxiosPromise => {
  const params = { ...requestParams, sort: "date:asc" } || { sort: "date:asc" };
  return axios.get(`${API_BASE_URL}/realtors/${realtorId}/messages/`, {
    params,
  });
};

const getOneMessage = (
  realtorId: number,
  messageId: Message["id"]
): AxiosPromise =>
  axios.get(`${API_BASE_URL}/realtors/${realtorId}/messages/${messageId}`);

const updateMessage = (
  realtorId: number,
  messageId: Message["id"],
  body: UpdateMessageBody
): AxiosPromise =>
  axios.patch(
    `${API_BASE_URL}/realtors/${realtorId}/messages/${messageId}`,

    body
  );

const MessagesApi = {
  getAllMessages,
  getOneMessage,
  updateMessage,
};

export default MessagesApi;

import {
  SET_REALTORS,
  SET_CURRENT_REALTOR,
  SET_MESSAGES,
  ADD_MESSAGES,
  UPDATE_ONE_MESSAGE,
  SET_SELECTED_MESSAGE,
  SET_DEVICE_SIZE,
} from "./actionTypes";

export function setDeviceSize(payload: any) {
  return { type: SET_DEVICE_SIZE, payload };
}
export function setRealtors(payload: Realtor[]) {
  return { type: SET_REALTORS, payload };
}
export function setCurrentRealtor(payload: Realtor) {
  return { type: SET_CURRENT_REALTOR, payload };
}
export function setRealtorMessages(payload: Message[]) {
  return { type: SET_MESSAGES, payload };
}
export function addRealtorMessages(payload: Message[]) {
  return { type: ADD_MESSAGES, payload };
}
export function updateMessageInList(payload: Message) {
  return { type: UPDATE_ONE_MESSAGE, payload };
}
export function setSelectedMessages(payload: Message) {
  return { type: SET_SELECTED_MESSAGE, payload };
}

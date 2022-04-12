import {
  SET_CURRENT_REALTOR,
  SET_REALTORS,
  SET_MESSAGES,
  SET_SELECTED_MESSAGE,
  UPDATE_ONE_MESSAGE,
  ADD_MESSAGES,
  SET_DEVICE_SIZE,
} from "./actionTypes";

type AppState = {
  realtors: Realtor[];
  currentRealtor?: Realtor;
  messages: Message[];
  selectedMessage?: Message;
  device?: "desktop" | "mobile";
};

const initialState: AppState = {
  realtors: [],
  messages: [],
};
const reducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case SET_REALTORS:
      return { ...state, realtors: action.payload };
    case SET_CURRENT_REALTOR:
      return { ...state, currentRealtor: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ADD_MESSAGES:
      return { ...state, messages: [...state.messages, ...action.payload] };
    case UPDATE_ONE_MESSAGE:
      const messageIndex = state.messages.findIndex(
        (message) => message.id === action.payload.id
      );
      let newMessages = state.messages.slice();
      newMessages.splice(messageIndex, 1, action.payload);
      return { ...state, messages: newMessages };
    case SET_SELECTED_MESSAGE:
      return { ...state, selectedMessage: action.payload };
    case SET_DEVICE_SIZE:
      return { ...state, device: action.payload };
    default:
      return state;
  }
};
export default reducer;

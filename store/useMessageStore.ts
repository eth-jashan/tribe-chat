import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type MessageData = {
  uuid: string;
  text: string;
  authorUuid: string;
  authorName: string;
  authorAvatarUrl: string;
  sentAt: number;
  updateAt?: number;
  attachments: Array<{
    uuid: string;
    type: "image";
    url: string;
    width: number;
    height: number;
  }>;
  reactions: Array<{ uuid: string; participantUuid: string; value: string }>;
};

type MessageStore = {
  messages: MessageData[];
  newMessagesAvailable: boolean;
  fetchMessages: () => Promise<void>;
  fetchOlderMessages: (refMessageUuid: string) => Promise<void>;
  checkForNewMessages: () => Promise<boolean>;
  setNewMessagesAvailable: (value: boolean) => void;
  addMessage: (message: MessageData) => void;
  clearMessages: () => void;
};

const MESSAGES_KEY = "@messages_store";

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  newMessagesAvailable: false,

  // Fetch messages from API and store in state and AsyncStorage
  fetchMessages: async () => {
    try {
      const response = await axios.get(
        "http://dummy-chat-server.tribechat.pro/api/messages/latest"
      );
      const messages = response.data;

      // Save messages to async storage
      await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));

      set({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },

  // Fetch older messages for infinite scroll
  fetchOlderMessages: async (refMessageUuid) => {
    try {
      const response = await axios.get(
        `http://dummy-chat-server.tribechat.pro/api/messages/older/${refMessageUuid}`
      );
      const olderMessages = response.data;

      // Add older messages to the existing messages
      set((state) => ({
        messages: [...state.messages, ...olderMessages],
      }));
    } catch (error) {
      console.error("Error fetching older messages:", error);
    }
  },

  // Check for new messages to determine if new content is available
  checkForNewMessages: async () => {
    try {
      const latestMessageTimestamp = get().messages[0]?.sentAt || 0;
      const response = await axios.get(
        `http://dummy-chat-server.tribechat.pro/api/messages/updates/${latestMessageTimestamp}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking for new messages:", error);
      return false;
    }
  },

  // Set new messages available state
  setNewMessagesAvailable: (value) => set({ newMessagesAvailable: value }),

  // Add a new message to the state
  addMessage: (message) =>
    set((state) => {
      const updatedMessages = [message, ...state.messages];
      AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    }),

  // Clear messages both from state and AsyncStorage
  clearMessages: () => {
    AsyncStorage.removeItem(MESSAGES_KEY);
    set({ messages: [] });
  },
}));

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export type Participant = {
  uuid: string;
  name: string;
  bio: string;
  email: string;
  jobTitle: string;
  avatarUrl: string;
  createdAt: number;
  updatedAt: number;
};

type ParticipantStore = {
  participants: Participant[];
  fetchParticipants: () => Promise<void>;
};

const PARTICIPANTS_KEY = "@participants_store";

export const useParticipantStore = create<ParticipantStore>((set) => ({
  participants: [],

  // Fetch participants from API and store in state and AsyncStorage
  fetchParticipants: async () => {
    try {
      const response = await axios.get(
        "http://dummy-chat-server.tribechat.pro/api/participants/all"
      );
      const participants = response.data;

      // Save participants to async storage
      await AsyncStorage.setItem(
        PARTICIPANTS_KEY,
        JSON.stringify(participants)
      );

      set({ participants });
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  },
}));

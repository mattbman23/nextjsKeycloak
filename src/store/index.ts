import { IGlobalStore } from "@/type";
import { create } from "zustand";

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  chat_elements: [],
  clear_chat: () =>
    set(() => ({
      chat_elements: [],
    })),
  update_chat_elements: (chatEle) =>
    set((state) => ({
      chat_elements: [...state.chat_elements, chatEle],
    })),
}));

import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useChatStore = create((set) =>({
    chatId:null,
    user:null,
    isCurrentUserBlocked:false,
    isReceiverBlocked:false,
    changeChat:
   
}))
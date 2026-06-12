import { useReducer, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface ChatState {
  sessionId: string | null;
  status: "idle" | "initializing" | "chatting" | "analyzing" | "completed" | "error";
  messages: Message[];
  questionCount: number;
  maxQuestions: number;
  error: string | null;
  briefResult: Record<string, any> | null;
  isWaitingForResponse: boolean;
}

type ChatAction =
  | { type: "START_INIT" }
  | { type: "INIT_SESSION"; sessionId: string; initialMessage: string }
  | { type: "SEND_MESSAGE"; content: string }
  | { type: "RECEIVE_REPLY"; message: Message; questionCount: number }
  | { type: "SET_ANALYZING" }
  | { type: "COMPLETE_BRIEF"; brief: Record<string, any> }
  | { type: "SET_ERROR"; error: string };

const INITIAL_STATE: ChatState = {
  sessionId: null,
  status: "idle",
  messages: [],
  questionCount: 0,
  maxQuestions: 6,
  error: null,
  briefResult: null,
  isWaitingForResponse: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "START_INIT":
      return {
        ...state,
        status: "initializing",
        error: null,
      };
    case "INIT_SESSION":
      return {
        ...state,
        sessionId: action.sessionId,
        status: "chatting",
        messages: [
          {
            id: "system-welcome",
            role: "assistant",
            content: action.initialMessage,
            timestamp: new Date().toISOString(),
          },
        ],
        questionCount: 1,
        error: null,
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: `user-${Date.now()}`,
            role: "user",
            content: action.content,
            timestamp: new Date().toISOString(),
          },
        ],
        status: "chatting",
        isWaitingForResponse: true,
      };
    case "RECEIVE_REPLY":
      return {
        ...state,
        messages: [...state.messages, action.message],
        questionCount: action.questionCount,
        isWaitingForResponse: false,
      };
    case "SET_ANALYZING":
      return {
        ...state,
        status: "analyzing",
        isWaitingForResponse: false,
      };
    case "COMPLETE_BRIEF":
      return {
        ...state,
        status: "completed",
        briefResult: action.brief,
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: action.error,
        isWaitingForResponse: false,
      };
    default:
      return state;
  }
}

export function useChatSession(maxQuestions: number = 6) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...INITIAL_STATE,
    maxQuestions,
  });

  const initSession = useCallback(async (projectDescription: string, freelancerPersona: string) => {
    dispatch({ type: "START_INIT" });
    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription, freelancerPersona }),
      });
      if (!res.ok) throw new Error("Failed to initialize session");
      const data = await res.json();
      
      dispatch({
        type: "INIT_SESSION",
        sessionId: data.sessionId,
        initialMessage: data.welcomeMessage,
      });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", error: err.message });
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!state.sessionId) return;
    dispatch({ type: "SEND_MESSAGE", content: text });

    try {
      const res = await fetch(`/api/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: state.sessionId,
          message: text,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      if (data.isCompleted) {
        dispatch({ type: "SET_ANALYZING" });
        dispatch({ type: "COMPLETE_BRIEF", brief: { ...data.brief, projectId: data.projectId } });
      } else {
        dispatch({
          type: "RECEIVE_REPLY",
          message: {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            timestamp: new Date().toISOString(),
          },
          questionCount: data.questionCount,
        });
      }
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", error: err.message });
    }
  }, [state.sessionId]);

  return { state, initSession, sendMessage };
}
export default useChatSession;

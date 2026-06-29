// ─────────────────────────────────────────────
// Messages Page — Real-time Chat (Firestore)
// ─────────────────────────────────────────────
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { MOCK_CONVERSATIONS, MOCK_USERS, MOCK_MESSAGES } from "@/lib/mock-data";
import { useToast } from "@/context/toast-context";
import { Button } from "@/components/ui/Button";
import { SendIcon, ImagePlusIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

// In production, use Firestore for real-time chat:
// import { db } from "@/lib/firebase";
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function MessagesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMsg, setNewMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // In production, subscribe to Firestore messages:
  // useEffect(() => {
  //   if (!activeChat) return;
  //   const q = query(collection(db, "conversations", activeChat, "messages"), orderBy("createdAt"));
  //   const unsub = onSnapshot(q, (snap) => { ... });
  //   return () => unsub();
  // }, [activeChat]);

  if (!user) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="font-display text-2xl font-bold mb-2">Sign in to access messages</h2>
        <p className="text-ink-4 dark:text-surface-4 mb-6">Connect with buyers and sellers</p>
        <Button onClick={() => window.location.href = "/auth/login"}>Log In</Button>
      </div>
    );
  }

  const conversations = MOCK_CONVERSATIONS.map((c) => ({
    ...c,
    otherUser: MOCK_USERS.find((u) => u.id === c.participantIds.find((p) => p !== "current")),
  }));

  const activeConv = conversations.find((c) => c.id === activeChat);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    const msg = { id: Date.now().toString(), conversationId: activeChat!, senderId: "me", text: newMsg, read: false, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");

    // In production, send to Firestore:
    // await addDoc(collection(db, "conversations", activeChat, "messages"), { senderId: user.id, text: newMsg, createdAt: serverTimestamp(), read: false });

    // Simulate reply
    setTimeout(() => setTyping(true), 800);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), conversationId: activeChat!, senderId: "them", text: "Thanks for your message! I'll get back to you shortly.", read: false, createdAt: new Date().toISOString() }]);
    }, 2300);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <h1 className="font-display text-3xl font-bold text-ink-0 dark:text-surface-1 mb-6">Messages</h1>

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Conversation List */}
        <div className={cn(
          "flex-col w-full md:w-80 flex-shrink-0 bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden",
          activeChat ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 border-b border-ink-0/5 dark:border-surface-1/5">
            <input type="text" placeholder="Search conversations..." className="w-full px-3 py-2 rounded-xl bg-surface-2/50 dark:bg-ink-2/50 border-none outline-none text-sm" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveChat(c.id); setMessages(MOCK_MESSAGES); }}
                className={cn(
                  "w-full flex items-center gap-3 p-4 hover:bg-surface-2/50 dark:hover:bg-ink-2/50 transition-colors border-b border-ink-0/5 dark:border-surface-1/5 text-left",
                  activeChat === c.id && "bg-brand-50/50 dark:bg-brand-950/10"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img src={c.otherUser?.avatar ?? "https://i.pravatar.cc/40"} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface-0 dark:border-ink-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm truncate">{c.otherUser?.username ?? "User"}</p>
                    <span className="text-[10px] text-ink-5 flex-shrink-0">{new Date(c.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <p className="text-xs text-ink-4 dark:text-surface-4 truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {(c.unreadCount ?? 0) > 0 && (
                  <span className="w-5 h-5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{c.unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-col flex-1 bg-surface-0 dark:bg-ink-1 rounded-2xl border border-ink-0/5 dark:border-surface-1/5 overflow-hidden",
          activeChat ? "flex" : "hidden md:flex"
        )}>
          {activeConv ? (
            <>
              <div className="flex items-center gap-3 p-4 border-b border-ink-0/5 dark:border-surface-1/5">
                <button onClick={() => setActiveChat(null)} className="md:hidden text-ink-4"><ArrowLeftIcon size={18} /></button>
                <img src={activeConv.otherUser?.avatar ?? ""} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{activeConv.otherUser?.username}</p>
                  <p className="text-[10px] text-green-500">Online</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.senderId === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[75%] px-4 py-2.5",
                      msg.senderId === "me" ? "chat-bubble-sent bg-brand-500 text-white" : "chat-bubble-received bg-surface-2 dark:bg-ink-2 text-ink-0 dark:text-surface-2"
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn("text-[10px] mt-1", msg.senderId === "me" ? "text-white/60" : "text-ink-4 dark:text-surface-4")}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {msg.senderId === "me" && " ✓✓"}
                      </p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-received bg-surface-2 dark:bg-ink-2 px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 150, 300].map((d) => (
                          <div key={d} className="w-2 h-2 bg-ink-4 dark:bg-surface-4 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="p-4 border-t border-ink-0/5 dark:border-surface-1/5">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-ink-4 dark:text-surface-4 hover:text-brand-500"><ImagePlusIcon size={20} /></button>
                  <input
                    type="text"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-surface-2/50 dark:bg-ink-2/50 border-none outline-none text-sm"
                  />
                  <button onClick={sendMessage} className="p-2.5 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors">
                    <SendIcon size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="text-5xl mb-4">💬</div>
                <h3 className="font-display text-xl font-bold text-ink-0 dark:text-surface-1 mb-2">Select a conversation</h3>
                <p className="text-sm text-ink-4 dark:text-surface-4">Choose from your existing conversations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

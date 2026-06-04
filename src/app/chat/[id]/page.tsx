"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot, getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function ChatPage() {
  const params = useParams();
  const providerId = params.id as string;
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      const myDocRef = doc(db, "users", currentUser.uid);
      const myDocSnap = await getDoc(myDocRef);
      if (myDocSnap.exists()) {
        setProfile(myDocSnap.data());
      }

      // Fetch target user info
      const docRef = doc(db, "users", providerId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTargetUser(docSnap.data());
      }

      // We determine a unique chat ID between these two users
      const chatId = [currentUser.uid, providerId].sort().join("_");

      // Subscribe to messages (Removed orderBy to prevent Firestore index error)
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId)
      );

      const unsubMessages = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data({ serverTimestamps: "estimate" }) }));
        
        // Client-side sort to avoid needing a composite index
        msgs.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeA - timeB;
        });

        setMessages(msgs);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });

      return () => {
        unsubMessages();
      };
    });

    return () => unsubscribe();
  }, [providerId, router]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const chatId = [user.uid, providerId].sort().join("_");
    const msgText = newMessage.trim();
    setNewMessage("");

    try {
      await addDoc(collection(db, "messages"), {
        chatId,
        text: msgText,
        senderId: user.uid,
        createdAt: serverTimestamp()
      });

      await setDoc(doc(db, "chats", chatId), {
        participants: [user.uid, providerId],
        updatedAt: serverTimestamp(),
        lastMessage: msgText,
        users: {
          [user.uid]: { name: profile?.name || "Sem Nome", photoURL: profile?.photoURL || null },
          [providerId]: { name: targetUser?.name || "Sem Nome", photoURL: targetUser?.photoURL || null }
        }
      }, { merge: true });
    } catch (err) {
      console.error("Erro ao enviar mensagem", err);
      alert("Ocorreu um erro ao enviar a mensagem. Se a base de dados ainda não tiver as regras públicas, não conseguirá enviar.");
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition-colors">
            <i className="ph-bold ph-arrow-left"></i>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold text-xl">
              {targetUser?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">{targetUser?.name || "A carregar..."}</h2>
              {targetUser?.serviceType && (
                <span className="text-xs text-brand-blue font-bold uppercase">{targetUser.serviceType}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <i className="ph ph-chat-circle-text text-5xl mb-2"></i>
            <p>Envie a primeira mensagem para começar!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] md:max-w-[60%] p-4 rounded-2xl ${
                  isMe 
                  ? 'bg-brand-blue text-white rounded-br-sm shadow-glow-blue' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escreva a sua mensagem..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-brand-blue hover:bg-brand-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm"
            >
              <i className="ph-fill ph-paper-plane-right text-2xl"></i>
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where, updateDoc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { compressImage } from "@/utils/imageCompression";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [providers, setProviders] = useState<any[]>([]);
  const [inboxChats, setInboxChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editServiceType, setEditServiceType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("painel");
  const router = useRouter();
  const profileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfile(userData);

          if (userData.role === "provider") {
            setEditServiceType(userData.serviceType || "");
          }

          // Load all providers for EVERYONE (so providers can also search for services)
          const q = query(collection(db, "users"), where("role", "==", "provider"));
          const querySnapshot = await getDocs(q);
          const provs: any[] = [];
          querySnapshot.forEach((doc) => {
            // Don't show the user themselves in the list
            if (doc.id !== currentUser.uid) {
              provs.push({ id: doc.id, ...doc.data() });
            }
          });
          setProviders(provs);
        }

        // Fetch inbox
        const inboxQuery = query(collection(db, "chats"), where("participants", "array-contains", currentUser.uid));
        const unsubInbox = onSnapshot(inboxQuery, (snapshot) => {
          const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data({ serverTimestamps: "estimate" }) }));
          chats.sort((a: any, b: any) => {
            const timeA = a.updatedAt?.toMillis ? a.updatedAt.toMillis() : 0;
            const timeB = b.updatedAt?.toMillis ? b.updatedAt.toMillis() : 0;
            return timeB - timeA;
          });
          setInboxChats(chats);
        });
        
        // Save unsubscribe to cleanup later if needed (though not strictly necessary on top level for quick MVP)

      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        serviceType: editServiceType
      });
      setProfile({ ...profile, serviceType: editServiceType });
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Erro ao atualizar perfil", err);
      alert("Erro ao atualizar perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      setIsSaving(true);
      const base64 = await compressImage(file, 400, 400, 0.7);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { photoURL: base64 });
      setProfile({ ...profile, photoURL: base64 });
    } catch (err) {
      console.error("Error uploading photo", err);
      alert("Erro ao enviar foto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;
    
    try {
      setIsSaving(true);
      const newPhotos: string[] = [];
      const maxFiles = Math.min(files.length, 4);
      for (let i = 0; i < maxFiles; i++) {
        const base64 = await compressImage(files[i], 600, 600, 0.6);
        newPhotos.push(base64);
      }
      
      const currentPortfolio = profile?.portfolio || [];
      const updatedPortfolio = [...currentPortfolio, ...newPhotos];
      
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { portfolio: updatedPortfolio });
      setProfile({ ...profile, portfolio: updatedPortfolio });
    } catch (err) {
      console.error("Error uploading portfolio", err);
      alert("Erro ao adicionar fotos ao portfólio.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePortfolioImage = async (index: number) => {
    if (!user) return;
    try {
      setIsSaving(true);
      const updatedPortfolio = profile.portfolio.filter((_: any, i: number) => i !== index);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { portfolio: updatedPortfolio });
      setProfile({ ...profile, portfolio: updatedPortfolio });
    } catch (err) {
      console.error("Error removing photo", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <i className="ph ph-spinner animate-spin text-4xl text-brand-blue"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-brand-blue shadow-sm">
            <span className="font-black text-white text-xl tracking-tighter mr-0.5">
              R<span className="text-brand-yellow">+</span>
            </span>
          </div>
          <span className="ml-3 font-black text-xl text-slate-800">Renda +</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("painel")} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'painel' ? 'bg-blue-50 text-brand-blue' : 'text-slate-500 hover:bg-slate-50'}`}>
            <i className={`${activeTab === 'painel' ? 'ph-fill' : 'ph'} ph-squares-four text-xl`}></i>
            Painel Geral
          </button>
          <button onClick={() => setActiveTab("mensagens")} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'mensagens' ? 'bg-blue-50 text-brand-blue' : 'text-slate-500 hover:bg-slate-50'}`}>
            <i className={`${activeTab === 'mensagens' ? 'ph-fill' : 'ph'} ph-chat-circle-text text-xl`}></i>
            Mensagens
          </button>
          <button onClick={() => setActiveTab("perfil")} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'perfil' ? 'bg-blue-50 text-brand-blue' : 'text-slate-500 hover:bg-slate-50'}`}>
            <i className={`${activeTab === 'perfil' ? 'ph-fill' : 'ph'} ph-user text-xl`}></i>
            Meu Perfil
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl font-bold transition-colors">
            <i className="ph ph-sign-out text-xl"></i>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header mobile */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <div className="h-8 w-8 rounded-md overflow-hidden flex items-center justify-center bg-brand-blue shadow-sm">
             <span className="font-black text-white text-sm tracking-tighter mr-0.5">
              R<span className="text-brand-yellow">+</span>
            </span>
          </div>
          <button onClick={handleLogout} className="text-slate-500">
            <i className="ph ph-sign-out text-2xl"></i>
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-800">
                {activeTab === 'painel' && `Olá, ${profile?.name}! 👋`}
                {activeTab === 'perfil' && 'Meu Perfil'}
                {activeTab === 'mensagens' && 'Minhas Mensagens'}
              </h1>
              <p className="text-slate-500 mt-2">
                {activeTab === 'painel' && 'Encontre o profissional ideal para hoje.'}
                {activeTab === 'perfil' && 'Faça a gestão dos seus dados e configurações.'}
                {activeTab === 'mensagens' && 'Aceda ao seu histórico de conversas.'}
              </p>
            </div>

            {activeTab === 'painel' && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Profissionais Disponíveis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providers.length === 0 ? (
                    <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center">
                      <i className="ph ph-users text-4xl text-slate-300 mb-2"></i>
                      <p className="text-slate-500">Ainda não existem profissionais registados.</p>
                    </div>
                  ) : (
                    providers.map((provider) => (
                      <div key={provider.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold text-xl overflow-hidden relative">
                            {provider.photoURL ? (
                              <Image src={provider.photoURL} alt={provider.name} fill className="object-cover" />
                            ) : (
                              provider.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <span className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {provider.serviceType || "Profissional"}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">{provider.name}</h3>
                        <p className="text-slate-500 text-sm mb-6 flex items-center gap-1">
                          <i className="ph-fill ph-star text-brand-yellow"></i> 5.0 (Novato)
                        </p>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                          <Link href={`/provider/${provider.id}`} className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-dark text-white py-2.5 rounded-xl font-bold transition-colors shadow-glow-blue">
                            <i className="ph ph-user text-lg"></i>
                            Ver Perfil
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'perfil' && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative group w-20 h-20 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer shadow-sm" onClick={() => profileInputRef.current?.click()}>
                    {profile?.photoURL ? (
                      <Image src={profile.photoURL} alt={profile.name} fill className="object-cover" />
                    ) : (
                      <i className="ph ph-user text-3xl"></i>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="ph ph-camera text-white text-2xl"></i>
                    </div>
                  </div>
                  <input type="file" ref={profileInputRef} className="hidden" accept="image/*" onChange={handleProfilePhotoChange} />
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{profile?.name}</h2>
                    <p className="text-slate-500 capitalize">Conta de {profile?.role === 'provider' ? 'Prestador de Serviço' : 'Cliente'}</p>
                    {!isEditingProfile && profile?.role === 'provider' && (
                      <p className="text-brand-blue font-bold text-sm mt-1">Serviço: <span className="capitalize">{profile?.serviceType}</span></p>
                    )}
                  </div>
                </div>

                {isEditingProfile ? (
                  <div className="mb-6 space-y-4">
                    {profile?.role === 'provider' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Qual é o seu serviço?</label>
                        <select
                          value={editServiceType}
                          onChange={(e) => setEditServiceType(e.target.value)}
                          className="block w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue bg-slate-50 appearance-none"
                        >
                          <option value="baba">Babá</option>
                          <option value="empregada">Empregada Doméstica</option>
                          <option value="pedreiro">Pedreiro</option>
                          <option value="eletricista">Eletricista</option>
                          <option value="encanador">Encanador (Picheleiro)</option>
                          <option value="pintor">Pintor</option>
                          <option value="marceneiro">Marceneiro</option>
                          <option value="montador">Montador de Móveis</option>
                          <option value="jardineiro">Jardineiro</option>
                          <option value="limpeza">Limpeza Geral</option>
                        </select>
                      </div>
                    )}
                    <div className="flex gap-3 mt-6">
                      <button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-brand-blue hover:bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm disabled:bg-slate-400"
                      >
                        {isSaving ? "A guardar..." : "Guardar Alterações"}
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditingProfile(false);
                          setEditServiceType(profile?.serviceType || "");
                        }}
                        disabled={isSaving}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-600 mb-6">Mantenha o seu perfil atualizado para garantir a melhor experiência na Renda +.</p>
                    {profile?.role === 'provider' && (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
                      >
                        Mudar Serviço
                      </button>
                    )}
                  </>
                )}

                {profile?.role === "provider" && !isEditingProfile && (
                  <div className="mt-8 border-t border-slate-100 pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-slate-800">O seu Portfólio</h3>
                      <button 
                        onClick={() => portfolioInputRef.current?.click()}
                        className="bg-blue-50 hover:bg-blue-100 text-brand-blue px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                        disabled={isSaving}
                      >
                        <i className="ph ph-plus"></i>
                        Adicionar Fotos
                      </button>
                      <input type="file" ref={portfolioInputRef} className="hidden" accept="image/*" multiple onChange={handlePortfolioUpload} />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {profile?.portfolio?.length > 0 ? (
                        profile.portfolio.map((imgUrl: string, idx: number) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200">
                            <Image src={imgUrl} alt={`Portfolio ${idx}`} fill className="object-cover" />
                            <button 
                              onClick={() => handleRemovePortfolioImage(idx)}
                              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            >
                              <i className="ph ph-trash"></i>
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                          <i className="ph ph-image text-3xl text-slate-400 mb-2"></i>
                          <p className="text-slate-500 text-sm">Ainda não tem fotos no seu portfólio.</p>
                          <p className="text-slate-400 text-xs mt-1">Mostre o seu trabalho aos clientes!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'mensagens' && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Minhas Mensagens</h2>
                {inboxChats.length === 0 ? (
                 <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
                   <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                     <i className="ph ph-envelope-simple-open text-4xl"></i>
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800 mb-3">Caixa de Entrada Vazia</h2>
                   <p className="text-slate-500 mb-8 max-w-md mx-auto">Para iniciar uma nova conversa com um profissional, vá ao Painel Geral e clique no botão "Contactar".</p>
                 </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                    {inboxChats.map(chat => {
                      const otherUserId = chat.participants.find((p: string) => p !== user?.uid);
                      const otherUser = chat.users[otherUserId];
                      return (
                        <Link href={`/chat/${otherUserId}`} key={chat.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold text-xl overflow-hidden relative">
                            {otherUser?.photoURL ? (
                              <Image src={otherUser.photoURL} alt={otherUser.name} fill className="object-cover" />
                            ) : (
                              otherUser?.name?.charAt(0).toUpperCase() || "?"
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 truncate">{otherUser?.name}</h3>
                            <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                          </div>
                          <div className="text-xs text-slate-400 whitespace-nowrap">
                            {chat.updatedAt?.toDate ? chat.updatedAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

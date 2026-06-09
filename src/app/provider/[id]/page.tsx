"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import ReviewModal from "@/components/ReviewModal";

export default function ProviderProfile() {
  const params = useParams();
  const providerId = params.id as string;
  const router = useRouter();

  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchProvider = async () => {
    try {
      const docRef = doc(db, "users", providerId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().role === "provider") {
        setProvider({ id: docSnap.id, ...docSnap.data() });
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [providerId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <i className="ph ph-spinner animate-spin text-4xl text-brand-blue"></i>
      </div>
    );
  }

  if (!provider) return null;

  const ratingCount = provider.ratingCount || 0;
  const ratingSum = provider.ratingSum || 0;
  const averageRating = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : "Novo";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition-colors">
            <i className="ph-bold ph-arrow-left"></i>
          </Link>
          <span className="font-bold text-slate-800">Voltar ao Painel</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-brand-blue/10"></div>
            
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-md relative z-10 mt-8 md:mt-12 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold text-4xl overflow-hidden relative">
                {provider.photoURL ? (
                  <Image src={provider.photoURL} alt={provider.name} fill className="object-cover" />
                ) : (
                  provider.name.charAt(0).toUpperCase()
                )}
              </div>
            </div>

            <div className="flex-1 relative z-10 md:mt-16 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-800 leading-tight">{provider.name}</h1>
                  <span className="inline-block mt-2 bg-blue-50 text-brand-blue text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {provider.serviceType || "Profissional"}
                  </span>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-2 bg-yellow-50 px-4 py-3 rounded-2xl shadow-sm">
                  <i className="ph-fill ph-star text-3xl text-brand-yellow"></i>
                  <div className="text-left">
                    <span className="block text-2xl font-black text-slate-800 leading-none">{averageRating}</span>
                    <span className="text-xs text-slate-500 font-bold">{ratingCount} avaliações</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link 
                  href={`/chat/${provider.id}`} 
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-dark text-white py-4 rounded-xl font-bold transition-colors shadow-glow-blue"
                >
                  <i className="ph ph-chat-circle-text text-xl"></i>
                  Contactar Profissional
                </Link>
                <button 
                  onClick={() => setShowReviewModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-brand-yellow hover:text-brand-yellow hover:bg-yellow-50 text-slate-700 py-4 rounded-xl font-bold transition-all shadow-sm"
                >
                  <i className="ph ph-star text-xl"></i>
                  Deixar Avaliação
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <i className="ph ph-image text-brand-blue"></i>
              Portfólio de Trabalhos
            </h2>
            
            {provider.portfolio && provider.portfolio.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {provider.portfolio.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-slate-100">
                    <Image src={imgUrl} alt={`Trabalho ${idx + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <i className="ph ph-images text-4xl text-slate-300 mb-3"></i>
                <p className="text-slate-500 font-medium">Este profissional ainda não adicionou fotos ao portfólio.</p>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {showReviewModal && (
        <ReviewModal 
          providerId={provider.id} 
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            setShowReviewModal(false);
            fetchProvider(); // reload to show new rating
            alert("Obrigado pela sua avaliação!");
          }}
        />
      )}
    </div>
  );
}

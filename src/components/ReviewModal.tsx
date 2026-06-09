"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface ReviewModalProps {
  providerId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ providerId, onClose, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    
    try {
      const docRef = doc(db, "users", providerId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const currentSum = data.ratingSum || 0;
        const currentCount = data.ratingCount || 0;
        
        await updateDoc(docRef, {
          ratingSum: currentSum + rating,
          ratingCount: currentCount + 1
        });
        
        onSuccess();
      }
    } catch (err) {
      console.error("Erro ao submeter avaliação", err);
      alert("Ocorreu um erro ao enviar a avaliação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <i className="ph-bold ph-x"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-brand-yellow/20 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ph-fill ph-star text-3xl"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-800">Avaliar Serviço</h2>
          <p className="text-slate-500 mt-2 text-sm">Como foi a sua experiência com este profissional?</p>
        </div>
        
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="text-4xl transition-transform hover:scale-110 focus:outline-none"
            >
              <i className={`${star <= (hoverRating || rating) ? 'ph-fill text-brand-yellow' : 'ph text-slate-300'} ph-star transition-colors`}></i>
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={rating === 0 || loading}
          className="w-full bg-brand-blue hover:bg-brand-dark text-white font-bold py-4 rounded-xl shadow-glow-blue transition-colors disabled:bg-slate-300 disabled:shadow-none"
        >
          {loading ? "A enviar..." : "Submeter Avaliação"}
        </button>
      </div>
    </div>
  );
}

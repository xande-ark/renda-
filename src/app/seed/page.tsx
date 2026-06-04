"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const mockProviders = [
  { name: "João Silva", serviceType: "pedreiro", role: "provider" },
  { name: "Maria Santos", serviceType: "baba", role: "provider" },
  { name: "Carlos Ferreira", serviceType: "eletricista", role: "provider" },
  { name: "Ana Oliveira", serviceType: "limpeza", role: "provider" },
  { name: "Rui Costa", serviceType: "encanador", role: "provider" },
  { name: "Sofia Martins", serviceType: "empregada", role: "provider" },
  { name: "Pedro Almeida", serviceType: "pintor", role: "provider" },
  { name: "Helena Sousa", serviceType: "marceneiro", role: "provider" }
];

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const seedDatabase = async () => {
    setLoading(true);
    try {
      for (const provider of mockProviders) {
        const id = "mock_" + Math.random().toString(36).substr(2, 9);
        await setDoc(doc(db, "users", id), provider);
      }
      setDone(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar perfis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md">
        <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ph ph-users text-3xl"></i>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-slate-800">Gerador de Testes</h1>
        <p className="text-slate-500 mb-6">Esta ferramenta vai criar 8 perfis de prestadores de serviço falsos para podermos testar a plataforma.</p>
        
        {done ? (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl font-bold border border-green-100">
            Perfis criados com sucesso! Já pode voltar ao Painel Geral.
          </div>
        ) : (
          <button 
            onClick={seedDatabase}
            disabled={loading}
            className="bg-brand-blue hover:bg-brand-dark transition-colors text-white px-6 py-3 rounded-xl font-bold w-full shadow-md"
          >
            {loading ? "A criar perfis..." : "Criar 8 Prestadores de Teste"}
          </button>
        )}
      </div>
    </div>
  );
}

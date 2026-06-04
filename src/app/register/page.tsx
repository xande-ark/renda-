"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Register() {
  const [role, setRole] = useState<"client" | "provider">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save user profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        serviceType: role === "provider" ? serviceType : null,
        createdAt: new Date().toISOString()
      });
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors font-semibold">
          <i className="ph-bold ph-arrow-left"></i> Voltar ao site
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-glow-blue flex items-center justify-center bg-brand-blue">
            <span className="font-black text-white text-3xl tracking-tighter mr-1">
              R<span className="text-brand-yellow">+</span>
            </span>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-black text-white tracking-tight">
          Crie a sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-blue-100">
          Já tem conta?{" "}
          <Link href="/login" className="font-bold text-brand-yellow hover:text-white transition-colors">
            Faça login aqui
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl py-10 px-6 sm:rounded-3xl sm:px-10 shadow-2xl border border-white/20">
          
          {/* Seletor de Perfil */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 relative">
            <div className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow transition-all duration-300 ${role === 'client' ? 'left-1' : 'left-[calc(50%+3px)]'}`}></div>
            <button
              onClick={() => setRole("client")}
              className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${role === 'client' ? 'text-brand-blue' : 'text-slate-500'}`}
            >
              Preciso de um serviço
            </button>
            <button
              onClick={() => setRole("provider")}
              className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${role === 'provider' ? 'text-brand-blue' : 'text-slate-500'}`}
            >
              Sou Profissional
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-semibold border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                Nome Completo
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="ph-fill ph-user text-xl"></i>
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-slate-50 transition-all"
                  placeholder="O seu nome"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                Endereço de Email
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="ph-fill ph-envelope-simple text-xl"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-slate-50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                Palavra-passe
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="ph ph-lock-key text-xl"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-slate-50 transition-all"
                  placeholder="Crie uma palavra-passe forte"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-brand-blue transition-colors"
                >
                  <i className={`ph ${showPassword ? "ph-eye-slash" : "ph-eye"} text-xl`}></i>
                </button>
              </div>
            </div>

            {role === "provider" && (
               <div>
               <label htmlFor="service" className="block text-sm font-bold text-slate-700">
                 Qual serviço vai prestar?
               </label>
               <div className="mt-2 relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                   <i className="ph-fill ph-briefcase text-xl"></i>
                 </div>
                 <select
                   id="service"
                   required
                   value={serviceType}
                   onChange={(e) => setServiceType(e.target.value)}
                   className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-slate-50 transition-all appearance-none"
                 >
                   <option value="" disabled>Selecione um serviço</option>
                   <option value="baba">Babá</option>
                   <option value="empregada">Empregada Doméstica</option>
                   <option value="pedreiro">Pedreiro</option>
                   <option value="encanador">Encanador</option>
                   <option value="eletricista">Eletricista</option>
                   <option value="outro">Outro</option>
                 </select>
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                   <i className="ph-bold ph-caret-down"></i>
                 </div>
               </div>
             </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-glow-yellow text-sm font-bold text-slate-900 bg-brand-yellow hover:bg-brand-yellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <i className="ph ph-spinner animate-spin text-2xl"></i>
                ) : (
                  "Criar conta grátis"
                )}
              </button>
            </div>
            
            <p className="text-xs text-center text-slate-500 mt-4">
              Ao registar-se, concorda com os nossos <a href="#" className="font-bold hover:text-brand-blue">Termos de Serviço</a> e <a href="#" className="font-bold hover:text-brand-blue">Política de Privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Credenciais inválidas. Verifique o seu email e palavra-passe.");
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
          Bem-vindo de volta
        </h2>
        <p className="mt-2 text-center text-sm text-blue-100">
          Ou{" "}
          <Link href="/register" className="font-bold text-brand-yellow hover:text-white transition-colors">
            crie a sua conta gratuitamente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl py-10 px-6 sm:rounded-3xl sm:px-10 shadow-2xl border border-white/20">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-semibold border border-red-100">
                {error}
              </div>
            )}
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
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 font-medium">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-brand-blue hover:text-brand-dark transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-glow-blue text-sm font-bold text-white bg-brand-blue hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <i className="ph ph-spinner animate-spin text-2xl"></i>
                ) : (
                  "Entrar na conta"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

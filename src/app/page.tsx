"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: "ease-out-cubic",
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`glass-header fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-sm bg-white/95" : "bg-white/85"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer h-12 w-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="w-full h-full bg-brand-blue flex items-center justify-center">
                <span className="font-black text-white text-2xl tracking-tighter mr-0.5">
                  R<span className="text-brand-yellow">+</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#servicos" className="text-slate-600 hover:text-brand-blue font-semibold transition-colors duration-200">
                Serviços
              </Link>
              <Link href="#como-funciona" className="text-slate-600 hover:text-brand-blue font-semibold transition-colors duration-200">
                Como Funciona
              </Link>
              <Link href="#contacto" className="text-slate-600 hover:text-brand-blue font-semibold transition-colors duration-200">
                Contacto
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-slate-600 font-bold hover:text-brand-blue transition-colors">
                Entrar
              </Link>
              <Link
                href="/register"
                className="bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 font-bold py-2.5 px-6 rounded-full shadow-glow-yellow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Registar Grátis
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-600">Entrar</Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-brand-blue focus:outline-none"
              >
                <i className="ph ph-list text-3xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="#servicos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-semibold text-slate-700 hover:text-brand-blue hover:bg-slate-50">
                Serviços
              </Link>
              <Link href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-semibold text-slate-700 hover:text-brand-blue hover:bg-slate-50">
                Como Funciona
              </Link>
              <Link href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-semibold text-slate-700 hover:text-brand-blue hover:bg-slate-50">
                Contacto
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block mt-4 px-3 py-3 text-center rounded-full bg-brand-yellow text-slate-900 font-bold shadow-md">
                Registar Grátis
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-bg pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[90vh] flex items-center relative z-10" id="hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            <div className="w-full lg:w-1/2 text-center lg:text-left text-white" data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-sm font-semibold tracking-wide text-brand-yellow">
                🌟 A sua casa em boas mãos
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Os melhores profissionais para o seu lar, <span className="text-brand-yellow">na palma da sua mão.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Conectamos você a babás, empregadas, encanadores, eletricistas e pedreiros de confiança. Serviço rápido, seguro e sem complicações.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/register" className="flex items-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-slate-900 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-glow-yellow w-full sm:w-auto font-bold text-lg">
                  Começar Agora
                </Link>
                <Link href="#como-funciona" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 w-full sm:w-auto font-bold text-lg">
                  Saber Mais
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-blue-200 text-sm font-semibold">
                <div className="flex items-center gap-2"><i className="ph-fill ph-check-circle text-brand-yellow text-xl"></i> Profissionais Verificados</div>
                <div className="flex items-center gap-2"><i className="ph-fill ph-star text-brand-yellow text-xl"></i> Avaliações Reais</div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-yellow/30 rounded-full blur-[80px] z-0"></div>
              <Image src="/mockup.png" alt="Renda + App Interface" width={420} height={800} className="relative z-10 w-full max-w-[320px] md:max-w-[380px] lg:max-w-[420px] object-contain animate-float drop-shadow-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-slate-50 relative" id="servicos">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-brand-blue font-bold text-sm tracking-widest uppercase mb-2">O que precisa hoje?</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-800">Serviços à sua medida</h3>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">Encontre especialistas qualificados para qualquer necessidade do dia a dia, a apenas um clique de distância.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: 'baby', title: 'Babá', desc: 'Cuidado e carinho para os seus pequenos com confiança.' },
              { icon: 'broom', title: 'Empregada', desc: 'Limpeza impecável e organização para o seu lar.' },
              { icon: 'wall', title: 'Pedreiro', desc: 'Pequenos reparos ou grandes obras com qualidade.' },
              { icon: 'drop', title: 'Encanador', desc: 'Soluções rápidas para vazamentos e instalações.' },
              { icon: 'lightning', title: 'Eletricista', desc: 'Segurança e eficiência em instalações elétricas.' },
            ].map((service, index) => (
              <div key={index} className="service-card bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center cursor-pointer relative overflow-hidden group" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                <div className="icon-wrapper w-20 h-20 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6">
                  <i className={`ph ph-${service.icon} text-4xl`}></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h4>
                <p className="text-slate-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center" data-aos="fade-in" data-aos-delay="600">
            <Link href="/register" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
              Ver todos os serviços <i className="ph-bold ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden" id="como-funciona">
        <div className="blob w-96 h-96 bg-brand-yellow/10 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="blob w-96 h-96 bg-brand-blue/5 rounded-full bottom-0 right-0 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Como Funciona?</h3>
            <p className="text-slate-500 text-lg">Três passos simples para resolver o seu problema.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            <div className="step-item relative w-full md:w-1/3 text-center px-4 mb-12 md:mb-0" data-aos="fade-up" data-aos-delay="100">
              <div className="w-24 h-24 mx-auto bg-blue-50 border-4 border-white shadow-lg rounded-full flex items-center justify-center text-brand-blue mb-6 relative z-10">
                <i className="ph ph-magnifying-glass text-4xl"></i>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-md">1</div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Procure o serviço</h4>
              <p className="text-slate-500">Abra a app, diga-nos o que precisa e veja as opções disponíveis na sua zona.</p>
            </div>

            <div className="step-item relative w-full md:w-1/3 text-center px-4 mb-12 md:mb-0" data-aos="fade-up" data-aos-delay="300">
              <div className="w-24 h-24 mx-auto bg-blue-50 border-4 border-white shadow-lg rounded-full flex items-center justify-center text-brand-blue mb-6 relative z-10">
                <i className="ph ph-hand-tap text-4xl"></i>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-md">2</div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Escolha o profissional</h4>
              <p className="text-slate-500">Compare avaliações, preços e perfis. Escolha o especialista perfeito para si.</p>
            </div>

            <div className="step-item relative w-full md:w-1/3 text-center px-4" data-aos="fade-up" data-aos-delay="500">
              <div className="w-24 h-24 mx-auto bg-brand-blue border-4 border-white shadow-lg shadow-glow-blue rounded-full flex items-center justify-center text-white mb-6 relative z-10">
                <i className="ph ph-check-circle text-4xl"></i>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-md">3</div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Serviço realizado</h4>
              <p className="text-slate-500">O profissional vai até si. Pague com segurança através da aplicação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 relative" id="download">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-brand-blue rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl" data-aos="zoom-in">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">Pronto para transformar a gestão do seu lar?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">Junte-se a milhares de utilizadores que já confiam na Renda + para encontrar os melhores profissionais.</p>
            
            <Link href="/register" className="inline-flex items-center justify-center gap-3 bg-brand-yellow hover:bg-white text-slate-900 font-bold text-lg py-4 px-10 rounded-full shadow-glow-yellow transition-all duration-300 transform hover:-translate-y-1 relative z-10 group">
              <div className="h-7 w-7 rounded-md overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110 bg-brand-blue shadow-sm">
                <span className="font-black text-white text-sm tracking-tighter mr-0.5">
                  R<span className="text-brand-yellow">+</span>
                </span>
              </div>
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-16 pb-8" id="contacto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="md:col-span-1">
              <div className="h-12 w-12 rounded-xl overflow-hidden mb-6 flex items-center justify-center bg-brand-blue shadow-glow-blue">
                <span className="font-black text-white text-2xl tracking-tighter mr-0.5">
                  R<span className="text-brand-yellow">+</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                A plataforma definitiva para encontrar serviços para o seu lar de forma rápida, segura e eficiente.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                  <i className="ph-fill ph-instagram-logo text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                  <i className="ph-fill ph-facebook-logo text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                  <i className="ph-fill ph-twitter-logo text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Empresa</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Sobre Nós</a></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Carreiras</a></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Termos de Serviço</a></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Para Profissionais</h5>
              <ul className="space-y-3">
                <li><Link href="/register" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Seja um Parceiro</Link></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Central de Ajuda</a></li>
                <li><a href="#" className="text-slate-400 hover:text-brand-yellow transition-colors text-sm">Regras e Segurança</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Contacto</h5>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <i className="ph-fill ph-envelope-simple text-brand-yellow"></i> ola@rendamais.pt
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <i className="ph-fill ph-phone text-brand-yellow"></i> +351 900 000 000
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Renda +. Todos os direitos reservados.
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-1">
              Feito com <i className="ph-fill ph-heart text-red-500"></i> para a sua casa.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

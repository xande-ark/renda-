"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PresentationPage() {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 100,
      duration: 1500,
      easing: "ease-in-out-sine",
    });
  }, []);

  const slides = [
    {
      id: "abertura",
      title: "Abertura e Introdução",
      speaker: "Pessoa 1 (CEO)",
      image: "/images/apresentacao/slide_abertura_1781017598729.png",
      content: (
        <>
          <p className="mb-4">
            &quot;Olá a todos. Olhem para o lado. Quantas pessoas vocês conhecem hoje que precisam de uma renda extra imediata, ou que trabalham de forma autônoma e sofrem para encontrar clientes e, pior, sofrem com o medo constante de levar um calote no final do dia? Do outro lado, quantas vezes você precisou de uma faxina de última hora, um eletricista ou um passeador de cães e não sabia em quem confiar?
          </p>
          <p>
            Para resolver esse gargalo do mercado informal, nós criamos o <strong>Renda+</strong>. Nós não somos um LinkedIn e nem um mural de anúncios poluído como o Facebook. Nós somos um ecossistema de contratação instantânea focado em três pilares: <strong>Disponibilidade, Localização e Reputação</strong>. Vou passar a palavra para o nosso CTO, que vai explicar como transformamos essa dor em uma plataforma funcional.&quot;
          </p>
        </>
      )
    },
    {
      id: "arquitetura",
      title: "Arquitetura da Plataforma",
      speaker: "Pessoa 2 (CTO)",
      image: "/images/apresentacao/slide_arquitetura_1781017610130.png",
      content: (
        <>
          <p className="mb-4">
            &quot;Obrigado. O core do Renda+ foi desenhado para mitigar a carga cognitiva e a barreira digital. Nós operamos como um Marketplace Bilateral Sob Demanda. Na nossa plataforma, eliminamos currículos longos e focamos no que importa.
          </p>
          <p className="mb-4">
            Para o <strong>Demand-Side</strong>, ou seja, o cliente que contrata, a experiência é visual e direta. Ao acessar nossa aplicação, ele se depara com macrocategorias claras: faxina, jardinagem e pequenos reparos. Através de ferramentas de Geofencing, o app calcula a proximidade exata e oferece um &apos;Clique Único&apos; de solicitação baseado em preço transparente e avaliação.
          </p>
          <p>
            Já para o <strong>Supply-Side</strong>, o prestador de serviço, nosso foco foi a inclusão digital. Sabemos que muitos profissionais têm aparelhos antigos ou dificuldades com textos longos. Por isso, a interface é limpa, permite descrições em áudio e oferece um painel de vagas em tempo real na região dele. Ele aceita o serviço com um toque. Mas para um marketplace funcionar, precisamos entender o mercado, e passo a palavra para nossa diretoria estratégica.&quot;
          </p>
        </>
      )
    },
    {
      id: "swot",
      title: "Análise Estratégica SWOT",
      speaker: "Pessoa 3 (CFO/CMO)",
      image: "/images/apresentacao/slide_swot_1781017621987.png",
      content: (
        <>
          <p className="mb-4">
            &quot;Analisando o cenário competitivo do Renda+, mapeamos nossas forças e fraquezas de forma realista. Nossa maior <strong>Força</strong> é a baixíssima barreira de entrada e o apelo hiperlocal, reduzindo o custo de transporte do trabalhador. Na vertente externa, vemos uma <strong>Oportunidade</strong> gigantesca no crescimento da Gig Economy e no forte apelo social do projeto para investidores focados em ESG.
          </p>
          <p className="mb-4">
            Contudo, não ignoramos nossas <strong>Fraquezas</strong>. Como qualquer marketplace bilateral, dependemos do &apos;Efeito de Rede&apos;: precisamos de volume de ambos os lados para o app fazer sentido. Além disso, enfrentamos a <strong>Ameaça</strong> crônica da desintermediação, que é quando o cliente e o prestador &apos;pulam&apos; o app no segundo atendimento para não pagar taxas.
          </p>
          <p>
            Nossa estratégia de monetização com taxas justas (Take Rate) e assinaturas premium baratas só se sustenta porque resolvemos o maior medo desse mercado: a segurança. E é sobre isso que nosso Diretor de Operações vai falar agora.&quot;
          </p>
        </>
      )
    },
    {
      id: "seguranca",
      title: "Segurança e Valores",
      speaker: "Pessoa 4 (COO)",
      image: "/images/apresentacao/slide_seguranca_1781017635043.png",
      content: (
        <>
          <p className="mb-4">
            &quot;Exatamente. O que impede a desintermediação e atrai o usuário é a nossa robusta Gestão de Riscos e Segurança, dividida em três camadas.
          </p>
          <p className="mb-4">
            Na <strong>Prevenção</strong>, aplicamos o &apos;Liveness Check&apos; com biometria facial e background check automatizado de antecedentes criminais. No <strong>Monitoramento</strong>, o app age como uma testemunha digital: o serviço só começa quando o prestador insere um token numérico gerado pelo cliente, e contamos com rastreamento de rota e um botão de pânico SOS silencioso.
          </p>
          <p className="mb-4">
            Por fim, no <strong>pós-serviço</strong>, garantimos um fundo de microseguro contra danos materiais e a retenção segura do dinheiro na carteira digital, liberado só após o &apos;Ok&apos; do cliente. Isso zera o calote.
          </p>
          <p>
            Tudo isso se conecta fortemente com o nosso quarto tópico: <strong>Nossos Valores</strong>. O Renda+ é regido pelo framework ESG. Promovemos a dignidade social equilibrando a balança com a avaliação bilateral — onde o prestador também avalia o cliente. Garantimos governança com auditoria humana contra banimentos injustos e defendemos a sustentabilidade ambiental através da hiperlocalidade, diminuindo grandes deslocamentos urbanos. Devolvo a palavra para nosso CEO.&quot;
          </p>
        </>
      )
    },
    {
      id: "encerramento",
      title: "Encerramento",
      speaker: "Pessoa 1 (CEO)",
      image: "/images/apresentacao/slide_encerramento_1781017647067.png",
      content: (
        <>
          <p className="mb-4">
            &quot;Para fechar, o Renda+ não é só tecnologia; é impacto social escalável e sustentável. Nosso MVP já está online e estruturado para validar essas interações. Estamos prontos para transformar a informalidade em um ecossistema seguro, digno e lucrativo para todas as pontas.
          </p>
          <p>
            Convidamos todos vocês a acessarem nossa plataforma e conhecerem o futuro do trabalho autônomo local. Obrigado!&quot;
          </p>
        </>
      )
    }
  ];

  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-slate-900 text-slate-100 relative">
      
      {/* Botão Voltar Fixo para garantir que sempre fique visível na área segura */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
          <Link href="/" className="inline-flex items-center gap-2 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-bold transition-all shadow-lg border border-white/10" data-aos="fade-down" data-aos-delay="200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Sair
          </Link>
      </div>

      {/* Intro Slide */}
      <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center text-center px-6 relative hero-bg overflow-hidden py-20">
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" data-aos="zoom-in" data-aos-duration="2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="300"></div>

        <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center justify-center">
          <div data-aos="fade-up" className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-xs md:text-sm font-bold tracking-widest text-yellow-300 uppercase shadow-xl">
            Apresentação Executiva
          </div>
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-white drop-shadow-2xl">
            Pitch <span className="text-yellow-400">Renda+</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-xl md:text-3xl opacity-90 font-medium text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Conheça a plataforma que está revolucionando o futuro do trabalho autônomo local.
          </p>
          <div data-aos="fade-up" data-aos-delay="600" className="mt-16 animate-bounce opacity-80 flex flex-col items-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-xs md:text-sm text-yellow-300">Deslize para iniciar</p>
            <div className="w-8 h-12 md:w-10 md:h-14 border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 md:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Slides */}
      {slides.map((slide, index) => (
        <section key={slide.id} className="h-[100dvh] w-full snap-start flex flex-col lg:flex-row relative bg-white overflow-hidden">
          
          {/* Mobile Overlay Title */}
          <div className="absolute top-0 left-0 w-full pt-16 pb-6 px-6 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-20 lg:hidden pointer-events-none">
            <div data-aos="fade-down">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold mb-2 inline-block uppercase tracking-wider">Tópico {index + 1}</span>
              <h2 className="text-xl font-bold text-white drop-shadow-md leading-tight">{slide.title}</h2>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full h-[40dvh] lg:h-[100dvh] lg:w-1/2 relative bg-slate-100 flex-shrink-0">
             <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-aos="fade-right"
                data-aos-duration="1000"
              />
          </div>
          
          {/* Content Side */}
          <div className="w-full h-[60dvh] lg:h-[100dvh] lg:w-1/2 flex flex-col p-6 pb-20 md:p-12 lg:p-24 overflow-y-auto bg-slate-50 relative">
              
              <div className="hidden lg:block mb-8 xl:mb-10" data-aos="fade-left" data-aos-delay="100">
                  <span className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-xs xl:text-sm font-black tracking-widest uppercase shadow-sm">
                    Tópico {index + 1}
                  </span>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black mt-6 text-slate-800 leading-tight">
                    {slide.title}
                  </h2>
              </div>
              
              <div data-aos="fade-left" data-aos-delay="200" className="flex items-center gap-3 xl:gap-4 text-blue-700 font-bold text-base md:text-lg xl:text-xl mb-6 xl:mb-8 border-b border-blue-100 pb-4 xl:pb-6">
                <span className="bg-blue-600 text-white p-2 xl:p-2.5 rounded-full shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-6 xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </span>
                {slide.speaker}
              </div>
              
              <div data-aos="fade-up" data-aos-delay="300" className="prose prose-base lg:prose-lg xl:prose-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-4 md:pl-6 xl:pl-8 bg-white/50 p-4 xl:p-6 rounded-r-2xl shadow-sm overflow-visible">
                {slide.content}
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 right-6 lg:bottom-8 lg:right-8 text-slate-300 font-bold text-lg lg:text-xl pointer-events-none">
                {index + 1} / {slides.length}
              </div>
          </div>
        </section>
      ))}

      {/* CTA Slide */}
      <section className="h-[100dvh] w-full snap-start flex flex-col justify-center items-center text-center px-6 hero-bg relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] pointer-events-none" data-aos="zoom-in" data-aos-duration="1500"></div>

        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center justify-center h-full">
            <div data-aos="flip-up" className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 md:mb-10 transform rotate-12 hover:rotate-0 transition-all duration-500">
               <span className="font-black text-blue-600 text-3xl md:text-4xl tracking-tighter mr-0.5">
                  R<span className="text-yellow-400">+</span>
                </span>
            </div>
            <h3 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 text-white drop-shadow-xl leading-tight">
              Pronto para transformar sua rotina?
            </h3>
            <p data-aos="fade-up" data-aos-delay="200" className="text-xl md:text-2xl text-blue-100 mb-10 md:mb-12 max-w-2xl font-medium px-4">
              Junte-se ao ecossistema de contratação instantânea mais seguro do mercado.
            </p>
            <div data-aos="zoom-in" data-aos-delay="300">
              <Link href="/register" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-xl md:text-2xl transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(250,204,21,0.6)]">
                Comece a usar agora
              </Link>
            </div>
            <div className="mt-12 md:mt-16" data-aos="fade-up" data-aos-delay="400">
                <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-semibold text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Voltar para a página inicial
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}

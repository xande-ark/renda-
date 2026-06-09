import Image from 'next/image';
import Link from 'next/link';

export default function PresentationPage() {
  const slides = [
    {
      id: "abertura",
      title: "Abertura e Introdução",
      speaker: "Pessoa 1 (CEO)",
      image: "/images/apresentacao/slide_abertura_1781017598729.png",
      content: (
        <>
          <p className="mb-4">
            "Olá a todos. Olhem para o lado. Quantas pessoas vocês conhecem hoje que precisam de uma renda extra imediata, ou que trabalham de forma autônoma e sofrem para encontrar clientes e, pior, sofrem com o medo constante de levar um calote no final do dia? Do outro lado, quantas vezes você precisou de uma faxina de última hora, um eletricista ou um passeador de cães e não sabia em quem confiar?
          </p>
          <p>
            Para resolver esse gargalo do mercado informal, nós criamos o <strong>Renda+</strong>. Nós não somos um LinkedIn e nem um mural de anúncios poluído como o Facebook. Nós somos um ecossistema de contratação instantânea focado em três pilares: <strong>Disponibilidade, Localização e Reputação</strong>. Vou passar a palavra para o nosso CTO, que vai explicar como transformamos essa dor em uma plataforma funcional."
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
            "Obrigado. O core do Renda+ foi desenhado para mitigar a carga cognitiva e a barreira digital. Nós operamos como um Marketplace Bilateral Sob Demanda. Na nossa plataforma, eliminamos currículos longos e focamos no que importa.
          </p>
          <p className="mb-4">
            Para o <strong>Demand-Side</strong>, ou seja, o cliente que contrata, a experiência é visual e direta. Ao acessar nossa aplicação, ele se depara com macrocategorias claras: faxina, jardinagem, marido de aluguel. Através de ferramentas de Geofencing, o app calcula a proximidade exata e oferece um 'Clique Único' de solicitação baseado em preço transparente e avaliação.
          </p>
          <p>
            Já para o <strong>Supply-Side</strong>, o prestador de serviço, nosso foco foi a inclusão digital. Sabemos que muitos profissionais têm aparelhos antigos ou dificuldades com textos longos. Por isso, a interface é limpa, permite descrições em áudio e oferece um painel de vagas em tempo real na região dele. Ele aceita o serviço com um toque. Mas para um marketplace funcionar, precisamos entender o mercado, e passo a palavra para nossa diretoria estratégica."
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
            "Analisando o cenário competitivo do Renda+, mapeamos nossas forças e fraquezas de forma realista. Nossa maior <strong>Força</strong> é a baixíssima barreira de entrada e o apelo hiperlocal, reduzindo o custo de transporte do trabalhador. Na vertente externa, vemos uma <strong>Oportunidade</strong> gigantesca no crescimento da Gig Economy e no forte apelo social do projeto para investidores focados em ESG.
          </p>
          <p className="mb-4">
            Contudo, não ignoramos nossas <strong>Fraquezas</strong>. Como qualquer marketplace bilateral, dependemos do 'Efeito de Rede': precisamos de volume de ambos os lados para o app fazer sentido. Além disso, enfrentamos a <strong>Ameaça</strong> crônica da desintermediação, que é quando o cliente e o prestador 'pulam' o app no segundo atendimento para não pagar taxas.
          </p>
          <p>
            Nossa estratégia de monetização com taxas justas (Take Rate) e assinaturas premium baratas só se sustenta porque resolvemos o maior medo desse mercado: a segurança. E é sobre isso que nosso Diretor de Operações vai falar agora."
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
            "Exatamente. O que impede a desintermediação e atrai o usuário é a nossa robusta Gestão de Riscos e Segurança, dividida em três camadas.
          </p>
          <p className="mb-4">
            Na <strong>Prevenção</strong>, aplicamos o 'Liveness Check' com biometria facial e background check automatizado de antecedentes criminais. No <strong>Monitoramento</strong>, o app age como uma testemunha digital: o serviço só começa quando o prestador insere um token numérico gerado pelo cliente, e contamos com rastreamento de rota e um botão de pânico SOS silencioso.
          </p>
          <p className="mb-4">
            Por fim, no <strong>pós-serviço</strong>, garantimos um fundo de microseguro contra danos materiais e a retenção segura do dinheiro na carteira digital, liberado só após o 'Ok' do cliente. Isso zera o calote.
          </p>
          <p>
            Tudo isso se conecta fortemente com o nosso quarto tópico: <strong>Nossos Valores</strong>. O Renda+ é regido pelo framework ESG. Promovemos a dignidade social equilibrando a balança com a avaliação bilateral — onde o prestador também avalia o cliente. Garantimos governança com auditoria humana contra banimentos injustos e defendemos a sustentabilidade ambiental através da hiperlocalidade, diminuindo grandes deslocamentos urbanos. Devolvo a palavra para nosso CEO."
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
            "Para fechar, o Renda+ não é só tecnologia; é impacto social escalável e sustentável. Nosso MVP já está online e estruturado para validar essas interações. Estamos prontos para transformar a informalidade em um ecossistema seguro, digno e lucrativo para todas as pontas.
          </p>
          <p>
            Convidamos todos vocês a acessarem nossa plataforma e conhecerem o futuro do trabalho autônomo local. Obrigado!"
          </p>
        </>
      )
    }
  ];

  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-slate-900 text-slate-100">
      {/* Intro Slide */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center text-center px-4 relative hero-bg overflow-hidden">
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30">
            <Link href="/" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar à Home
            </Link>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-20 max-w-5xl mx-auto">
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-sm md:text-base font-bold tracking-widest text-yellow-300 uppercase shadow-xl">
            Apresentação Executiva
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-white drop-shadow-2xl">
            Pitch <span className="text-yellow-400">Renda+</span>
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 font-medium text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Conheça a plataforma que está revolucionando o futuro do trabalho autônomo local.
          </p>
          <div className="mt-16 animate-bounce opacity-80 flex flex-col items-center">
            <p className="mb-3 font-semibold uppercase tracking-widest text-sm text-yellow-300">Deslize para ver</p>
            <div className="w-10 h-14 border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Slides */}
      {slides.map((slide, index) => (
        <section key={slide.id} className="h-screen w-full snap-start flex flex-col lg:flex-row relative bg-white overflow-hidden group">
          {/* Mobile Overlay Title */}
          <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-20 lg:hidden pointer-events-none">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">SLIDE {index + 1}</span>
            <h2 className="text-2xl font-bold text-white drop-shadow-md">{slide.title}</h2>
          </div>

          {/* Image Side */}
          <div className="w-full h-[45vh] lg:h-screen lg:w-1/2 relative bg-slate-100">
             <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
          </div>
          
          {/* Content Side */}
          <div className="w-full h-[55vh] lg:h-screen lg:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-24 overflow-y-auto bg-slate-50 relative">
              
              <div className="hidden lg:block mb-10 transform transition-all duration-700 translate-y-0 opacity-100">
                  <span className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-sm">
                    Tópico {index + 1}
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-black mt-6 text-slate-800 leading-tight">
                    {slide.title}
                  </h2>
              </div>
              
              <div className="flex items-center gap-4 text-blue-700 font-bold text-lg md:text-xl mb-8 border-b border-blue-100 pb-6">
                <span className="bg-blue-600 text-white p-2.5 rounded-full shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </span>
                {slide.speaker}
              </div>
              
              <div className="prose prose-lg md:prose-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-6 md:pl-8 bg-white/50 p-6 rounded-r-2xl shadow-sm">
                {slide.content}
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-6 right-8 text-slate-300 font-bold text-xl">
                {index + 1} / {slides.length}
              </div>
          </div>
        </section>
      ))}

      {/* CTA Slide */}
      <section className="h-screen w-full snap-start flex flex-col justify-center items-center text-center px-4 hero-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-10 transform rotate-12 hover:rotate-0 transition-all duration-500">
               <span className="font-black text-blue-600 text-4xl tracking-tighter mr-0.5">
                  R<span className="text-yellow-400">+</span>
                </span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black mb-8 text-white drop-shadow-xl leading-tight">
              Pronto para transformar sua rotina?
            </h3>
            <p className="text-2xl text-blue-100 mb-12 max-w-2xl font-medium">
              Junte-se ao ecossistema de contratação instantânea mais seguro do mercado.
            </p>
            <Link href="/register" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-12 py-6 rounded-full font-black text-2xl transition-all shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:scale-105 hover:shadow-[0_0_60px_rgba(250,204,21,0.6)]">
              Comece a usar agora
            </Link>
            <div className="mt-16">
                <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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

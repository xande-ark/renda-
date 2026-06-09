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
            Para resolver esse gargalo do mercado informal, nós criamos o Renda+. Nós não somos um LinkedIn e nem um mural de anúncios poluído como o Facebook. Nós somos um ecossistema de contratação instantânea focado em três pilares: <strong>Disponibilidade, Localização e Reputação</strong>. Vou passar a palavra para o nosso CTO, que vai explicar como transformamos essa dor em uma plataforma funcional."
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16 px-4 text-center hero-bg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-md">Pitch: Renda+</h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto font-medium">
            Conheça o futuro do trabalho autônomo e da contratação de serviços locais.
          </p>
          <Link href="/" className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-glow-yellow hover:scale-105">
            Voltar para a Home
          </Link>
        </div>
      </div>

      {/* Presentation Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-20">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Image side */}
            <div className="w-full lg:w-5/12 relative min-h-[350px] lg:min-h-full bg-slate-100">
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={index === 0}
              />
            </div>
            {/* Content side */}
            <div className="w-full lg:w-7/12 p-8 md:p-14 flex flex-col justify-center">
              <div className="inline-block bg-blue-100 text-blue-800 font-bold tracking-wide px-4 py-1.5 rounded-full text-sm mb-6 w-max shadow-sm">
                TÓPICO {index + 1}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-800">{slide.title}</h2>
              <div className="text-blue-600 font-bold text-lg mb-8 flex items-center gap-2">
                <span className="bg-blue-600 text-white p-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                {slide.speaker}
              </div>
              <div className="prose prose-slate prose-lg md:prose-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-6 md:pl-8 bg-slate-50 p-6 rounded-r-2xl">
                {slide.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-12 px-4 pb-12">
        <h3 className="text-3xl font-bold mb-8 text-slate-800">Pronto para transformar sua rotina?</h3>
        <Link href="/register" className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-glow-blue hover:scale-105">
          Comece a usar o Renda+ hoje
        </Link>
      </div>
    </div>
  );
}

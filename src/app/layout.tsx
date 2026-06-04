import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renda + | Os melhores profissionais para o seu lar",
  description: "Renda + é um marketplace que conecta clientes a prestadores de serviços autónomos do dia a dia. Babás, empregadas, pedreiros, encanadores e eletricistas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${nunito.variable} scroll-smooth`}
    >
      <head>
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="beforeInteractive" />
      </head>
      <body className="antialiased overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

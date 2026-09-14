import type { Metadata } from "next";
import { Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { HashScroller } from "@/components/ui/HashScroller";
import { SITE } from "@/lib/site";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.libeerj.org.br"),
  title: {
    default: `${SITE.name} — ${SITE.slogan}`,
    template: `%s · ${SITE.name}`,
  },
  description: `${SITE.fullName}. ${SITE.slogan}. Carnaval 2027 em desfile.`,
  applicationName: SITE.name,
  keywords: [
    "LIBEERJ",
    "blocos de rua",
    "carnaval",
    "Rio de Janeiro",
    "blocos de embalo",
    "blocos de enredo",
  ],
  icons: {
    icon: "/assets/images/libeerj-logo.jpeg",
    shortcut: "/assets/images/libeerj-logo.jpeg",
    apple: "/assets/images/libeerj-logo.jpeg",
  },
  openGraph: {
    title: `${SITE.name} — Liga Independente dos Blocos`,
    description: `${SITE.slogan}. Carnaval ${SITE.currentYear} em desfile.`,
    siteName: SITE.name,
    images: ["/assets/images/libeerj-logo.jpeg"],
    locale: "pt_BR",
    type: "website",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" translate="no">
      <body className={greatVibes.variable}>
        <Header />
        <div className="page-scroll">
          {children}
          <Footer />
        </div>
        <BackToTop />
        <HashScroller />
      </body>
    </html>
  );
}
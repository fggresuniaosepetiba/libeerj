export const SITE = {
  name: "LIBEERJ",
  fullName: "Liga Independente dos Blocos de Embalo e Enredo do Rio de Janeiro",
  shortFullName: "Liga Independente dos Blocos de Embalo e Enredo",
  slogan: "O Carnaval de rua organizado, representado e celebrado",
  city: "Rio de Janeiro",
  currentYear: 2027,
  logo: "/assets/images/libeerj-logo.jpeg",
  email: "contato@libeerj.org.br",
  phone: "+55 (21) 0000-0000",
  address: "Centro, Rio de Janeiro — RJ",
  founded: "Fundada para defender e organizar os blocos cariocas",
};

export const NAV = [
  { label: "Início", href: "/" },
  { label: "A Liga", href: "/a-liga" },
  { label: "Blocos", href: "/blocos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Notícias", href: "/noticias" },
  { label: "Memória", href: "/memoria" },
] as const;

export const FOOTER_NAV = [
  { label: "Início", href: "/" },
  { label: "A Liga", href: "/a-liga" },
  { label: "Blocos", href: "/blocos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Notícias", href: "/noticias" },
  { label: "Nossa Memória", href: "/memoria" },
  { label: "Diretoria", href: "/diretoria" },
  { label: "Contato", href: "/#participar" },
] as const;

export const FOOTER_INSTITUTIONAL = [
  { label: "Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Imprensa", href: "#" },
] as const;

export const SOCIAL = {
  whatsapp:
    "https://wa.me/5521965846376?text=Ol%C3%A1!%20%F0%9F%91%8B%F0%9F%8E%AD%0AVim%20pelo%20site%20oficial%20da%20LIBEERJ%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Liga.%20%F0%9F%98%8A%0APoderiam%20me%20ajudar%3F",
  instagram: "https://www.instagram.com/libeerj.oficial/",
  youtube: "https://www.youtube.com/",
} as const;

export const DONATION = {
  pixKey: null as string | null,
  beneficiaryName: null as string | null,
  document: null as string | null,
  qrCode: null as string | null,
  description: null as string | null,
};

export const FILE_CREDIT =
  "Fotografias: Agência Brasil, Governo do Amapá, Prefeitura de Olinda, Agência Brasília, Flickr Commons e acervos públicos — via Wikimedia Commons. Licenças CC BY / CC BY-SA.";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppWidget from './components/WhatsAppWidget.jsx';
import QuoteCartWidget from './components/QuoteCartWidget.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

import HomePage from './pages/HomePage.jsx';
import ProdutosPage from './pages/ProdutosPage.jsx';
import VentiladoresPage from './pages/VentiladoresPage.jsx';
import ExaustoresPage from './pages/ExaustoresPage.jsx';
import LocacaoPage from './pages/LocacaoPage.jsx';
import EmpresaPage from './pages/EmpresaPage.jsx';
import QualidadePage from './pages/QualidadePage.jsx';
import ContatoPage from './pages/ContatoPage.jsx';
import DownloadsPage from './pages/DownloadsPage.jsx';
import ClientesPage from './pages/ClientesPage.jsx';
import EticaPage from './pages/EticaPage.jsx';
import PrivacidadePage from './pages/PrivacidadePage.jsx';
import NovidadesPage from './pages/NovidadesPage.jsx';

// Mapeamento simples de páginas
const PAGES = {
  home: HomePage,
  produtos: ProdutosPage,
  ventiladores: VentiladoresPage,
  exaustores: ExaustoresPage,
  locacao: LocacaoPage,
  empresa: EmpresaPage,
  qualidade: QualidadePage,
  contato: ContatoPage,
  downloads: DownloadsPage,
  clientes: ClientesPage,
  etica: EticaPage,
  privacidade: PrivacidadePage,
  novidades: NovidadesPage,
};

// Títulos SEO por página
const PAGE_TITLES_PT = {
  home: 'Vesper Equipamentos EX | Ventiladores e Exaustores Industriais — Rio de Janeiro',
  produtos: 'Produtos Vesper | Ventiladores, Exaustores, Insufladores e Locação',
  ventiladores: 'Ventiladores Industriais EX | Vesper Equipamentos — Rio de Janeiro',
  exaustores: 'Exaustores Industriais EX | Vesper Equipamentos — Rio de Janeiro',
  locacao: 'Locação de Ventiladores e Exaustores EX | Vesper — Rio de Janeiro',
  empresa: 'Nossa História | Vesper Equipamentos EX — 60 Anos de Tradição',
  qualidade: 'Qualidade ISO 9001:2015 e INMETRO 115:2022 | Vesper Equipamentos EX',
  contato: 'Contato | Vesper Equipamentos EX — Rio de Janeiro',
  downloads: 'Catálogos e Downloads | Vesper Equipamentos EX',
  clientes: 'Clientes | Vesper Equipamentos EX',
  etica: 'Código de Ética | Vesper Equipamentos EX',
  novidades: 'Novidades | Vesper Equipamentos EX',
  privacidade: 'Política de Privacidade | Vesper Equipamentos EX',
};

const PAGE_TITLES_EN = {
  home: 'Vesper EX Equipment | Industrial Fans and Exhausters — Rio de Janeiro',
  produtos: 'Vesper Products | Fans, Exhausters, Blowers and Rental',
  ventiladores: 'Industrial EX Fans | Vesper Equipment — Rio de Janeiro',
  exaustores: 'Industrial EX Exhausters | Vesper Equipment — Rio de Janeiro',
  locacao: 'Rental of EX Fans and Exhausters | Vesper — Rio de Janeiro',
  empresa: 'Our History | Vesper EX Equipment — 60 Years of Tradition',
  qualidade: 'Quality ISO 9001:2015 and INMETRO 115:2022 | Vesper EX Equipment',
  contato: 'Contact | Vesper EX Equipment — Rio de Janeiro',
  downloads: 'Catalogs and Downloads | Vesper EX Equipment',
  clientes: 'Clients | Vesper EX Equipment',
  etica: 'Code of Ethics | Vesper EX Equipment',
  novidades: 'News | Vesper EX Equipment',
  privacidade: 'Privacy Policy | Vesper EX Equipment',
};

// Meta descriptions por página
const PAGE_DESCRIPTIONS_PT = {
  home: 'Vesper — Fabricação e locação de ventiladores e exaustores industriais certificados EX. ISO 9001:2015, INMETRO 115:2022. Bonsucesso, Rio de Janeiro. (21) 9 6727-1871.',
  produtos: 'Categorias de produtos Vesper: ventiladores, exaustores, insufladores e frota de locação.',
  ventiladores: 'Ventiladores industriais a prova de explosão (EX) certificados pelo INMETRO. Diâmetros 45 a 150 cm. Grupos IIA, IIB, IIC. Motor WEG EX. Rio de Janeiro.',
  exaustores: 'Exaustores axiais e centrífugos EX certificados pelo INMETRO 115:2022. 20 a 100 cm. Para Óleo & Gás, Offshore e Áreas Classificadas. Rio de Janeiro.',
  locacao: 'Locação de ventiladores e exaustores industriais. Portfólio próprio com manutenção inclusa. Entrega em todo o Brasil. Vesper Equipamentos EX — Rio de Janeiro.',
  empresa: 'Conheça a história da Vesper: mais de 60 anos de tradição em ventilação industrial. Exportamos para 5 países. Especialistas em equipamentos EX certificados.',
  qualidade: 'Qualidade garantida: ISO 9001:2015 e INMETRO 115:2022. Missão, visão e valores da Vesper Equipamentos EX. Download de certificados disponível.',
  contato: 'Entre em contato com a Vesper Equipamentos EX. Telefone, e-mail, endereço e formulário de contato. Bonsucesso, Rio de Janeiro.',
  downloads: 'Catálogos técnicos em PDF para ventiladores e exaustores industriais Vesper. Download gratuito.',
  clientes: 'Clientes da Vesper Equipamentos EX: Petrobras, Braskem, Vale, Embraer e outros. Referência nacional em equipamentos EX.',
  etica: 'Código de Ética e Conduta da Vesper Equipamentos EX LTDA.',
  novidades: 'Últimas novidades, lançamentos e publicações da Vesper Equipamentos EX. Siga nossas redes sociais.',
  privacidade: 'Política de Privacidade da Vesper Equipamentos EX LTDA. Como tratamos seus dados pessoais.',
};

const PAGE_DESCRIPTIONS_EN = {
  home: 'Vesper - Manufacturing and rental of certified EX industrial fans and exhausters. ISO 9001:2015, INMETRO 115:2022. Bonsucesso, Rio de Janeiro. +55 21 96727-1871.',
  produtos: 'Vesper product categories: fans, exhausters, blowers and rental fleet.',
  ventiladores: 'Explosion-proof industrial fans certified by INMETRO. Diameters from 45 to 150 cm. Groups IIA, IIB and IIC. WEG EX motor. Rio de Janeiro.',
  exaustores: 'Axial and centrifugal EX exhausters certified by INMETRO 115:2022. From 20 to 100 cm. For Oil & Gas, Offshore and Hazardous Locations. Rio de Janeiro.',
  locacao: 'Rental of industrial fans and exhausters. Own fleet with included maintenance. Delivery throughout Brazil. Vesper EX Equipment - Rio de Janeiro.',
  empresa: 'Learn about Vesper history: over 60 years of industrial ventilation tradition. Exporting to 5 countries. Specialists in certified EX equipment.',
  qualidade: 'Guaranteed quality: ISO 9001:2015 and INMETRO 115:2022. Mission, vision and values of Vesper EX Equipment. Certificates available for download.',
  contato: 'Contact Vesper EX Equipment. Phone, email, address and contact form. Bonsucesso, Rio de Janeiro.',
  downloads: 'Technical PDF catalogs for Vesper industrial fans and exhausters. Free download.',
  clientes: 'Vesper EX Equipment clients: Petrobras, Braskem, Vale, Embraer and others. National reference in EX equipment.',
  etica: 'Code of Ethics and Conduct of Vesper EX Equipment LTDA.',
  novidades: 'Latest news, releases and publications from Vesper EX Equipment. Follow our social channels.',
  privacidade: 'Privacy Policy of Vesper EX Equipment LTDA. How we handle personal data.',
};

// Canonical URLs por página
const PAGE_SLUGS = {
  home: '',
  produtos: 'produtos',
  ventiladores: 'ventiladores',
  exaustores: 'exaustores',
  locacao: 'locacao',
  empresa: 'empresa',
  qualidade: 'qualidade',
  contato: 'contato',
  downloads: 'downloads',
  clientes: 'clientes',
  etica: 'etica',
  novidades: 'novidades',
  privacidade: 'privacidade',
};

function parseLocation(pathname, hashString) {
  if (hashString && hashString.startsWith('#/')) {
    pathname = '/' + hashString.replace(/^#\/?/, '');
  }

  const normalizedPath = pathname.replace(/\/+/g, '/').replace(/\/$/, '').replace(/^\//, '');
  if (!normalizedPath) {
    return { page: 'home', productId: null };
  }

  const parts = normalizedPath.split('/');
  const page = parts[0];
  const productId = parts[1] || null;

  if (PAGES[page]) {
    return { page, productId };
  }
  return { page: 'home', productId: null };
}

function buildPath(page, productId = null) {
  if (page === 'home' && !productId) {
    return '/';
  }
  if (productId) {
    return `/${page}/${productId}`;
  }
  return `/${page}/`;
}

export default function App() {
  const { i18n } = useTranslation();
  const [route, setRoute] = useState(() => parseLocation(window.location.pathname, window.location.hash));

  const navigateTo = (page, productId = null) => {
    if (PAGES[page]) {
      const path = buildPath(page, productId);
      window.history.pushState(null, '', path);
      setRoute({ page, productId });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Escuta mudanças de histórico do navegador (botão voltar/avançar)
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation(window.location.pathname, window.location.hash));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentPage = route.page;
  const currentProductId = route.productId;

  // Atualizar title, description, canonical e hash a cada mudança de página/idioma/produto
  useEffect(() => {
    const isEN = i18n.language === 'en';
    const titles = isEN ? PAGE_TITLES_EN : PAGE_TITLES_PT;
    const descriptions = isEN ? PAGE_DESCRIPTIONS_EN : PAGE_DESCRIPTIONS_PT;

    // Title
    document.title = titles[currentPage] || titles.home;

    // Meta description
    let descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', descriptions[currentPage] || descriptions.home);
    }

    // Canonical — URL limpa sem hash para SEO
    const baseUrl = window.location.origin;
    const slug = PAGE_SLUGS[currentPage] || currentPage;
    const canonical = currentPage === 'home'
      ? `${baseUrl}/`
      : currentProductId
        ? `${baseUrl}/${currentPage}/${currentProductId}`
        : `${baseUrl}/${slug}/`;
    let canonicalEl = document.getElementById('canonical-link');
    if (canonicalEl) canonicalEl.setAttribute('href', canonical);

    // Open Graph URL
    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', canonical);

    // HTML lang
    document.documentElement.lang = isEN ? 'en' : 'pt-BR';

    // Garante que o caminho do navegador esteja correto sem hash
    const expectedPath = buildPath(currentPage, currentProductId);
    if (window.location.pathname + window.location.search !== expectedPath) {
      window.history.replaceState(null, '', expectedPath);
    }

    // Scroll ao topo na troca de página
    window.scrollTo(0, 0);
  }, [currentPage, currentProductId, i18n.language]);

  const PageComponent = PAGES[currentPage] || HomePage;

  return (
    <div className="min-h-screen bg-theme-body text-theme-primary antialiased transition-colors duration-300">
      {/* Skip to content link para acessibilidade */}
      <a href="#main-content" className="skip-to-content">
        {i18n.language === 'en' ? 'Skip to main content' : 'Pular para o conteúdo principal'}
      </a>

      <Header currentPage={currentPage} navigateTo={navigateTo} />

      <main id="main-content" tabIndex="-1">
        <PageComponent
          navigateTo={navigateTo}
          currentPage={currentPage}
          currentProductId={currentProductId}
        />
      </main>

      <Footer navigateTo={navigateTo} />
      <QuoteCartWidget />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import InnerPageHero from '../components/InnerPageHero.jsx';
import { COMPANY } from '../data/company.js';
import { ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { LOGO_CLIENTS } from '../data/clients.js';
import { localizeCompany } from '../i18n/localizedData.js';

function ImgSkeleton({ src, alt, className, ...props }) {
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);
    return (
        <div className="relative w-full h-full">
            {!loaded && !error && (
                <div className="absolute inset-0 bg-theme-surface-elevated animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={() => setLoaded(true)}
                onError={() => { setError(true); setLoaded(true); }}
                {...props}
            />
        </div>
    );
}

function LazyInstitutionalVideo() {
    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/img/offshore_skid.jpg"
            className="w-full h-full object-contain bg-black"
        >
            <source src="/Video750-fullhd.mp4" type="video/mp4" />
        </video>
    );
}

export default function EmpresaPage({ navigateTo }) {
    const { t, i18n } = useTranslation();
    const company = localizeCompany(COMPANY, i18n.language);
    const stats = [
        { value: '60+', label: t('home.stats.yearsMarket') },
        { value: company.employees, label: t('home.stats.employees') },
        { value: '5', label: t('companyPage.stats.countries') },
    ];

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('companyPage.hero.badge') }]} />

            <InnerPageHero
                badge={t('companyPage.hero.badge')}
                title={t('companyPage.hero.title')}
                titleHighlight={t('companyPage.hero.titleHighlight')}
                subtitle={t('companyPage.hero.subtitle')}
                bgImage="/assets/img/offshore_skid.jpg"
            />

            {/* Abertura — texto + números */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-16 items-stretch mb-20">

                    {/* Vídeo Institucional */}
                    <div className="relative h-full min-h-[520px] flex justify-center">
                        <div className="h-full w-full max-w-[476px] overflow-hidden bg-black border border-theme relative flex items-center justify-center">
                            <LazyInstitutionalVideo />
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                        </div>
                        {/* Badge flutuante */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--bg-body)] to-transparent" />
                        <div className="absolute bottom-5 left-5 flex gap-3 flex-wrap">
                            {stats.map((s) => (
                                <div key={s.label} className="bg-theme-footer/90 border border-theme px-4 py-2.5 backdrop-blur-sm">
                                    <p className="text-xl font-black text-brand-main leading-none">{s.value}</p>
                                    <p className="text-theme-muted text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Texto */}
                    <div className="h-full">
                        <p className="text-[11px] text-brand-sub font-black uppercase tracking-widest mb-5">
                            {t('companyPage.hero.badge')}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-theme-primary tracking-tighter mb-8 leading-none">
                            {t('companyPage.hero.title')}<br />
                            <span className="text-brand-main">{t('companyPage.hero.titleHighlight')}</span>
                        </h2>

                        {company.history.split('\n\n').map((para, i) => (
                            <p key={i} className="text-theme-secondary text-sm leading-relaxed mb-5 font-normal">
                                {para}
                            </p>
                        ))}

                        <div className="flex gap-3 mt-8 flex-wrap">
                            <button onClick={() => navigateTo('qualidade')} className="bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black font-black py-3 px-7 text-xs uppercase tracking-widest transition-all flex items-center gap-2 w-fit shadow-md shadow-[#DBA800]/20">
                                {t('companyPage.cta.quality')} <ArrowRight size={14} />
                            </button>
                            <button onClick={() => navigateTo('clientes')} className="text-theme-muted hover:text-theme-primary text-xs font-bold uppercase tracking-widest transition-colors py-3 px-4">
                                {t('companyPage.cta.clients')} →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Exportações + Certificações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="border border-theme bg-theme-surface p-8">
                        <h3 className="text-theme-primary font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                            <Globe size={14} className="text-brand-main" /> {t('companyPage.exports')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {company.exports.map((country) => (
                                <span
                                    key={country}
                                    className="border border-theme text-theme-secondary text-xs font-medium px-3 py-1.5 hover:border-brand-main/30 transition-colors"
                                >
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="border border-theme bg-theme-surface p-8">
                        <h3 className="text-theme-primary font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-brand-main" /> {t('companyPage.certifications')}
                        </h3>
                        <div className="space-y-3">
                            {company.certifications.map((cert) => (
                                <div key={cert.name} className="flex items-start gap-3">
                                    <ShieldCheck className="text-brand-main shrink-0 mt-0.5" size={14} />
                                    <div>
                                        <p className="text-theme-primary font-bold text-xs">{cert.name}</p>
                                        <p className="text-theme-muted text-[11px] mt-0.5">{cert.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Clientes em destaque — grade de logos */}
                <div className="border-t border-theme pt-16">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-[10px] font-black text-theme-muted uppercase tracking-[0.35em] mb-2 flex items-center gap-3">
                                <span className="w-6 h-px bg-brand-main" />
                                {t('companyPage.clients.eyebrow')}
                            </p>
                            <h2 className="text-lg font-black text-theme-primary tracking-tight">
                                {t('companyPage.clients.title')}
                            </h2>
                        </div>
                        <button
                            onClick={() => navigateTo('clientes')}
                            className="text-[11px] text-theme-muted hover:text-brand-main font-black uppercase tracking-widest transition-colors flex items-center gap-1.5"
                        >
                            {t('common.seeAll')} <ArrowRight size={11} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {LOGO_CLIENTS.map((client) => (
                            <div
                                key={client.name}
                                className="bg-theme-surface border border-theme hover:border-brand-main/20 p-6 flex items-center justify-center aspect-[3/2] group transition-all duration-500 cursor-pointer"
                                onClick={() => navigateTo('clientes')}
                                title={client.name}
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<span class="text-theme-muted text-[11px] font-bold uppercase tracking-wider text-center">${client.name}</span>`;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

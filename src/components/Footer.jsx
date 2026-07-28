import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Shield, Award, CheckCircle } from 'lucide-react';
import { COMPANY } from '../data/company.js';
import { localizeCompany } from '../i18n/localizedData.js';

const getFooterLinks = (t) => [
    { label: t('nav.produtos'), page: 'produtos' },
    { label: t('nav.ventiladores'), page: 'ventiladores' },
    { label: t('nav.exaustores'), page: 'exaustores' },
    { label: t('nav.locacao'), page: 'locacao' },
    { label: t('nav.empresa'), page: 'empresa' },
    { label: t('nav.clientes'), page: 'clientes' },
    { label: t('nav.qualidade'), page: 'qualidade' },
    { label: t('nav.novidades'), page: 'novidades' },
    { label: t('nav.etica'), page: 'etica' },
    { label: t('nav.downloads'), page: 'downloads' },
    { label: t('nav.contato'), page: 'contato' },
];

const CERTS = [
    {
        id: 'abnt',
        img: '/assets/img/certs/abnt.png',
        alt: 'ABNT',
        label: 'ABNT',
        sublabel: 'Sócio Colaborador',
        logoClass: 'scale-[2.0]',
    },
    {
        id: 'petrobras',
        img: '/assets/img/certs/crc.png',
        alt: 'CRC Petrobras',
        label: 'Petrobras',
        sublabel: 'Fornecedor Cadastrado',
        logoClass: '',
    },
    {
        id: 'firjan',
        img: '/assets/img/certs/firjan.png',
        alt: 'Sistema Firjan',
        label: 'Sistema Firjan',
        sublabel: 'Empresa Associada',
        logoClass: '',
    },
];

// Selos de norma (texto puro)
const NORMS = [
    { icon: <Shield size={11} />, text: 'ISO 9001:2015' },
    { icon: <CheckCircle size={11} />, text: 'Zonas 1 e 2 | Zonas 21 e 22' },
    { icon: <CheckCircle size={11} />, text: 'Gases IIA/IIB/IIC | Poeiras IIIA/IIIB/IIIC' },
    { icon: <Award size={11} />, text: 'INMETRO 115:2022' },
    { icon: <Shield size={11} />, text: 'NBR IEC 60079' },
];

export default function Footer({ navigateTo }) {
    const { t, i18n } = useTranslation();
    const year = new Date().getFullYear();
    const footerLinks = getFooterLinks(t);
    const company = localizeCompany(COMPANY, i18n.language);

    return (
        <footer className="bg-theme-footer border-t border-theme pt-14 pb-8 transition-colors duration-300 industrial-texture">
            <div className="max-w-7xl mx-auto px-6 md:px-8">

                {/* ─── Faixa de certificações reais ─── */}
                <div className="mb-12 pb-10 border-b border-theme">
                    <p className="text-[10px] font-black text-theme-muted uppercase tracking-[0.3em] mb-8 text-center">
                        {t('footer.certifications')}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {CERTS.map((c) => (
                            <div key={c.label} className="flex flex-col items-center gap-3 group">
                                <div className="h-[75px] w-[170px] px-3 py-2 bg-white rounded-md shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                                    <img
                                        src={c.img}
                                        alt={c.alt}
                                        className={`max-h-[55px] w-auto max-w-[145px] object-contain ${c.logoClass}`}
                                        decoding="async"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-theme-muted uppercase tracking-wider group-hover:text-theme-primary transition-colors">{c.label}</p>
                                    <p className="text-[9px] text-theme-muted/60">{t(`footer.certSublabels.${c.id}`, c.sublabel)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Normas técnicas em linha */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        {NORMS.map((n, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <span className="text-brand-main/60">{n.icon}</span>
                                <span className="text-[9px] font-bold text-theme-muted uppercase tracking-widest">{n.text}</span>
                                {i < NORMS.length - 1 && (
                                    <span className="text-theme-muted/30 ml-2 text-[10px]">·</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Marca */}
                    <div>
                        <button
                            onClick={() => navigateTo('home')}
                            className="flex items-center mb-5"
                            aria-label={`Vesper — ${t('nav.home')}`}
                        >
                            <img
                                src="/assets/img/vesper-ex-logo.png"
                                alt="Vesper Equipamentos EX"
                                className="h-11 w-auto max-w-[170px] object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </button>
                        <p className="text-theme-muted text-[11px] font-normal leading-relaxed mb-5 max-w-xs">
                            {t('footer.description')}
                        </p>
                        {/* ISO badge text */}
                        <div className="inline-flex items-center gap-2 border border-brand-main/20 px-3 py-2 bg-brand-main/5 rounded-sm">
                            <Shield size={13} className="text-brand-main/70" />
                            <div className="text-[9px] text-theme-muted font-bold uppercase leading-tight">
                                <p>ISO 9001:2015</p>
                                <p>INMETRO 115:2022</p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="text-theme-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-5">
                            {t('footer.navigation')}
                        </p>
                        <ul className="space-y-2.5">
                            {footerLinks.map((link) => (
                                <li key={link.page}>
                                    <button
                                        onClick={() => navigateTo(link.page)}
                                        className="text-theme-muted hover:text-brand-main text-[11px] font-medium tracking-wide transition-colors hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <p className="text-theme-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-5">
                            {t('footer.contact')}
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-2.5">
                                <MapPin className="text-brand-main/60 shrink-0 mt-0.5" size={13} />
                                <p className="text-theme-muted text-[11px] leading-relaxed">
                                    {company.address.full}
                                </p>
                            </div>
                            <div className="flex gap-2.5">
                                <Phone className="text-brand-main/60 shrink-0 mt-0.5" size={13} />
                                <div className="text-[11px] leading-relaxed space-y-1">
                                    {company.phones.map((tel) => (
                                        <div key={tel}>
                                            <a
                                                href={`tel:+55${tel.replace(/\D/g, '')}`}
                                                className="text-theme-muted hover:text-brand-main transition-colors font-medium"
                                            >
                                                {tel}
                                            </a>
                                        </div>
                                    ))}
                                    <a
                                        href="https://wa.me/5521964480102"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#25D366] hover:text-[#128C7E] transition-colors font-medium"
                                    >
                                        WhatsApp: (21) 96448-0102
                                    </a>
                                </div>
                            </div>
                            <div className="flex gap-2.5">
                                <Mail className="text-brand-main/60 shrink-0 mt-0.5" size={13} />
                                <div className="text-[11px] leading-relaxed space-y-0.5">
                                    <a href={`mailto:${company.emails.vendas}`} className="text-theme-muted hover:text-brand-main transition-colors block">
                                        {company.emails.vendas}
                                    </a>
                                    <a href={`mailto:${company.emails.locacao}`} className="text-theme-muted hover:text-brand-main transition-colors block">
                                        {company.emails.locacao}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Horários + BNDES */}
                    <div>
                        <p className="text-theme-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-5">
                            {t('footer.hours')}
                        </p>
                        <div className="space-y-1.5 text-theme-muted text-[11px] mb-7">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-brand-main rounded-full shrink-0" />
                                <p>{t('footer.hoursWeekdays')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-brand-main rounded-full shrink-0" />
                                <p>{t('footer.hoursFriday')}</p>
                            </div>
                            <p className="text-gray-500 dark:text-gray-600 text-[10px] pl-4">{company.hours.lunch}</p>
                        </div>
                        <div className="border border-theme p-4 bg-theme-surface rounded-sm">
                            <p className="text-brand-main text-[9px] font-bold uppercase tracking-wider mb-0.5">
                                {company.bndes.text}
                            </p>
                            <p className="text-theme-muted text-[9px] mb-1.5">{company.bndes.subtitle}</p>
                            <a
                                href={company.bndes.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-theme-muted hover:text-brand-main text-[9px] transition-colors"
                            >
                                {company.bndes.url.replace('https://', '')}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Linha inferior */}
                <div className="pt-6 border-t border-theme flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[9px] text-theme-muted font-medium">
                        © {year} {company.legalName}. {t('footer.rights')}.
                    </p>
                    <div className="flex gap-5 items-center flex-wrap">
                        <p className="text-[9px] text-theme-muted">CNPJ: {company.cnpj}</p>
                        <p className="text-[9px] text-theme-muted">IE: {company.inscricaoEstadual}</p>
                        <button
                            onClick={() => navigateTo('privacidade')}
                            className="text-[9px] text-theme-muted hover:text-brand-main transition-colors"
                        >
                            {t('footer.privacy')}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

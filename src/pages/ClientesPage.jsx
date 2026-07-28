import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { CLIENTS, FEATURED_CLIENTS } from '../data/clients.js';
import { ArrowRight } from 'lucide-react';

export default function ClientesPage({ navigateTo }) {
    const { t } = useTranslation();
    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.clientes') }]} />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">

                {/* Cabeçalho */}
                <div className="mb-16 max-w-2xl">
                    <p className="text-[10px] text-brand-sub font-black uppercase tracking-widest mb-4">
                        {t('clientsPage.eyebrow')}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black text-theme-primary tracking-tighter leading-none mb-5">
                        {t('clientsPage.titleBefore')} <span className="text-brand-main">{t('clientsPage.titleHighlight')}</span><br />{t('clientsPage.titleAfter')}
                    </h1>
                    <p className="text-theme-muted text-sm font-normal leading-relaxed">
                        {t('clientsPage.description')}
                    </p>
                </div>

                {/* Clientes destaque — tipografia elegante */}
                <div className="mb-16">
                    <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em] mb-8 flex items-center gap-3">
                        <span className="w-6 h-px bg-brand-main" />
                        {t('clientsPage.featured')}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {FEATURED_CLIENTS.map((name) => (
                            <div
                                key={name}
                                className="theme-panel px-4 py-3.5 hover:border-brand-main/20 transition-all group"
                            >
                                <p className="text-theme-secondary text-[11px] font-bold leading-snug group-hover:text-theme-primary transition-colors">
                                    {name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divisor */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-theme-border flex-1" />
                    <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em]">
                        {t('clientsPage.fullList')}
                    </p>
                    <div className="h-px bg-theme-border flex-1" />
                </div>

                {/* Lista completa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-6">
                    {CLIENTS.map((client) => (
                        <div
                            key={client}
                            className="flex items-center gap-3 py-3 border-b border-theme hover:border-theme-hover transition-colors group"
                        >
                            <span className="w-1 h-1 rounded-full bg-brand-main shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <p className="text-theme-muted text-xs font-medium leading-relaxed group-hover:text-theme-secondary transition-colors">
                                {client}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 pt-10 border-t border-theme flex items-center justify-between flex-wrap gap-6">
                    <div>
                        <p className="text-theme-secondary text-sm">
                            {t('clientsPage.cta.title')}
                        </p>
                        <p className="text-theme-muted text-xs mt-1">
                            {t('clientsPage.cta.description')}
                        </p>
                    </div>
                    <button
                        onClick={() => navigateTo('contato')}
                        className="btn-primary py-3 px-7 text-xs flex items-center gap-2"
                    >
                        {t('nav.solicitarOrcamento')} <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

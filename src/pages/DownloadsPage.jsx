import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import DownloadItem from '../components/DownloadItem.jsx';
import { DOWNLOADS } from '../data/downloads.js';
import { localizeDownloads } from '../i18n/localizedData.js';

export default function DownloadsPage({ navigateTo }) {
    const { t, i18n } = useTranslation();
    const downloads = localizeDownloads(DOWNLOADS, i18n.language);
    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('downloadsPage.breadcrumb') }]} />

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="mb-14">
                    <span className="text-[10px] text-brand-sub font-black uppercase tracking-widest mb-3 block">
                        {t('downloadsPage.eyebrow')}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-theme-primary uppercase tracking-tighter leading-none mb-4">
                        {t('downloadsPage.title')} <span className="text-brand-main">DOWNLOADS</span>
                    </h1>
                    <p className="text-theme-muted text-sm font-medium max-w-2xl leading-relaxed">
                        {t('downloadsPage.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {downloads.map((section, i) => (
                        <div key={i} className="theme-panel p-8 hover:border-brand-main/20 transition-all">
                            <div className="mb-6">
                                <h2 className="text-sm font-black text-theme-primary uppercase tracking-widest">
                                    {section.category}
                                </h2>
                                {section.subtitle && (
                                    <p className="text-[10px] text-brand-main font-bold uppercase tracking-wider mt-1">
                                        {section.subtitle}
                                    </p>
                                )}
                            </div>
                            <ul className="space-y-1">
                                {section.items.map((item, j) => (
                                    <DownloadItem key={j} item={item} navigateTo={navigateTo} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Catálogo geral */}
                <div className="mt-16 theme-panel p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#8a1414]/25 to-[#c11818]/15 border-brand-sub/30">
                    <div>
                        <h3 className="text-2xl font-black text-theme-primary uppercase tracking-tighter mb-2">
                            {t('downloadsPage.cta.title')}
                        </h3>
                        <p className="text-theme-secondary text-sm font-medium">
                            {t('downloadsPage.cta.description')}
                        </p>
                    </div>
                    <button
                        onClick={() => navigateTo('contato')}
                        className="btn-primary text-[10px] px-8 py-4 shrink-0"
                    >
                        {t('home.cta.talkSpecialist')}
                    </button>
                </div>
            </div>
        </div>
    );
}

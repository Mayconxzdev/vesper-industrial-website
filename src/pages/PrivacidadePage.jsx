import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { COMPANY } from '../data/company.js';

export default function PrivacidadePage({ navigateTo }) {
    const { t } = useTranslation();
    const paragraphs = t('privacyPage.paragraphs', { returnObjects: true });

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.privacidade') }]} />

            <div className="max-w-3xl mx-auto px-4 py-20">
                <div className="mb-10">
                    <span className="text-[10px] text-brand-sub font-black uppercase tracking-widest mb-3 block">
                        LGPD — Lei nº 13.709/2018
                    </span>
                    <h1 className="text-5xl font-black text-theme-primary uppercase tracking-tighter leading-none">
                        {t('privacyPage.title')} <span className="text-brand-main">{t('privacyPage.titleHighlight')}</span>
                    </h1>
                </div>

                <div className="bg-theme-surface border border-theme p-10 space-y-6 text-sm font-medium text-theme-secondary leading-relaxed">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}

                    <div className="pt-6 border-t border-theme">
                        <p>{t('privacyPage.signature')}</p>
                        <p className="text-theme-primary font-black mt-2">{COMPANY.legalName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

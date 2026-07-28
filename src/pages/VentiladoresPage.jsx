import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import InnerPageHero from '../components/InnerPageHero.jsx';
import ProductDetail from '../components/ProductDetail.jsx';
import { PRODUCTS } from '../data/products.js';
import { ArrowRight, Download } from 'lucide-react';
import { localizeProducts } from '../i18n/localizedData.js';

function ProductCard({ product, onClick, t }) {
    return (
        <div
            className="catalog-card group flex flex-col cursor-pointer"
            onClick={onClick}
        >
            {/* Thumb */}
            <div className="h-48 bg-white flex items-center justify-center p-6 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                {product.ex && (
                    <div className="absolute top-3 right-3">
                        <img src="/assets/img/ex_mini_icone.png" alt="EX" className="w-6 h-6 opacity-75" loading="lazy" />
                    </div>
                )}
            </div>

            {/* Texto */}
            <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-theme min-h-[170px]">
                <div className="flex items-center gap-2 mb-2">
                    <p className="text-[9px] font-black text-brand-sub uppercase tracking-widest">
                        {product.category}
                    </p>
                </div>
                <h2 className="text-sm font-black text-theme-primary tracking-tight mb-1 leading-snug">
                    {product.name}
                </h2>
                {product.subtitle && (
                    <p className="text-[10px] text-theme-muted mb-3 leading-relaxed">{product.subtitle}</p>
                )}
                <p className="text-theme-muted text-[11px] leading-relaxed line-clamp-3 mb-4">
                    {product.description}
                </p>
                <span className="text-brand-main text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2.5 transition-all mt-auto">
                    {t('productActions.viewSpecs')} <ArrowRight size={11} />
                </span>
            </div>
        </div>
    );
}

export default function VentiladoresPage({ navigateTo, currentProductId }) {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState('all');

    const ventiladores = useMemo(
        () => localizeProducts(PRODUCTS.filter((p) => p.category === 'ventiladores'), i18n.language),
        [i18n.language]
    );

    const selected = currentProductId ? ventiladores.find((p) => p.id === currentProductId) : null;

    const filteredVentiladores = ventiladores.filter((p) => {
        if (filter === 'all') return true;
        if (filter === 'ex') return p.ex;
        if (filter === 'normal') return !p.ex;
        return true;
    });

    if (selected) {
        return (
            <>
                <Breadcrumb
                    navigateTo={navigateTo}
                    items={[
                        { label: t('nav.ventiladores'), page: 'ventiladores' },
                        { label: selected.name },
                    ]}
                />
                <ProductDetail
                    product={selected}
                    backLabel={t('productActions.backTo', { page: t('nav.ventiladores') })}
                    onBack={() => {
                        navigateTo('ventiladores');
                    }}
                />
            </>
        );
    }

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.ventiladores') }]} />

            <InnerPageHero
                badge={t('ventiladoresPage.hero.badge')}
                title={t('ventiladoresPage.hero.title')}
                titleHighlight={t('ventiladoresPage.hero.titleHighlight')}
                subtitle={t('ventiladoresPage.hero.subtitle')}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

                {/* Filtros */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {[
                        { key: 'all', label: t('productFilters.all') },
                        { key: 'ex', label: t('productFilters.ex') },
                        { key: 'normal', label: t('productFilters.normal') },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all ${
                                filter === key
                                    ? 'border-brand-main bg-brand-main/5 text-brand-main'
                                    : 'border-theme text-theme-muted hover:text-theme-primary hover:border-theme-hover'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVentiladores.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onClick={() => navigateTo('ventiladores', p.id)}
                            t={t}
                        />
                    ))}
                </div>

                {/* CTA downloads */}
                <div className="mt-12 flex items-center justify-between border-t border-theme pt-10 flex-wrap gap-6">
                    <p className="text-theme-muted text-xs">
                        {t('productActions.needFullSpecs')}
                    </p>
                    <button
                        onClick={() => navigateTo('downloads')}
                        className="text-[10px] text-brand-main font-black uppercase tracking-widest flex items-center gap-2 hover:underline"
                    >
                        <Download size={12} /> {t('productActions.viewCatalogs')}
                    </button>
                </div>
            </div>
        </div>
    );
}

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
            onClick={onClick}
            className="catalog-card group cursor-pointer flex flex-col"
        >
            <div className="h-48 bg-white flex items-center justify-center p-6 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
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
            <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-theme min-h-[170px]">
                <p className="text-[9px] font-black text-brand-sub uppercase tracking-widest mb-2">
                    {product.category}
                </p>
                <h3 className="text-sm font-black text-theme-primary tracking-tight mb-1 leading-snug">
                    {product.name}
                </h3>
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

export default function ExaustoresPage({ navigateTo, currentProductId }) {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState('all');

    const exaustores = useMemo(
        () => localizeProducts(PRODUCTS.filter((p) => p.category === 'exaustores'), i18n.language),
        [i18n.language]
    );
    const insufladores = useMemo(
        () => localizeProducts(PRODUCTS.filter((p) => p.category === 'insufladores'), i18n.language),
        [i18n.language]
    );
    const allProducts = useMemo(() => [...exaustores, ...insufladores], [exaustores, insufladores]);

    const selected = currentProductId ? allProducts.find((p) => p.id === currentProductId) : null;

    const filteredExaustores = exaustores.filter((p) => {
        if (filter === 'all') return true;
        if (filter === 'ex') return p.ex;
        if (filter === 'normal') return !p.ex;
        return true;
    });

    const filteredInsufladores = insufladores.filter((p) => {
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
                        { label: t('nav.exaustores'), page: 'exaustores' },
                        { label: selected.name },
                    ]}
                />
                <ProductDetail
                    product={selected}
                    backLabel={t('productActions.backTo', { page: t('nav.exaustores') })}
                    onBack={() => {
                        navigateTo('exaustores');
                    }}
                />
            </>
        );
    }

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.exaustores') }]} />

            <InnerPageHero
                badge={t('exaustoresPage.hero.badge')}
                title={t('exaustoresPage.hero.title')}
                titleHighlight={t('exaustoresPage.hero.titleHighlight')}
                subtitle={t('exaustoresPage.hero.subtitle')}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

                {/* Filtros */}
                <div className="flex flex-wrap gap-2 mb-10">
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

                {/* Exaustores */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="w-5 h-px bg-brand-sub" />
                    <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em]">{t('nav.exaustores')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                    {filteredExaustores.map((p) => (
                        <ProductCard key={p.id} product={p} onClick={() => navigateTo('exaustores', p.id)} t={t} />
                    ))}
                </div>

                {/* Insufladores */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="w-5 h-px bg-brand-main" />
                    <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em]">{t('exaustoresPage.blowers.title')}</p>
                </div>
                <p className="text-theme-muted text-xs mb-8 max-w-xl leading-relaxed">
                    {t('exaustoresPage.blowers.description')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                    {filteredInsufladores.map((p) => (
                        <ProductCard key={p.id} product={p} onClick={() => navigateTo('exaustores', p.id)} t={t} />
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between border-t border-theme pt-10 flex-wrap gap-6">
                    <p className="text-theme-muted text-xs">
                        {t('productActions.needCatalogs')}
                    </p>
                    <button
                        onClick={() => navigateTo('downloads')}
                        className="text-[10px] text-brand-main font-black uppercase tracking-widest flex items-center gap-2 hover:underline"
                    >
                        <Download size={12} /> {t('productActions.viewCatalogsShort')}
                    </button>
                </div>
            </div>
        </div>
    );
}

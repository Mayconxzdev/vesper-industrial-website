import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import InnerPageHero from '../components/InnerPageHero.jsx';
import ProductDetail from '../components/ProductDetail.jsx';
import { RENTAL_PRODUCTS } from '../data/products.js';
import { Clock, CheckCircle, Wrench, ArrowRight, Mail } from 'lucide-react';
import { COMPANY } from '../data/company.js';
import { localizeProducts } from '../i18n/localizedData.js';

const ADVANTAGE_ICONS = [<Clock size={20} />, <CheckCircle size={20} />, <Wrench size={20} />];

// Produtos de locação reais (exclui itens que não são de locação)
const LOCACAO_IDS = [
    'loc-ventilador-1600',
    'loc-ventilador-1101',
    'loc-ventilador-8800',
    'loc-ventilador-1600-asp',
    'loc-ventilador-1101-asp',
    'loc-ventilador-8800-asp',
    'loc-ventfog-estatico',
    'loc-ventfog-dinamico',
    'loc-ventex',
    'loc-centrifugo',
    'loc-exaustor-ex',
    'loc-cortina',
];

function RentalCard({ product, onClick, isActive, t }) {
    return (
        <div
            id={`rental-${product.id}`}
            onClick={onClick}
            className={`catalog-card group flex flex-col cursor-pointer scroll-mt-32 transition-all ${
                isActive ? 'ring-2 ring-[color:var(--brand-main)] border-brand-main shadow-lg' : ''
            }`}
        >
            <div className="catalog-card-media relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                {product.ex && (
                    <div className="absolute top-2 left-2">
                        <img src="/assets/img/ex_mini_icone.png" alt="EX" className="w-6 h-6 opacity-70" />
                    </div>
                )}
            </div>
            <div className="catalog-card-body">
                <p className="text-xs font-black text-theme-primary tracking-tight leading-tight mb-0.5">
                    {product.name}
                </p>
                <p className="text-[9px] text-theme-muted mb-3 leading-relaxed">{product.subtitle}</p>
                <p className="text-theme-muted text-[11px] leading-relaxed flex-1 line-clamp-3">{product.description}</p>
                {product.specs?.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-theme pt-3">
                        {product.specs.slice(0, 3).map((spec) => (
                            <div key={spec} className="flex items-start gap-2 text-[10px] leading-relaxed text-theme-secondary">
                                <CheckCircle size={10} className="mt-0.5 shrink-0 text-brand-main" />
                                <span>{spec}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-4">
                    <span className="text-brand-main text-[9px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t('productActions.viewSpecs')} <ArrowRight size={10} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function LocacaoPage({ navigateTo, currentProductId }) {
    const { t, i18n } = useTranslation();

    const allRentalProducts = useMemo(
        () => localizeProducts(RENTAL_PRODUCTS, i18n.language),
        [i18n.language]
    );

    // Filtra apenas os produtos reais de locação
    const rentalProducts = useMemo(
        () => allRentalProducts.filter((p) => LOCACAO_IDS.includes(p.id)),
        [allRentalProducts]
    );

    const advantages = t('rentalPage.advantages', { returnObjects: true }).map((item, index) => ({
        ...item,
        icon: ADVANTAGE_ICONS[index],
    }));

    const selected = currentProductId
        ? rentalProducts.find((p) => p.id === currentProductId)
        : null;

    if (selected) {
        return (
            <>
                <Breadcrumb
                    navigateTo={navigateTo}
                    items={[
                        { label: t('rentalPage.breadcrumb'), page: 'locacao' },
                        { label: selected.name },
                    ]}
                />
                <ProductDetail
                    product={selected}
                    backLabel={t('productActions.backTo', { page: t('rentalPage.breadcrumb') })}
                    isRental
                    onBack={() => {
                        navigateTo('locacao');
                    }}
                />
            </>
        );
    }

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('rentalPage.breadcrumb') }]} />

            <InnerPageHero
                badge={t('rentalPage.hero.badge')}
                title={t('rentalPage.hero.title')}
                titleHighlight={t('rentalPage.hero.titleHighlight')}
                subtitle={t('rentalPage.hero.subtitle')}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

                {/* Vantagens */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {advantages.map((v, i) => (
                        <div key={i} className="theme-panel p-7 flex gap-4 items-start">
                            <div className="text-brand-main shrink-0 mt-0.5">{v.icon}</div>
                            <div>
                                <p className="text-theme-primary font-bold text-xs uppercase tracking-widest mb-1.5">{v.title}</p>
                                <p className="text-theme-muted text-xs leading-relaxed">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grade de produtos */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="w-5 h-px bg-brand-main" />
                    <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em]">{t('rentalPage.available')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                    {rentalProducts.map((p) => (
                        <RentalCard
                            key={p.id}
                            product={p}
                            onClick={() => navigateTo('locacao', p.id)}
                            isActive={currentProductId === p.id}
                            t={t}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="theme-panel p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <p className="text-theme-primary font-black text-base tracking-tight mb-1">
                            {t('rentalPage.cta.title')}
                        </p>
                        <p className="text-theme-muted text-xs">
                            {t('rentalPage.cta.description')}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <a
                            href={`mailto:${COMPANY.emails.locacao}`}
                            className="border border-brand-main/30 hover:border-brand-main hover:bg-brand-main hover:text-brand-main-contrast text-brand-main text-[10px] font-black px-6 py-3 uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            <Mail size={12} /> {COMPANY.emails.locacao}
                        </a>
                        <button
                            onClick={() => navigateTo('contato')}
                            className="btn-secondary text-[10px] px-6 py-3"
                        >
                            {t('rentalPage.cta.form')}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

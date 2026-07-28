import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import InnerPageHero from '../components/InnerPageHero.jsx';
import { PRODUCTS } from '../data/products.js';
import { ArrowRight, Fan, Wind, Truck, Gauge, ShieldCheck } from 'lucide-react';

const CATEGORY_META = [
    {
        id: 'ventiladores',
        image: '/assets/img/thumb/v8803_cat.png',
        icon: <Fan size={22} />,
        page: 'ventiladores',
        stats: '50 a 150 cm',
    },
    {
        id: 'exaustores',
        image: '/assets/img/ex_exd.jpg',
        icon: <Wind size={22} />,
        page: 'exaustores',
        stats: '20 a 100 cm',
    },
    {
        id: 'insufladores',
        image: '/assets/img/insuflador_skid_peq.png',
        icon: <Gauge size={22} />,
        page: 'exaustores',
        stats: '1 a 4 dutos',
    },
    {
        id: 'locacao',
        image: '/assets/img/thumb/v8800preto_.jpg',
        icon: <Truck size={22} />,
        page: 'locacao',
    },
];

function CategoryCard({ category, navigateTo, t }) {
    return (
        <button
            onClick={() => navigateTo(category.page)}
            className="group catalog-card text-left"
        >
            <div className="catalog-card-media relative">
                <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute top-3 left-3 bg-[#0A0A0A] text-brand-main p-2">
                    {category.icon}
                </div>
            </div>
            <div className="catalog-card-body">
                <p className="text-[10px] text-brand-sub font-black uppercase tracking-widest mb-2">
                    {category.stats}
                </p>
                <h2 className="text-theme-primary text-lg font-black tracking-tight mb-2">
                    {category.title}
                </h2>
                <p className="text-theme-muted text-xs leading-relaxed mb-5">
                    {category.desc}
                </p>
                <span className="text-brand-main text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    {t('productsPage.viewLine')} <ArrowRight size={11} />
                </span>
            </div>
        </button>
    );
}

export default function ProdutosPage({ navigateTo }) {
    const { t } = useTranslation();
    const exCount = PRODUCTS.filter((p) => p.ex).length;
    const categories = CATEGORY_META.map((category) => ({
        ...category,
        title: t(`productsPage.categories.${category.id}.title`),
        desc: t(`productsPage.categories.${category.id}.desc`),
        stats: category.stats || t(`productsPage.categories.${category.id}.stats`),
    }));

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.produtos') }]} />

            <InnerPageHero
                badge={t('productsPage.hero.badge')}
                title={t('productsPage.hero.title')}
                titleHighlight={t('productsPage.hero.titleHighlight')}
                subtitle={t('productsPage.hero.subtitle')}
            />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} navigateTo={navigateTo} t={t} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-theme-surface border border-theme p-7">
                        <ShieldCheck className="text-brand-main mb-4" size={22} />
                        <p className="text-theme-primary text-sm font-bold mb-2">{t('productsPage.cards.ex.title')}</p>
                        <p className="text-theme-muted text-xs leading-relaxed">
                            {t('productsPage.cards.ex.desc', { count: exCount })}
                        </p>
                    </div>
                    <div className="bg-theme-surface border border-theme p-7">
                        <Gauge className="text-brand-main mb-4" size={22} />
                        <p className="text-theme-primary text-sm font-bold mb-2">{t('productsPage.cards.spec.title')}</p>
                        <p className="text-theme-muted text-xs leading-relaxed">
                            {t('productsPage.cards.spec.desc')}
                        </p>
                    </div>
                    <div className="bg-theme-surface border border-theme p-7">
                        <Truck className="text-brand-main mb-4" size={22} />
                        <p className="text-theme-primary text-sm font-bold mb-2">{t('productsPage.cards.sales.title')}</p>
                        <p className="text-theme-muted text-xs leading-relaxed">
                            {t('productsPage.cards.sales.desc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

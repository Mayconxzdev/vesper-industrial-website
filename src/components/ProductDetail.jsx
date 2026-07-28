import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle, ClipboardPlus, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useQuote } from '../contexts/quote.js';
import { trackEvent } from '../utils/analyticsEvents.js';
import { getProductTechnicalSpecs } from '../data/technicalSpecs.js';
import ProductTechnicalSpecs from './ProductTechnicalSpecs.jsx';

/**
 * Componente de detalhe de produto reutilizável.
 * Usado em VentiladoresPage, ExaustoresPage e LocacaoPage.
 *
 * Props:
 *  - product: objeto do produto
 *  - onBack: função chamada ao clicar em "voltar"
 *  - backLabel: texto do botão voltar (ex: t('nav.ventiladores'))
 *  - isRental: boolean — se true, mostra botão de orçamento de locação
 */
export default function ProductDetail({ product, onBack, backLabel, isRental = false }) {
    const { t } = useTranslation();
    const { addItem } = useQuote();
    const technicalSpecs = getProductTechnicalSpecs(product.id);

    // Scroll ao topo sempre que um produto for aberto
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [product.id]);

    const addToQuote = (intent = 'compra') => {
        addItem(product, { intent });
        trackEvent('quote_item_added', {
            source: 'product_detail',
            product_id: product.id,
            product_name: product.name,
            intent,
        });
        toast.success(t('productActions.added', { product: product.name }));
    };

    const startQuote = (intent = 'compra') => {
        addToQuote(intent);
        window.dispatchEvent(new CustomEvent('vesper:open-prechat', {
            detail: {
                source: 'product_detail',
                step: 4,
                answers: {
                    procurement: intent,
                    area: product.ex ? 'ex' : 'normal',
                },
            },
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
            <button
                onClick={onBack}
                className="text-theme-muted hover:text-brand-main text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-12 transition-colors"
            >
                <ArrowLeft size={12} />
                {backLabel || t('productActions.back')}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                {/* Imagem */}
                <div className="flex items-center justify-center p-6 md:p-10 aspect-square max-h-[480px]">
                    <div className="bg-white rounded-2xl w-[260px] h-[260px] md:w-[320px] md:h-[320px] shadow-lg flex items-center justify-center p-6 group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* Info */}
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        {product.category && (
                            <span className="text-[9px] font-black text-brand-sub uppercase tracking-widest">
                                {product.category}
                            </span>
                        )}
                        {product.ex && (
                            <img src="/assets/img/ex_mini_icone.png" alt="EX" className="w-7 h-7 opacity-90" />
                        )}
                    </div>

                    {product.subtitle && (
                        <span className="inline-block bg-brand-main text-brand-main-contrast text-[9px] font-black px-3 py-1 uppercase tracking-widest mb-4">
                            {product.subtitle}
                        </span>
                    )}

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-theme-primary tracking-tighter mb-5 leading-none">
                        {product.name}
                    </h1>

                    <p className="text-theme-secondary text-sm font-normal leading-relaxed mb-10 max-w-lg">
                        {product.description}
                    </p>

                    {/* Specs */}
                    {product.specs?.length > 0 && (
                        <div className="mb-10">
                            <p className="text-[9px] font-black text-theme-muted uppercase tracking-[0.35em] mb-5 flex items-center gap-3">
                                <span className="w-5 h-px bg-theme-border" />
                                {t('productActions.specs')}
                            </p>
                            <div className="space-y-2.5">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex items-start gap-3 text-theme-secondary text-xs leading-relaxed">
                                        <CheckCircle size={12} className="text-brand-main shrink-0 mt-0.5" />
                                        {spec}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documentos */}
                    {product.certsDocs?.length > 0 && (
                        <div className="mb-8 space-y-2">
                            {product.certsDocs.map((doc) => (
                                <a
                                    key={doc.name}
                                    href={doc.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-theme-muted hover:text-brand-main text-[10px] font-bold uppercase tracking-widest transition-colors"
                                >
                                    <ExternalLink size={11} /> {doc.name}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => startQuote(isRental ? 'locacao' : 'compra')}
                            className="bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black font-black py-3.5 px-7 text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            {t('nav.solicitarOrcamento')} <ArrowRight size={14} />
                        </button>
                        <button
                            onClick={() => addToQuote(isRental ? 'locacao' : 'compra')}
                            className="border border-brand-main/40 hover:border-brand-main text-theme-primary font-bold py-3.5 px-7 text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                            {t('productActions.addToList')} <ClipboardPlus size={14} />
                        </button>
                        {!isRental && product.isLocacao && (
                            <button
                                onClick={() => startQuote('locacao')}
                                className="border border-theme hover:border-theme-secondary text-theme-primary font-bold py-3.5 px-7 text-xs uppercase tracking-widest transition-all"
                            >
                                {t('productActions.rentalQuote')}
                            </button>
                        )}
                        {product.catalog && (
                            <a
                                href={product.catalog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-theme-muted hover:text-brand-main font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors py-3.5 px-3"
                            >
                                <Download size={12} /> {t('productActions.pdfCatalog')}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <ProductTechnicalSpecs technicalSpecs={technicalSpecs} catalogHref={product.catalog} />
        </div>
    );
}

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, ClipboardPlus, Clock, Mail, MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { useQuote } from '../contexts/quote.js';
import {
    createWhatsAppUrl,
    formatEmailLead,
    formatTechnicalWhatsAppMessage,
    getLeadRecipient,
    getLeadSubject,
} from '../utils/leadFormatter.js';
import {
    APPLICATION_OPTIONS,
    NEED_OPTIONS,
    PROCUREMENT_OPTIONS,
    URGENCY_OPTIONS,
    recommendProducts,
} from '../utils/productIntelligence.js';
import { trackEvent } from '../utils/analyticsEvents.js';
import { localizeProduct, localizeProducts } from '../i18n/localizedData.js';

function isBusinessHours() {
    const now = new Date();
    const tz = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        hour12: false,
    }).formatToParts(now);
    const day = tz.find((p) => p.type === 'weekday')?.value ?? '';
    const hour = parseInt(tz.find((p) => p.type === 'hour')?.value ?? '0');
    const min = parseInt(tz.find((p) => p.type === 'minute')?.value ?? '0');
    const total = hour * 60 + min;
    const isFri = day.toLowerCase().startsWith('sex');
    const end = isFri ? (15 * 60) : (17 * 60 + 30);
    const isWeekend = day.toLowerCase().startsWith('sáb') || day.toLowerCase().startsWith('dom');
    return !isWeekend && total >= 8 * 60 && total < end;
}

const INITIAL_ANSWERS = {
    procurement: '',
    need: '',
    area: '',
    application: '',
    urgency: '',
    city: '',
    company: '',
    email: '',
    phone: '',
    name: '',
    notes: '',
};

function OptionButton({ option, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`text-left border p-3 transition-all ${
                selected
                    ? 'border-brand-main bg-brand-main/10 text-theme-primary'
                    : 'border-theme bg-theme-card text-theme-muted hover:border-brand-main/50 hover:text-theme-primary'
            }`}
        >
            <span className="block text-xs font-black uppercase tracking-widest">{option.label}</span>
            {option.description && (
                <span className="block text-[11px] leading-relaxed mt-1">{option.description}</span>
            )}
        </button>
    );
}

export default function WhatsAppWidget() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState(INITIAL_ANSWERS);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [online, setOnline] = useState(() => isBusinessHours());
    const { items, addItem } = useQuote();
    const procurementOptions = useMemo(() => PROCUREMENT_OPTIONS.map((option) => ({
        ...option,
        label: t(`assistant.procurement.${option.value}.label`),
        description: t(`assistant.procurement.${option.value}.description`),
    })), [t]);
    const needOptions = useMemo(() => NEED_OPTIONS.map((option) => ({
        ...option,
        label: t(`assistant.need.${option.value}.label`),
        description: t(`assistant.need.${option.value}.description`),
    })), [t]);
    const applicationOptions = useMemo(() => APPLICATION_OPTIONS.map((option) => ({
        ...option,
        label: t(`assistant.application.${option.value}`),
    })), [t]);
    const urgencyOptions = useMemo(() => URGENCY_OPTIONS.map((option) => ({
        ...option,
        label: t(`assistant.urgency.${option.value}`),
    })), [t]);

    const recommendations = useMemo(() => localizeProducts(recommendProducts(answers, 3), i18n.language), [answers, i18n.language]);
    const isTechnicalQuestion = answers.procurement === 'duvida';
    const emailRecipient = getLeadRecipient({ answers, quoteItems: items });
    const emailSubject = getLeadSubject({ answers, quoteItems: items });
    const emailBody = formatEmailLead({
        source: 'Assistente Encontrar solução',
        answers,
        quoteItems: items,
    });
    const whatsappUrl = createWhatsAppUrl(formatTechnicalWhatsAppMessage({
        source: 'Assistente Encontrar solução',
        answers,
    }));
    const canSubmit = isTechnicalQuestion
        ? Boolean(answers.email || answers.phone)
        : Boolean(answers.email && answers.phone);

    const updateAnswer = (key, value) => {
        setAnswers((current) => ({ ...current, [key]: value }));
    };

    const chooseAndAdvance = (key, value, nextStep = step + 1) => {
        updateAnswer(key, value);
        setTimeout(() => setStep(nextStep), 120);
    };

    const chooseStepThree = (key, value) => {
        const nextAnswers = { ...answers, [key]: value };
        setAnswers(nextAnswers);

        if (nextAnswers.area && nextAnswers.application && nextAnswers.urgency) {
            setTimeout(() => setStep(3), 140);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers(INITIAL_ANSWERS);
    };

    const openWidget = () => {
        setIsOpen(true);
        trackEvent('prechat_open');
    };

    const sendToWhatsApp = (event) => {
        if (!canSubmit) {
            event.preventDefault();
            toast.error(t('assistant.errors.contactRequired'));
            return;
        }
        trackEvent('prechat_completed', {
            procurement: answers.procurement,
            need: answers.need,
            area: answers.area,
            application: answers.application,
            quote_items: items.length,
        });
    };

    const sendToEmail = async () => {
        if (!canSubmit) {
            toast.error(t('assistant.errors.emailPhoneRequired'));
            return;
        }

        setIsSendingEmail(true);

        try {
            const response = await fetch('/api/send-lead.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    source: 'Assistente Encontrar solução',
                    answers,
                    quoteItems: items,
                    subject: emailSubject,
                    body: emailBody,
                }),
            });
            const responseText = await response.text();
            if (responseText.trim().startsWith('<?php')) {
                throw new Error('O servidor local Vite não executa PHP. Teste o envio no servidor Skymail/PHP.');
            }

            let result = {};
            try {
                result = responseText ? JSON.parse(responseText) : {};
            } catch {
                throw new Error('Resposta inválida do servidor de envio.');
            }

            if (!response.ok || !result.ok) {
                throw new Error(result.error || 'Falha ao enviar solicitação.');
            }

            trackEvent('email_lead_sent', {
                recipient: result.recipient || emailRecipient,
                subject: emailSubject,
                procurement: answers.procurement,
                quote_items: items.length,
            });
            toast.success(t('assistant.success.emailSent'));
            setIsOpen(false);
            reset();
        } catch (error) {
            trackEvent('email_lead_error', {
                recipient: emailRecipient,
                message: error.message,
            });
            toast.error(error.message || t('assistant.errors.sendFailed'));
        } finally {
            setIsSendingEmail(false);
        }
    };

    const trackEmailLeadAttempt = () => {
        trackEvent('email_lead_submit', {
            recipient: emailRecipient,
            subject: emailSubject,
            procurement: answers.procurement,
            quote_items: items.length,
        });
    };

    const addRecommendationToQuote = (product) => {
        const intent = answers.procurement || (product.isLocacao ? 'locacao' : 'compra');
        const localizedProduct = localizeProduct(product, i18n.language);
        addItem(localizedProduct, {
            intent,
            notes: answers.notes,
        });
        trackEvent('quote_item_added', {
            source: 'prechat_recommendation',
            product_id: product.id,
            product_name: localizedProduct.name,
        });
        toast.success(t('assistant.success.productAdded', { product: localizedProduct.name }));
    };

    useEffect(() => {
        const openFromExternalAction = (event) => {
            if (event.detail?.answers) {
                setAnswers((current) => ({ ...current, ...event.detail.answers }));
            }
            if (typeof event.detail?.step === 'number') {
                setStep(event.detail.step);
            }
            setIsOpen(true);
            trackEvent('prechat_open', { source: event.detail?.source || 'external_action' });
        };
        window.addEventListener('vesper:open-prechat', openFromExternalAction);
        return () => window.removeEventListener('vesper:open-prechat', openFromExternalAction);
    }, []);

    // Keep online state updated in case user leaves the widget open across hour changes
    useEffect(() => {
        const id = setInterval(() => setOnline(isBusinessHours()), 30 * 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!isOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const panel = isOpen && (
        <div
            className="bg-theme-surface border border-theme shadow-2xl w-full max-w-[min(420px,calc(100vw-1rem))] max-h-[min(720px,calc(100vh-3rem))] overflow-hidden animate-slide-up flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={t('assistant.aria.dialog')}
        >
                    <div className="bg-white border-b border-theme px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/img/vesper-ex-logo.png"
                                alt="Vesper Equipamentos EX"
                                className="h-8 w-auto max-w-[112px] object-contain shrink-0 drop-shadow-[0_0_1px_rgba(255,255,255,0.95)]"
                                decoding="async"
                            />
                            <div>
                                <p className="text-brand-sub text-sm font-bold leading-none">{t('assistant.header.title')}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className={`w-2 h-2 rounded-full ${online ? 'bg-[#25D366]' : 'bg-black'}`} />
                                    <span className="text-brand-sub text-[10px]">
                                        {online ? t('assistant.header.online') : t('assistant.header.offline')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-black/70 hover:text-black transition-colors"
                            aria-label={t('common.close')}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="h-1 bg-theme-surface-elevated">
                        <div className="h-full bg-[#25D366] transition-all" style={{ width: `${((step + 1) / 5) * 100}%` }} />
                    </div>

                    <div className="p-4 md:p-5 min-h-0 overflow-y-auto flex-1">
                        {step === 0 && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-2">{t('assistant.steps.step', { current: 1, total: 5 })}</p>
                                    <h3 className="text-theme-primary text-lg font-black tracking-tight">{t('assistant.steps.intentTitle')}</h3>
                                    <p className="text-theme-muted text-xs leading-relaxed mt-2">
                                        {t('assistant.steps.intentDescription')}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {procurementOptions.map((option) => (
                                        <OptionButton
                                            key={option.value}
                                            option={option}
                                            selected={answers.procurement === option.value}
                                            onClick={() => chooseAndAdvance('procurement', option.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-2">{t('assistant.steps.step', { current: 2, total: 5 })}</p>
                                    <h3 className="text-theme-primary text-lg font-black tracking-tight">{t('assistant.steps.needTitle')}</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {needOptions.map((option) => (
                                        <OptionButton
                                            key={option.value}
                                            option={option}
                                            selected={answers.need === option.value}
                                            onClick={() => chooseAndAdvance('need', option.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-2">{t('assistant.steps.step', { current: 3, total: 5 })}</p>
                                    <h3 className="text-theme-primary text-lg font-black tracking-tight">{t('assistant.steps.environmentTitle')}</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {[
                                        { value: 'ex', label: t('assistant.area.ex') },
                                        { value: 'normal', label: t('assistant.area.normal') },
                                        { value: 'unknown', label: t('assistant.area.unknown') },
                                    ].map((option) => (
                                        <OptionButton
                                            key={option.value}
                                            option={option}
                                            selected={answers.area === option.value}
                                            onClick={() => chooseStepThree('area', option.value)}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-[10px] text-theme-muted font-black uppercase tracking-widest mb-2">{t('assistant.labels.application')}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {applicationOptions.map((option) => (
                                            <OptionButton
                                                key={option.value}
                                                option={option}
                                                selected={answers.application === option.value}
                                                onClick={() => chooseStepThree('application', option.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-theme-muted font-black uppercase tracking-widest mb-2">{t('assistant.labels.urgency')}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {urgencyOptions.map((option) => (
                                            <OptionButton
                                                key={option.value}
                                                option={option}
                                                selected={answers.urgency === option.value}
                                                onClick={() => chooseStepThree('urgency', option.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-2">{t('assistant.steps.step', { current: 4, total: 5 })}</p>
                                    <h3 className="text-theme-primary text-lg font-black tracking-tight">{t('assistant.steps.suggestionsTitle')}</h3>
                                    <p className="text-theme-muted text-xs leading-relaxed mt-2">
                                        {t('assistant.steps.suggestionsDescription')}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {recommendations.map((product) => (
                                        <div key={product.id} className="bg-theme-card border border-theme p-3 flex items-start gap-3">
                                            <div className="w-14 h-14 bg-white shrink-0 flex items-center justify-center p-2">
                                                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-theme-primary text-xs font-black leading-tight flex-1">{product.name}</p>
                                                    {product.ex && <span className="text-[9px] text-brand-sub font-black uppercase">EX</span>}
                                                </div>
                                                {product.subtitle && (
                                                    <p className="text-theme-muted text-[10px] leading-relaxed">{product.subtitle}</p>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => addRecommendationToQuote(product)}
                                                    className="mt-3 border border-brand-main/30 text-brand-main hover:bg-brand-main hover:text-brand-main-contrast px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-2"
                                                    aria-label={t('assistant.aria.addProduct', { product: product.name })}
                                                >
                                                    <ClipboardPlus size={12} /> {t('assistant.actions.addToList')}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-2">{t('assistant.steps.step', { current: 5, total: 5 })}</p>
                                    <h3 className="text-theme-primary text-lg font-black tracking-tight">{t('assistant.steps.contactTitle')}</h3>
                                    <p className="text-theme-muted text-xs leading-relaxed mt-2">
                                        {isTechnicalQuestion
                                            ? t('assistant.steps.contactDescriptionTechnical')
                                            : t('assistant.steps.contactDescriptionEmail')}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input className="theme-input text-xs py-3" placeholder={t('assistant.fields.name')} value={answers.name} onChange={(event) => updateAnswer('name', event.target.value)} />
                                    <input className="theme-input text-xs py-3" placeholder={t('assistant.fields.company')} value={answers.company} onChange={(event) => updateAnswer('company', event.target.value)} />
                                </div>
                                <input className="theme-input text-xs py-3" type="email" placeholder={t('assistant.fields.email')} value={answers.email} onChange={(event) => updateAnswer('email', event.target.value)} />
                                <input className="theme-input text-xs py-3" type="tel" placeholder={t('assistant.fields.phone')} value={answers.phone} onChange={(event) => updateAnswer('phone', event.target.value)} />
                                <input className="theme-input text-xs py-3" placeholder={t('assistant.fields.city')} value={answers.city} onChange={(event) => updateAnswer('city', event.target.value)} />
                                <textarea className="theme-input text-xs py-3 resize-none" rows={3} placeholder={t('assistant.fields.notes')} value={answers.notes} onChange={(event) => updateAnswer('notes', event.target.value)} />

                                {!isTechnicalQuestion && (
                                    <div className="bg-theme-card border border-theme p-3">
                                        <p className="text-[10px] text-theme-muted font-black uppercase tracking-widest mb-1">{t('assistant.emailTrace.title')}</p>
                                        <p className="text-theme-secondary text-xs leading-relaxed">
                                            {t('assistant.emailTrace.description')} <span className="font-bold text-theme-primary">{emailRecipient}</span>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-theme bg-theme-body shrink-0">
                        <div className="flex items-start gap-2 mb-3">
                            <Clock size={13} className="text-theme-muted mt-0.5 shrink-0" />
                            <p className="text-[10px] text-theme-muted leading-relaxed">
                                {online ? t('assistant.footer.available') : t('assistant.footer.offline')}
                                {' '}{t('assistant.footer.hours')}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {step > 0 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="border border-theme text-theme-muted hover:text-theme-primary px-3 py-3 transition-colors"
                                    aria-label={t('assistant.actions.back')}
                                >
                                    <ArrowLeft size={16} />
                                </button>
                            )}
                            {step < 2 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="flex-1 border border-theme text-theme-muted hover:text-theme-primary font-bold py-3 px-4 text-xs uppercase tracking-widest transition-all"
                                >
                                    {t('assistant.actions.skip')}
                                </button>
                            ) : step === 2 ? (
                                <button
                                    onClick={() => setStep(3)}
                                    className="flex-1 border border-theme text-theme-muted hover:text-theme-primary font-bold py-3 px-4 text-xs uppercase tracking-widest transition-all"
                                >
                                    {t('assistant.actions.skip')}
                                </button>
                            ) : step === 3 ? (
                                <button
                                    onClick={() => setStep(4)}
                                    className="flex-1 bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black font-black py-3 px-4 text-xs uppercase tracking-widest transition-all"
                                >
                                    {t('assistant.actions.continue')}
                                </button>
                            ) : isTechnicalQuestion ? (
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={sendToWhatsApp}
                                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-3 px-4 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={14} /> {t('assistant.actions.sendWhatsapp')}
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        trackEmailLeadAttempt();
                                        sendToEmail();
                                    }}
                                    disabled={isSendingEmail}
                                    className="flex-1 bg-brand-main hover:bg-white disabled:opacity-60 disabled:hover:bg-brand-main text-brand-main-contrast font-black py-3 px-4 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    <Mail size={14} /> {isSendingEmail ? t('common.sending') : t('assistant.actions.sendEmail')}
                                </button>
                            )}
                            <button
                                onClick={reset}
                                className="border border-theme text-theme-muted hover:text-theme-primary px-3 py-3 transition-colors"
                                aria-label={t('assistant.actions.reset')}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
    );

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 bg-black/55 backdrop-blur-sm">
                    {panel}
                </div>
            )}
            {!isOpen && (
            <div className="relative">
                <button
                    onClick={openWidget}
                    className="flex items-center gap-2.5 rounded-full shadow-2xl transition-all duration-300 bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 px-3.5 py-3.5 2xl:px-4"
                    aria-label={t('assistant.buttonAria')}
                    aria-expanded={isOpen}
                >
                    <MessageCircle size={22} className="text-white" />
                    <span className="text-white font-bold text-sm whitespace-nowrap hidden 2xl:inline">{t('assistant.buttonText')}</span>
                </button>

                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]" />
                </span>

                {online && (
                    <CheckCircle
                        size={14}
                        className="absolute -bottom-1 -left-1 text-[#25D366] bg-white dark:bg-[#0A0A0A] rounded-full"
                    />
                )}
            </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { COMPANY } from '../data/company.js';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const getInfoItems = (t) => [
    {
        icon: <Phone size={16} />,
        label: t('contact.info.phones'),
        content: (
            <div className="space-y-1">
                {COMPANY.phones.map((tel) => (
                    <a
                        key={tel}
                        href={`tel:+55${tel.replace(/\D/g, '')}`}
                        className="block text-theme-secondary text-sm font-medium hover:text-brand-main transition-colors"
                    >
                        {tel}
                    </a>
                ))}
                <p className="text-theme-muted/60 text-xs mt-3 leading-relaxed">
                    {t('contact.info.phoneNote')} {COMPANY.emails.geral}
                </p>
            </div>
        ),
    },
    {
        icon: <Mail size={16} />,
        label: t('contact.info.emailsByDepartment'),
        content: (
            <div className="space-y-3">
                {[
                    { setor: t('contact.departments.vendas'), email: COMPANY.emails.vendas },
                    { setor: t('contact.departments.locacao'), email: COMPANY.emails.locacao },
                    { setor: t('contact.departments.geral'), email: COMPANY.emails.geral },
                ].map(({ setor, email }) => (
                    <div key={setor}>
                        <p className="text-theme-muted text-[10px] font-bold uppercase tracking-widest mb-0.5">{setor}</p>
                        <a href={`mailto:${email}`} className="text-theme-secondary text-xs font-medium hover:text-brand-main transition-colors">
                            {email}
                        </a>
                    </div>
                ))}
            </div>
        ),
    },
    {
        icon: <MapPin size={16} />,
        label: t('contact.info.address'),
        content: (
            <div className="space-y-4">
                <p className="text-theme-secondary text-sm leading-relaxed">{COMPANY.address.full}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-theme">
                    <Clock size={13} className="text-brand-main mt-0.5 shrink-0" />
                    <div className="text-theme-muted text-xs leading-relaxed space-y-0.5">
                        <p>{COMPANY.hours.weekdays}</p>
                        <p>{COMPANY.hours.friday}</p>
                        <p className="text-theme-muted/60">{COMPANY.hours.lunch}</p>
                    </div>
                </div>
                <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Vesper+Equipamentos+Ex,+Rua+Sete+de+Março,+370,+Bonsucesso,+Rio+de+Janeiro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-main text-[11px] font-black uppercase tracking-widest hover:underline inline-flex items-center gap-1.5"
                >
                    <MapPin size={10} /> {t('contact.info.openRoute')}
                </a>
            </div>
        ),
    },
];

// Formulário de contato com envio assíncrono e feedback inline
function ContactForm() {
    const { t } = useTranslation();
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [validationError, setValidationError] = useState('');
    const [formData, setFormData] = useState({
        setor: '',
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
    });

    const handleChange = (e) => {
        setValidationError('');
        if (status === 'error') setStatus('idle');
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() && !formData.telefone.trim()) {
            setValidationError(t('contact.form.contactMethodRequired'));
            setStatus('idle');
            return;
        }

        setStatus('sending');
        setValidationError('');

        // A versão de portfólio não envia leads para a operação da empresa.
        // A integração de produção foi removida desta cópia pública.
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        setStatus('success');
        setFormData({ setor: '', nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
    };

    const inputClass = "theme-input text-xs font-medium py-3";
    const labelClass = "text-theme-muted text-[10px] font-bold uppercase tracking-widest mb-2 block";

    return (
        <div className="lg:col-span-3 theme-panel p-6 md:p-8 lg:p-10">
            <h2 className="text-lg font-black text-theme-primary tracking-tight mb-2">{t('contact.form.submit')}</h2>
            <p className="text-theme-muted text-xs mb-8 leading-relaxed">
                {t('contact.form.salesHint')}{' '}
                <a href={`mailto:${COMPANY.emails.vendas}`} className="text-brand-main hover:underline">{COMPANY.emails.vendas}</a>.
                {' '}{t('contact.form.rentalHint')}{' '}
                <a href={`mailto:${COMPANY.emails.locacao}`} className="text-brand-main hover:underline">{COMPANY.emails.locacao}</a>.
            </p>

            {/* Mensagem de sucesso */}
            {status === 'success' && (
                <div className="mb-6 p-4 border border-brand-main/30 bg-brand-main/5 flex items-start gap-3 animate-slide-up">
                    <CheckCircle size={16} className="text-brand-main shrink-0 mt-0.5" />
                    <div>
                        <p className="text-theme-primary text-sm font-bold">{t('contact.form.success')}</p>
                        <p className="text-theme-muted text-xs mt-0.5">{t('contact.form.successDetail')}</p>
                    </div>
                </div>
            )}

            {/* Mensagem de erro */}
            {validationError && (
                <div className="mb-6 p-4 border border-brand-sub/30 bg-brand-sub/5 flex items-start gap-3 animate-slide-up" role="alert">
                    <AlertCircle size={16} className="text-brand-sub shrink-0 mt-0.5" />
                    <p className="text-theme-primary text-sm font-bold">{validationError}</p>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 border border-brand-sub/30 bg-brand-sub/5 flex items-start gap-3 animate-slide-up">
                    <AlertCircle size={16} className="text-brand-sub shrink-0 mt-0.5" />
                    <div>
                        <p className="text-theme-primary text-sm font-bold">{t('contact.form.error')}</p>
                        <p className="text-theme-muted text-xs mt-0.5">
                            {t('contact.form.errorDetail')}{' '}
                            <a href={`tel:+55${COMPANY.phones[0].replace(/\D/g, '')}`} className="text-brand-main hover:underline">
                                telefone
                            </a>.
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contact-setor" className={labelClass}>{t('contact.form.department')} *</label>
                        <select
                            id="contact-setor"
                            name="setor"
                            required
                            value={formData.setor}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer`}
                        >
                            <option value="" className="bg-[var(--bg-body)]">{t('contact.form.select')}</option>
                            <option value="vendas" className="bg-[var(--bg-body)]">{t('contact.departments.vendas')}</option>
                            <option value="locacao" className="bg-[var(--bg-body)]">{t('contact.departments.locacao')}</option>
                            <option value="compras" className="bg-[var(--bg-body)]">{t('contact.departments.compras')}</option>
                            <option value="financeiro" className="bg-[var(--bg-body)]">{t('contact.departments.financeiro')}</option>
                            <option value="gerencia" className="bg-[var(--bg-body)]">{t('contact.departments.gerencia')}</option>
                            <option value="outro" className="bg-[var(--bg-body)]">{t('contact.departments.outro')}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="contact-nome" className={labelClass}>{t('contact.form.nameCompany')} *</label>
                        <input
                            id="contact-nome"
                            type="text"
                            name="nome"
                            placeholder={t('contact.form.nameCompanyPlaceholder')}
                            required
                            maxLength={60}
                            value={formData.nome}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contact-email" className={labelClass}>{t('common.email')}</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="seu@email.com"
                            aria-describedby="contact-return-hint"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="contact-telefone" className={labelClass}>{t('common.phone')}</label>
                        <input
                            id="contact-telefone"
                            type="tel"
                            name="telefone"
                            placeholder="(21) 9 0000-0000"
                            aria-describedby="contact-return-hint"
                            value={formData.telefone}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                </div>
                <p id="contact-return-hint" className="-mt-3 text-[11px] text-theme-muted leading-relaxed">
                    {t('contact.form.contactMethodHint')}
                </p>

                <div>
                    <label htmlFor="contact-assunto" className={labelClass}>{t('contact.form.subject')} *</label>
                    <input
                        id="contact-assunto"
                        type="text"
                        name="assunto"
                        placeholder={t('contact.form.subjectPlaceholder')}
                        required
                        maxLength={60}
                        value={formData.assunto}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="contact-mensagem" className={labelClass}>{t('contact.form.message')} *</label>
                    <textarea
                        id="contact-mensagem"
                        name="mensagem"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                        maxLength={1000}
                        rows={5}
                        value={formData.mensagem}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed py-4 flex items-center justify-center gap-2 text-xs"
                >
                    {status === 'sending' ? (
                        <>
                            <Loader size={14} className="animate-spin" /> {t('common.sending')}
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle size={14} /> {t('contact.form.sent')}
                        </>
                    ) : (
                        <>
                            <Send size={14} /> {t('contact.form.submit')}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default function ContatoPage({ navigateTo }) {
    const { t } = useTranslation();
    const infoItems = getInfoItems(t);

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.contato') }]} />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">

                <div className="mb-14">
                    <p className="text-[11px] text-brand-sub font-black uppercase tracking-widest mb-4">
                        {t('contact.eyebrow')}
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-theme-primary tracking-tighter leading-none">
                        {t('contact.title')} <span className="text-brand-main">Vesper</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Informações — 2 colunas no lg */}
                    <div className="lg:col-span-2 space-y-px">
                        {infoItems.map((item) => (
                            <div key={item.label} className="theme-panel p-6 md:p-7">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <span className="text-brand-main">{item.icon}</span>
                                    <p className="text-theme-primary font-bold text-xs uppercase tracking-widest">{item.label}</p>
                                </div>
                                {item.content}
                            </div>
                        ))}
                    </div>

                    {/* Formulário assíncrono */}
                    <ContactForm />

                </div>

                {/* Mapa Interativo */}
                <div className="mt-12 md:mt-16 w-full h-[450px] theme-panel relative group overflow-hidden">
                    <iframe
                        src="https://maps.google.com/maps?q=Vesper+Equipamento+Ex,+Rua+Sete+de+Marco+370+Bonsucesso+Rio+de+Janeiro&t=k&z=20&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={t('contact.mapTitle')}
                        className="opacity-90 hover:opacity-100 transition-opacity duration-500"
                    ></iframe>

                    {/* Painel lateral sobreposto ao mapa */}
                    <div className="absolute top-0 left-0 h-full w-[300px] bg-theme-footer border-r border-theme p-8 hidden md:flex flex-col justify-center shadow-2xl z-10">
                        <p className="text-brand-main text-[11px] font-black uppercase tracking-widest mb-3">{t('contact.visitFactory')}</p>
                        <p className="text-theme-primary text-sm font-medium leading-relaxed mb-6">
                            Rua Sete de Março, 370<br />
                            Bonsucesso<br />
                            Rio de Janeiro - RJ
                        </p>
                        <a
                            href="https://www.google.com/maps/dir/?api=1&destination=Vesper+Equipamentos+Ex,+Rua+Sete+de+Março,+370,+Bonsucesso,+Rio+de+Janeiro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 py-4 px-4 transition-colors w-full mt-2"
                        >
                            <MapPin size={14} /> {t('contact.info.openRouteShort')}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

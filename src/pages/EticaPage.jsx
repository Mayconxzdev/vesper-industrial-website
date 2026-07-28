import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';

const SECTIONS = [
    {
        title: 'DISPOSIÇÕES ANTICORRUPÇÃO',
        items: [
            'A Vesper se obriga, sob as penas previstas neste instrumento e na legislação aplicável, a observar e cumprir rigorosamente todas as leis cabíveis, incluindo, mas não se limitando à legislação brasileira anticorrupção (Lei 12846/2013), contra a lavagem de dinheiro.',
            'A Vesper declara e garante que não está envolvida ou irá se envolver, direta ou indiretamente, por seus representantes, administradores, diretores, conselheiros, sócios ou acionistas, em qualquer atividade ou prática que constitua uma infração aos termos das Leis Anticorrupção.',
            'A Vesper declara que, direta ou indiretamente, não ofereceu, prometeu, pagou ou autorizou o pagamento em dinheiro, nem deu ou concordou em dar presentes ou qualquer coisa de valor às partes interessadas para se beneficiar.',
            'Toda documentação de cobrança deverá estar acompanhada de fatura detalhada, contendo discriminação dos serviços prestados e/ou bens adquiridos.',
            'O não cumprimento das Leis Anticorrupção será considerado uma infração grave e conferirá à Vesper o direito de declarar rescindida imediatamente qualquer nova relação de trabalho.',
        ],
    },
    {
        title: 'CÓDIGO DE CONDUTA E ÉTICA PARA FORNECEDORES',
        items: [
            'O fornecedor se obriga a observar e cumprir rigorosamente todas as leis cabíveis, incluindo a legislação brasileira anticorrupção, contra a lavagem de dinheiro e as normas da Política Anticorrupção.',
            'O fornecedor declara e garante não estar envolvido em qualquer atividade que constitua infração às Leis Anticorrupção durante o cumprimento de suas obrigações.',
            'O fornecedor notificará prontamente, por escrito, a Vesper a respeito de qualquer suspeita ou violação das Leis Anticorrupção.',
            'O fornecedor não cometerá e não será conivente com qualquer forma de trabalho forçado, escravo, compulsório ou formas modernas de escravidão.',
        ],
    },
    {
        title: 'PROTEÇÃO DOS DADOS PESSOAIS (LGPD)',
        items: [
            'Todos os funcionários Vesper, no ato de sua contratação e periodicamente, são capacitados e assinam o termo de confidencialidade sobre os termos da Lei nº 13.709/2018 (LGPD).',
            'A Vesper adota procedimentos internos de controle e proteção dos dados pessoais conforme estabelecido na lei.',
            'Não é permitido fazer fotos ou vídeos no ambiente de trabalho sem autorização da empresa e dos colaboradores.',
        ],
    },
    {
        title: 'DIREITOS HUMANOS',
        items: [
            'É comprometimento da Vesper respeitar, conscientizar, promover e prevenir a violação dos direitos humanos protegidos por tratados e convenções internacionais.',
            'Todos os funcionários devem promover um ambiente de trabalho que respeite a diversidade de cultura, cor de pele, nacionalidade, origem étnica, gênero, orientação sexual, religião e convicção política.',
            'É obrigação de todos cercear, não cometer e não ser conivente com qualquer forma de trabalho Árealizado por crianças e adolescentes abaixo de 16 anos.',
            'A Vesper mantém canais permanentes de comunicação com as comunidades onde atua, promovendo diálogo e abordagem adequada.',
        ],
    },
    {
        title: 'DESVIO DE CONDUTA',
        items: [
            'Qualquer desvio de conduta dos funcionários da Vesper deve ser comunicado diretamente à direção da empresa pelo e-mail sap@vesper.ind.br.',
        ],
        contact: 'sap@vesper.ind.br',
    },
];

export default function EticaPage({ navigateTo }) {
    const { t, i18n } = useTranslation();
    const sections = i18n.language === 'en' ? t('ethicsPage.sections', { returnObjects: true }) : SECTIONS;

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.etica') }]} />

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="mb-14">
                    <span className="text-[10px] text-brand-sub font-black uppercase tracking-widest mb-3 block">
                        {t('ethicsPage.eyebrow')}
                    </span>
                    <h1 className="text-5xl font-black text-theme-primary uppercase tracking-tighter leading-none">
                        {t('ethicsPage.title')} <span className="text-brand-main">{t('ethicsPage.titleHighlight')}</span>
                    </h1>
                </div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="bg-theme-surface border border-theme p-10">
                            <h2 className="text-xs font-black text-brand-main uppercase tracking-[0.2em] mb-8 pb-4 border-b border-theme">
                                {section.title}
                            </h2>
                            <ul className="space-y-5">
                                {section.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-4 text-theme-secondary text-sm font-medium leading-relaxed">
                                        <span className="text-brand-sub font-black shrink-0">{j + 1}.</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {section.contact && (
                                <div className="mt-6 pt-5 border-t border-theme">
                                    <p className="text-theme-muted text-xs font-medium">
                                        {t('ethicsPage.contactChannel')}{' '}
                                        <a href={`mailto:${section.contact}`} className="text-brand-main hover:underline font-bold">
                                            {section.contact}
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Assinatura */}
                <div className="mt-14 text-right border-t border-theme pt-10">
                    <p className="text-theme-muted text-sm font-medium">{t('privacyPage.signature')}</p>
                    <p className="text-theme-primary text-sm font-black mt-2">Vesper Ind. e Com, Ltda</p>
                    <p className="text-theme-muted text-xs mt-1">Wilson Silveira — {t('ethicsPage.administrator')}</p>
                </div>
            </div>
        </div>
    );
}

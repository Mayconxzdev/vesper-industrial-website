import { humanizeAnswer, LABELS } from './productIntelligence.js';

export const WHATSAPP_NUMBER = '5521964480102';

export const LEAD_EMAILS = {
    general: 'vesper@vesper.ind.br',
    salesEx: 'vendas-ex@ventrio.ind.br',
    salesNormal: 'vendas-ex@ventrio.ind.br',
    rental: 'loc@vesper.ind.br',
};

const CONTACT_KEYS = ['name', 'company', 'email', 'phone', 'city'];
const TECHNICAL_KEYS = ['procurement', 'need', 'area', 'application', 'urgency', 'notes'];

function cleanSubjectPart(value) {
    return String(value || '')
        .replace(/\s+/g, ' ')
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, 70);
}

function answerLines(answers = {}, keys = []) {
    return keys
        .map((key) => [key, answers[key]])
        .filter(([, value]) => value)
        .map(([key, value]) => `${LABELS[key] || key}: ${humanizeAnswer(key, value)}`);
}

function quoteLines(items = []) {
    return items.map((item, index) => {
        const quantity = item.quantity ? ` (${item.quantity} un.)` : '';
        const mode = item.intent ? ` - ${humanizeAnswer('procurement', item.intent)}` : '';
        const classification = item.ex === true ? ' - Produto EX' : item.ex === false ? ' - Produto normal' : '';
        const notes = item.notes ? `\n   Observações do item: ${item.notes}` : '';
        return `${index + 1}. ${item.name}${quantity}${mode}${classification}${notes}`;
    });
}

export function getLeadRecipient({ answers = {}, quoteItems = [] } = {}) {
    if (answers.procurement === 'locacao' || quoteItems.some((item) => item.intent === 'locacao')) {
        return LEAD_EMAILS.rental;
    }

    if (answers.procurement === 'compra' || quoteItems.some((item) => item.intent === 'compra')) {
        if (answers.area === 'ex' || quoteItems.some((item) => item.ex)) {
            return LEAD_EMAILS.salesEx;
        }
        if (answers.area === 'normal' || quoteItems.some((item) => item.ex === false)) {
            return LEAD_EMAILS.salesNormal;
        }
    }

    return LEAD_EMAILS.general;
}

export function getLeadSubject({ answers = {}, quoteItems = [] } = {}) {
    const prefix = '[Site Vesper]';
    const details = [answers.company, answers.name, answers.city]
        .map(cleanSubjectPart)
        .filter(Boolean);
    const suffix = details.length ? ` - ${details.join(' - ')}` : '';
    let type = 'Contato geral';

    if (answers.procurement === 'locacao' || quoteItems.some((item) => item.intent === 'locacao')) {
        type = 'Locação';
        return `${prefix} ${type}${suffix}`;
    }

    if (answers.procurement === 'compra' || quoteItems.some((item) => item.intent === 'compra')) {
        const hasEx = answers.area === 'ex' || quoteItems.some((item) => item.ex);
        const hasNormal = answers.area === 'normal' || quoteItems.some((item) => item.ex === false);
        if (hasEx) type = 'Compra EX';
        else if (hasNormal) type = 'Compra normal';
        else type = 'Compra';
        return `${prefix} ${type}${suffix}`;
    }

    return `${prefix} ${type}${suffix}`;
}

export function formatEmailLead({
    source = 'Site Vesper',
    answers = {},
    quoteItems = [],
} = {}) {
    const lines = [
        'Solicitação recebida pelo site da Vesper.',
        '',
        `Origem: ${source}`,
        `Destino sugerido: ${getLeadRecipient({ answers, quoteItems })}`,
        `Assunto sugerido: ${getLeadSubject({ answers, quoteItems })}`,
    ];

    const contact = answerLines(answers, CONTACT_KEYS);
    if (contact.length) {
        lines.push('', 'Dados para retorno:', ...contact);
    }

    const technical = answerLines(answers, TECHNICAL_KEYS);
    if (technical.length) {
        lines.push('', 'Dados técnicos informados:', ...technical);
    }

    if (quoteItems.length) {
        lines.push('', 'Produtos selecionados pelo cliente:', ...quoteLines(quoteItems));
    } else {
        lines.push('', 'Produtos selecionados pelo cliente: nenhum produto selecionado na lista.');
    }

    lines.push('', 'Retornar ao cliente pelo e-mail e/ou telefone informados acima.');
    return lines.join('\n');
}

export function formatTechnicalWhatsAppMessage({ source = 'Site Vesper', answers = {} } = {}) {
    const lines = [
        'Olá, vim pelo site da Vesper e tenho uma dúvida técnica.',
        '',
        `Origem: ${source}`,
    ];

    const contact = answerLines(answers, CONTACT_KEYS);
    if (contact.length) {
        lines.push('', 'Contato para retorno:', ...contact);
    }

    const technical = answerLines(answers, TECHNICAL_KEYS.filter((key) => key !== 'procurement'));
    if (technical.length) {
        lines.push('', 'Contexto técnico:', ...technical);
    }

    lines.push('', 'Podem me orientar tecnicamente sobre a melhor solução?');
    return lines.join('\n');
}

export function createWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

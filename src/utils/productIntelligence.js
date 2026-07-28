import { PRODUCTS } from '../data/products.js';
import { getTechnicalSearchText } from '../data/technicalSpecs.js';

export const PROCUREMENT_OPTIONS = [
    { value: 'compra', label: 'Compra', description: 'Quero comprar ou fabricar um equipamento.' },
    { value: 'locacao', label: 'Locação', description: 'Preciso alugar por período ou obra.' },
    { value: 'duvida', label: 'Dúvida técnica', description: 'Ainda estou levantando a necessidade.' },
];

export const NEED_OPTIONS = [
    { value: 'ventilacao', label: 'Ventilação', description: 'Renovar ar ou melhorar conforto operacional.' },
    { value: 'exaustao', label: 'Exaustão', description: 'Remover gases, vapores, calor ou contaminantes.' },
    { value: 'insuflamento', label: 'Insuflamento', description: 'Levar ar por dutos para área remota.' },
    { value: 'espaco_confinado', label: 'Espaço confinado', description: 'Tanques, silos, galerias ou NR-33.' },
];

export const APPLICATION_OPTIONS = [
    { value: 'galpao', label: 'Galpão industrial' },
    { value: 'espaco_confinado', label: 'Tanque / espaço confinado' },
    { value: 'offshore', label: 'Offshore / naval' },
    { value: 'quimica', label: 'Indústria química' },
    { value: 'oleo_gas', label: 'Óleo e gás' },
    { value: 'obra', label: 'Obra / locação' },
    { value: 'outro', label: 'Outro ambiente' },
];

export const URGENCY_OPTIONS = [
    { value: 'imediata', label: 'Imediata' },
    { value: 'semana', label: 'Esta semana' },
    { value: 'mes', label: 'Este mês' },
    { value: 'planejamento', label: 'Em planejamento' },
];

export const LABELS = {
    procurement: 'Interesse',
    need: 'Necessidade',
    area: 'Ambiente',
    application: 'Aplicação',
    urgency: 'Urgência',
    city: 'Cidade/UF',
    company: 'Empresa',
    email: 'E-mail para retorno',
    phone: 'Telefone/WhatsApp para retorno',
    name: 'Nome',
    notes: 'Observações',
    diameter: 'Diâmetro',
    voltage: 'Tensão',
    quantity: 'Quantidade',
    duct: 'Uso com duto',
};

const VALUE_LABELS = {
    area: {
        ex: 'Área classificada EX',
        normal: 'Área normal',
        unknown: 'Não sei informar',
    },
    duct: {
        sim: 'Sim',
        nao: 'Não',
        talvez: 'Talvez / não sei',
    },
};

function optionLabel(options, value) {
    return options.find((option) => option.value === value)?.label || value;
}

export function humanizeAnswer(key, value) {
    if (!value) return '';
    if (VALUE_LABELS[key]?.[value]) return VALUE_LABELS[key][value];
    if (key === 'procurement') return optionLabel(PROCUREMENT_OPTIONS, value);
    if (key === 'need') return optionLabel(NEED_OPTIONS, value);
    if (key === 'application') return optionLabel(APPLICATION_OPTIONS, value);
    if (key === 'urgency') return optionLabel(URGENCY_OPTIONS, value);
    return value;
}

function scoreProduct(product, answers = {}) {
    let score = 0;
    const haystack = `${product.name} ${product.subtitle || ''} ${product.description || ''} ${(product.specs || []).join(' ')} ${getTechnicalSearchText(product.id)}`.toLowerCase();

    if (answers.procurement === 'locacao' && product.isLocacao) score += 5;
    if (answers.area === 'ex' && product.ex) score += 7;
    if (answers.area === 'normal' && !product.ex) score += 3;

    if (answers.need === 'ventilacao' && product.category === 'ventiladores') score += 6;
    if (answers.need === 'exaustao' && product.category === 'exaustores') score += 6;
    if (answers.need === 'insuflamento' && product.category === 'insufladores') score += 7;
    if (answers.need === 'espaco_confinado') {
        if (product.category === 'insufladores') score += 8;
        if (haystack.includes('confinado') || haystack.includes('duto')) score += 5;
    }

    if (answers.application === 'offshore' && (haystack.includes('offshore') || haystack.includes('naval') || haystack.includes('inox'))) score += 6;
    if ((answers.application === 'quimica' || answers.application === 'oleo_gas') && product.ex) score += 5;
    if (answers.application === 'galpao' && product.category === 'ventiladores') score += 3;
    if (answers.application === 'obra' && product.isLocacao) score += 4;
    if (answers.duct === 'sim' && (haystack.includes('duto') || product.category === 'insufladores' || product.id.includes('centrifugo'))) score += 4;

    if (answers.diameter && haystack.includes(String(answers.diameter).replace(/\D/g, ''))) score += 2;

    return score;
}

export function recommendProducts(answers = {}, limit = 3) {
    const ranked = PRODUCTS
        .map((product) => ({ product, score: scoreProduct(product, answers) }))
        .sort((a, b) => b.score - a.score);

    const useful = ranked.filter((item) => item.score > 0).slice(0, limit).map((item) => item.product);
    if (useful.length) return useful;

    return PRODUCTS.filter((product) => product.category === 'ventiladores').slice(0, limit);
}

export function productPage(product) {
    if (!product) return 'produtos';
    if (product.category === 'ventiladores') return 'ventiladores';
    return 'exaustores';
}

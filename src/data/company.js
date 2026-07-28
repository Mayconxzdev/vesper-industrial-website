// Dados reais da Vesper Equipamentos EX LTDA
// Conteúdo institucional público validado na publicação do site.

export const COMPANY = {
    name: 'Vesper Equipamentos EX',
    legalName: 'Vesper Equipamentos EX LTDA',
    tagline: 'Ventiladores e Exaustores Industriais de Alta Performance',
    taglineEX: 'Especialistas em Ambientes Classificados e Atmosferas Explosivas',

    address: {
        street: 'Rua Sete de Março, 370',
        neighborhood: 'Bonsucesso',
        city: 'Rio de Janeiro',
        state: 'RJ',
        cep: '21043-030',
        full: 'Rua Sete de Março, 370 - Bonsucesso - Rio de Janeiro - RJ - CEP 21043-030',
    },

    phones: [
        '(21) 9 6448-0102',
        '(21) 9 9962-2736',
        '(21) 9 9952-7552',
    ],
    phonesDisplay: '(21) 9 6448-0102 | (21) 9 9962-2736 | (21) 9 9952-7552',

    emails: {
        geral: 'vesper@vesper.ind.br',
        vendas: 'vendas-ex@ventrio.ind.br',
        locacao: 'loc@vesper.ind.br',
        sap: 'sap@vesper.ind.br',
    },

    cnpj: '42.497.263/0001-06',
    inscricaoEstadual: '81.804.370',

    hours: {
        weekdays: 'De 2ª à 5ª feira das 8:00 às 17:30 h',
        friday: 'Às 6ª feiras das 8:00 às 15:10 h',
        lunch: 'Almoço das 11:50 às 12:20 h',
    },

    certifications: [
        { name: 'ISO 9001:2015', description: 'Sistema de Gestão da Qualidade' },
        { name: 'INMETRO 115:2022', description: 'Certificação Compulsória de Produtos Ex' },
    ],

    analytics: {
        gtm: 'GTM-THFD2JQ',
        ga4: 'G-6VDDMHXN7D',
    },

    history: `A marca VESPER surgiu há mais de 60 anos, inicialmente como prestadora de serviços de reparos de motores elétricos, geradores, bombas d'água, ventiladores e, posteriormente, passou também a fabricar Ventiladores e demais produtos.

No início, a gerência era controlada por um técnico formado na Itália e, já na segunda geração, a gerência foi assumida por um técnico formado nos Estados Unidos. Assim, a marca Vesper vem oferecendo aos seus clientes uma tecnologia de vanguarda, com produtos eficientes, modernos e possantes.

Atualmente, a marca Vesper está associada à fabricação e comercialização de ventiladores e exaustores industriais.

Vesper tem tradição de mais de 20 anos no mercado brasileiro na área Ex, fornecendo ventiladores e exaustores para área classificada. Vesper fabrica os equipamentos dentro das normas ISO 9001:2015 e INMETRO 115:2022.

Vesper é a principal fornecedora de exaustores e ventiladores Ex para o mercado industrial brasileiro de Óleo & Gás, químico e petroquímico em geral, mantendo em suas instalações consultorias externas para acompanhamento da produção dentro das normas inerentes aos equipamentos EX.

Vesper é expert em adequar projetos específicos de seus clientes através da customização de seus projetos.

Na área de prestação de serviços, a marca Vesper está presente no setor de locação de ventiladores e exaustores para eventos em geral.

A Empresa atende a inúmeros clientes nacionais e internacionais com exportação para a Colômbia, Alemanha, Espanha, Itália e Angola.`,

    employees: 74,

    exports: ['Colômbia', 'Alemanha', 'Espanha', 'Itália', 'Angola'],

    bndes: {
        text: 'EMPRESA, faça suas compras com CARTÃO BNDES',
        subtitle: 'Até 36 meses para pagar.',
        url: 'https://www.cartaobndes.gov.br',
    },
};

export const QUALITY = {
    mission: 'Buscar melhoria na área de ventilação e exaustão industrial, visando qualidade e segurança para seus consumidores.',
    vision: [
        'Manter e melhorar o Sistema de Gestão da Qualidade e a Certificação ISO 9001.',
        'Manter e ampliar a Certificação Compulsória de Produtos Ex até 2026.',
        'Ser referência nacional em produtos de ventilação e exaustão industrial até 2030.',
    ],
    values: [
        'Comprometimento com o Cliente',
        'Qualidade em seus processos e produtos',
        'Integridade com as partes interessadas',
    ],
    scope: 'Projeto, Fabricação e Comercialização de Ventiladores e Exaustores de uso Industrial e Atmosferas Explosivas.',
    certificates: [
        {
            name: 'Certificado ISO 9001:2015 — DSG',
            file: '/pdf/Certificado ISO 9001_2015 - Vesper - BRDSGP017065001-SGQ.pdf',
        },
        {
            name: 'Certificado INMETRO 115:2022',
            file: null, // verificar se existe o PDF
        },
    ],
};

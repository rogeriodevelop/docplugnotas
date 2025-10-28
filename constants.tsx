import React from 'react';
import type { NavItem, ApiEndpointDetails, CodeExample, Parameter } from './types';

export const SIDEBAR_DATA: NavItem[] = [
  { id: 'visaoGeral', label: 'Visão Geral' },
  {
    id: 'nfe',
    label: 'NFe',
    children: [
      { id: 'addNFe', label: 'Adicionar NFe' },
      { id: 'consultarNFe', label: 'Consultar NFe' },
      { id: 'cancelarNFe', label: 'Cancelar NFe' },
      { id: 'inutilizarNFe', label: 'Inutilizar NFe' },
      { id: 'corrigirNFe', label: 'Corrigir NFe (CC-e)' },
      { id: 'enviarEmailNFe', label: 'Enviar Email NFe' },
    ],
  },
  {
    id: 'nfce',
    label: 'NFCe',
    children: [
      { id: 'addNFCe', label: 'Adicionar NFCe' },
      { id: 'consultarNFCe', label: 'Consultar NFCe' },
      { id: 'cancelarNFCe', label: 'Cancelar NFCe' },
      { id: 'inutilizarNFCe', label: 'Inutilizar NFCe' },
    ],
  },
  {
    id: 'mdfe',
    label: 'MDFe',
    children: [
      { id: 'addMDFe', label: 'Adicionar MDFe' },
      { id: 'consultarMDFe', label: 'Consultar MDFe' },
    ],
  },
   {
    id: 'empresas',
    label: 'Empresas',
    children: [
      { id: 'addEmpresa', label: 'Adicionar Empresa' },
      { id: 'consultarEmpresa', label: 'Consultar Empresa' },
      { id: 'listarEmpresas', label: 'Listar Empresas' },
    ],
  },
  {
    id: 'certificados',
    label: 'Certificados',
    children: [
      { id: 'addCertificado', label: 'Adicionar Certificado' },
      { id: 'consultarCertificado', label: 'Consultar Certificado' },
      { id: 'listarCertificados', label: 'Listar Certificados' },
    ],
  },
  {
    id: 'nfse',
    label: 'NFS-e',
    children: [
      { id: 'addNFSe', label: 'Adicionar NFS-e' },
      { id: 'consultarNFSe', label: 'Consultar NFS-e' },
    ],
  },
  {
    id: 'webhooks',
    label: 'Webhooks',
    children: [
      { id: 'addWebhook', label: 'Criar Webhook' },
      { id: 'listarWebhooks', label: 'Listar Webhooks' },
      { id: 'consultarWebhook', label: 'Consultar Webhook' },
      { id: 'deletarWebhook', label: 'Deletar Webhook' },
    ],
  },
];

// NFe Dynamic Tax Fields
const ALL_ICMS_FIELDS: { [key: string]: Parameter } = {
  origem: { name: 'origem', type: 'integer', required: true, description: 'Origem da mercadoria (0-Nacional, 1-Estrangeira, etc.).', defaultValue: 0 },
  baseCalculo: { name: 'baseCalculo', type: 'number', description: 'Valor da base de cálculo do ICMS.', defaultValue: 0 },
  aliquota: { name: 'aliquota', type: 'number', description: 'Alíquota do imposto (%).', defaultValue: 0 },
  percentualReducaoBaseCalculo: { name: 'percentualReducaoBaseCalculo', type: 'number', description: 'Percentual de redução da base de cálculo (%).', defaultValue: 0 },
  modalidadeBaseCalculoST: { name: 'modalidadeBaseCalculoST', type: 'integer', description: 'Modalidade de determinação da BC do ICMS ST (0-Preço tabelado, 1-Lista Negativa, 2-Lista Positiva, 3-Lista Neutra, 4-MVA, 5-Pauta).', defaultValue: 4 },
  percentualMargemValorAdicionadoST: { name: 'percentualMargemValorAdicionadoST', type: 'number', description: 'Percentual da margem de valor Adicionado do ICMS ST (%).', defaultValue: 0 },
  percentualReducaoBaseCalculoST: { name: 'percentualReducaoBaseCalculoST', type: 'number', description: 'Percentual de redução da BC do ICMS ST (%).', defaultValue: 0 },
  baseCalculoST: { name: 'baseCalculoST', type: 'number', description: 'Valor da BC do ICMS ST.', defaultValue: 0 },
  aliquotaST: { name: 'aliquotaST', type: 'number', description: 'Alíquota do ICMS ST (%).', defaultValue: 0 },
  valorST: { name: 'valorST', type: 'number', description: 'Valor do ICMS ST.', defaultValue: 0 },
};

const ALL_PIS_COFINS_FIELDS: { [key: string]: Parameter } = {
  baseCalculo: { name: 'baseCalculo', type: 'number', description: 'Valor da base de cálculo do PIS/COFINS.', defaultValue: 0 },
  aliquota: { name: 'aliquota', type: 'number', description: 'Alíquota do imposto (em %).', defaultValue: 0 },
  valor: { name: 'valor', type: 'number', description: 'Valor do PIS/COFINS (R$).', defaultValue: 0 },
  aliquotaST: { name: 'aliquotaST', type: 'number', description: 'Alíquota do PIS/COFINS ST (em %).', defaultValue: 0 },
  valorST: { name: 'valorST', type: 'number', description: 'Valor do PIS/COFINS ST (R$).', defaultValue: 0 },
};

export const ICMS_CST_MAP: { [key: string]: string[] } = {
  '00': ['origem', 'baseCalculo', 'aliquota'],
  '10': ['origem', 'baseCalculo', 'aliquota', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '20': ['origem', 'baseCalculo', 'aliquota', 'percentualReducaoBaseCalculo'],
  '30': ['origem', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '40': ['origem'],
  '41': ['origem'],
  '50': ['origem'],
  '51': ['origem', 'baseCalculo', 'aliquota', 'percentualReducaoBaseCalculo'],
  '60': ['origem'],
  '70': ['origem', 'baseCalculo', 'aliquota', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '90': ['origem', 'baseCalculo', 'aliquota', 'percentualReducaoBaseCalculo', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  // Simples Nacional
  '101': ['origem'],
  '102': ['origem'],
  '103': ['origem'],
  '201': ['origem', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '202': ['origem', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '203': ['origem', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
  '500': ['origem'],
  '900': ['origem', 'baseCalculo', 'aliquota', 'percentualReducaoBaseCalculo', 'modalidadeBaseCalculoST', 'percentualMargemValorAdicionadoST', 'percentualReducaoBaseCalculoST', 'baseCalculoST', 'aliquotaST', 'valorST'],
};

export const PIS_COFINS_CST_MAP: { [key: string]: string[] } = {
    '01': ['baseCalculo', 'aliquota'],
    '02': ['baseCalculo', 'aliquota'],
    '03': ['valor', 'aliquota'],
    '04': [],
    '05': [],
    '06': [],
    '07': [],
    '08': [],
    '09': [],
    '49': [],
    '50': ['baseCalculoST', 'aliquotaST', 'valorST'],
    '99': ['baseCalculo', 'aliquota'],
};

export const API_CONTENT_DATA: { [key: string]: ApiEndpointDetails } = {
  visaoGeral: {
    id: 'visaoGeral',
    tag: 'Documentação',
    title: 'Visão Geral da API PlugNotas',
    method: 'GET',
    path: '/docs',
    description: 'Bem-vindo à documentação da API PlugNotas. Nossa API foi projetada para ser simples, poderosa e fácil de integrar. Aqui você encontrará todos os recursos necessários para emitir documentos fiscais eletrônicos de forma eficiente e segura.<br/><br/>Utilize o menu à esquerda para navegar entre os diferentes endpoints disponíveis. Cada seção contém detalhes sobre os parâmetros, exemplos de requisições e respostas esperadas.',
    parameters: [],
    responses: [
      {
        code: '200',
        description: 'Acesso à documentação bem-sucedido.',
      }
    ]
  },
  addNFe: {
    id: 'addNFe',
    tag: 'NFe',
    title: 'Adicionar NFe',
    method: 'POST',
    path: '/nfe',
    description: 'Este método é responsável por adicionar uma nova NFe na nossa base de dados. O processo de autorização é assíncrono, ou seja, você envia os dados do documento e nós cuidamos do resto. Para saber o status do documento, você pode consultar o método de consulta de NFe ou configurar um webhook.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.', defaultValue: 'SEU_TOKEN' }
    ],
    parameters: [
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'idIntegracao', type: 'string', description: 'ID de integração para facilitar a busca.', defaultValue: 'XXXYY999' },
          { name: 'presenca', type: 'integer', required: true, description: 'Indicador de presença do comprador no estabelecimento (0-Não se aplica, 1-Operação presencial, 2-Operação não presencial, pela Internet, etc.).', defaultValue: 1 },
          { name: 'naturezaOperacao', type: 'string', required: true, description: 'Descrição da natureza da operação (Ex: Venda de mercadoria).', defaultValue: "VENDA DE MERCADORIAS" },
          { name: 'tipo', type: 'integer', description: 'Tipo do documento fiscal (0-Entrada, 1-Saída). Padrão: 1.', defaultValue: 1 },
          { name: 'finalidade', type: 'integer', description: 'Finalidade de emissão da NF-e (1-Normal, 2-Complementar, 3-Ajuste, 4-Devolução). Padrão: 1.', defaultValue: 1 },
          { name: 'ambiente', type: 'integer', description: 'Tipo de ambiente (1-Produção, 2-Homologação). Padrão: 2.', defaultValue: 2 },
          {
            name: 'destinatario',
            type: 'object',
            required: true,
            description: 'Dados do destinatário.',
            children: [
              { name: 'cpfCnpj', type: 'string', required: true, description: 'CPF ou CNPJ do destinatário.', defaultValue: "00000000000000" },
              { name: 'nome', type: 'string', required: true, description: 'Nome ou razão social.', defaultValue: "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL" },
              { name: 'indicadorInscricaoEstadual', type: 'integer', required: true, description: 'Indicador da IE (1-Contribuinte ICMS, 2-Contribuinte isento, 9-Não Contribuinte).', defaultValue: 9 },
              { name: 'inscricaoEstadual', type: 'string', description: 'Inscrição Estadual, se houver.', defaultValue: "" },
              { name: 'email', type: 'string', description: 'E-mail do destinatário.', defaultValue: "destinatario@teste.com" },
              { name: 'telefone', type: 'string', description: 'Telefone do destinatário.', defaultValue: "44999998888" },
              {
                name: 'endereco',
                type: 'object',
                description: 'Endereço do destinatário.',
                children: [
                  { name: 'logradouro', type: 'string', required: true, description: 'Nome da rua, avenida, etc.', defaultValue: "AVENIDA TESTE" },
                  { name: 'numero', type: 'string', required: true, description: 'Número do imóvel.', defaultValue: "1234" },
                  { name: 'complemento', type: 'string', description: 'Complemento do endereço.', defaultValue: "SALA 1" },
                  { name: 'bairro', type: 'string', required: true, description: 'Bairro.', defaultValue: "CENTRO" },
                  { name: 'codigoCidade', type: 'string', required: true, description: 'Código IBGE do município.', defaultValue: "4115200" },
                  { name: 'cidade', type: 'string', required: true, description: 'Nome da cidade.', defaultValue: "MARINGA" },
                  { name: 'uf', type: 'string', required: true, description: 'Sigla da Unidade Federativa.', defaultValue: "PR" },
                  { name: 'cep', type: 'string', required: true, description: 'Código de Endereçamento Postal.', defaultValue: "87000000" },
                  { name: 'codigoPais', type: 'string', description: 'Código do país (Bacen). Padrão: 1058.', defaultValue: "1058" },
                  { name: 'pais', type: 'string', description: 'Nome do país. Padrão: BRASIL.', defaultValue: "BRASIL" },
                ],
              },
            ],
          },
          {
            name: 'itens',
            type: 'array',
            required: true,
            description: 'Lista de itens da nota.',
            isManipulableArray: true,
            defaultValue: [{
              numero: 1,
              codigo: "001",
              descricao: "PRODUTO TESTE COM IMPOSTOS",
              ncm: "22030000",
              cest: "",
              cfop: "5102",
              unidade: "UN",
              quantidade: 1,
              valor: 10.50,
              valorFrete: 0,
              valorSeguro: 0,
              valorDesconto: 0,
              impostos: {
                  icms: {
                      situacaoTributaria: "102",
                      origem: 0,
                  },
                  pis: {
                      situacaoTributaria: "07",
                  },
                  cofins: {
                      situacaoTributaria: "07",
                  }
              }
            }],
            children: [
              { name: 'numero', type: 'integer', required: true, description: 'Número sequencial do item.' },
              { name: 'codigo', type: 'string', required: true, description: 'Código do produto.' },
              { name: 'descricao', type: 'string', required: true, description: 'Descrição do produto.' },
              { name: 'ncm', type: 'string', required: true, description: 'Nomenclatura Comum do Mercosul.' },
              { name: 'cest', type: 'string', description: 'Código Especificador da Substituição Tributária.' },
              { name: 'cfop', type: 'string', required: true, description: 'Código Fiscal de Operações e Prestações.' },
              { name: 'unidade', type: 'string', required: true, description: 'Unidade de medida (ex: UN, KG).' },
              { name: 'quantidade', type: 'number', required: true, description: 'Quantidade do produto.' },
              { name: 'valor', type: 'number', required: true, description: 'Valor unitário do produto.' },
              { name: 'valorFrete', type: 'number', description: 'Valor do frete do item.' },
              { name: 'valorSeguro', type: 'number', description: 'Valor do seguro do item.' },
              { name: 'valorDesconto', type: 'number', description: 'Valor do desconto do item.' },
              {
                name: 'impostos',
                type: 'object',
                description: 'Objeto com os impostos do item.',
                children: [
                    {
                        name: 'icms',
                        type: 'object',
                        description: 'Imposto sobre Circulação de Mercadorias e Serviços.',
                        dynamicChildrenKey: 'ICMS_CST_MAP',
                        children: [
                          { name: 'situacaoTributaria', type: 'string', required: true, description: 'Código de Situação Tributária do ICMS.', isDynamicTrigger: true, defaultValue: '102', options: Object.keys(ICMS_CST_MAP).map(key => ({value: key, label: key})) },
                          ...Object.values(ALL_ICMS_FIELDS)
                        ]
                    },
                    {
                        name: 'pis',
                        type: 'object',
                        description: 'Programa de Integração Social.',
                        dynamicChildrenKey: 'PIS_COFINS_CST_MAP',
                        children: [
                            { name: 'situacaoTributaria', type: 'string', required: true, description: 'Código de Situação Tributária do PIS.', isDynamicTrigger: true, defaultValue: '07', options: Object.keys(PIS_COFINS_CST_MAP).map(key => ({value: key, label: key})) },
                            ...Object.values(ALL_PIS_COFINS_FIELDS)
                        ]
                    },
                    {
                        name: 'cofins',
                        type: 'object',
                        description: 'Contribuição para o Financiamento da Seguridade Social.',
                        dynamicChildrenKey: 'PIS_COFINS_CST_MAP',
                        children: [
                            { name: 'situacaoTributaria', type: 'string', required: true, description: 'Código de Situação Tributária do COFINS.', isDynamicTrigger: true, defaultValue: '07', options: Object.keys(PIS_COFINS_CST_MAP).map(key => ({value: key, label: key})) },
                            ...Object.values(ALL_PIS_COFINS_FIELDS)
                        ]
                    },
                ]
              }
            ],
          },
          {
            name: 'pagamentos',
            type: 'array',
            description: 'Lista de formas de pagamento.',
            isManipulableArray: true,
            defaultValue: [{
                forma: "01",
                valor: 10.50,
                bandeira: "",
                cnpjCredenciadora: ""
            }],
            children: [
                {
                    name: 'forma',
                    type: 'string',
                    required: true,
                    description: 'Código da forma de pagamento (ex: 01-Dinheiro, 03-Cartão de Crédito).'
                },
                {
                    name: 'valor',
                    type: 'number',
                    required: true,
                    description: 'Valor do pagamento.'
                },
                {
                    name: 'bandeira',
                    type: 'string',
                    description: 'Bandeira do cartão (se aplicável).'
                },
                {
                    name: 'cnpjCredenciadora',
                    type: 'string',
                    description: 'CNPJ da credenciadora (se aplicável).'
                }
            ]
          },
          {
            name: 'transporte',
            type: 'object',
            description: 'Dados do transporte da mercadoria.',
            children: [
                { name: 'modalidadeFrete', type: 'integer', required: true, description: 'Modalidade do frete (0-Emitente, 1-Destinatário, 2-Terceiros, 9-Sem frete).', defaultValue: 9 },
                {
                    name: 'transportadora',
                    type: 'object',
                    description: 'Dados da transportadora.',
                    children: [
                        { name: 'cpfCnpj', type: 'string', description: 'CPF ou CNPJ da transportadora.', defaultValue: "" },
                        { name: 'nome', type: 'string', description: 'Nome ou Razão Social.', defaultValue: "" },
                    ]
                },
                 {
                    name: 'veiculo',
                    type: 'object',
                    description: 'Dados do veículo.',
                    children: [
                        { name: 'placa', type: 'string', description: 'Placa do veículo.', defaultValue: "" },
                        { name: 'uf', type: 'string', description: 'UF da placa.', defaultValue: "" },
                        { name: 'rntrc', type: 'string', description: 'Registro Nacional de Transportadores.', defaultValue: "" },
                    ]
                },
            ]
          }
        ],
      },
    ],
    responses: [
      {
        code: '202',
        description: 'Documento recebido com sucesso e aguardando processamento.',
        schema: `{
  "protocolo": "string",
  "situacao": "string",
  "motivo": "string",
  "id": "string",
  "erros": [
    {
      "codigo": "string",
      "mensagem": "string"
    }
  ]
}`
      },
      {
        code: '400',
        description: 'Erro na requisição. Verifique os parâmetros enviados.',
      }
    ]
  },
  consultarNFe: {
    id: 'consultarNFe',
    tag: 'NFe',
    title: 'Consultar NFe',
    method: 'GET',
    path: '/nfe/{id}',
    description: 'Consulta o status e os dados de uma NFe específica através do seu ID único, retornado no momento da criação.',
     headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Path',
        type: 'string',
        description: 'Parâmetros de caminho.',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFe a ser consultada.' },
        ],
      },
      {
        name: 'Query',
        type: 'string',
        description: 'Parâmetros de consulta.',
        children: [
            { name: 'completo', type: 'boolean', description: 'Se verdadeiro, retorna o objeto completo da NFe.' },
        ],
      },
    ],
    responses: [
        {
            code: '200',
            description: 'Sucesso. Retorna os dados da NFe.',
            schema: `{
  "id": "string",
  "status": "string",
  "valorTotal": "number",
  "destinatario": {
    "nome": "string"
  },
  "xml": "string",
  "pdf": "string"
}`
        },
        {
            code: '404',
            description: 'NFe não encontrada.',
        }
    ]
  },
  cancelarNFe: {
    id: 'cancelarNFe',
    tag: 'NFe',
    title: 'Cancelar NFe',
    method: 'POST',
    path: '/nfe/{id}/cancelar',
    description: 'Solicita o cancelamento de uma NFe autorizada. O cancelamento só pode ser realizado dentro de um prazo legal e se a mercadoria não tiver circulado.',
     headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFe a ser cancelada.' },
        ],
      },
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'motivo', type: 'string', required: true, description: 'Justificativa para o cancelamento, com no mínimo 15 caracteres.', defaultValue: 'Desistência da compra pelo cliente.' },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Solicitação de cancelamento recebida.',
        schema: `{
  "status": "CANCELADO",
  "motivo": "string"
}`
      },
      {
        code: '422',
        description: 'Erro de validação. A NFe não pode ser cancelada.',
      }
    ]
  },
  inutilizarNFe: {
    id: 'inutilizarNFe',
    tag: 'NFe',
    title: 'Inutilizar NFe',
    method: 'POST',
    path: '/nfe/inutilizar',
    description: 'Este método é utilizado para inutilizar uma faixa de numeração de NFe que não foi e não será utilizada, por motivo de quebra de sequência.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'numeroInicial', type: 'integer', required: true, description: 'Número inicial da faixa a ser inutilizada.', defaultValue: 100 },
          { name: 'numeroFinal', type: 'integer', required: true, description: 'Número final da faixa a ser inutilizada.', defaultValue: 105 },
          { name: 'serie', type: 'integer', required: true, description: 'Série da NFe.', defaultValue: 1 },
          { name: 'justificativa', type: 'string', required: true, description: 'Motivo da inutilização, com no mínimo 15 caracteres.', defaultValue: 'Falha na sequência de numeração da nota fiscal.' },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Faixa de numeração inutilizada com sucesso.',
        schema: `{
  "protocolo": "string",
  "situacao": "INUTILIZADA",
  "motivo": "string"
}`
      },
      {
        code: '400',
        description: 'Erro na requisição. Verifique os dados informados.',
      }
    ]
  },
  corrigirNFe: {
    id: 'corrigirNFe',
    tag: 'NFe',
    title: 'Corrigir NFe (CC-e)',
    method: 'POST',
    path: '/nfe/{id}/cce',
    description: 'Emite uma Carta de Correção Eletrônica (CC-e) para uma NFe autorizada. A CC-e pode ser usada para corrigir erros em campos específicos da NFe, desde que não alterem variáveis que determinam o valor do imposto.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFe a ser corrigida.' },
        ],
      },
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'correcao', type: 'string', required: true, description: 'Texto da correção, com no mínimo 15 caracteres.', defaultValue: 'O endereço correto do destinatário é Rua Exemplo, Nº 123.' },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Carta de Correção enviada com sucesso.',
        schema: `{
  "id": "string",
  "status": "AUTORIZADO",
  "cce": {
    "protocolo": "string",
    "data": "string"
  }
}`
      },
      {
        code: '422',
        description: 'Erro de validação. Verifique a justificativa ou o status da NFe.',
      }
    ]
  },
  enviarEmailNFe: {
    id: 'enviarEmailNFe',
    tag: 'NFe',
    title: 'Enviar Email NFe',
    method: 'POST',
    path: '/nfe/{id}/email',
    description: 'Envia o XML e o DANFE (em PDF) de uma NFe autorizada para uma lista de emails.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFe a ser enviada.' },
        ],
      },
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'emails', type: 'array[string]', required: true, description: 'Lista de endereços de e-mail (strings) para os quais a NFe será enviada.', defaultValue: '["cliente1@email.com"]' },
          { name: 'copia', type: 'array[string]', description: 'Lista de emails para enviar em cópia (CC).', defaultValue: '["contador@email.com"]' },
          { name: 'copiaOculta', type: 'array[string]', description: 'Lista de emails para enviar em cópia oculta (BCC).', defaultValue: '[]' },
          { name: 'assunto', type: 'string', description: 'Assunto do e-mail. Se não informado, um padrão será utilizado.', defaultValue: 'Sua Nota Fiscal Eletrônica Chegou!' },
          { name: 'mensagem', type: 'string', description: 'Corpo da mensagem do e-mail. Pode conter HTML. Se não informado, um padrão será utilizado.', defaultValue: '<h1>Olá!</h1><p>Segue em anexo o XML e o DANFE de sua nota fiscal. Obrigado!</p>' },
          { name: 'pdf', type: 'boolean', description: 'Se `true`, anexa o DANFE em PDF. Padrão: `true`.', defaultValue: true },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'E-mails enviados para a fila de processamento.',
        schema: `{
  "sucesso": true,
  "mensagem": "Emails adicionados à fila de envio."
}`
      },
      {
        code: '404',
        description: 'NFe não encontrada ou não autorizada para envio.',
      }
    ]
  },
  addNFCe: {
    id: 'addNFCe',
    tag: 'NFCe',
    title: 'Adicionar NFCe',
    method: 'POST',
    path: '/nfce',
    description: 'Este método é responsável por adicionar uma nova NFCe (Nota Fiscal de Consumidor Eletrônica). O processo de autorização também é assíncrono.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'idIntegracao', type: 'string', description: 'ID de integração para facilitar a busca.', defaultValue: 'PEDIDO123' },
          { name: 'ambiente', type: 'integer', description: 'Tipo de ambiente (1-Produção, 2-Homologação). Padrão: 2.', defaultValue: 2 },
          { name: 'presenca', type: 'integer', required: true, description: 'Indicador de presença do comprador (valor 1 - Operação presencial).', defaultValue: 1 },
          {
            name: 'destinatario',
            type: 'object',
            description: 'Dados do destinatário (opcional na NFCe).',
            children: [
              { name: 'cpfCnpj', type: 'string', description: 'CPF ou CNPJ do consumidor.', defaultValue: '12345678900' },
              { name: 'nome', type: 'string', description: 'Nome do consumidor.', defaultValue: '' },
            ]
          },
          {
            name: 'pagamentos',
            type: 'array',
            required: true,
            description: 'Lista com os dados do pagamento.',
            isManipulableArray: true,
             defaultValue: [{
                forma: "03",
                valor: 50.00,
                bandeira: "01",
                cnpjCredenciadora: "12345678000199",
                tipoIntegracao: 2,
            }],
            children: [
              { name: 'forma', type: 'string', required: true, description: 'Forma de pagamento (ex: 01-Dinheiro, 03-Cartão de Crédito, 04-Cartão de Débito).' },
              { name: 'valor', type: 'number', required: true, description: 'Valor do pagamento.' },
              { name: 'bandeira', type: 'string', description: 'Bandeira da operadora de cartão (ex: 01-Visa, 02-Mastercard).' },
              { name: 'cnpjCredenciadora', type: 'string', description: 'CNPJ da credenciadora de cartão.' },
              { name: 'tipoIntegracao', type: 'integer', description: 'Tipo de integração do pagamento (1-POS, 2-TEF).'},
            ]
          },
          {
            name: 'itens',
            type: 'array',
            required: true,
            description: 'Lista de itens da nota.',
            isManipulableArray: true,
            defaultValue: [{
                codigo: "P001",
                descricao: "PRODUTO 1 NFC-E",
                ncm: "22021000",
                cest: "",
                cfop: "5102",
                unidade: "UN",
                quantidade: 2,
                valor: 25.00,
                valorDesconto: 0
            }],
            children: [
               { name: 'codigo', type: 'string', required: true, description: 'Código do produto.' },
               { name: 'descricao', type: 'string', required: true, description: 'Descrição do produto.' },
               { name: 'ncm', type: 'string', required: true, description: 'Código NCM do produto.' },
               { name: 'cest', type: 'string', description: 'CEST, se aplicável.'},
               { name: 'cfop', type: 'string', required: true, description: 'Código Fiscal de Operações e Prestações.' },
               { name: 'unidade', type: 'string', required: true, description: 'Unidade de medida (ex: UN, KG).' },
               { name: 'quantidade', type: 'number', required: true, description: 'Quantidade do item.' },
               { name: 'valor', type: 'number', required: true, description: 'Valor unitário do produto.' },
               { name: 'valorDesconto', type: 'number', description: 'Valor do desconto do item.' },
            ]
          },
          { name: 'valorFrete', type: 'number', description: 'Valor total do frete.', defaultValue: 0 },
          { name: 'valorDesconto', type: 'number', description: 'Valor total do desconto.', defaultValue: 0 },
          { name: 'valorOutros', type: 'number', description: 'Outras despesas acessórias.', defaultValue: 0 },
        ]
      },
    ],
    responses: [
      {
        code: '202',
        description: 'NFCe recebida com sucesso e aguardando processamento.',
        schema: `{
  "protocolo": "string",
  "situacao": "string",
  "id": "string"
}`
      },
      {
        code: '400',
        description: 'Erro na requisição. Verifique os parâmetros enviados.',
      }
    ]
  },
  consultarNFCe: {
    id: 'consultarNFCe',
    tag: 'NFCe',
    title: 'Consultar NFCe',
    method: 'GET',
    path: '/nfce/{id}',
    description: 'Consulta o status e os dados de uma NFCe específica.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFCe a ser consultada.' },
        ],
      }
    ],
    responses: [
        {
            code: '200',
            description: 'Sucesso. Retorna os dados da NFCe.',
            schema: `{
  "id": "string",
  "status": "string"
}`
        },
        {
            code: '404',
            description: 'NFCe não encontrada.',
        }
    ]
  },
  cancelarNFCe: {
    id: 'cancelarNFCe',
    tag: 'NFCe',
    title: 'Cancelar NFCe',
    method: 'POST',
    path: '/nfce/{id}/cancelar',
    description: 'Solicita o cancelamento de uma NFCe autorizada.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
            { name: 'id', type: 'string', required: true, description: 'ID da NFCe a ser cancelada.' },
        ],
      },
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'motivo', type: 'string', required: true, description: 'Justificativa para o cancelamento.', defaultValue: "Erro na emissão" },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Solicitação de cancelamento recebida.',
      }
    ]
  },
  inutilizarNFCe: {
    id: 'inutilizarNFCe',
    tag: 'NFCe',
    title: 'Inutilizar NFCe',
    method: 'POST',
    path: '/nfce/inutilizar',
    description: 'Inutiliza uma faixa de numeração de NFCe que não foi utilizada.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'numeroInicial', type: 'integer', required: true, description: 'Número inicial.', defaultValue: 200 },
          { name: 'numeroFinal', type: 'integer', required: true, description: 'Número final.', defaultValue: 200 },
          { name: 'serie', type: 'integer', required: true, description: 'Série.', defaultValue: 1 },
          { name: 'justificativa', type: 'string', required: true, description: 'Motivo da inutilização.', defaultValue: "Quebra de sequência." },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Faixa de numeração inutilizada com sucesso.',
      }
    ]
  },
  addMDFe: {
    id: 'addMDFe',
    tag: 'MDFe',
    title: 'Adicionar MDFe',
    method: 'POST',
    path: '/mdfe',
    description: 'Adiciona um novo Manifesto Eletrônico de Documentos Fiscais (MDFe).',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'idIntegracao', type: 'string', description: 'ID de integração.', defaultValue: 'mdfe-001' },
          { name: 'ambiente', type: 'integer', description: 'Tipo de ambiente (1-Produção, 2-Homologação). Padrão: 2.', defaultValue: 2 },
          {
            name: 'emitente',
            type: 'object',
            required: true,
            description: 'Dados do emitente do MDFe.',
            children: [
              { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ do emitente.', defaultValue: '00000000000191' }
            ]
          },
          { name: 'tipoEmitente', type: 'integer', required: true, description: 'Tipo do emitente (1-Prestador de Serviço de Transporte, 2-Transportador de Carga Própria).', defaultValue: 1 },
          { name: 'tipoTransportador', type: 'integer', required: true, description: 'Tipo do transportador (1-ETC, 2-TAC, 3-CTC).', defaultValue: 1 },
          { name: 'modelo', type: 'integer', required: true, description: 'Modelo do documento fiscal (58 para MDFe).', defaultValue: 58 },
          { name: 'serie', type: 'integer', required: true, description: 'Série do MDFe.', defaultValue: 1 },
          { name: 'numero', type: 'integer', required: true, description: 'Número do MDFe.', defaultValue: 150 },
          { name: 'dataEmissao', type: 'string', description: 'Data e hora de emissão no formato AAAA-MM-DDTHH:MM:SS-03:00.', defaultValue: '2024-01-01T10:00:00-03:00' },
          { name: 'ufInicio', type: 'string', required: true, description: 'UF de início da prestação.', defaultValue: 'PR' },
          { name: 'ufFim', type: 'string', required: true, description: 'UF de término da prestação.', defaultValue: 'SC' },
          {
            name: 'municipioCarregamento',
            type: 'array',
            required: true,
            description: 'Lista de municípios de carregamento.',
            isManipulableArray: true,
            defaultValue: [{ codigo: "4115200", nome: "Maringá" }],
            children: [
              { name: 'codigo', type: 'string', required: true, description: 'Código IBGE do município.' },
              { name: 'nome', type: 'string', description: 'Nome do município.' },
            ]
          },
          {
            name: 'veiculoTracao',
            type: 'object',
            required: true,
            description: 'Dados do veículo de tração.',
            children: [
                { name: 'placa', type: 'string', required: true, description: 'Placa do veículo.', defaultValue: 'ABC1234' },
                { name: 'renavam', type: 'string', description: 'RENAVAM do veículo.', defaultValue: '123456789' },
                { name: 'tara', type: 'integer', required: true, description: 'Tara do veículo em KG.', defaultValue: 4000 },
                { name: 'capacidadeKg', type: 'integer', description: 'Capacidade do veículo em KG.', defaultValue: 10000 },
                { name: 'uf', type: 'string', required: true, description: 'UF de emplacamento do veículo.', defaultValue: 'PR' },
                { name: 'rntrc', type: 'string', required: true, description: 'Registro Nacional de Transportadores Rodoviários de Cargas.', defaultValue: '12345678' },
            ]
          },
          {
            name: 'veiculoReboque',
            type: 'array',
            description: 'Dados dos veículos reboque, se houver.',
            isManipulableArray: true,
            defaultValue: [],
            children: [
                { name: 'placa', type: 'string', required: true, description: 'Placa do veículo.' },
                { name: 'tara', type: 'integer', required: true, description: 'Tara do veículo em KG.' },
                { name: 'uf', type: 'string', required: true, description: 'UF de emplacamento do veículo.' },
            ]
          },
          {
            name: 'condutor',
            type: 'array',
            required: true,
            description: 'Lista de condutores do veículo.',
            isManipulableArray: true,
            defaultValue: [{ nome: "JOAO DA SILVA", cpf: "12345678901" }],
            children: [
                { name: 'nome', type: 'string', required: true, description: 'Nome do condutor.' },
                { name: 'cpf', type: 'string', required: true, description: 'CPF do condutor.' },
            ]
          },
          {
            name: 'documentos',
            type: 'array',
            required: true,
            description: 'Documentos fiscais transportados.',
            isManipulableArray: true,
            defaultValue: [{ chaveNFe: "41000000000000000000000000000000000000000001", segundoCodigoBarras: "" }],
            children: [
                { name: 'chaveNFe', type: 'string', required: true, description: 'Chave de acesso da NFe transportada.' },
                { name: 'segundoCodigoBarras', type: 'string', description: 'Informação do segundo código de barras.'},
            ]
          },
           {
            name: 'seguro',
            type: 'array',
            description: 'Informações do seguro da carga.',
            isManipulableArray: true,
            defaultValue: [{ responsavel: 1, cnpjSeguradora: "99888777000166", nomeSeguradora: "SEGURADORA TESTE S.A.", numeroApolice: "AP-09876", averbacoes: ["AV-123"] }],
            children: [
                { name: 'responsavel', type: 'integer', required: true, description: 'Responsável pelo seguro (1-Emitente, 2-Contratante).' },
                { name: 'cnpjSeguradora', type: 'string', description: 'CNPJ da seguradora.' },
                { name: 'nomeSeguradora', type: 'string', required: true, description: 'Nome da seguradora.' },
                { name: 'numeroApolice', type: 'string', required: true, description: 'Número da apólice de seguro.' },
                { name: 'averbacoes', type: 'array[string]', description: 'Lista de números de averbação.' },
            ]
          },
          {
            name: 'totais',
            type: 'object',
            description: 'Totais do MDFe.',
            children: [
                { name: 'valorCarga', type: 'number', required: true, description: 'Valor total da carga/mercadorias.', defaultValue: 15000.75 },
                { name: 'quantidadeCarga', type: 'number', required: true, description: 'Peso bruto total da carga em KG.', defaultValue: 5000 },
            ]
          }
        ]
      },
    ],
    responses: [
      {
        code: '202',
        description: 'MDFe recebido com sucesso.',
      }
    ]
  },
  consultarMDFe: {
    id: 'consultarMDFe',
    tag: 'MDFe',
    title: 'Consultar MDFe',
    method: 'GET',
    path: '/mdfe/{id}',
    description: 'Consulta um MDFe existente.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'id', type: 'string', required: true, description: 'ID do MDFe.' },
        ],
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
      }
    ]
  },
  addEmpresa: {
    id: 'addEmpresa',
    tag: 'Empresas',
    title: 'Adicionar Empresa',
    method: 'POST',
    path: '/empresa',
    description: 'Cadastra uma nova empresa na plataforma. Todos os documentos fiscais emitidos estarão vinculados a uma empresa.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ da empresa.', defaultValue: '00000000000191' },
          { name: 'razaoSocial', type: 'string', required: true, description: 'Razão Social.', defaultValue: 'EMPRESA DE TESTE LTDA' },
          { name: 'nomeFantasia', type: 'string', description: 'Nome Fantasia.', defaultValue: 'NOME FANTASIA TESTE' },
          { name: 'inscricaoEstadual', type: 'string', description: 'Inscrição Estadual (IE).', defaultValue: '123456789' },
          { name: 'inscricaoMunicipal', type: 'string', description: 'Inscrição Municipal (IM).', defaultValue: '987654' },
          { name: 'regimeTributario', type: 'integer', description: 'Regime Tributário (1-Simples Nacional, 3-Regime Normal).', defaultValue: 1 },
          { name: 'email', type: 'string', description: 'Email da empresa.', defaultValue: 'contato@empresa.com' },
          {
            name: 'endereco',
            type: 'object',
            required: true,
            description: 'Endereço da empresa.',
            children: [
              { name: 'logradouro', type: 'string', required: true, description: 'Nome da rua, avenida, etc.', defaultValue: 'AVENIDA TESTE' },
              { name: 'numero', type: 'string', required: true, description: 'Número do imóvel.', defaultValue: '123' },
              { name: 'bairro', type: 'string', required: true, description: 'Bairro.', defaultValue: 'CENTRO' },
              { name: 'codigoCidade', type: 'string', required: true, description: 'Código IBGE do município.', defaultValue: '4115200' },
              { name: 'cep', type: 'string', required: true, description: 'CEP.', defaultValue: '87000000' },
            ],
          },
        ]
      },
    ],
    responses: [
      {
        code: '201',
        description: 'Empresa criada com sucesso.',
        schema: `{
  "cpfCnpj": "00000000000191",
  "razaoSocial": "EMPRESA DE TESTE LTDA",
  "email": "contato@empresa.com",
  "id": "60d3b41f8d4e2b001a8d4e2b"
}`
      }
    ]
  },
  consultarEmpresa: {
    id: 'consultarEmpresa',
    tag: 'Empresas',
    title: 'Consultar Empresa',
    method: 'GET',
    path: '/empresa/{cpfCnpj}',
    description: 'Consulta os dados de uma empresa pelo CNPJ.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ da empresa.' },
        ],
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
      }
    ]
  },
  listarEmpresas: {
    id: 'listarEmpresas',
    tag: 'Empresas',
    title: 'Listar Empresas',
    method: 'GET',
    path: '/empresa',
    description: 'Retorna uma lista paginada de empresas cadastradas na sua conta.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Query',
        type: 'string',
        description: '',
        children: [
          { name: 'pagina', type: 'integer', description: 'Número da página a ser retornada. Padrão: 1.' },
          { name: 'limite', type: 'integer', description: 'Quantidade de registros por página. Padrão: 20.' },
        ],
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
        schema: `{
  "total": 1,
  "pagina": 1,
  "limite": 20,
  "dados": [
    {
      "cpfCnpj": "00000000000191",
      "razaoSocial": "EMPRESA DE TESTE LTDA"
    }
  ]
}`
      }
    ]
  },
  addCertificado: {
    id: 'addCertificado',
    tag: 'Certificados',
    title: 'Adicionar Certificado',
    method: 'POST',
    path: '/certificado',
    description: 'Faz o upload do certificado digital (A1) para uma empresa. O certificado é necessário para assinar e transmitir os documentos fiscais à SEFAZ.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Body',
        type: 'multipart/form-data',
        description: '',
        children: [
          { name: 'arquivo', type: 'file', required: true, description: 'Arquivo .pfx do certificado.' },
          { name: 'senha', type: 'string', required: true, description: 'Senha do certificado.' },
          { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ da empresa associada ao certificado.' },
        ]
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Certificado enviado com sucesso.',
        schema: `{
  "validade": "2025-12-31T23:59:59Z",
  "diasRestantes": 365,
  "sucesso": true
}`
      }
    ]
  },
  consultarCertificado: {
    id: 'consultarCertificado',
    tag: 'Certificados',
    title: 'Consultar Certificado',
    method: 'GET',
    path: '/certificado/{cpfCnpj}',
    description: 'Consulta a validade e outras informações do certificado de uma empresa.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ da empresa.' },
        ],
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso. Retorna os detalhes do certificado.',
        schema: `{
  "subject": "CN=EMPRESA TESTE:00000000000191,...",
  "validade": "2025-12-31T23:59:59Z",
  "diasRestantes": 365
}`
      }
    ]
  },
  listarCertificados: {
    id: 'listarCertificados',
    tag: 'Certificados',
    title: 'Listar Certificados',
    method: 'GET',
    path: '/certificado',
    description: 'Retorna uma lista de todos os certificados associados à sua conta.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
        schema: `[
  {
    "cpfCnpj": "00000000000191",
    "subject": "CN=EMPRESA TESTE:00000000000191,...",
    "validade": "2025-12-31T23:59:59Z",
    "diasRestantes": 365
  }
]`
      }
    ]
  },
  addNFSe: {
    id: 'addNFSe',
    tag: 'NFS-e',
    title: 'Adicionar NFS-e',
    method: 'POST',
    path: '/nfse',
    description: 'Adiciona uma nova Nota Fiscal de Serviço Eletrônica (NFS-e). A emissão de NFS-e pode variar dependendo da prefeitura, mas a API PlugNotas abstrai essa complexidade.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'idIntegracao', type: 'string', description: 'ID de integração para referência.', defaultValue: 'serv-abc-123' },
          { name: 'ambiente', type: 'integer', description: 'Tipo de ambiente (1-Produção, 2-Homologação). Padrão: 2.', defaultValue: 2 },
          {
            name: 'prestador',
            type: 'object',
            required: true,
            description: 'Dados do prestador do serviço (empresa emitente).',
            children: [
              { name: 'cpfCnpj', type: 'string', required: true, description: 'CNPJ do prestador.', defaultValue: '00000000000191' },
            ],
          },
          {
            name: 'tomador',
            type: 'object',
            required: true,
            description: 'Dados do tomador do serviço (cliente).',
            children: [
              { name: 'cpfCnpj', type: 'string', required: true, description: 'CPF ou CNPJ do tomador.', defaultValue: '12345678000199' },
              { name: 'razaoSocial', type: 'string', required: true, description: 'Razão Social ou Nome do tomador.', defaultValue: 'CLIENTE DE SERVICO LTDA' },
              { name: 'inscricaoMunicipal', type: 'string', description: 'Inscrição Municipal do tomador.', defaultValue: '' },
              { name: 'email', type: 'string', description: 'E-mail do tomador.', defaultValue: 'cliente@email.com' },
              {
                name: 'endereco',
                type: 'object',
                required: true,
                description: 'Endereço do tomador.',
                 children: [
                  { name: 'logradouro', type: 'string', required: true, description: 'Nome da rua, avenida, etc.', defaultValue: 'RUA DO CLIENTE' },
                  { name: 'numero', type: 'string', required: true, description: 'Número do imóvel.', defaultValue: '987' },
                  { name: 'bairro', type: 'string', required: true, description: 'Bairro.', defaultValue: 'BAIRRO NOVO' },
                  { name: 'codigoCidade', type: 'string', required: true, description: 'Código IBGE do município.', defaultValue: '4115200' },
                  { name: 'uf', type: 'string', required: true, description: 'UF.', defaultValue: 'PR' },
                  { name: 'cep', type: 'string', required: true, description: 'CEP.', defaultValue: '87010000' },
                ],
              }
            ],
          },
          {
            name: 'servico',
            type: 'array',
            required: true,
            description: 'Lista de serviços prestados.',
            isManipulableArray: true,
            defaultValue: [{
                codigo: "14.01",
                codigoTributacao: "1401",
                discriminacao: "Serviços de desenvolvimento de software.",
                cnae: "6201501",
                valor: 1500.00,
                iss: {
                    aliquota: 5,
                    retido: false,
                    exigibilidade: 1
                }
            }],
            children: [
              { name: 'codigo', type: 'string', description: 'Código do serviço (varia por município).' },
              { name: 'codigoTributacao', type: 'string', description: 'Código de tributação do município.' },
              { name: 'discriminacao', type: 'string', required: true, description: 'Descrição detalhada do serviço prestado.' },
              { name: 'cnae', type: 'string', description: 'Código CNAE do serviço.' },
              { name: 'valor', type: 'number', required: true, description: 'Valor total do serviço.' },
              {
                name: 'iss',
                type: 'object',
                required: true,
                description: 'Imposto Sobre Serviços.',
                children: [
                  { name: 'aliquota', type: 'number', required: true, description: 'Alíquota do ISS (%).' },
                  { name: 'retido', type: 'boolean', required: true, description: 'Indica se o ISS será retido na fonte. `true` ou `false`.' },
                  { name: 'exigibilidade', type: 'integer', required: true, description: 'Exigibilidade do ISS (1-Exigível, 2-Não incidência, 6-Exigível Suspensa).' }
                ]
              }
            ]
          },
        ]
      },
    ],
    responses: [
      {
        code: '202',
        description: 'NFS-e recebida com sucesso e aguardando processamento.',
        schema: `{
  "id": "string",
  "protocolo": "string",
  "situacao": "PROCESSANDO"
}`
      }
    ]
  },
  consultarNFSe: {
    id: 'consultarNFSe',
    tag: 'NFS-e',
    title: 'Consultar NFS-e',
    method: 'GET',
    path: '/nfse/{id}',
    description: 'Consulta uma NFS-e existente pelo seu ID.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'id', type: 'string', required: true, description: 'ID da NFS-e.' },
        ],
      },
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
        schema: `{
  "id": "string",
  "situacao": "AUTORIZADA",
  "numero": "1234",
  "codigoVerificacao": "ABCDE-12345",
  "link": "https://prefeitura.exemplo.gov.br/nfse/consulta"
}`
      }
    ]
  },
  addWebhook: {
    id: 'addWebhook',
    tag: 'Webhooks',
    title: 'Criar Webhook',
    method: 'POST',
    path: '/webhook',
    description: 'Cria um novo webhook para receber notificações sobre eventos dos documentos fiscais em tempo real (ex: autorização, cancelamento, rejeição).',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
       {
        name: 'Body',
        type: 'application/json',
        description: '',
        children: [
          { name: 'url', type: 'string', required: true, description: 'URL (HTTPS) para a qual as notificações serão enviadas.', defaultValue: 'https://meusistema.com/webhook/plugnotas' },
          { name: 'eventos', type: 'array[string]', required: true, description: 'Lista de eventos a serem notificados (ex: `nfe.autorizada`, `nfe.cancelada`, `nfse.rejeitada`).', defaultValue: '["nfe.autorizada", "nfe.cancelada", "nfe.rejeitada"]' },
          { name: 'headers', type: 'object', description: 'Objeto com cabeçalhos customizados a serem enviados na requisição do webhook (ex: para autenticação).', defaultValue: { Authorization: "Bearer SEU_TOKEN_SECRETO" }},
          { name: 'ativo', type: 'boolean', description: 'Indica se o webhook está ativo. Padrão: `true`.', defaultValue: true}
        ]
      },
    ],
    responses: [
      {
        code: '201',
        description: 'Webhook criado com sucesso.',
        schema: `{
  "id": "wh_123abc",
  "url": "https://meusistema.com/webhook",
  "eventos": ["nfe.autorizada"],
  "ativo": true
}`
      }
    ]
  },
  listarWebhooks: {
    id: 'listarWebhooks',
    tag: 'Webhooks',
    title: 'Listar Webhooks',
    method: 'GET',
    path: '/webhook',
    description: 'Retorna uma lista de todos os webhooks configurados na sua conta.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
        schema: `[
  {
    "id": "wh_123abc",
    "url": "https://meusistema.com/webhook/nfe",
    "eventos": ["nfe.autorizada", "nfe.cancelada"],
    "ativo": true
  },
  {
    "id": "wh_456def",
    "url": "https://meusistema.com/webhook/nfse",
    "eventos": ["nfse.autorizada"],
    "ativo": false
  }
]`
      }
    ]
  },
  consultarWebhook: {
    id: 'consultarWebhook',
    tag: 'Webhooks',
    title: 'Consultar Webhook',
    method: 'GET',
    path: '/webhook/{id}',
    description: 'Consulta os detalhes de um webhook específico pelo seu ID.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'id', type: 'string', required: true, description: 'ID do webhook a ser consultado.' },
        ],
      }
    ],
    responses: [
      {
        code: '200',
        description: 'Sucesso.',
        schema: `{
  "id": "wh_123abc",
  "url": "https://meusistema.com/webhook/nfe",
  "eventos": ["nfe.autorizada", "nfe.cancelada"],
  "ativo": true,
  "headers": {
    "Authorization": "Bearer SEU_TOKEN_SECRETO"
  }
}`
      }
    ]
  },
  deletarWebhook: {
    id: 'deletarWebhook',
    tag: 'Webhooks',
    title: 'Deletar Webhook',
    method: 'DELETE',
    path: '/webhook/{id}',
    description: 'Remove permanentemente um webhook.',
    headers: [
      { name: 'x-api-key', type: 'string', required: true, description: 'Seu token de acesso à API.' }
    ],
    parameters: [
      {
        name: 'Path',
        type: 'string',
        description: '',
        children: [
          { name: 'id', type: 'string', required: true, description: 'ID do webhook a ser deletado.' },
        ],
      }
    ],
    responses: [
      {
        code: '204',
        description: 'Webhook deletado com sucesso. Nenhum conteúdo retornado.',
      },
      {
        code: '404',
        description: 'Webhook não encontrado.',
      }
    ]
  },
};

export const CODE_SNIPPETS_DATA: { [key: string]: CodeExample[] } = {
  addNFe: [
    {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfe' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    },
    {
      language: 'C#',
      code: (body) => `var client = new RestClient("https://api.plugnotas.com.br/nfe");
var request = new RestRequest(Method.POST);
request.AddHeader("x-api-key", "SEU_TOKEN");
request.AddHeader("Content-Type", "application/json");
var body = @"${JSON.stringify(body, null, 2).replace(/"/g, '""')}";
request.AddParameter("application/json", body, ParameterType.RequestBody);
IRestResponse response = client.Execute(request);`
    },
    {
      language: 'Java',
      code: (body) => `OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, ${JSON.stringify(JSON.stringify(body))});
Request request = new Request.Builder()
  .url("https://api.plugnotas.com.br/nfe")
  .post(body)
  .addHeader("x-api-key", "SEU_TOKEN")
  .addHeader("Content-Type", "application/json")
  .build();

Response response = client.newCall(request).execute();`
    }
  ],
  consultarNFe: [
    {
        language: 'cURL',
        code: () => `curl --location --request GET 'https://api.plugnotas.com.br/nfe/ID_DA_NOTA' \\
--header 'x-api-key: SEU_TOKEN'`
    },
    {
        language: 'JavaScript',
        code: () => `fetch('https://api.plugnotas.com.br/nfe/ID_DA_NOTA', {
  method: 'GET',
  headers: {
    'x-api-key': 'SEU_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data));`
    }
  ],
  cancelarNFe: [
     {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfe/ID_DA_NOTA/cancelar' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    },
    {
        language: 'Python',
        code: (body) => `import requests
import json

url = "https://api.plugnotas.com.br/nfe/ID_DA_NOTA/cancelar"

payload = json.dumps(${JSON.stringify(body, null, 2)})
headers = {
  'x-api-key': 'SEU_TOKEN',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)`
    }
  ],
  inutilizarNFe: [
    {
     language: 'cURL',
     code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfe/inutilizar' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
   },
  ],
  corrigirNFe: [
    {
     language: 'cURL',
     code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfe/ID_DA_NOTA/cce' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
   },
  ],
  enviarEmailNFe: [
    {
     language: 'cURL',
     code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfe/ID_DA_NOTA/email' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
   },
  ],
  addNFCe: [
    {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfce' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    }
  ],
  addMDFe: [
     {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/mdfe' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    },
  ],
  addEmpresa: [
    {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/empresa' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    }
  ],
  consultarEmpresa: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/empresa/00000000000191' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  listarEmpresas: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/empresa?pagina=1&limite=10' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  addCertificado: [
    {
      language: 'cURL',
      code: () => `curl --location --request POST 'https://api.plugnotas.com.br/certificado' \\
--header 'x-api-key: SEU_TOKEN' \\
--form 'arquivo=@"/caminho/para/seu/certificado.pfx"' \\
--form 'senha="SUA_SENHA"' \\
--form 'cpfCnpj="00000000000191"'`
    }
  ],
  consultarCertificado: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/certificado/00000000000191' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  listarCertificados: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/certificado' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  addNFSe: [
    {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/nfse' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    }
  ],
  consultarNFSe: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/nfse/ID_DA_NFSE' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  addWebhook: [
    {
      language: 'cURL',
      code: (body) => `curl --location --request POST 'https://api.plugnotas.com.br/webhook' \\
--header 'x-api-key: SEU_TOKEN' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(body, null, 2)}'`
    }
  ],
  listarWebhooks: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/webhook' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  consultarWebhook: [
    {
      language: 'cURL',
      code: () => `curl --location --request GET 'https://api.plugnotas.com.br/webhook/ID_DO_WEBHOOK' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ],
  deletarWebhook: [
    {
      language: 'cURL',
      code: () => `curl --location --request DELETE 'https://api.plugnotas.com.br/webhook/ID_DO_WEBHOOK' \\
--header 'x-api-key: SEU_TOKEN'`
    }
  ]
};

export const generateInitialBody = (params: Parameter[]): any => {
  const body: any = {};
  params.forEach(param => {
    if (param.children) {
      if (param.type === 'array') {
        body[param.name] = param.defaultValue !== undefined ? JSON.parse(JSON.stringify(param.defaultValue)) : [];
      } else { // object
        body[param.name] = generateInitialBody(param.children);
      }
    } else {
      // Handle cases like array of strings
      if (param.type.includes('array')) {
         try {
            // Attempt to parse stringified array for default value
            body[param.name] = param.defaultValue !== undefined ? JSON.parse(param.defaultValue) : [];
         } catch(e) {
            body[param.name] = [];
         }
      } else {
         body[param.name] = param.defaultValue !== undefined ? param.defaultValue : '';
      }
    }
  });
  return body;
};
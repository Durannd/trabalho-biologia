// Base de dados de organismos amazônicos
// Cada organismo sabe de quem se alimenta, quem pode predá-lo,
// seu nível trófico e energia mínima para sobrevivência.

export const organismos = [
  // ============ PRODUTORES ============
  {
    id: "castanheira",
    nome: "Castanheira-do-pará",
    tipo: "produtor",
    nivelTrofico: ["produtor"],
    nivelTroficoLabel: "Produtor",
    alimentaSeDe: [],
    predadores: ["cutia", "macaco_prego", "inseto_folivoro"],
    energiaMinima: 0,
    descricao:
      "Árvore majestosa da Amazônia, pode atingir 50 metros de altura. Produz a castanha-do-pará, alimento essencial para diversos animais da floresta.",
    emoji: "🌳",
    curiosidade:
      "A castanheira pode viver mais de 500 anos e depende da cutia para dispersar suas sementes.",
  },
  {
    id: "vitoria_regia",
    nome: "Vitória-régia",
    tipo: "produtor",
    nivelTrofico: ["produtor"],
    nivelTroficoLabel: "Produtor",
    alimentaSeDe: [],
    predadores: ["inseto_aquatico", "peixe_herbivoro"],
    energiaMinima: 0,
    descricao:
      "Planta aquática gigante, símbolo da Amazônia. Suas folhas podem ter até 2,5 metros de diâmetro e suportar o peso de uma criança.",
    emoji: "🪷",
    curiosidade:
      "Suas flores abrem à noite e mudam de cor de branca para rosa em 48 horas.",
  },
  {
    id: "frutos_amazonicos",
    nome: "Frutos amazônicos",
    tipo: "produtor",
    nivelTrofico: ["produtor"],
    nivelTroficoLabel: "Produtor",
    alimentaSeDe: [],
    predadores: ["cutia", "macaco_prego", "anta"],
    energiaMinima: 0,
    descricao:
      "Conjunto de árvores frutíferas da floresta amazônica, incluindo açaí, cupuaçu, bacaba e buriti. Base alimentar de muitos animais.",
    emoji: "🫐",
    curiosidade:
      "A Amazônia possui mais de 300 espécies de frutas comestíveis catalogadas.",
  },
  {
    id: "gramineas_varzea",
    nome: "Gramíneas de várzea",
    tipo: "produtor",
    nivelTrofico: ["produtor"],
    nivelTroficoLabel: "Produtor",
    alimentaSeDe: [],
    predadores: ["capivara", "peixe_herbivoro", "inseto_folivoro"],
    energiaMinima: 0,
    descricao:
      "Vegetação rasteira das áreas alagáveis da Amazônia. Crescem rapidamente durante as cheias e alimentam herbívoros aquáticos e terrestres.",
    emoji: "🌾",
    curiosidade:
      "As gramíneas de várzea podem crescer até 4 metros durante o período de cheia.",
  },

  // ============ CONSUMIDORES PRIMÁRIOS ============
  {
    id: "cutia",
    nome: "Cutia",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["castanheira", "frutos_amazonicos"],
    predadores: ["jaguatirica", "onca_pintada", "harpia"],
    energiaMinima: 20,
    descricao:
      "Roedor de médio porte que desempenha papel vital na dispersão de sementes. É um dos poucos animais capazes de abrir o ouriço da castanha-do-pará.",
    emoji: "🐿️",
    curiosidade:
      "A cutia enterra sementes como reserva e muitas delas germinam, ajudando a regenerar a floresta.",
  },
  {
    id: "capivara",
    nome: "Capivara",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["gramineas_varzea"],
    predadores: ["onca_pintada", "jacare_acu"],
    energiaMinima: 20,
    descricao:
      "O maior roedor do mundo, pode pesar até 80 kg. Vive em grupos próximos a rios e lagos, alimentando-se de vegetação aquática e gramíneas.",
    emoji: "🦫",
    curiosidade:
      "Capivaras podem ficar submersas por até 5 minutos para escapar de predadores.",
  },
  {
    id: "inseto_folivoro",
    nome: "Inseto folívoro",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["castanheira", "gramineas_varzea"],
    predadores: ["sapo_cururu", "ave_insetivora"],
    energiaMinima: 10,
    descricao:
      "Grupo diverso de insetos que se alimentam de folhas. Inclui lagartas, gafanhotos e besouros que são base alimentar para anfíbios e aves.",
    emoji: "🦗",
    curiosidade:
      "A Amazônia abriga mais de 100.000 espécies de insetos, muitas ainda não catalogadas.",
  },
  {
    id: "peixe_herbivoro",
    nome: "Peixe herbívoro",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["vitoria_regia", "gramineas_varzea"],
    predadores: ["ariranha", "jacare_acu", "ave_pescadora"],
    energiaMinima: 15,
    descricao:
      "Peixes amazônicos como o tambaqui e o pacu, que se alimentam de frutos, sementes e plantas aquáticas. Essenciais na cadeia aquática.",
    emoji: "🐟",
    curiosidade:
      "O tambaqui pode pesar até 30 kg e é um dos peixes mais importantes para a economia amazônica.",
  },
  {
    id: "macaco_prego",
    nome: "Macaco-prego",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["castanheira", "frutos_amazonicos"],
    predadores: ["harpia", "onca_pintada"],
    energiaMinima: 18,
    descricao:
      "Primata inteligente e ágil da Amazônia. Utiliza ferramentas como pedras para quebrar castanhas e se alimenta de frutos, insetos e pequenos vertebrados.",
    emoji: "🐒",
    curiosidade:
      "Macacos-prego são capazes de usar ferramentas, algo raro no reino animal.",
  },
  {
    id: "anta",
    nome: "Anta",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["frutos_amazonicos"],
    predadores: ["onca_pintada"],
    energiaMinima: 25,
    descricao:
      "O maior mamífero terrestre da América do Sul. Conhecida como 'jardineira da floresta' por dispersar sementes enquanto se alimenta de frutos.",
    emoji: "🦏",
    curiosidade:
      "A anta é considerada um fóssil vivo, pois pouco mudou nos últimos 35 milhões de anos.",
  },

  // ============ CONSUMIDORES SECUNDÁRIOS ============
  {
    id: "sapo_cururu",
    nome: "Sapo-cururu",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["inseto_folivoro"],
    predadores: ["cobra", "harpia"],
    energiaMinima: 8,
    descricao:
      "Anfíbio comum da Amazônia, com glândulas de veneno. É um controlador natural de insetos, consumindo centenas por noite.",
    emoji: "🐸",
    curiosidade:
      "O sapo-cururu pode inflar o corpo para parecer maior e intimidar predadores.",
  },
  {
    id: "ave_insetivora",
    nome: "Ave insetívora",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["inseto_folivoro"],
    predadores: ["harpia", "cobra"],
    energiaMinima: 10,
    descricao:
      "Aves como o bem-te-vi e o suiriri, que se alimentam de insetos voadores e terrestres. Importantes no controle de pragas naturais.",
    emoji: "🐦",
    curiosidade:
      "A Amazônia possui mais de 1.300 espécies de aves, a maior diversidade do planeta.",
  },
  {
    id: "jaguatirica",
    nome: "Jaguatirica",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario", "consumidor_terciario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["cutia", "ave_insetivora", "sapo_cururu"],
    predadores: ["onca_pintada"],
    energiaMinima: 15,
    descricao:
      "Felino de médio porte, noturno e solitário. Excelente caçador que se alimenta de pequenos mamíferos, aves e répteis.",
    emoji: "🐆",
    curiosidade:
      "A jaguatirica tem a pelagem mais bonita entre os felinos americanos, o que a tornou alvo de caça.",
  },
  {
    id: "ariranha",
    nome: "Ariranha",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["peixe_herbivoro"],
    predadores: ["onca_pintada", "jacare_acu"],
    energiaMinima: 15,
    descricao:
      "A maior lontra do mundo, pode atingir 1,8m. Vive em grupos familiares e é uma caçadora aquática extremamente eficiente.",
    emoji: "🦦",
    curiosidade:
      "Ariranhas caçam em grupo e consomem até 4 kg de peixe por dia cada uma.",
  },
  {
    id: "cobra",
    nome: "Cobra",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario", "consumidor_terciario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["sapo_cururu", "ave_insetivora"],
    predadores: ["harpia"],
    energiaMinima: 10,
    descricao:
      "Serpentes amazônicas como a jiboia e a surucucu. Predadores silenciosos que controlam populações de anfíbios e pequenos vertebrados.",
    emoji: "🐍",
    curiosidade:
      "A sucuri é a maior cobra da Amazônia e pode atingir mais de 8 metros de comprimento.",
  },
  {
    id: "ave_pescadora",
    nome: "Ave pescadora",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_secundario"],
    nivelTroficoLabel: "Consumidor Secundário",
    alimentaSeDe: ["peixe_herbivoro"],
    predadores: ["harpia"],
    energiaMinima: 12,
    descricao:
      "Aves como o martim-pescador e o biguá, especializadas em capturar peixes. Mergulham com precisão para pescar.",
    emoji: "🦅",
    curiosidade:
      "O martim-pescador pode mergulhar a velocidades de até 40 km/h para capturar peixes.",
  },
  {
    id: "inseto_aquatico",
    nome: "Inseto aquático",
    tipo: "consumidor",
    nivelTrofico: ["consumidor_primario"],
    nivelTroficoLabel: "Consumidor Primário",
    alimentaSeDe: ["vitoria_regia"],
    predadores: ["peixe_herbivoro", "sapo_cururu"],
    energiaMinima: 5,
    descricao:
      "Insetos como besouros aquáticos e larvas de libélula que vivem nas folhas e raízes da vitória-régia.",
    emoji: "🪲",
    curiosidade:
      "O besouro polinizador da vitória-régia fica preso dentro da flor por uma noite inteira.",
  },

  // ============ PREDADORES DE TOPO ============
  {
    id: "onca_pintada",
    nome: "Onça-pintada",
    tipo: "predador_topo",
    nivelTrofico: ["consumidor_terciario", "predador_topo"],
    nivelTroficoLabel: "Predador de Topo",
    alimentaSeDe: [
      "capivara",
      "cutia",
      "jaguatirica",
      "ariranha",
      "anta",
      "macaco_prego",
    ],
    predadores: [],
    energiaMinima: 15,
    descricao:
      "O maior felino das Américas e o principal predador da Amazônia. Tem a mordida mais forte entre os felinos, capaz de perfurar cascos de tartarugas.",
    emoji: "🐅",
    curiosidade:
      "A onça-pintada é um dos poucos felinos que gostam de nadar e caçam jacarés.",
  },
  {
    id: "harpia",
    nome: "Harpia",
    tipo: "predador_topo",
    nivelTrofico: ["consumidor_terciario", "predador_topo"],
    nivelTroficoLabel: "Predador de Topo",
    alimentaSeDe: [
      "cutia",
      "sapo_cururu",
      "ave_insetivora",
      "macaco_prego",
      "cobra",
      "ave_pescadora",
    ],
    predadores: [],
    energiaMinima: 15,
    descricao:
      "A maior e mais poderosa águia das Américas. Suas garras são do tamanho das garras de um urso-pardo e pode carregar presas de até 7 kg.",
    emoji: "🦅",
    curiosidade:
      "A harpia pode atingir velocidade de 80 km/h voando entre as árvores da floresta.",
  },
  {
    id: "jacare_acu",
    nome: "Jacaré-açu",
    tipo: "predador_topo",
    nivelTrofico: ["consumidor_terciario", "predador_topo"],
    nivelTroficoLabel: "Predador de Topo",
    alimentaSeDe: ["capivara", "peixe_herbivoro", "ariranha"],
    predadores: [],
    energiaMinima: 15,
    descricao:
      "O maior crocodiliano da América do Sul, podendo atingir 6 metros. Domina os rios e lagos amazônicos como predador de topo aquático.",
    emoji: "🐊",
    curiosidade:
      "O jacaré-açu pode ficar submerso por até uma hora esperando sua presa.",
  },
];

// Helper para buscar organismo por ID
export function getOrganismoPorId(id) {
  return organismos.find((org) => org.id === id);
}

// Helper para buscar todos os produtores
export function getProdutores() {
  return organismos.filter((org) => org.tipo === "produtor");
}

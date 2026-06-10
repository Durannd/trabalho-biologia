// Mensagens educativas exibidas durante a simulação

export const mensagensEducativas = [
  {
    id: "fotossintese",
    texto:
      "As plantas armazenam apenas 2% da energia solar recebida por meio da fotossíntese. O restante é refletido ou dissipado como calor.",
    contexto: "produtor",
    icone: "☀️",
  },
  {
    id: "lei_10",
    texto:
      "A cada nível da cadeia alimentar, apenas 10% da energia é transferida. Os outros 90% são gastos em respiração, movimento e calor corporal.",
    contexto: "consumidor",
    icone: "🔋",
  },
  {
    id: "predador_topo",
    texto:
      "Predadores de topo recebem a menor quantidade de energia porque estão no final da cadeia alimentar. Por isso são os mais vulneráveis a mudanças no ecossistema.",
    contexto: "predador_topo",
    icone: "⚠️",
  },
  {
    id: "queimada",
    texto:
      "A fumaça das queimadas bloqueia a luz solar, reduzindo drasticamente a energia que chega aos produtores. Toda a cadeia alimentar é afetada em cascata.",
    contexto: "queimada",
    icone: "🔥",
  },
  {
    id: "cadeia_longa",
    texto:
      "Quanto maior a cadeia alimentar, menor a energia disponível no topo. Na natureza, cadeias muito longas são raras justamente por isso.",
    contexto: "cadeia_longa",
    icone: "📏",
  },
  {
    id: "entropia",
    texto:
      "A perda de energia a cada nível trófico é um exemplo da segunda lei da termodinâmica: a entropia do universo sempre aumenta.",
    contexto: "entropia",
    icone: "🌡️",
  },
  {
    id: "rede_alimentar",
    texto:
      "Na natureza, as relações alimentares formam uma rede complexa, não apenas uma cadeia linear. Cada organismo pode ter múltiplas presas e predadores.",
    contexto: "rede",
    icone: "🕸️",
  },
  {
    id: "amazonia",
    texto:
      "A Amazônia abriga cerca de 10% de todas as espécies do planeta. A destruição desse bioma afeta cadeias alimentares que levaram milhões de anos para se formar.",
    contexto: "amazonia",
    icone: "🌿",
  },
  {
    id: "colapso",
    texto:
      "Quando um predador de topo é extinto, as populações de suas presas podem crescer descontroladamente, causando um efeito cascata em todo o ecossistema.",
    contexto: "colapso",
    icone: "💀",
  },
  {
    id: "dispersao",
    texto:
      "Muitos animais amazônicos são dispersores de sementes. Sem eles, a floresta não consegue se regenerar naturalmente.",
    contexto: "dispersao",
    icone: "🌱",
  },
];

// Retorna uma mensagem relevante com base no contexto atual
export function getMensagemPorContexto(contexto) {
  const mensagens = mensagensEducativas.filter(
    (m) => m.contexto === contexto
  );
  if (mensagens.length === 0) return null;
  return mensagens[Math.floor(Math.random() * mensagens.length)];
}

// Retorna uma mensagem aleatória
export function getMensagemAleatoria() {
  return mensagensEducativas[
    Math.floor(Math.random() * mensagensEducativas.length)
  ];
}

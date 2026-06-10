// Lógica de simulação do fluxo de energia
// Todas as funções são puras e não dependem de estado externo.

// Constantes da simulação
export const ENERGIA_SOLAR = 100000;
export const EFICIENCIA_FOTOSSINTESE = 0.02;
export const EFICIENCIA_TROFICA = 0.10;
export const REDUCAO_QUEIMADA = 0.40;

/**
 * Busca todos os organismos que podem ser o próximo na cadeia
 * (ou seja, que se alimentam do organismo atual)
 */
export function buscarPredadoresPossiveis(organismoAtual, todosOrganismos) {
  return todosOrganismos.filter((org) =>
    org.alimentaSeDe.includes(organismoAtual.id)
  );
}

/**
 * Calcula a energia de cada organismo na cadeia alimentar
 * Aplica 2% de fotossíntese no produtor e 10% nos demais
 */
export function calcularEnergiaCadeia(cadeia, energiaSolar = ENERGIA_SOLAR, criseAtiva = false) {
  const energiaSolFinal = criseAtiva
    ? energiaSolar * REDUCAO_QUEIMADA
    : energiaSolar;

  let energiaAtual = energiaSolFinal * EFICIENCIA_FOTOSSINTESE;

  return cadeia.map((organismo, index) => {
    if (index === 0) {
      // Produtor recebe 2% da energia solar
      return {
        ...organismo,
        energiaRecebida: energiaAtual,
        energiaPerdida: energiaSolFinal - energiaAtual,
        porcentagemAproveitada: EFICIENCIA_FOTOSSINTESE * 100,
      };
    }

    const energiaAnterior = energiaAtual;
    energiaAtual = energiaAnterior * EFICIENCIA_TROFICA;

    return {
      ...organismo,
      energiaRecebida: energiaAtual,
      energiaPerdida: energiaAnterior - energiaAtual,
      porcentagemAproveitada: EFICIENCIA_TROFICA * 100,
    };
  });
}

/**
 * Verifica o status de sobrevivência de um organismo
 * com base na energia recebida e sua energia mínima
 */
export function verificarSobrevivencia(organismo) {
  if (organismo.energiaRecebida <= 0) {
    return "extinto";
  }
  if (organismo.energiaRecebida < organismo.energiaMinima) {
    return "ameaçado";
  }
  return "saudavel";
}

/**
 * Verifica se houve colapso trófico na cadeia
 * (predador de topo com energia insuficiente)
 */
export function verificarColapsoCadeia(cadeiaComEnergia) {
  if (cadeiaComEnergia.length === 0) return { colapso: false };

  const ultimoOrganismo = cadeiaComEnergia[cadeiaComEnergia.length - 1];
  const status = verificarSobrevivencia(ultimoOrganismo);

  if (status === "extinto" || status === "ameaçado") {
    return {
      colapso: true,
      organismo: ultimoOrganismo,
      status,
      mensagem:
        status === "extinto"
          ? `ALERTA: Colapso Trófico. ${ultimoOrganismo.nome} Extinto. A energia disponível não foi suficiente para manter o predador de topo. O ecossistema entrou em desequilíbrio.`
          : `ALERTA: ${ultimoOrganismo.nome} está ameaçado! A energia disponível (${ultimoOrganismo.energiaRecebida.toFixed(1)} unidades) está abaixo do mínimo necessário (${ultimoOrganismo.energiaMinima} unidades).`,
    };
  }

  return { colapso: false };
}

/**
 * Formata a energia para exibição
 */
export function formatarEnergia(valor) {
  if (valor >= 1000) {
    return valor.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  }
  if (valor >= 1) {
    return valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  }
  return valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

/**
 * Calcula a energia solar efetiva (considerando crise)
 */
export function getEnergiaSolarEfetiva(criseAtiva) {
  return criseAtiva ? ENERGIA_SOLAR * REDUCAO_QUEIMADA : ENERGIA_SOLAR;
}

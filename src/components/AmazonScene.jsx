import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Info, Plus, Sparkles, Waves } from "lucide-react";
import { verificarSobrevivencia } from "../utils/simulacao";
import "./AmazonScene.css";

export default function AmazonScene({
  cadeia,
  proximosOrganismos,
  criseAtiva,
  onOrganismoClick,
  onSelectOrganismo,
}) {
  const cadeiaIds = new Set(cadeia.map((org) => org.id));
  const opcoes = proximosOrganismos.filter((org) => !cadeiaIds.has(org.id));
  const ultimo = cadeia[cadeia.length - 1];

  const getStatusClasse = (organismo) => {
    if (organismo.energiaRecebida === undefined) return "available";
    return verificarSobrevivencia(organismo);
  };

  return (
    <section className={`amazon-scene ${criseAtiva ? "burn" : ""}`}>
      <div className="scene-sky">
        <motion.div
          className="scene-sun"
          animate={{ scale: criseAtiva ? 0.86 : [1, 1.06, 1] }}
          transition={{ repeat: criseAtiva ? 0 : Infinity, duration: 4 }}
        />
        <div className="scene-canopy back" />
        <div className="scene-canopy front" />
      </div>

      <div className="scene-depth layer-1" />
      <div className="scene-depth layer-2" />
      <div className="scene-energy-trail" />
      <div className="scene-river">
        <Waves size={18} />
        <span>Rio de energia</span>
      </div>

      <div className="scene-bank left" />
      <div className="scene-bank right" />

      <div className="scene-vines">
        <span />
        <span />
        <span />
      </div>

      <div className="scene-copy">
        <span className="scene-kicker">
          <Sparkles size={14} />
          Ecossistema amazônico interativo
        </span>
        <h2>Monte a cadeia dentro da floresta</h2>
        <p>
          Use os botões + para construir a cadeia aqui ou no painel abaixo. Os
          dois fluxos ficam sincronizados.
        </p>
      </div>

      <div className="scene-chain-builder">
        <div className="scene-chain-title">
          <Sparkles size={14} />
          <span>Cadeia no cenário</span>
        </div>

        <div className={`scene-chain-line ${cadeia.length === 0 ? "empty" : ""}`}>
          <AnimatePresence mode="popLayout">
            {cadeia.length === 0 && (
              <motion.div
                className="scene-chain-placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Escolha um produtor na lista da floresta.
              </motion.div>
            )}

            {cadeia.map((organismo, index) => {
              const status = getStatusClasse(organismo);
              return (
                <motion.div
                  key={organismo.id}
                  className="scene-chain-step"
                  initial={{ opacity: 0, scale: 0.8, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 180 }}
                >
                  {index > 0 && (
                    <div className="scene-chain-connector">
                      <ArrowRight size={16} />
                    </div>
                  )}
                  <button
                    type="button"
                    className={`scene-organism selected ${status}`}
                    style={{
                      "--organism-color":
                        organismo.corTema || "var(--accent-green)",
                    }}
                    onClick={() => onOrganismoClick?.(organismo)}
                    aria-label={`Ver detalhes de ${organismo.nome}`}
                  >
                    <span className="scene-organism-aura" />
                    <span className="scene-organism-emoji">
                      {organismo.emoji}
                    </span>
                    <span className="scene-organism-label">
                      {organismo.nome}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="scene-choice-panel">
        <div className="scene-choice-header">
          <div>
            <span className="scene-choice-kicker">
              {cadeia.length === 0 ? "Produtores disponíveis" : "Próximo nível"}
            </span>
            <h3>
              {cadeia.length === 0
                ? "Comece por um produtor"
                : `Quem se alimenta de ${ultimo.nome}?`}
            </h3>
          </div>
          <Info size={16} />
        </div>

        <div className="scene-choice-grid">
          <AnimatePresence mode="popLayout">
            {opcoes.map((organismo, index) => (
            <motion.button
              key={organismo.id}
              className="scene-choice-card"
              style={{
                "--organism-color": organismo.corTema || "var(--accent-green)",
              }}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.04, type: "spring", stiffness: 180 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onSelectOrganismo?.(organismo)}
              aria-label={`Adicionar ${organismo.nome} à cadeia`}
            >
              <span className="scene-choice-emoji">{organismo.emoji}</span>
              <span className="scene-choice-content">
                <strong>{organismo.nome}</strong>
                <small>{organismo.nivelTroficoLabel}</small>
              </span>
              <span className="scene-choice-add">
                <Plus size={16} />
              </span>
            </motion.button>
            ))}

            {opcoes.length === 0 && (
              <motion.div
                className="scene-choice-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Não há predadores cadastrados para este organismo. Finalize a
                cadeia ou remova o último nível.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {cadeia.length === 0 && (
        <div className="scene-empty-callout">
          A cadeia também pode ser criada diretamente por este cenário.
        </div>
      )}

      {criseAtiva && (
        <motion.div
          className="scene-fire-warning"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Flame size={16} />
          Queimada reduz luz, energia e estabilidade da cadeia.
        </motion.div>
      )}
    </section>
  );
}

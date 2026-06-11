import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Waves, Flame } from "lucide-react";
import { verificarSobrevivencia } from "../utils/simulacao";
import "./AmazonScene.css";

export default function AmazonScene({
  cadeia,
  proximosOrganismos,
  criseAtiva,
  onOrganismoClick,
}) {
  const cadeiaIds = new Set(cadeia.map((org) => org.id));
  const proximos = proximosOrganismos.filter((org) => !cadeiaIds.has(org.id));
  const organismosVisiveis = [...cadeia, ...proximos];

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
          Os organismos escolhidos brilham na cena. As próximas possibilidades
          aparecem como pontos vivos da rede alimentar.
        </p>
      </div>

      <AnimatePresence>
        {organismosVisiveis.map((organismo, index) => {
          const inChain = cadeiaIds.has(organismo.id);
          const status = getStatusClasse(organismo);
          const pos = organismo.posicaoCena || { x: 50, y: 50 };

          return (
            <motion.button
              key={organismo.id}
              className={`scene-organism ${inChain ? "selected" : ""} ${status}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                "--organism-color": organismo.corTema || "var(--accent-green)",
              }}
              type="button"
              initial={{ opacity: 0, scale: 0.5, y: 12 }}
              animate={{ opacity: 1, scale: inChain ? 1.08 : 0.92, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: index * 0.04, type: "spring", stiffness: 180 }}
              whileHover={{ scale: 1.16, y: -4 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onOrganismoClick?.(organismo)}
              aria-label={`Ver detalhes de ${organismo.nome}`}
            >
              <span className="scene-organism-aura" />
              <span className="scene-organism-emoji">{organismo.emoji}</span>
              <span className="scene-organism-label">{organismo.nome}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>

      {cadeia.length === 0 && (
        <div className="scene-empty-callout">
          Escolha um produtor para acender a primeira conexão da floresta.
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

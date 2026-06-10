import { motion } from "framer-motion";
import { verificarSobrevivencia, formatarEnergia } from "../utils/simulacao";
import EnergyBar from "./EnergyBar";
import "./OrganismCard.css";

export default function OrganismCard({
  organismo,
  index,
  isInChain = false,
  onClick,
  compact = false,
  criseAtiva = false,
}) {
  const status = organismo.energiaRecebida !== undefined
    ? verificarSobrevivencia(organismo)
    : "saudavel";

  const statusConfig = {
    saudavel: { label: "Saudável", color: "var(--accent-green)", icon: "✅" },
    "ameaçado": { label: "Ameaçado", color: "var(--accent-orange)", icon: "⚠️" },
    extinto: { label: "Extinto", color: "var(--accent-red)", icon: "💀" },
  };

  const currentStatus = statusConfig[status];

  const nivelTroficoColors = {
    produtor: "var(--accent-green)",
    consumidor_primario: "var(--accent-cyan)",
    consumidor_secundario: "var(--accent-purple)",
    consumidor_terciario: "var(--accent-orange)",
    predador_topo: "var(--accent-red)",
  };

  const nivelColor =
    nivelTroficoColors[organismo.nivelTrofico?.[0]] || "var(--accent-green)";

  if (compact) {
    return (
      <motion.div
        className={`organism-card compact ${status} ${criseAtiva ? "burn" : ""}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{ "--nivel-color": nivelColor }}
      >
        <div className="organism-emoji-compact">{organismo.emoji}</div>
        <span className="organism-name-compact">{organismo.nome}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`organism-card ${status} ${criseAtiva ? "burn" : ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
      }}
      layout
      style={{ "--nivel-color": nivelColor }}
    >
      <div className="organism-header">
        <div className="organism-emoji-wrapper">
          <span className="organism-emoji">{organismo.emoji}</span>
          {status === "ameaçado" && (
            <motion.div
              className="status-pulse warning"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
          {status === "extinto" && (
            <div className="status-overlay-dead">💀</div>
          )}
        </div>
        <div className="organism-info">
          <h3 className="organism-name">{organismo.nome}</h3>
          <span className="organism-nivel" style={{ color: nivelColor }}>
            {organismo.nivelTroficoLabel}
          </span>
        </div>
        <div
          className="status-badge"
          style={{ backgroundColor: currentStatus.color }}
        >
          <span>{currentStatus.icon}</span>
          <span className="status-text">{currentStatus.label}</span>
        </div>
      </div>

      {organismo.energiaRecebida !== undefined && (
        <div className="organism-energy">
          <div className="energy-stats">
            <div className="energy-stat">
              <span className="energy-label">Energia recebida</span>
              <span className="energy-value received">
                {formatarEnergia(organismo.energiaRecebida)} un.
              </span>
            </div>
            <div className="energy-stat">
              <span className="energy-label">Energia perdida</span>
              <span className="energy-value lost">
                {formatarEnergia(organismo.energiaPerdida)} un.
              </span>
            </div>
            <div className="energy-stat">
              <span className="energy-label">Aproveitada</span>
              <span className="energy-value percent">
                {organismo.porcentagemAproveitada}%
              </span>
            </div>
          </div>
          <EnergyBar
            valor={organismo.energiaRecebida}
            maximo={organismo.tipo === "produtor" ? 2000 : organismo.energiaRecebida * 5}
            status={status}
            height={6}
          />
        </div>
      )}

      <p className="organism-descricao">{organismo.descricao}</p>

      {organismo.curiosidade && (
        <div className="organism-curiosidade">
          <span className="curiosidade-icon">💡</span>
          <span>{organismo.curiosidade}</span>
        </div>
      )}
    </motion.div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import "./OrganismSelector.css";

export default function OrganismSelector({
  organismos,
  onSelect,
  titulo,
  subtitulo,
  criseAtiva = false,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!organismos || organismos.length === 0) {
    return (
      <motion.div
        className="selector-container empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="selector-empty">
          <span className="empty-icon">🔍</span>
          <p>Nenhum organismo disponível para este nível.</p>
          <p className="empty-hint">
            Esse organismo não possui predadores cadastrados. Finalize a cadeia!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`selector-container ${criseAtiva ? "burn" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="selector-header">
        <div className="selector-title-group">
          <Search size={18} className="selector-icon" />
          <h3 className="selector-title">{titulo}</h3>
        </div>
        {subtitulo && <p className="selector-subtitle">{subtitulo}</p>}
      </div>

      <div className="selector-grid">
        <AnimatePresence mode="popLayout">
          {organismos.map((org, i) => (
            <motion.button
              key={org.id}
              className={`selector-card ${hoveredId === org.id ? "hovered" : ""}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                delay: i * 0.06,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(org)}
              onMouseEnter={() => setHoveredId(org.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="selector-card-emoji">
                <span>{org.emoji}</span>
              </div>
              <div className="selector-card-info">
                <span className="selector-card-name">{org.nome}</span>
                <span className="selector-card-nivel">
                  {org.nivelTroficoLabel}
                </span>
              </div>
              <div className="selector-card-desc">{org.descricao}</div>
              <div className="selector-card-tags">
                {org.habitat && <span>{org.habitat}</span>}
                {org.papelEcologico && <span>{org.papelEcologico}</span>}
              </div>
              <div className="selector-card-action">
                <span>Selecionar</span>
                <span className="arrow">→</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

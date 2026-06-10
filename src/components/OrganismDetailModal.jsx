import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowDown, ArrowUp } from "lucide-react";
import "./OrganismDetailModal.css";

export default function OrganismDetailModal({ organismo, allOrganismos, onClose }) {
  if (!organismo) return null;

  // Encontrar presas (quem ele come)
  const presas = organismo.alimentaSeDe
    .map((id) => allOrganismos.find((o) => o.id === id))
    .filter(Boolean);

  // Encontrar predadores (quem come ele)
  const predadores = organismo.predadores
    .map((id) => allOrganismos.find((o) => o.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        className="detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="detail-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="detail-close" onClick={onClose}>
            <X size={18} />
          </button>

          {/* Header */}
          <div className="detail-header">
            <span className="detail-emoji">{organismo.emoji}</span>
            <div>
              <h2 className="detail-name">{organismo.nome}</h2>
              <span className="detail-nivel">{organismo.nivelTroficoLabel}</span>
            </div>
          </div>

          <p className="detail-desc">{organismo.descricao}</p>

          {organismo.curiosidade && (
            <div className="detail-curiosidade">
              <span>💡</span>
              <span>{organismo.curiosidade}</span>
            </div>
          )}

          {/* Rede alimentar */}
          <div className="detail-network">
            {/* Presas */}
            {presas.length > 0 && (
              <div className="network-section">
                <div className="network-label">
                  <ArrowDown size={14} />
                  <span>Se alimenta de</span>
                </div>
                <div className="network-items">
                  {presas.map((p) => (
                    <div key={p.id} className="network-item">
                      <span className="network-item-emoji">{p.emoji}</span>
                      <span className="network-item-name">{p.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visualização centralizada */}
            <div className="network-center">
              <span className="network-center-emoji">{organismo.emoji}</span>
              <span className="network-center-name">{organismo.nome}</span>
            </div>

            {/* Predadores */}
            {predadores.length > 0 && (
              <div className="network-section">
                <div className="network-label">
                  <ArrowUp size={14} />
                  <span>É predado por</span>
                </div>
                <div className="network-items">
                  {predadores.map((p) => (
                    <div key={p.id} className="network-item">
                      <span className="network-item-emoji">{p.emoji}</span>
                      <span className="network-item-name">{p.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {predadores.length === 0 && (
              <div className="network-badge-topo">
                🏆 Predador de Topo — sem predadores naturais
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

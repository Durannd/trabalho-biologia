import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import "./CollapseAlert.css";

export default function CollapseAlert({ collapseInfo, onClose }) {
  if (!collapseInfo || !collapseInfo.colapso) return null;

  const isExtinto = collapseInfo.status === "extinto";

  return (
    <AnimatePresence>
      <motion.div
        className="collapse-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`collapse-modal ${isExtinto ? "extinto" : "ameaçado"}`}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="collapse-close" onClick={onClose} aria-label="Fechar alerta">
            <X size={18} />
          </button>

          <motion.div
            className="collapse-icon"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {isExtinto ? "💀" : "⚠️"}
          </motion.div>

          <h2 className="collapse-title">
            {isExtinto ? "Colapso Trófico" : "Ecossistema em Risco"}
          </h2>

          <p className="collapse-message">{collapseInfo.mensagem}</p>

          {collapseInfo.organismo && (
            <div className="collapse-organism">
              <span className="collapse-organism-emoji">
                {collapseInfo.organismo.emoji}
              </span>
              <div className="collapse-organism-info">
                <strong>{collapseInfo.organismo.nome}</strong>
                <span>
                  Energia recebida:{" "}
                  {collapseInfo.organismo.energiaRecebida?.toFixed(2)} un.
                </span>
                <span>
                  Energia mínima: {collapseInfo.organismo.energiaMinima} un.
                </span>
              </div>
            </div>
          )}

          <div className="collapse-explanation">
            <AlertTriangle size={14} />
            <p>
              {isExtinto
                ? "Quando a energia no topo da cadeia não é suficiente para a sobrevivência do predador, o ecossistema entra em desequilíbrio. Sem o predador de topo, as populações de presas podem crescer descontroladamente."
                : "O organismo está recebendo menos energia do que precisa para sobreviver. Se a situação piorar, ele pode ser extinto."}
            </p>
          </div>

          <motion.button
            className="collapse-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entendi
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

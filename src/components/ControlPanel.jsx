import { motion } from "framer-motion";
import {
  Flame,
  TreePine,
  RotateCcw,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import "./ControlPanel.css";

export default function ControlPanel({
  cadeia,
  criseAtiva,
  temProximosOrganismos,
  onAtivarQueimada,
  onRestaurarAmbiente,
  onRecomecar,
  onRemoverUltimo,
  onFinalizar,
  fase,
}) {
  const podeRemover = cadeia.length > 0;
  const podeFinalizar = cadeia.length >= 2;

  return (
    <motion.div
      className={`control-panel ${criseAtiva ? "burn" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="control-title">🎮 Controles</h3>

      <div className="control-buttons">
        {/* Ações da cadeia */}
        <div className="control-group">
          <span className="control-group-label">Cadeia Alimentar</span>

          {podeRemover && (
            <motion.button
              className="control-btn secondary"
              onClick={onRemoverUltimo}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 size={16} />
              <span>Remover Último</span>
            </motion.button>
          )}

          <motion.button
            className="control-btn secondary"
            onClick={onRecomecar}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw size={16} />
            <span>Recomeçar</span>
          </motion.button>

          {podeFinalizar && fase !== "resultado" && (
            <motion.button
              className="control-btn primary"
              onClick={onFinalizar}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Check size={16} />
              <span>Finalizar Cadeia</span>
            </motion.button>
          )}
        </div>

        {/* Eventos ambientais */}
        <div className="control-group">
          <span className="control-group-label">Eventos Ambientais</span>

          {!criseAtiva ? (
            <motion.button
              className="control-btn danger"
              onClick={onAtivarQueimada}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={cadeia.length === 0}
            >
              <Flame size={16} />
              <span>🔥 Ativar Queimada</span>
            </motion.button>
          ) : (
            <motion.button
              className="control-btn restore"
              onClick={onRestaurarAmbiente}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TreePine size={16} />
              <span>🌿 Restaurar Ambiente</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

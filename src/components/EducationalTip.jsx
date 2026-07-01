import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { getMensagemAleatoria, getMensagemPorContexto } from "../data/mensagens";
import "./EducationalTip.css";

export default function EducationalTip({ contexto, trigger }) {
  const [dismissedTrigger, setDismissedTrigger] = useState(null);

  const mensagem = useMemo(() => {
    let msg;
    if (contexto) {
      msg = getMensagemPorContexto(contexto, trigger);
    }
    if (!msg) {
      msg = getMensagemAleatoria(trigger);
    }
    return msg;
  }, [contexto, trigger]);

  const visible = dismissedTrigger !== trigger;

  if (!mensagem) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="tip-container"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <span className="tip-icon">{mensagem.icone}</span>
          <p className="tip-text">{mensagem.texto}</p>
          <button
            className="tip-close"
            onClick={() => setDismissedTrigger(trigger)}
            aria-label="Fechar dica"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

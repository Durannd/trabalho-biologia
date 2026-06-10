import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getMensagemAleatoria, getMensagemPorContexto } from "../data/mensagens";
import "./EducationalTip.css";

export default function EducationalTip({ contexto, trigger }) {
  const [mensagem, setMensagem] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let msg;
    if (contexto) {
      msg = getMensagemPorContexto(contexto);
    }
    if (!msg) {
      msg = getMensagemAleatoria();
    }
    setMensagem(msg);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [contexto, trigger]);

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
            onClick={() => setVisible(false)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

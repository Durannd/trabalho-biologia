import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "./BurnOverlay.css";

export default function BurnOverlay({ active }) {
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    if (active) {
      const newEmbers = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 4,
      }));
      setEmbers(newEmbers);
    } else {
      setEmbers([]);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="burn-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Gradiente de fumaça */}
          <div className="smoke-layer" />

          {/* Partículas de brasa */}
          {embers.map((ember) => (
            <div
              key={ember.id}
              className="ember"
              style={{
                left: `${ember.x}%`,
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                animationDelay: `${ember.delay}s`,
                animationDuration: `${ember.duration}s`,
              }}
            />
          ))}

          {/* Mensagem de alerta */}
          <motion.div
            className="burn-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="burn-message-icon">🔥</span>
            <div className="burn-message-text">
              <strong>Queimada Ativa</strong>
              <p>
                A fumaça bloqueou 60% da luz solar. Com menos energia chegando ao
                produtor, toda a cadeia alimentar foi afetada.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

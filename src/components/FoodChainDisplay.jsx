import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sun, Zap } from "lucide-react";
import OrganismCard from "./OrganismCard";
import { formatarEnergia, getEnergiaSolarEfetiva } from "../utils/simulacao";
import "./FoodChainDisplay.css";

export default function FoodChainDisplay({
  cadeia,
  criseAtiva,
  onOrganismoClick,
}) {
  const energiaSolar = getEnergiaSolarEfetiva(criseAtiva);

  return (
    <div className={`chain-display ${criseAtiva ? "burn" : ""}`}>
      <div className="chain-title-bar">
        <h2 className="chain-title">🔗 Cadeia Alimentar Construída</h2>
        {cadeia.length > 0 && (
          <span className="chain-count">{cadeia.length + 1} níveis</span>
        )}
      </div>

      <div className="chain-flow">
        {/* Sol - sempre presente */}
        <motion.div
          className={`chain-node sun-node ${criseAtiva ? "dimmed" : ""}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="sun-visual">
            <Sun size={32} className="sun-icon" />
            <motion.div
              className="sun-rays"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </div>
          <span className="chain-node-name">Sol</span>
          <span className="chain-node-energy">
            {formatarEnergia(energiaSolar)} un.
          </span>
          {criseAtiva && (
            <motion.span
              className="chain-reduction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              -60% ☁️
            </motion.span>
          )}
        </motion.div>

        {/* Setas e organismos */}
        <AnimatePresence mode="popLayout">
          {cadeia.map((org, index) => (
            <motion.div
              key={org.id}
              className="chain-segment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              layout
            >
              {/* Seta de conexão */}
              <div className="chain-arrow">
                <div className="arrow-line">
                  <motion.div
                    className="arrow-energy-flow"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  />
                </div>
                <ArrowRight size={16} className="arrow-icon" />
                <div className="arrow-energy-label">
                  <Zap size={10} />
                  <span>
                    {index === 0
                      ? `${formatarEnergia(org.energiaRecebida)} un.`
                      : `${formatarEnergia(org.energiaRecebida)} un.`}
                  </span>
                </div>
                <div className="arrow-loss">
                  -{index === 0 ? "98%" : "90%"}
                </div>
              </div>

              {/* Card do organismo */}
              <motion.div
                className="chain-organism-wrapper"
                onClick={() => onOrganismoClick && onOrganismoClick(org)}
                whileHover={{ scale: 1.02 }}
                style={{ cursor: onOrganismoClick ? "pointer" : "default" }}
              >
                <OrganismCard
                  organismo={org}
                  index={index}
                  isInChain
                  criseAtiva={criseAtiva}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {cadeia.length === 0 && (
        <motion.div
          className="chain-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="chain-empty-icon">🌿</span>
          <p>Escolha um produtor para começar a construir sua cadeia alimentar!</p>
        </motion.div>
      )}
    </div>
  );
}

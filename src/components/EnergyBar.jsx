import { motion } from "framer-motion";
import "./EnergyBar.css";

export default function EnergyBar({
  valor,
  maximo,
  status = "saudavel",
  showLabel = true,
  height = 8,
  animated = true,
}) {
  const porcentagem = Math.min((valor / maximo) * 100, 100);

  const getBarColor = () => {
    if (status === "extinto") return "var(--accent-red)";
    if (status === "ameaçado") return "var(--accent-orange)";
    if (porcentagem > 60) return "var(--accent-green)";
    if (porcentagem > 30) return "var(--accent-gold)";
    return "var(--accent-orange)";
  };

  const BarComponent = animated ? motion.div : "div";
  const barProps = animated
    ? {
        initial: { width: 0 },
        animate: { width: `${porcentagem}%` },
        transition: { duration: 0.8, ease: "easeOut" },
      }
    : { style: { width: `${porcentagem}%` } };

  return (
    <div className="energy-bar-container">
      <div className="energy-bar-track" style={{ height: `${height}px` }}>
        <BarComponent
          className={`energy-bar-fill ${status}`}
          style={{ backgroundColor: getBarColor() }}
          {...barProps}
        />
        {animated && porcentagem > 10 && (
          <div className="energy-bar-shimmer" />
        )}
      </div>
      {showLabel && (
        <span className="energy-bar-label">
          {valor >= 1 ? Math.round(valor) : valor.toFixed(2)}
        </span>
      )}
    </div>
  );
}

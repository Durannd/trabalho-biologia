import { motion } from "framer-motion";
import { Leaf, ArrowRight, Sun, Zap, Flame } from "lucide-react";
import "./IntroScreen.css";

export default function IntroScreen({ onStart }) {
  const features = [
    {
      icon: "🌳",
      title: "Escolha Produtores",
      desc: "Comece selecionando uma planta amazônica que recebe energia do Sol",
    },
    {
      icon: "🐾",
      title: "Monte a Cadeia",
      desc: "Adicione consumidores compatíveis e veja a energia fluir entre os níveis",
    },
    {
      icon: "⚡",
      title: "Lei dos 10%",
      desc: "Observe como apenas 10% da energia passa para o próximo nível trófico",
    },
    {
      icon: "🔥",
      title: "Simule Crises",
      desc: "Ative queimadas e observe o impacto em toda a cadeia alimentar",
    },
  ];

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorativo */}
      <div className="intro-bg">
        <div className="intro-bg-glow glow-1" />
        <div className="intro-bg-glow glow-2" />
        <div className="intro-bg-glow glow-3" />
      </div>

      <div className="intro-content">
        {/* Header */}
        <motion.div
          className="intro-header"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="intro-badge">
            <Leaf size={14} />
            <span>Biologia — Ecologia</span>
          </div>

          <h1 className="intro-title">
            <span className="title-line">Simulador de</span>
            <span className="title-highlight">Fluxo de Energia</span>
            <span className="title-line">na Amazônia</span>
          </h1>

          <p className="intro-description">
            Construa cadeias alimentares amazônicas, observe a transferência de
            energia entre os seres vivos e entenda como eventos ambientais podem
            causar desequilíbrios no ecossistema.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="intro-features"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="intro-feature"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Conceitos chave */}
        <motion.div
          className="intro-concepts"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="concept">
            <Sun size={18} className="concept-icon sun" />
            <div>
              <strong>Energia Solar: 100.000 unidades</strong>
              <span>Fonte inicial de toda energia do ecossistema</span>
            </div>
          </div>
          <div className="concept">
            <Zap size={18} className="concept-icon energy" />
            <div>
              <strong>Eficiência da Clorofila: 2%</strong>
              <span>Apenas 2% da energia solar é armazenada pela fotossíntese</span>
            </div>
          </div>
          <div className="concept">
            <Flame size={18} className="concept-icon fire" />
            <div>
              <strong>Lei dos 10%</strong>
              <span>Apenas 10% da energia passa para o próximo nível trófico</span>
            </div>
          </div>
        </motion.div>

        {/* Botão de início */}
        <motion.button
          className="intro-start-btn"
          onClick={onStart}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Iniciar Simulação</span>
          <ArrowRight size={20} />
        </motion.button>

        <motion.p
          className="intro-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🌿 Bioma: Amazônia • Simulador Interativo de Ecologia
        </motion.p>
      </div>
    </motion.div>
  );
}

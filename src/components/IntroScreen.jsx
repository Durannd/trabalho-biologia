import { motion } from "framer-motion";
import {
  Leaf,
  ArrowRight,
  Sun,
  Zap,
  Flame,
  Sprout,
  GitBranch,
  Microscope,
  Sparkles,
} from "lucide-react";
import "./IntroScreen.css";

export default function IntroScreen({ onStart }) {
  const features = [
    {
      icon: Sprout,
      number: "01",
      title: "Escolha Produtores",
      desc: "Comece selecionando uma planta amazônica que recebe energia do Sol",
    },
    {
      icon: GitBranch,
      number: "02",
      title: "Monte a Cadeia",
      desc: "Adicione consumidores compatíveis e veja a energia fluir entre os níveis",
    },
    {
      icon: Zap,
      number: "03",
      title: "Lei dos 10%",
      desc: "Observe como apenas 10% da energia passa para o próximo nível trófico",
    },
    {
      icon: Flame,
      number: "04",
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
      <div className="intro-bg">
        <div className="intro-aurora" />
        <div className="intro-grain" />
        <div className="intro-leaf intro-leaf-one" />
        <div className="intro-leaf intro-leaf-two" />
      </div>

      <div className="intro-content">
        <motion.nav
          className="intro-nav"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="intro-brand">
            <span className="intro-brand-mark">
              <Leaf size={18} strokeWidth={1.8} />
            </span>
            <div>
              <strong>Amazônia viva</strong>
              <span>Simulador ecológico</span>
            </div>
          </div>
          <div className="intro-subject">
            <Microscope size={14} />
            Biologia · Ecologia
          </div>
        </motion.nav>

        <div className="intro-hero">
          <motion.div
            className="intro-header"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            <div className="intro-badge">
              <Sparkles size={13} />
              <span>Uma experiência interativa</span>
            </div>

            <h1 className="intro-title">
              Entenda como a
              <span className="title-highlight">energia mantém</span>
              a floresta viva.
            </h1>

            <p className="intro-description">
              Construa cadeias alimentares amazônicas, acompanhe cada
              transferência de energia e descubra como uma mudança ambiental
              reverbera por todo o ecossistema.
            </p>

            <div className="intro-actions">
              <motion.button
                className="intro-start-btn"
                onClick={onStart}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explorar ecossistema</span>
                <span className="intro-start-icon">
                  <ArrowRight size={18} />
                </span>
              </motion.button>
              <span className="intro-action-note">
                <span className="intro-live-dot" />
                Simulação livre, sem respostas erradas
              </span>
            </div>
          </motion.div>

          <motion.div
            className="intro-ecosystem"
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            aria-label="Representação do fluxo de energia na cadeia alimentar"
          >
            <div className="ecosystem-topline">
              <span>Fluxo em tempo real</span>
              <span className="ecosystem-status-dot">Ecossistema estável</span>
            </div>
            <div className="ecosystem-sun">
              <Sun size={22} />
              <span>100.000 un.</span>
            </div>
            <div className="ecosystem-path path-one" />
            <div className="ecosystem-path path-two" />
            <div className="ecosystem-path path-three" />
            <motion.div
              className="ecosystem-node ecosystem-tree"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="ecosystem-emoji">🌳</span>
              <div><strong>Produtor</strong><small>2.000 un.</small></div>
            </motion.div>
            <motion.div
              className="ecosystem-node ecosystem-herbivore"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="ecosystem-emoji">🐒</span>
              <div><strong>Consumidor</strong><small>200 un.</small></div>
            </motion.div>
            <motion.div
              className="ecosystem-node ecosystem-predator"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="ecosystem-emoji">🐆</span>
              <div><strong>Predador</strong><small>20 un.</small></div>
            </motion.div>
            <div className="ecosystem-loss loss-one">−98%</div>
            <div className="ecosystem-loss loss-two">−90%</div>
            <div className="ecosystem-ground" />
            <div className="ecosystem-canopy canopy-one" />
            <div className="ecosystem-canopy canopy-two" />
            <div className="ecosystem-caption">
              <Zap size={14} />
              A energia diminui a cada nível trófico
            </div>
          </motion.div>
        </div>

        <motion.section
          className="intro-features"
          aria-label="Etapas da simulação"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
            <motion.div
              key={feature.number}
              className="intro-feature"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
            >
              <span className="feature-number">{feature.number}</span>
              <span className="feature-icon"><Icon size={18} /></span>
              <div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </motion.div>
            );
          })}
        </motion.section>

        <motion.div
          className="intro-concepts"
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

        <motion.p
          className="intro-footer"
        >
          Bioma Amazônia <span /> Fluxo de energia <span /> Ecologia interativa
        </motion.p>
      </div>
    </motion.div>
  );
}

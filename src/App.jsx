import { useState, useCallback, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Leaf } from "lucide-react";
import { organismos, getProdutores } from "./data/organismos";
import {
  calcularEnergiaCadeia,
  buscarPredadoresPossiveis,
  verificarColapsoCadeia,
  ENERGIA_SOLAR,
} from "./utils/simulacao";

import IntroScreen from "./components/IntroScreen";
import OrganismSelector from "./components/OrganismSelector";
import FoodChainDisplay from "./components/FoodChainDisplay";
import EnergyPanel from "./components/EnergyPanel";
import ControlPanel from "./components/ControlPanel";
import BurnOverlay from "./components/BurnOverlay";
import CollapseAlert from "./components/CollapseAlert";
import EducationalTip from "./components/EducationalTip";
import OrganismDetailModal from "./components/OrganismDetailModal";
import AmazonScene from "./components/AmazonScene";

import "./App.css";

export default function App() {
  // Estado principal
  const [fase, setFase] = useState("intro"); // "intro" | "montagem" | "resultado"
  const [cadeia, setCadeia] = useState([]); // organismos selecionados (raw)
  const [criseAtiva, setCriseAtiva] = useState(false);
  const [showCollapseAlert, setShowCollapseAlert] = useState(false);
  const [selectedOrganism, setSelectedOrganism] = useState(null);
  const [tipTrigger, setTipTrigger] = useState(0);
  const [tipContexto, setTipContexto] = useState(null);

  // Cadeia com energia calculada
  const cadeiaComEnergia = useMemo(() => {
    if (cadeia.length === 0) return [];
    return calcularEnergiaCadeia(cadeia, ENERGIA_SOLAR, criseAtiva);
  }, [cadeia, criseAtiva]);

  const collapseInfo = useMemo(() => {
    if (cadeiaComEnergia.length < 2) return null;
    return verificarColapsoCadeia(cadeiaComEnergia);
  }, [cadeiaComEnergia]);

  // Próximos organismos possíveis
  const proximosOrganismos = useMemo(() => {
    if (cadeia.length === 0) return getProdutores();
    const ultimo = cadeia[cadeia.length - 1];
    return buscarPredadoresPossiveis(ultimo, organismos);
  }, [cadeia]);

  // Toggle burn mode no body
  useEffect(() => {
    if (criseAtiva) {
      document.body.classList.add("burn-mode");
    } else {
      document.body.classList.remove("burn-mode");
    }
    return () => document.body.classList.remove("burn-mode");
  }, [criseAtiva]);

  // === Handlers ===

  const handleStart = useCallback(() => {
    setFase("montagem");
  }, []);

  const handleSelectOrganismo = useCallback((org) => {
    setCadeia((prev) => [...prev, org]);

    // Dica educativa
    if (org.tipo === "produtor") {
      setTipContexto("produtor");
    } else if (org.tipo === "predador_topo") {
      setTipContexto("predador_topo");
    } else {
      setTipContexto("consumidor");
    }
    setTipTrigger((t) => t + 1);
  }, []);

  const handleRemoverUltimo = useCallback(() => {
    setCadeia((prev) => prev.slice(0, -1));
    setShowCollapseAlert(false);
  }, []);

  const handleRecomecar = useCallback(() => {
    setCadeia([]);
    setCriseAtiva(false);
    setShowCollapseAlert(false);
    setFase("montagem");
    setTipContexto(null);
  }, []);

  const handleFinalizar = useCallback(() => {
    setFase("resultado");
    // Verificar colapso
    const resultado = verificarColapsoCadeia(
      calcularEnergiaCadeia(cadeia, ENERGIA_SOLAR, criseAtiva)
    );
    if (resultado.colapso) {
      setShowCollapseAlert(true);
    } else {
      setShowCollapseAlert(false);
    }
  }, [cadeia, criseAtiva]);

  const handleAtivarQueimada = useCallback(() => {
    setCriseAtiva(true);
    const resultado = verificarColapsoCadeia(
      calcularEnergiaCadeia(cadeia, ENERGIA_SOLAR, true)
    );
    if (resultado.colapso) {
      setShowCollapseAlert(true);
    }
    setTipContexto("queimada");
    setTipTrigger((t) => t + 1);
  }, [cadeia]);

  const handleRestaurarAmbiente = useCallback(() => {
    setCriseAtiva(false);
    setShowCollapseAlert(false);
  }, []);

  const handleOrganismoClick = useCallback((org) => {
    setSelectedOrganism(org);
  }, []);

  // === Determinar título e subtítulo do selector ===
  const getSelectorInfo = () => {
    if (cadeia.length === 0) {
      return {
        titulo: "Escolha um produtor",
        subtitulo:
          "Toda cadeia alimentar começa com um organismo que realiza fotossíntese.",
      };
    }
    const ultimo = cadeia[cadeia.length - 1];
    return {
      titulo: `Quem se alimenta de ${ultimo.nome}?`,
      subtitulo: `Escolha o próximo organismo da cadeia alimentar.`,
    };
  };

  // === Render ===

  if (fase === "intro") {
    return (
      <AnimatePresence mode="wait">
        <IntroScreen onStart={handleStart} />
      </AnimatePresence>
    );
  }

  const selectorInfo = getSelectorInfo();

  return (
    <div className={`app ${criseAtiva ? "burn-active" : ""}`}>
      <BurnOverlay active={criseAtiva} />

      {/* Header */}
      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-left">
          <span className="header-brand-mark" aria-hidden="true">
            <Leaf size={19} strokeWidth={1.8} />
          </span>
          <div className="header-brand-copy">
            <span className="header-eyebrow">Laboratório de ecologia</span>
            <h1 className="header-title">Amazônia viva</h1>
          </div>
        </div>
        <div className="header-right">
          <div className="header-progress" aria-label={`${cadeia.length} organismos adicionados`}>
            <Activity size={14} />
            <span>{cadeia.length === 0 ? "Pronto para começar" : `${cadeia.length} organismos`}</span>
            <div className="header-progress-dots" aria-hidden="true">
              {[0, 1, 2, 3].map((step) => (
                <span key={step} className={cadeia.length > step ? "active" : ""} />
              ))}
            </div>
          </div>
          {criseAtiva && (
            <motion.span
              className="header-crisis-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              🔥 Queimada Ativa
            </motion.span>
          )}
          {collapseInfo?.colapso && (
            <motion.span
              className="header-collapse-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              ⚠️ Colapso
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* Main layout */}
      <div className="app-layout">
        {/* Coluna principal */}
        <main className="main-column">
          {/* Educational tip */}
          <EducationalTip contexto={tipContexto} trigger={tipTrigger} />

          <AmazonScene
            cadeia={cadeiaComEnergia}
            proximosOrganismos={proximosOrganismos}
            criseAtiva={criseAtiva}
            onOrganismoClick={handleOrganismoClick}
            onSelectOrganismo={handleSelectOrganismo}
          />

          {/* Cadeia construída */}
          <FoodChainDisplay
            cadeia={cadeiaComEnergia}
            criseAtiva={criseAtiva}
            onOrganismoClick={handleOrganismoClick}
          />

          {/* Seletor de organismos */}
          {fase === "montagem" && (
            <OrganismSelector
              organismos={proximosOrganismos}
              onSelect={handleSelectOrganismo}
              titulo={selectorInfo.titulo}
              subtitulo={selectorInfo.subtitulo}
              criseAtiva={criseAtiva}
            />
          )}

          {/* Status do ecossistema no resultado */}
          {fase === "resultado" && cadeiaComEnergia.length > 0 && (
            <motion.div
              className={`ecosystem-status ${collapseInfo?.colapso ? "danger" : "stable"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="status-icon">
                {collapseInfo?.colapso ? "⚠️" : "✅"}
              </span>
              <div>
                <h3>
                  {collapseInfo?.colapso
                    ? "Ecossistema em Desequilíbrio"
                    : "Ecossistema Estável"}
                </h3>
                <p>
                  {collapseInfo?.colapso
                    ? collapseInfo.mensagem
                    : "A energia disponível ainda é suficiente para manter os organismos escolhidos."}
                </p>
              </div>
            </motion.div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Painel de energia */}
          {cadeiaComEnergia.length > 0 && (
            <EnergyPanel cadeia={cadeiaComEnergia} criseAtiva={criseAtiva} />
          )}

          {/* Controles */}
          <ControlPanel
            cadeia={cadeia}
            criseAtiva={criseAtiva}
            temProximosOrganismos={proximosOrganismos.length > 0}
            onAtivarQueimada={handleAtivarQueimada}
            onRestaurarAmbiente={handleRestaurarAmbiente}
            onRecomecar={handleRecomecar}
            onRemoverUltimo={handleRemoverUltimo}
            onFinalizar={handleFinalizar}
            fase={fase}
          />
        </aside>
      </div>

      {/* Modals */}
      {showCollapseAlert && (
        <CollapseAlert
          collapseInfo={collapseInfo}
          onClose={() => setShowCollapseAlert(false)}
        />
      )}

      {selectedOrganism && (
        <OrganismDetailModal
          organismo={selectedOrganism}
          allOrganismos={organismos}
          onClose={() => setSelectedOrganism(null)}
        />
      )}
    </div>
  );
}

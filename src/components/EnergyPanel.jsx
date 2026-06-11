import { motion } from "framer-motion";
import { Sun, Zap, TrendingDown, AlertTriangle } from "lucide-react";
import {
  formatarEnergia,
  getEnergiaSolarEfetiva,
  verificarSobrevivencia,
} from "../utils/simulacao";
import EnergyBar from "./EnergyBar";
import "./EnergyPanel.css";

export default function EnergyPanel({ cadeia, criseAtiva }) {
  const energiaSolar = getEnergiaSolarEfetiva(criseAtiva);
  const energiaProdutor = energiaSolar * 0.02;

  const totalPerdido = cadeia.reduce(
    (acc, org) => acc + (org.energiaPerdida || 0),
    0
  );

  const energiaFinal =
    cadeia.length > 0
      ? cadeia[cadeia.length - 1].energiaRecebida
      : energiaProdutor;

  const eficienciaTotal =
    cadeia.length > 0
      ? ((energiaFinal / energiaSolar) * 100)
      : 0;

  return (
    <motion.div
      className={`energy-panel ${criseAtiva ? "burn" : ""}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="panel-title">
        <Zap size={18} className="panel-icon" />
        Painel de Energia
      </h3>

      {/* Energia Solar */}
      <div className="panel-section">
        <div className="panel-row">
          <div className="panel-row-label">
            <Sun size={14} />
            <span>Energia Solar</span>
          </div>
          <span className="panel-row-value gold">
            {formatarEnergia(energiaSolar)}
          </span>
        </div>
        {criseAtiva && (
          <motion.div
            className="panel-alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <AlertTriangle size={12} />
            <span>Queimada ativa: -60% energia solar</span>
          </motion.div>
        )}
      </div>

      {/* Energia por nível */}
      <div className="panel-section">
        <span className="panel-section-title">Energia por Nível</span>

        <div className="panel-levels">
          {/* Produtor level */}
          {cadeia.length > 0 && (
            <div className="panel-level">
              <div className="level-header">
                <span className="level-emoji">{cadeia[0].emoji}</span>
                <span className="level-name">{cadeia[0].nome}</span>
                <span className={`level-value ${verificarSobrevivencia(cadeia[0])}`}>
                  {formatarEnergia(cadeia[0].energiaRecebida)}
                </span>
              </div>
              <EnergyBar
                valor={cadeia[0].energiaRecebida}
                maximo={energiaProdutor}
                status={verificarSobrevivencia(cadeia[0])}
                height={4}
                showLabel={false}
              />
              <span className="level-transfer">
                <TrendingDown size={10} />
                {cadeia[0].porcentagemAproveitada}% da energia solar
              </span>
            </div>
          )}

          {/* Consumidores */}
          {cadeia.slice(1).map((org, i) => {
            const status = verificarSobrevivencia(org);
            return (
              <motion.div
                key={org.id}
                className="panel-level"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="level-header">
                  <span className="level-emoji">{org.emoji}</span>
                  <span className="level-name">{org.nome}</span>
                  <span className={`level-value ${status}`}>
                    {formatarEnergia(org.energiaRecebida)}
                  </span>
                </div>
                <EnergyBar
                  valor={org.energiaRecebida}
                  maximo={cadeia[i].energiaRecebida}
                  status={status}
                  height={4}
                  showLabel={false}
                />
                <span className="level-transfer">
                  <TrendingDown size={10} />
                  10% do nível anterior
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Resumo */}
      {cadeia.length > 0 && (
        <div className="panel-section summary">
          <div className="summary-row">
            <span>Total energia perdida</span>
            <span className="summary-value red">
              {formatarEnergia(totalPerdido)} un.
            </span>
          </div>
          <div className="summary-row">
            <span>Energia no final da cadeia</span>
            <span className="summary-value green">
              {formatarEnergia(energiaFinal)} un.
            </span>
          </div>
          <div className="summary-row">
            <span>Eficiência total</span>
            <span className="summary-value gold">
              {eficienciaTotal.toFixed(4)}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

# Simulador Amazônia

Experiência interativa em React para montar cadeias alimentares amazônicas e visualizar o fluxo de energia entre produtores, consumidores e predadores de topo.

## Funcionalidades

- Montagem guiada de cadeia alimentar a partir de produtores.
- Cálculo de energia por nível trófico com regra de 2% para fotossíntese e 10% de transferência.
- Evento ambiental de queimada, reduzindo a energia solar disponível.
- Alerta de colapso quando a energia final não sustenta o organismo.
- Cena 2D de floresta amazônica com organismos destacados.
- Fichas narrativas dos organismos com habitat, dieta, papel ecológico, adaptações e ameaças.
- Rede alimentar visual no modal de detalhes.

## Stack

- React 19 + Vite
- Framer Motion para animações e transições
- Lucide React para ícones
- React Flow para a visualização da rede alimentar

## Evolução futura

A versão atual prioriza uma experiência 2D rica, usando HTML/CSS/React para manter o projeto simples de apresentar e fácil de manter.

Possíveis caminhos para evoluir:

- 3D/WebGL: `three`, `@react-three/fiber` e `@react-three/drei` para transformar a floresta em uma cena 3D.
- 2D canvas avançado: `pixi.js` e `@pixi/react` para sprites, partículas e animações com mais performance.
- Animações vetoriais: Rive ou dotLottie para organismos com movimentos mais elaborados.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

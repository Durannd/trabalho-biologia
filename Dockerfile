# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copiar arquivos buildados do vite para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar configuração customizada do nginx para funcionar com client-side routing, se necessário
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Etapa 1: build
FROM node:20-alpine AS builder

# Crear directorio de la app
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa 2: producción
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar dependencias de producción
COPY package*.json ./
RUN npm install --production

# Copiar código compilado
COPY --from=builder /usr/src/app/dist ./dist

# Exponer puerto
EXPOSE 4000

# Ejecutar la app
CMD ["node", "dist/main.js"]
# ============================
# 1) Etapa de build
# ============================
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiamos solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalamos dependencias (incluye devDependencies para poder compilar TypeScript)
RUN npm ci

# Copiamos el resto del código fuente
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# Compilamos el proyecto Nest (genera carpeta dist)
RUN npm run build

# ============================
# 2) Etapa de runtime
# ============================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Variables de entorno por defecto (puedes sobreescribirlas en docker-compose)
ENV NODE_ENV=production
ENV PORT=3000

# Copiamos package.json para poder instalar solo dependencias de producción
COPY package*.json ./

# Instalamos solo dependencias necesarias en runtime
RUN npm ci --omit=dev

# Copiamos el código compilado desde el builder
COPY --from=builder /usr/src/app/dist ./dist

# Exponemos el puerto de la API
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main.js"]

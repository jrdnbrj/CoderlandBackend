# 🚀 **Prueba Técnica – Backend (NestJS + TypeORM + PostgreSQL + Docker + Testing)**

El desarrollo incluye:

- Conexión a base de datos PostgreSQL  
- Migraciones y seed con TypeORM  
- API REST con un endpoint GET  
- Pruebas unitarias (con mocks y base de datos en memoria)  
- Docker Compose con dos servicios: API + PostgreSQL  
- Estructura modular y buenas prácticas  

---

# 📦 **Tecnologías utilizadas**

| Componente | Tecnología |
|-----------|------------|
| Backend | **NestJS 11** |
| ORM | **TypeORM 0.3** |
| Base de datos | **PostgreSQL** |
| Testing | **Jest** (unit tests + SQLite in-memory) |
| Docker | Dockerfile multi-stage + Docker Compose |
| Validación | class-validator / class-transformer |
| Lenguaje | Typescript |
| Migraciones | TypeORM CLI |

---

# 📁 **Estructura principal del proyecto**

```
src/
  app.module.ts
  main.ts

  marcas-autos/
    dto/
      marca-auto.dto.ts
    entities/
      marca-auto.entity.ts
    marcas-autos.controller.ts
    marcas-autos.controller.spec.ts
    marcas-autos.memory.spec.ts
    marcas-autos.module.ts
    marcas-autos.service.ts
    marcas-autos.service.spec.ts

  migrations/
    1763404849013-InitMarcasAutos.ts
    1763404899310-SeedMarcasAutos.ts

typeorm.config.ts
docker-compose.yml
Dockerfile
.env.example
```

---

# 🛠️ **Requisitos previos**

- Node.js v18+  
- Docker y Docker Compose  
- Git Bash (si estás en Windows)

---

# 🔧 **Configuración del entorno (.env)**

Antes de ejecutar el proyecto **fuera de Docker**, copia:

```bash
cp .env.example .env
```

El `.env` se usa solo en ejecución local.  
Docker Compose **NO** usa tu `.env`: define sus propias variables internas.

---

# ▶️ **Ejecución del proyecto (modo desarrollo local)**

```bash
npm install
npm run start:dev
```

---

# 🗄️ **Migraciones (local)**

```bash
npm run migration:run
npm run migration:revert
```

---

# 🐳 **Ejecución con Docker Compose**

## 🔥 Levantar los servicios

```bash
docker compose up --build -d
```

## 🧱 Ejecutar migraciones dentro del contenedor

```bash
docker compose exec api npm run migration:run
```

## 📌 Probar API

```bash
curl http://localhost:3000/marcas-autos
```

---

# 🧪 **Testing**

```bash
npm run test
npm run test:cov
```

Incluye:

- Tests con mocks  
- Tests con SQLite in-memory  
- Cobertura > 70 % en el módulo de negocio  

---

# 📘 **Requisitos de la prueba — Cumplimiento**

| Requisito | Estado |
|----------|--------|
| Conexión PostgreSQL | ✔️ |
| Migración + Seed | ✔️ |
| API REST GET | ✔️ |
| Pruebas unitarias + DB en memoria | ✔️ |
| Cobertura ≥ 70% | ✔️ |
| Docker Compose con DB + API | ✔️ |

---

# 🚀 **Endpoint principal**

```
GET /marcas-autos
```

---

# 📄 **Scripts útiles**

| Acción | Comando |
|-------|---------|
| Iniciar Nest local | `npm run start:dev` |
| Ejecutar tests | `npm run test` |
| Ver cobertura | `npm run test:cov` |
| Ejecutar migraciones | `npm run migration:run` |
| Docker: levantar servicios | `docker compose up --build -d` |
| Docker: ejecutar migraciones | `docker compose exec api npm run migration:run` |

---


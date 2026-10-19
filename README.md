# ToDo Frontend

Frontend web de una aplicación de gestión de tareas (ToDo) para organizar pendientes personales o de equipo. Permite crear, editar, filtrar y paginar tareas, agruparlas por categorías y administrar usuarios según rol.

Consume una API REST (backend ToDo) y se entrega como SPA con autenticación por token y vistas protegidas por rol.

## Tecnologías

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router, Axios, React Hook Form + Zod

## Funcionalidades

- Autenticación: login, registro, recuperación y reset de contraseña
- Tareas: creación, edición, filtros por estado/prioridad/categoría/fecha y paginación
- Categorías: listado, búsqueda y filtrado por fecha
- Administración de usuarios (rol ADMIN)

## Requisitos

- Node.js 20+
- pnpm
- Backend ToDo disponible (por defecto `http://localhost:8081`)

## Instalación

```bash
pnpm install
cp .env.example .env
```

## Desarrollo

```bash
pnpm dev
```

## Calidad y build

```bash
pnpm lint
pnpm build
```

## Variables de entorno

- `VITE_API_URL` (por defecto `http://localhost:8081`)

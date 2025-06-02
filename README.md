# Dashboard de Incidentes Tecsup

Este proyecto es un dashboard administrativo desarrollado con React y Vite para la gestión y visualización de incidentes en Tecsup. Permite a los administradores y usuarios gestionar reportes, visualizar estadísticas y exportar información relevante.

---

## 🚀 Características

- Interfaz moderna, intuitiva y responsiva.
- Visualización de datos con gráficos interactivos (Recharts).
- Exportación de reportes en PDF y Excel.
- Gestión de incidentes: creación, edición, historial y asignación.
- Autenticación y gestión de usuarios y administradores.
- Notificaciones visuales y alertas.
- Diseño adaptable a dispositivos móviles y escritorio.
- Temas y estilos personalizables.

---

## 🛠️ Tecnologías Utilizadas

- **React 19**: Librería principal para la construcción de la interfaz.
- **Vite**: Herramienta de desarrollo y bundler ultrarrápido.
- **Bootstrap 5**: Framework de estilos para componentes responsivos.
- **React Router DOM**: Enrutamiento de páginas.
- **Recharts**: Gráficos y visualización de datos.
- **Axios**: Cliente HTTP para consumo de APIs.
- **SweetAlert2**: Notificaciones y alertas personalizadas.
- **SASS**: Preprocesador de estilos.
- **React Icons**: Iconografía moderna.
- **JSPDF & HTML2Canvas**: Exportación de gráficos y vistas a PDF.
- **XLSX**: Exportación de datos a Excel.
- **@react-pdf/renderer**: Generación de reportes PDF personalizados.

---

## 📁 Estructura del Proyecto

```
├── public/
│   └── logo_tecsup.png, logo.png, simbolo_tecsup.png
├── src/
│   ├── assets/         # Imágenes y recursos gráficos
│   ├── components/     # Componentes reutilizables (Button, Card, Modal, Sidebar, Table, etc.)
│   ├── features/       # Módulos principales (admins, auth, dashboard, incidents, profile, users)
│   ├── hooks/          # Custom hooks
│   ├── layouts/        # Layouts principales (AuthLayout, MainLayout)
│   ├── pages/          # Páginas principales (si aplica)
│   ├── routes/         # Definición de rutas (AppRouter)
│   ├── services/       # Servicios y lógica de negocio (API, autenticación, etc.)
│   ├── styles/         # Archivos de estilos globales y variables
│   ├── utils/          # Utilidades y helpers
│   ├── App.jsx         # Componente raíz
│   ├── main.jsx        # Punto de entrada de la app
│   ├── global.css      # Estilos globales
│   └── theme.js        # Paleta de colores y tema
├── .env                # Variables de entorno
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
├── eslint.config.js    # Configuración de ESLint
├── index.html          # HTML principal
└── README.md           # Documentación del proyecto
```

---

## 📋 Prerrequisitos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn

---

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd [NOMBRE_DEL_DIRECTORIO]
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

---

## 🚀 Uso

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Para construir el proyecto para producción:

```bash
npm run build
```

Para previsualizar la versión de producción:

```bash
npm run preview
```

---

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto para producción.
- `npm run preview`: Previsualiza la versión de producción.
- `npm run lint`: Ejecuta el linter para verificar el código.

---

## 🧩 Principales Módulos y Funcionalidades

### 1. Gestión de Incidentes
- Crear, editar, ver y eliminar incidentes.
- Visualización de historial de cambios ([`IncidentHistory`](src/features/incidents/components/IncidentHistory.jsx)).
- Exportación de reportes PDF ([`IncidentReportPDF`](src/features/incidents/pdf/IncidentReportPDF.jsx)) y Excel.
- Adjuntar imágenes y archivos a los incidentes.

### 2. Dashboard
- Estadísticas generales y por prioridad/estado.
- Gráficos interactivos ([`EstadoBarChart`](src/features/dashboard/components/EstadoBarChart.jsx), [`PrioridadPieChart`](src/features/dashboard/components/PrioridadPieChart.jsx)).
- Exportación de gráficos a PDF y Excel.

### 3. Gestión de Usuarios y Administradores
- Listado, creación y edición de usuarios y administradores ([`AdminList`](src/features/admins/components/AdminList.jsx), [`UserList`](src/features/users/components/UserList.jsx)).
- Asignación de roles y tipos de incidentes.

### 4. Autenticación
- Login seguro y gestión de sesiones.
- Layouts diferenciados para autenticación y administración ([`AuthLayout`](src/layouts/AuthLayout.jsx), [`MainLayout`](src/layouts/MainLayout.jsx)).

### 5. Responsive y Accesibilidad
- Estilos adaptativos ([`global.css`](src/global.css)), soporte para dispositivos móviles y escritorio.
- Accesibilidad básica en formularios y navegación.

---

## 🤝 Contribución

1. Haz un Fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`).
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`).
5. Abre un Pull Request.

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## ✨ Agradecimientos

- Tecsup por la oportunidad de desarrollar este proyecto.
- Todos los contribuidores que han ayudado en el desarrollo.

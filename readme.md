
# 🛍️ Tienda Ecológica Buena Vida

Este proyecto corresponde al desarrollo completo de la plataforma web de la **Tienda Ecológica Buena Vida**, como parte del curso **Desarrollo de Aplicaciones Web (2025-10)**. El sistema implementa un frontend modular en MVC, backend con Node.js y TypeScript, y un diseño UI responsivo basado en los lineamientos académicos.

## 🚀 Cómo ejecutar el proyecto

### Backend
```bash
# Instalar dependencias
npm install

# Ejecutar el servidor backend
npx ts-node src/server.ts
```

### Frontend
- Abrir `index.html` con Live Server en VS Code.
- Navegar entre páginas: vitrina, carrito, favoritos, login, cuenta, etc.

## 📁 Estructura del proyecto

El proyecto sigue el patrón Modelo-Vista-Controlador en ambos lados (frontend y backend).

```
/backend
  └── src/
      ├── server.ts
      ├── rutas/
      ├── controladores/
      └── modelos/

/frontend
  └── build/
      ├── vitrina/
      ├── carrito/
      ├── favoritos/
      ├── modal/
      ├── login/
      ├── registro/
      └── admin/

/public
  ├── estilos/
  └── assets/
```

## ✅ Funcionalidades principales

- Catálogo de productos con filtros por precio y buscador.
- Carrito interactivo con resumen flotante.
- Gestión de usuarios: login, registro, cuenta.
- Favoritos y detalle de productos (modal).
- Panel de administración (CRUD básico).
- Control de acceso con roles.
- Diseño responsivo y accesible.

## 🧪 Pruebas

- Funcional en Chrome, Firefox y Edge.
- Visual validado en resoluciones de escritorio y móviles.
- Compatible con Live Server.

## 🎨 Créditos

Desarrollado por **Sergio Andrés y equipo**  
Universidad Pontificia Bolivariana, 2025.

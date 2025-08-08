# BalanceMe Backend
## Descripción del Proyecto
**BalanceMe** es una aplicación de gestión de finanzas personales diseñada para ayudar a los usuarios a tener un control claro y sencillo sobre sus ingresos y gastos.  
Este repositorio contiene el código del backend, el cual se encarga de la lógica de negocio, la persistencia de datos y la autenticación segura de los usuarios.

## Tecnologías Utilizadas
El backend de BalanceMe está construido con un enfoque moderno y robusto, utilizando las siguientes tecnologías clave:

- **Node.js**: Entorno de ejecución del servidor.
- **Express**: Framework web para la construcción de la API REST.
- **TypeScript**: Lenguaje de programación que añade tipado estático, mejorando la escalabilidad y la detección de errores.
- **MongoDB**: Base de datos NoSQL para el almacenamiento de datos.
- **Mongoose**: Librería de modelado de objetos (ODM) para interactuar con MongoDB.
- **JWT (JSON Web Tokens)**: Para la autenticación segura de los usuarios.
- **Bcrypt.js**: Para el hashing de contraseñas, garantizando la seguridad.

## Características de la API
La API de BalanceMe ofrece los siguientes endpoints principales:

### Autenticación
- `POST /api/auth/register`: Registrar un nuevo usuario.
- `POST /api/auth/login`: Iniciar sesión y obtener un token JWT.

### Transacciones
- `POST /api/transactions`: Crear una nueva transacción (ingreso o gasto).
- `GET /api/transactions`: Obtener todas las transacciones del usuario autenticado.
- `GET /api/transactions/:id`: Obtener los detalles de una transacción específica.
- `PUT /api/transactions/:id`: Actualizar una transacción existente.
- `DELETE /api/transactions/:id`: Eliminar una transacción.

### Categorías
- `POST /api/categories`: Crear una nueva categoría personalizada.
- `GET /api/categories`: Obtener todas las categorías disponibles.

## Configuración y Ejecución

1. **Requisitos Previos**
   - **Node.js** (versión 16 o superior)
   - **npm** (o Yarn)
   - **MongoDB** (instalado localmente o una instancia en la nube como MongoDB Atlas)
   - **Docker** (opcional, para una configuración más sencilla)

2. **Variables de Entorno**  
   Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura. Asegúrate de reemplazar los valores con tu propia configuración:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/balanceme
   JWT_SECRET=tu_secreto_jwt_muy_seguro
   ```
   
3. **Instalación y Puesta en Marcha**

   ```bash
   # Instala las dependencias del proyecto
   npm install

   # Compila el código TypeScript a JavaScript
   npm run build

   # Inicia el servidor
   npm start
   ```
    Para el desarrollo, puedes usar el siguiente comando, que reiniciará el servidor automáticamente con cada cambio:
  
    ```bash
    npm run dev
    ```

4. **Estructura del Código**  
  El proyecto sigue una arquitectura limpia (**Clean Architecture**) para separar las preocupaciones y hacer el código más mantenible:

  - `src/data`: Lógica de persistencia, modelos de Mongoose y configuración de la base de datos.
  - `src/domain`: Define las entidades y la lógica de negocio pura, agnóstica a la infraestructura.
  - `src/infrastructure`: Implementa las interfaces del dominio usando tecnologías específicas (controladores, data sources, etc.).
  - `src/presentation`: Puntos de entrada para la API, como las rutas y middlewares de Express.

## Contribuciones
¡Las contribuciones son bienvenidas!  
Si deseas contribuir, por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m 'feat: Añadir nueva funcionalidad'
4. Envía tus cambios a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
5. Abre un Pull Request

# Licencia
Este proyecto está bajo la Licencia MIT.



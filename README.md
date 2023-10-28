# Proyecto de Gestión de Clientes y Asesores

Este proyecto es una aplicación de gestión de clientes y asesores desarrollada con Node.js y SQLite. La aplicación permite el registro de clientes y asesores, así como la autenticación y gestión de sesiones para diferentes roles de usuario.
Tambien se le asignada o niega una tarjeta de credito al cliente

## Características

- Registro de clientes con información personal y detalles financieros.
- Registro de asesores con información personal y roles específicos.
- Autenticación de usuarios a través de credenciales y verificación de contraseñas seguras con hash.
- Diferenciación de roles entre clientes normales y asesores para gestionar distintos niveles de acceso.
-Aprobacion o desaprobación de tarjeta de credito por parte de un asesor

## Tecnologías utilizadas

- Node.js para el entorno de backend.
- SQLite como base de datos para el almacenamiento de clientes, asesores y credenciales.
- TypeORM para la configuración y gestión de la base de datos.
- Express.js para el enrutamiento y la creación de API.
- Bcrypt para el hashing de contraseñas y garantizar la seguridad de las credenciales.

## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto con `npm install`.
3. Asegúrate de tener Node.js y npm instalados en tu sistema.
4. Ejecuta el servidor con `npm start` y accede a la aplicación en `http://localhost:3000`.

## Uso

La aplicación proporciona endpoints para la gestión de clientes y asesores, así como para la autenticación y gestión de sesiones. Asegúrate de revisar la documentación de la API para obtener más detalles sobre cómo interactuar con la aplicación.

## Swagger

La aplicación tiene una documentación de swagger que se puede encontrar en la siguiente URL: http://localhost:3000/api-docs/#/

## Servicios 
1. Clientes: /clientes
    - Lista de clientes sin visivilizar datos sensibles
    - Crear clientes con su tarjeta y credenciales de login
2. Inicio de sesiones: /login
    - Logea el cliente e identifica si es asesor o no
3. Aprobar tarjetas: /aprobar-tarjeta
    - Aprueba o desaprueba creacion de tarjeta, generando el monto del prestamo y la categoria de la tarjeta

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue las pautas estándar de desarrollo y crea una solicitud de extracción detallada para revisión.

## Autor

Este proyecto fue creado por [Karen Moreno].

## Licencia

Este proyecto está licenciado bajo [nombre de la licencia]. Consulta el archivo LICENSE para obtener más detalles.
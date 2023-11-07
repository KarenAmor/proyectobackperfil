# Proyecto de Gestión de Clientes y Asesores

- Este proyecto es una aplicación de gestión de clientes y asesores que permite el registro de clientes y asesores, así como la autenticación y gestión de sesiones para diferentes roles de usuario.
- Se implementa la funcionalidad para la aprobación de tarjetas de crédito. Permite a los asesores realizar el seguimiento de las solicitudes de tarjetas de los clientes y aprobarlas según ciertos criterios predefinidos: se cálcula el monto disponible la categorías de tarjetas según el rango de sueldo neto.
- Envío de correos electrónicos de notificación al cliente una vez que la tarjeta ha sido aprobada.


## Características

- Registro de clientes con información personal y detalles financieros.
- Registro de asesores con información personal y roles específicos.
- Autenticación de usuarios a través de credenciales y verificación de contraseñas seguras con hash.
- Diferenciación de roles entre clientes normales y asesores para gestionar distintos niveles de acceso.
- Aprobacion o desaprobación de tarjeta de credito por parte de un asesor
- transacciones entre cuentas

## Tecnologías utilizadas

- Node.js para el entorno de backend.
- SQLite como base de datos para el almacenamiento de clientes, asesores y credenciales.
- TypeORM para la configuración y gestión de la base de datos.
- Express.js para el enrutamiento y la creación de API.
- Bcrypt para el hashing de contraseñas y garantizar la seguridad de las credenciales.
- Nodemailer para enviar correos electrónicos
- Ethereal Email permite visualizar los correos electrónicos enviados desde tu aplicación sin necesidad de utilizar un servidor de correo real.
- Joi para la validacion de los datos de entrada
- Jest para las pruebas unitarias

## Estructura del Proyecto

|-- controllers

|-- database

|-- db

    |-- entities

|-- middleware

|-- routes

|-- tests

|-- util

|-- node_modules

|-- index.js

|-- package.json

|-- README.md


## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto con `npm install`.
3. Asegúrate de tener Node.js y npm instalados en tu sistema.
4. Ejecuta el servidor con `npm start` y accede a la aplicación en `http://localhost:3000`.


## Swagger

La aplicación tiene una documentación de swagger que se puede encontrar en la siguiente URL: http://localhost:3000/api-docs/#/

## Servicios 
1. Clientes: /clientes
    - Lista de clientes sin visivilizar datos sensibles
    - Crear clientes con su tarjeta y credenciales de login
    - Actualiza clientes a traves del id
    - Elimina clientes a traves del id
2. Inicio de sesiones: /login
    - Logea el cliente e identifica si es asesor o no
3. Aprobar tarjetas: /aprobar-tarjeta
    - Aprueba o desaprueba creacion de tarjeta, generando el monto del prestamo y la categoria de la tarjeta, al mismo tiempo que envia un correo informativo
    - Lista las tarjetas
    - Elimina tarjetas
4. Asesores: /asesores
    - Crear asesor con sus credenciales de login
    - Elimina asesores
    - Actualiza asesores con parametro id
    - Elimina asesor con parametro id

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue las pautas estándar de desarrollo y crea una solicitud de extracción detallada para revisión.

## Autor

Este proyecto fue creado por [Karen Moreno].

## Licencia

Este proyecto está licenciado bajo Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.


## Mejoras pendientes
- Creacion de usuario los datos deben se unicos y validados

## Funcionalidades Pendiente
- Modificar y Recuperar contraseña
- Realizar transaccion
- Inteses de las transacciones
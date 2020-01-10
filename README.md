# Examen Front End

_Proyecto realizado a modo de examen. El mismo cuenta con un APIREST realizado en NODEJS que trabaja con una pequeña base de datos no secuancial soportada en MONGODB. La aplicación fue realizada en ANGULAR y cuenta con un CRUD y la lista de hoteles.
Le agregue al proyecto una HOME para que se pueda navegar dentro de la aplicación, por esta razón le agregue al navbar un botón para volver al HOME._


## Pre-requisitos 📋

_Tener instalados NPM, MONGO, GIT y ANGULAR CLI_

## Comenzando 🚀

_Es importante que este corriengo MONGO al momento de lanzar el server. Puedes clonar el repositorio con el siguiente comando:_

```
git clone https://github.com/DiegoZ4/examenFront.git
```


### Corriendo la API REST 🔧

_El primer paso es correr la API. Para ello hacer lo siguiente:_

```
cd api (desde la raiz del directorio del proyecto)
```
_Instalamos las dependencias_

```
npm install
```

_Si queresmos correr el server en producción_

```
npm run prod
```

_Si queremos correr el server en desarrollo (funcionará con el ng serve del FRONT)_

```
npm run dev
```

### Corriendo la APLICACIÓN SPA 🔧

_Continuaremos ejecutando la aplicacion ANGULAR. Para ello hacer lo siguiente:_

```
cd front (desde la raiz del directorio del proyecto)
```
_Instalamos las dependencias_

```
npm install
```

_Ejecutamos la compilacion que se conecta al API de desarrollo_

```ng serve -o
```

_Compilar la APP para producción. Generará los archivos compilados en la carpeta /dist_

```
ng build
```


## Algunas observaciones 📌

_1. Para futuras versiones se puede/deberia crear una colleccion de "amenities" y manejar los mismos desde un end point_
_2. Para futuras versiones se puede/deberia mejorar la carga de imagenes del crud y agregar objetos como spinners y modal, que por cuestion de tiempos no fueron incluidos en esta primera versión_
-3. Si necesita cambiar los puertos donde corre la aplicación puede hacerlo en: /api/.env.production y /api/.env.development

## Autor ✒️

_Este es un trabajo realizado por mi_

* **Diego Jesús Zaragoza** - *A developer in a great universe*.

## Licencia 📄

Este proyecto está bajo la Licencia (Todos para uno y uno para todos)

## Expresiones de Gratitud 🎁

* A mi familia, a mis amigos y a quien dedique su tiempo en este proyecto 🤓.

******************************************************************************************************************
## BACKEND
******************************************************************************************************************
<center>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCw_2cNT1EMdE5IZudq2wji72uEPhih5KV4g&s" width="300">
</center>

# Configuración del Servidor Express en Node.js

Este proyecto utiliza Express en Node.js para configurar un servidor HTTP que escucha en el puerto 4000.

## Instalación de Node.js

Primero, necesitas instalar Node.js. Sigue las instrucciones a continuación según tu sistema operativo.

# Windows

1. Descarga el instalador desde [nodejs.org](https://nodejs.org/).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación abriendo una terminal (PowerShell) y ejecutando:
```sh
   node --version
   npm --version
```
# macOS
1. Usa Homebrew para instalar Node.js. Si no tienes Homebrew instalado, sigue las instrucciones en brew.sh.
2. Ejecuta los siguientes comandos en una terminal
```sh
brew install node
```
3. Verifica la instalación ejecutando:
```sh
node --version
npm --version
```
##Linux
1. Usa el gestor de paquetes de tu distribución para instalar Node.js.
###Debian/Ubuntu:
```sh
sudo apt update
sudo apt install nodejs npm
```
###CentOS/RHEL:
```sh
sudo yum install nodejs npm
```
2. Verifica la instalación ejecutando:
```sh
node --version
npm --version
```

## Instalación de Dependencias
Una vez que Node.js y npm estén instalados, instala Express. Abre una terminal y ejecuta:
```sh
npm install express
```
# Configuración
Clonar el repositorio:
```sh
git clone https://github.com/SebasTix02/Mercury
```
## Configuración del Servidor
```sh
const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Servidor HTTP escuchando en el puerto 4000');
});

app.listen(port, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${port}`);
});
```

## Configuración de package.json
Asegúrate de que tu archivo package.json tenga la siguiente configuración:

```sh
{
  "name": "nombre-del-proyecto",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
## Iniciar el Servidor
Una vez que todo esté configurado, puedes iniciar tu servidor con los siguientes comandos:
```sh
PS .\..\Mercury>
cd .\backend\
PS .\..\Mercury\backend> npm start
```

Deberías ver el siguiente mensaje en la terminal:
```sh
Servidor HTTP escuchando en el puerto 4000
```
Esto confirma que tu servidor Express está funcionando correctamente y escuchando en el puerto 4000.
******************************************************************************************************************

## FRONTEND
******************************************************************************************************************
<center>
<img src="https://arielfuggini.com/static/d00325bbd9f153f8a3bfb2a3d4cd87e3/32ccb/react.png" width="500">
</center>
# Configuración del Frontend en React
Este proyecto utiliza React para el desarrollo del frontend. Sigue los pasos a continuación para configurar y ejecutar la aplicación en tu entorno local.

# Instalación de Node.js
Primero, necesitas instalar Node.js. Sigue las instrucciones a continuación según tu sistema operativo.

## Windows
1. Descarga el instalador desde nodejs.org.
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación abriendo una terminal (PowerShell) y ejecutando:
```sh
   node --version
   npm --version
```

#Configuración
##Clonar el repositorio:

```sh
git clone https://github.com/SebasTix02/Mercury
```
## Instalación de Dependencias
Una vez que Node.js y npm estén instalados, instala las dependencias del proyecto. Abre una terminal y navega al directorio del frontend:
Asegúrate de estar en el directorio del frontend antes de ejecutar cualquier comando:

```sh
cd frontend
npm install
```

##Scripts del package.json
Asegúrate de que tu archivo package.json tenga la configuración correcta. Aquí tienes un ejemplo básico:

```sh
{
  "name": "nombre-del-proyecto",
  "version": "0.1.0",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "refine dev"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "refine": "^4.5.3"
  }
}
```

#Iniciar el Servidor de Desarrollo
Una vez que todo esté configurado, puedes iniciar tu servidor de desarrollo con los siguientes comandos:

```sh
PS .\..\Mercury> cd .\frontend\
PS .\..\Mercury\frontend> npm run dev
```

Deberías ver el siguiente mensaje en la terminal:

```sh
> frontdas@0.1.0 dev
> refine dev
✓ refine devtools is running at port 5001

  VITE v4.5.3  ready in 359 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Esto confirma que tu aplicación React está funcionando correctamente y está disponible en http://localhost:5173/.
******************************************************************************************************************

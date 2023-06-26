# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json a la carpeta de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Establece el puerto de la aplicación desde el archivo .env

ARG NEXTJS_PORT

ENV PORT=$NEXTJS_PORT

# Expone el puerto 15000 para acceder a la aplicación Next.js
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]

# Dockerfile (backend)
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia todo el código fuente
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

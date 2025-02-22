## Titulo
  NestEcommerce

## Description
   Para desarrollar este proyecto de backend se utilizaron como principales tecnologias el framework de nestjs con typeScript para la realizacion del codigo y para la DB se utilizo postgres con typeOrm para la coneccion del servidor a la DB, ademas de clodinary para las imagenes.

## Clonar proyecto
  git clone https://github.com/GabrielSuvia/nestjsEcommerce.  
  
## 1:Installation  

```bash  
$ npm install  
```
## 2:Configuraciones y credenciales  
  Crear un .env.development para las variables de entorno  
  Cambiar los datos de las credenciales de la db y Cloudinary en el archivo src/config/typeorm.ts y 
  src/config/cloudinary.ts por tus propios datos  

## NOTA:Si es que tuviera algun error eliminar la carpeta dist y con eso se arregla.

## 3:Running the app  

```bash
# compilacion de ts a js
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

```bash

# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros e2e test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/


## Entrega

1. Para correr esta prueba se debe ejecutar docker-compose up --build, en la raiz del proyecto. Esto actualmeten correra los test y la migracion para la creacion de la tabla en la base de datos

2. Si desea puede cambiar en el Docker file el test por start y asi poder hacer pruebas desde postman, tengo una coleccion documentada, me la pueden pedir y con gusto se la entrego.

## Puntos importante

1. Versione la api por buenas practicas y esto me obligo a cambiar los path en los test, solo para apuntar a la pai versionada

2. En el repositorio esta el .env, este no se debe subir porque puede tener contenido sensible para el back, pero esto al ser una prueba no hay problema

2. Utilice como base de datos postgres y inclui migraciones para la creacion de la tabla

3. trabaje el proyecto por modulos para pensar en la escalabilidad del mismo

4. No utilice querys sql porque no eran querys dificiles, utilice sequlice para comunucarme con la base de datos

5. Cualquier duda no duden en escribirme (https://www.linkedin.com/in/cristian-alejandro-marquina-buitrago-296797176/), muchas gracias por la prueba estuvo entretenida

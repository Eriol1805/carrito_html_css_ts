## Requerimientos
- node
- npm init -y //para generar el package.json
- agregar la linea "type": "module" al package
- npm i --save-dev typescript //para elegir el lenguaje
- npm install -g typescript //instala de manera global
- tsc --init //archivo de configuración de Ts
- Se configuraron 2 scripts para ejecutar Ts:
    "start": "tsc",
    "dev": "tsc -w"
    Ej. para correr:
     npm run dev
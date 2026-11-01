# Prototipo de diseño · v1

Prototipo clickeable de la app mobile (8 pantallas de 390×844).

## Cómo verlo

Estos archivos son el **código fuente** del prototipo, hecho en el canvas de diseño de Claude. No se abren solos en el navegador, porque necesitan el editor del canvas para mostrarse.

Para verlo e interactuar hay dos opciones:

- **Versión web:** https://micaelafecchino.github.io/nosune/ (la sirve `index.html` en la raíz, que lee estos mismos archivos).
- **Canvas de diseño**, para editar (pedile acceso a quien lo administra): https://claude.ai/artifact/QuvzAvdyBi5cPiXrEfF5y8

## Pantallas

| Archivo | Pantalla |
|---|---|
| `Main.dc.html` | 1 · Inicio: próximo turno, próximos pasos con responsable, medicación del día |
| `Agenda.dc.html` | 2 · Agenda de turnos, con quién gestiona y quién acompaña |
| `Historia.dc.html` | 3 · Historia clínica con carpetas y filtros |
| `Consulta.dc.html` | 4 · Detalle de una consulta y los pasos que generó |
| `Familia.dc.html` | 5 · Perfiles, colaboradores y permisos |
| `Asignar.dc.html` | 6 · Asignar responsable de una tarea |
| `NuevoPerfil.dc.html` | 7 · Crear un perfil (sin cuenta o con invitación) |
| `Carpeta.dc.html` | 8 · Carpeta por diagnóstico, con privacidad propia |
| `canvas.json` | Ubicación de las pantallas en el canvas |

Los datos son de ejemplo. Lo que aparece entre corchetes, como `[OBRA SOCIAL]`, son lugares para completar.

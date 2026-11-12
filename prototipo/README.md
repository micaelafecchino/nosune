# Prototipo de diseño · v1

Prototipo clickeable de la app mobile (15 pantallas de 390×844).

## Cómo verlo

Estos archivos son el **código fuente** del prototipo, hecho en el canvas de diseño de Claude. No se abren solos en el navegador, porque necesitan el editor del canvas para mostrarse.

Para verlo e interactuar hay dos opciones:

- **Versión web:** https://micaelafecchino.github.io/nosune/ (la sirve `index.html` en la raíz, que lee estos mismos archivos).
- **Canvas de diseño**, para editar (pedile acceso a quien lo administra): https://claude.ai/artifact/QuvzAvdyBi5cPiXrEfF5y8

## Criterios de diseño

La app la van a usar sobre todo personas grandes, así que:

- Letra grande (texto principal de 17–18 px, nada por debajo de 15 px) con la tipografía Atkinson Hyperlegible, pensada para baja visión.
- Alto contraste y botones de al menos 56 px de alto.
- Una sola idea por tarjeta, pocas cosas por pantalla y palabras simples ("Va con Juan", "Le toca a Laura").
- Sin scroll horizontal ni menús desplegables.
- Barra de abajo con Inicio, Turnos, un botón central grande **Cargar** (turno, consulta, estudio, remedio o compra, gasto, tarea que se repite cada día, semana o mes), Diario y Compras. Los perfiles se abren tocando el nombre arriba en el inicio.

## Pantallas

Organizadas según los módulos del PRD.

**Módulo 1 · Historia clínica y turnos**

| Archivo | Pantalla |
|---|---|
| `Main.dc.html` | 1 · Inicio: resumen del día, próximo turno, próximos pasos (míos / todos / sin asignar), compras por reponer, accesos a carga rápida y asistente |
| `Agenda.dc.html` | 2 · Turnos próximos: fecha, hora, institución, médico, estudios necesarios con su estado y responsable |
| `Historia.dc.html` | 3 · Historia clínica: filtros por diagnóstico, fecha, médico e institución |
| `Consulta.dc.html` | 4 · Consulta realizada: médico, institución, resumen, indicaciones, recetas, compartir por WhatsApp |
| `Medico.dc.html` | 5 · Ficha de contacto del médico |
| `Cargar.dc.html` | 6 · Cargar (botón central): primero qué (turno, consulta, estudio, remedio o compra, gasto, tarea que se repite cada día, semana o mes), después cómo (hablar, foto o escribir) y revisión |
| `CargarTurno.dc.html` | 6b · Cargar un turno: se abre desde "+ Cargar un turno" en Turnos, directo en el paso de cómo cargarlo |
| `Carpeta.dc.html` | 7 · Carpeta por diagnóstico con privacidad propia |

**Módulo 2 · Compras recurrentes y Módulo 3 · Control diario**

| Archivo | Pantalla |
|---|---|
| `Diario.dc.html` | 8 · Control diario: medicamentos y ejercicios del día, estado pendiente/hecho, responsable y quién la marcó como hecha (y a qué hora) |
| `Compras.dc.html` | 9 · Compras recurrentes: recordatorio, receta, marcar como comprado, quién se ocupó, cuánto y dónde (opcional) |

**Cross app**

| Archivo | Pantalla |
|---|---|
| `Chat.dc.html` | 10 · Asistente que responde sobre el paciente con lo cargado en la app |
| `Familia.dc.html` | 11 · Perfiles, colaboradores, permisos restringidos y fuentes conectadas (WhatsApp, email, calendario) |
| `Asignar.dc.html` | 12 · Asignar responsable de una tarea |
| `NuevoPerfil.dc.html` | 13 · Crear un perfil (sin cuenta o con invitación) |
| `Ficha.dc.html` | 14 · Ficha de emergencia con datos clave (alergias, enfermedades, remedios, obra social, a quién llamar); se abre desde el inicio |
| `canvas.json` | Ubicación de las pantallas en el canvas |

Los datos son de ejemplo. Lo que aparece entre corchetes, como `[OBRA SOCIAL]`, son lugares para completar.

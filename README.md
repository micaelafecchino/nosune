# Nosune

App mobile para ordenar la salud de la familia: historia clínica propia, turnos, próximos pasos y seguimiento de pacientes, pensada para que pacientes y familiares (incluso familias que viven separadas) estén sincronizados y se repartan las tareas.

## Estado

Etapa de prototipo de diseño. Ver [`prototipo/`](prototipo/).

**Versión web del prototipo:** https://micaelafecchino.github.io/nosune/ (requiere GitHub Pages activado).

## Módulos (según el PRD)

1. **Historia clínica y turnos:** turnos próximos y realizados, filtros, fichas de médicos, carga rápida (audio, captura, texto) y compartir.
2. **Compras recurrentes:** medicamentos e ítems de cuidado con recordatorio, receta y quién se ocupó.
3. **Control diario:** medicamentos y ejercicios del día con estado y responsable.

Y de forma transversal: perfiles propios y de terceros, colaboradores con permisos (incluso restringidos), responsables por tarea, un asistente para consultar la información del paciente y fuentes conectadas (WhatsApp, email).

## Ideas centrales

- **Perfiles:** cada persona es dueña de su perfil y puede invitar colaboradores. También se pueden crear perfiles sin cuenta (un bebé, un abuelo) que administra otra persona y que más adelante se pueden transferir.
- **Colaboradores con permisos:** por ejemplo, ver y editar todo, o solo agenda y medicación.
- **Próximos pasos con responsable:** cada consulta genera pasos (derivaciones, estudios, recetas) y cada paso tiene a alguien a cargo. Lo que no tiene responsable queda marcado.
- **Agenda de turnos:** indica quién gestiona el turno y quién acompaña ese día.
- **Carpetas por diagnóstico:** por ejemplo, un tratamiento oncológico separado de la historia del día a día, con su propia privacidad. Un registro puede estar en más de una carpeta.
- **Ficha de emergencia** por perfil.

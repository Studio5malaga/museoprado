# Revisión IA 5 — VoiceMap y arquitectura de recorrido

## Aportación aceptada

IA 5 ha revisado correctamente la Ruta Maestra V0.2 y las fichas VoiceMap V0.1 desde el punto de vista técnico. Sus conclusiones más útiles son:

- La V0.2 mejora claramente la V0.1.
- Las zonas de vegetación densa, agua e interiores presentan mayor riesgo GPS.
- Las pistas que agrupan demasiados hitos deben dividirse.
- Las pausas deben formar parte del cierre de algunas estaciones, no convertirse necesariamente en pistas independientes.
- El texto debe funcionar aunque un edificio esté cerrado o el visitante no pueda acceder a su interior.
- La ruta necesita prueba física antes de fijar triggers, radios y tiempos.

## Pistas prioritarias para dividir

### Pista 16 — Primitivas, estanques e invernaderos

Dividir en:

1. Plantas primitivas.
2. Estanques de piedra e invernaderos.

Motivo: son espacios diferentes, con cambios visuales y posibles interiores.

### Pista 18 — Datileras, Jardín de los Sentidos y frutales

Dividir en:

1. Datileras y camino agrícola.
2. Jardín de los Sentidos y colección de frutales.

Motivo: evita mezclar tránsito, experiencia sensorial y botánica productiva.

### Pista 22 — Acueducto, Era, Olivo y Vides

Dividir en:

1. Ramal del Acueducto y Era.
2. Olivo y vides.

Motivo: separar infraestructura hidráulica de agricultura y paisaje.

### Pista 27 — Observatorio, cactus y cierre

Dividir en:

1. Observatorio y Ruta Forestal.
2. Cactus, regreso y cierre.

Motivo: el observatorio y el cierre tienen funciones diferentes; el cactus está en otro tramo del recorrido.

## Recomendación provisional de número de pistas

La propuesta de 27 bloques es una buena arquitectura de contenido, pero la configuración técnica final probablemente necesitará entre **29 y 31 audios**, no necesariamente 36.

La cifra definitiva dependerá de:

- Si las pausas se integran en estaciones.
- Si se divide la Ruta Forestal.
- Si los edificios son accesibles.
- Si las distancias reales obligan a crear tránsitos adicionales.
- Si algún audio supera la duración útil del tramo.

Objetivo de narración: aproximadamente 75–80 minutos, ajustable tras la prueba de campo.

## Zonas de riesgo GPS

### Riesgo alto

- Zona H8-H17: puentes, agua, curvas y vegetación densa.
- Invernaderos.
- Bambusal.
- Ruta Forestal.
- Cascadas y vaguadas.

### Riesgo medio

- Museo Loringiano.
- Casa-Palacio.
- Casa del Administrador.
- Casita del Jardinero.
- Casa de los Cipreses.

### Riesgo bajo

- Entrada.
- Lago.
- Avenida de Palmeras.
- Mirador abierto.

## Puntos con trigger propio probable

- Museo Loringiano.
- Gran Araucaria.
- Ría de la Ninfa.
- Cascada de Monsteras.
- Cascada de Rafael Echevarría.
- Cenador de las Glicinias.
- Lago.
- Colección de Palmeras.
- Mirador Histórico.
- Observatorio, si se mantiene en el máster.
- Cierre del tour.

## Corrección a la propuesta de reordenación de IA 5

IA 5 detecta un zigzag en los bloques 10–14, pero su solución debe ajustarse a la secuencia documental de la Ruta H.

No fijar aún una secuencia definitiva entre:

- González-Andreu.
- Ría de la Ninfa.
- Cascada de Monsteras.
- Araucaria.
- Cenador.
- Cascada de Rafael Echevarría.

La guía H y las rutas M/P se solapan en esta zona y utilizan códigos diferentes. Antes de decidir el orden final hay que comprobarlo caminando.

Criterio provisional:

- No repetir la Araucaria ni el Cenador.
- No activar la Cascada de Rafael Echevarría antes de que el visitante haya salido correctamente del tramo del Cenador.
- Mantener las dos cascadas como estaciones separadas.
- Incluir H11-H13 como conexión real, no como salto invisible.

## Tramos que requieren prueba de campo

1. H4-H5-H6-H7.
2. H8-H10-H11-H12-H13-H14.
3. H14-H15-H16-H17.
4. H17-H18-H19-H20.
5. Zona E completa.
6. Lago hacia Casa del Administrador y/o colección de palmeras.
7. Palmeras hacia Mirador Histórico.
8. Ruta Forestal hacia Observatorio.
9. Regreso desde Cactus y Lago hacia la salida.

## Decisiones para V0.3

- Mantener V0.2 organizada por zonas.
- Dividir las pistas 16, 18, 22 y 27.
- No crear silencios como pistas independientes salvo que VoiceMap lo requiera; integrarlos normalmente en el cierre de una estación.
- No fijar coordenadas ni radios todavía.
- Crear fichas V0.2 con 29–31 pistas provisionales.
- Revisar la suma de audio para acercarla a 75 minutos.
- Crear un cierre independiente.
- Mantener alternativas para Teatrillo, Mirador y Ruta Forestal.

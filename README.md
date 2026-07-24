# Prado Guía • Isaac y Jacob (Ribera)

Guía móvil interactiva para el cuadro **Isaac bendiciendo a Jacob** de José de Ribera (Sala 009, Museo del Prado).

## ✅ Últimos cambios (2026-07-23)

- Imagen del **cuadro sin marca de agua** (`Isaac-y-Jacob.jpg`)
- Sección **Ubicación** usa la infografía adjunta `RiberaEngaño.png` (tanto vista previa como modal)
- Sección **Infografía** ahora muestra la imagen completa `RiberaEngaño.png` con zoom al pulsar
- **5 audios MP3** integrados + **2 audios nuevos adjuntos**:
  - `audioguia.mp3`
  - `Laestafa.mp3`
- Botones específicos para los audios adjuntos

## Cómo subir los audios nuevos

**Opción más fácil (recomendada):**

1. Sube directamente a GitHub:
   - Ve a la carpeta `audio/` en el repositorio
   - Arrastra `audioguia.mp3` y `Laestafa.mp3`
   - Commit

2. O adjúntalos en el chat de Arena (se guardarán en `/home/user/uploads/` y luego los copiaré).

**Estructura esperada:**
```
museoprado/
├── audio/
│   ├── guia-0.mp3
│   ├── guia-1.mp3
│   ├── ...
│   ├── audioguia.mp3          ← TU ARCHIVO
│   └── Laestafa.mp3           ← TU ARCHIVO
├── images/
│   ├── Isaac-y-Jacob.jpg
│   ├── RiberaEngaño.png       ← TU IMAGEN (Mapa del Engaño)
│   └── ...
└── index.html
```

## Características

- 4 pestañas: Historia / Iluminación / Colores / Guiones
- Narración por voz (MP3 reales + fallback TTS)
- Demo interactivo de luz y colores
- Plano / Ubicación con la infografía oficial adjunta
- Cuestionario NotebookLM
- Diseño mobile-first

## Despliegue

El sitio está en: https://studio5malaga.github.io/museoprado/

## Instrucciones para audios

Los archivos `audioguia.mp3` y `Laestafa.mp3` deben colocarse en la carpeta `audio/`.

Una vez subidos, los botones "Audioguía completa" y "La estafa" funcionarán directamente.

---

**Prado Guía** – Studio5 Málaga
# Niedermeier Archiv - OnePage Gallery

Dies ist ein modernes, dateibasiertes Archiv-System für Kunst und Fotografie. Es nutzt **React** für das Frontend und **Python** für die automatisierte Bildverarbeitung.

## 🛠 Das "Minimale CMS" (Python)
Die Verwaltung der Inhalte erfolgt ohne Datenbank-Administration, nur über Dateinamen.

- **Pfad:** `public/assets/galerie/`
- **Skript:** `python generate_json.py`
- **Funktion:** Scannt Ordner, erstellt 400x400px Thumbs und schreibt die `src/assets/datenbank-onepage-gallery.json`.

## 🎨 Das "OnePage-Galerie" Design
Das Design reagiert dynamisch auf deine Benennung im Windows-Explorer:

1. **Hauptbild:** Eine Datei *ohne* Buchstaben-Präfix (z.B. `010_werk.jpg`). Wird als großes Cover oben angezeigt.
2. **Detail-Bilder:** Dateien mit Präfix `a_`, `b_`, `c_` (z.B. `a_detail.jpg`). Erscheinen als kleine Kacheln unter dem Hauptbild.
3. **Kapazität:** Ausgelegt auf 999 Galerien (Ordner 001 bis 999).

## 🚀 Deployment & Technik
- **Framework:** Vite + React (JavaScript)
- **Hosting:** Hostinger Cloud Startup Plan
- **Bilder:** Werden aus dem `public`-Verzeichnis serviert.
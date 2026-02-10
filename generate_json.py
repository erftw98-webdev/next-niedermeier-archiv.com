import os
import json
import re
from PIL import Image, ImageOps

# KONFIGURATION
SOURCE_FOLDER = './public/assets/galerie' 
OUTPUT_FILE = './src/assets/datenbank-onepage-gallery.json'
THUMB_SIZE = (400, 400)

def create_thumbnail(img_path, thumb_path):
    """Erstellt ein quadratisches Thumbnail (Center Crop)."""
    with Image.open(img_path) as img:
        # ImageOps.fit schneidet das Bild automatisch mittig auf die Zielgröße zu
        thumb = ImageOps.fit(img, THUMB_SIZE, Image.Resampling.LANCZOS)
        thumb.save(thumb_path, "JPEG", quality=85)

def generate_db():
    database = []
    pattern = re.compile(r'^(\d{3})')

    folders = [f for f in os.listdir(SOURCE_FOLDER) if os.path.isdir(os.path.join(SOURCE_FOLDER, f)) and pattern.match(f)]
    folders.sort()

    for folder_name in folders:
        folder_path = os.path.join(SOURCE_FOLDER, folder_name)
        thumb_folder = os.path.join(folder_path, 'thumbs')
        
        # Thumbs-Ordner erstellen falls nicht vorhanden
        if not os.path.exists(thumb_folder):
            os.makedirs(thumb_folder)

        match = pattern.match(folder_name)
        entry = {
            "id": match.group(1),
            "folder": folder_name,
            "images": []
        }

        # Nur Bilder im Hauptordner verarbeiten (nicht die im thumbs-ordner!)
        files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        
        for file in files:
            img_path = os.path.join(folder_path, file)
            thumb_path = os.path.join(thumb_folder, file)
            
            # Thumbnail generieren (nur wenn es noch nicht existiert oder neu erstellt werden soll)
            if not os.path.exists(thumb_path):
                print(f"Generiere Thumb für {folder_name}/{file}...")
                create_thumbnail(img_path, thumb_path)
            
            entry["images"].append(file)
        
        database.append(entry)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=4, ensure_ascii=False)
    
    print(f"\nFERTIG! {len(database)} Galerien verarbeitet.")
    print(f"Datenbank: {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_db()
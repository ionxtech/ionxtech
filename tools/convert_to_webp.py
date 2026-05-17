from PIL import Image
import os
import glob

img_dir = "assets/images"
pngs = glob.glob(os.path.join(img_dir, "*.png"))
jpgs = glob.glob(os.path.join(img_dir, "*.jpg"))

for img_path in pngs + jpgs:
    try:
        img = Image.open(img_path)
        webp_path = os.path.splitext(img_path)[0] + ".webp"
        img.save(webp_path, "webp", quality=85)
        print(f"Converted {img_path} to {webp_path}")
    except Exception as e:
        print(f"Error converting {img_path}: {e}")

import os
import glob
from PIL import Image, ImageFilter

def convert_to_insta_formats(source_dir, output_base_dir):
    os.makedirs(output_base_dir, exist_ok=True)
    dir_4x5 = os.path.join(output_base_dir, "instagram_4x5_1080x1350")
    dir_1x1 = os.path.join(output_base_dir, "instagram_1x1_1080x1080")
    os.makedirs(dir_4x5, exist_ok=True)
    os.makedirs(dir_1x1, exist_ok=True)
    
    files = sorted([f for f in os.listdir(source_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
    print(f"Converting {len(files)} files from {source_dir}...")
    
    for idx, fn in enumerate(files):
        src_path = os.path.join(source_dir, fn)
        with Image.open(src_path) as im:
            im = im.convert("RGBA")
            w, h = im.size
            
            # 1. Standard Instagram 1:1 (1080 x 1080)
            if w == h:
                im_1x1 = im.resize((1080, 1080), Image.Resampling.LANCZOS).convert("RGB")
            else:
                canvas_1x1 = Image.new("RGB", (1080, 1080), (250, 246, 240))
                bg_1x1 = im.resize((1080, 1080), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(30)).convert("RGB")
                canvas_1x1.paste(bg_1x1, (0, 0))
                ratio = min(1080 / w, 1080 / h)
                nw, nh = int(w * ratio), int(h * ratio)
                card_1x1 = im.resize((nw, nh), Image.Resampling.LANCZOS)
                canvas_1x1.paste(card_1x1, ((1080 - nw) // 2, (1080 - nh) // 2), card_1x1)
                im_1x1 = canvas_1x1
                
            out_1x1_path = os.path.join(dir_1x1, f"card_{idx+1:02d}.png")
            im_1x1.save(out_1x1_path, "PNG")
            
            # 2. Standard Instagram 4:5 (1080 x 1350)
            if abs((w / h) - 0.8) < 0.02:
                im_4x5 = im.resize((1080, 1350), Image.Resampling.LANCZOS).convert("RGB")
            else:
                canvas_4x5 = Image.new("RGB", (1080, 1350), (250, 246, 240))
                bg_4x5 = im.resize((1080, 1350), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(35)).convert("RGB")
                canvas_4x5.paste(bg_4x5, (0, 0))
                ratio_4x5 = min(1080 / w, 1350 / h)
                nw_4x5, nh_4x5 = int(w * ratio_4x5), int(h * ratio_4x5)
                card_4x5 = im.resize((nw_4x5, nh_4x5), Image.Resampling.LANCZOS)
                canvas_4x5.paste(card_4x5, ((1080 - nw_4x5) // 2, (1350 - nh_4x5) // 2), card_4x5)
                im_4x5 = canvas_4x5
                
            out_4x5_path = os.path.join(dir_4x5, f"card_{idx+1:02d}.png")
            im_4x5.save(out_4x5_path, "PNG")
            
        print(f"[{idx+1:02d}] Converted {fn} -> 1:1 (1080x1080) & 4:5 (1080x1350)")
        
    print("All conversions finished successfully!")

if __name__ == "__main__":
    convert_to_insta_formats(
        "C:/Users/user/Downloads/인스타2",
        "C:/Users/user/Documents/ChatGPT/New project/image-cards/insta2-formatted"
    )
    convert_to_insta_formats(
        "C:/Users/user/Documents/ChatGPT/New project/image-cards/moon-observation/sketch-cards",
        "C:/Users/user/Documents/ChatGPT/New project/image-cards/moon-observation/formatted"
    )
    convert_to_insta_formats(
        "C:/Users/user/Documents/ChatGPT/New project/image-cards/book-ai-agent/sketch-cards",
        "C:/Users/user/Documents/ChatGPT/New project/image-cards/book-ai-agent/formatted"
    )

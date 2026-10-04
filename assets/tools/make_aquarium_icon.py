from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps


SOURCE = Path("assets/processed/zebra-angelfish-single/clean.png")
OUTPUT = Path("assets/processed/zebra-angelfish-icon/aquarium-icon.png")


def main() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    alpha = source.getchannel("A")

    # Keep the silhouette compact like the category icons in the supplied UI.
    bbox = alpha.getbbox()
    cropped = source.crop(bbox)
    cropped.thumbnail((176, 176), Image.Resampling.LANCZOS)

    # Reduce photographic micro-detail into a controlled, readable icon palette.
    rgb = cropped.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(1.18)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.10)
    rgb = rgb.quantize(colors=28, method=Image.Quantize.MEDIANCUT).convert("RGB")
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.0, percent=120, threshold=3))

    alpha = cropped.getchannel("A")
    # A navy contour matches the screenshot's outlined fish icons.
    expanded = alpha.filter(ImageFilter.MaxFilter(9))
    outline = Image.new("RGBA", rgb.size, (9, 28, 49, 255))
    outline.putalpha(expanded)
    body = rgb.convert("RGBA")
    body.putalpha(alpha)
    icon = Image.alpha_composite(outline, body)

    canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    x = (256 - icon.width) // 2
    y = (256 - icon.height) // 2
    canvas.alpha_composite(icon, (x, y))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT)


if __name__ == "__main__":
    main()

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


SOURCE = Path("assets/references/zebra-angelfish-reference.png")
OUTPUT = Path("assets/raw/zebra-angelfish-reference-magenta.png")


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")
    # Hand traced around the visible fish silhouette in the supplied reference.
    # This is a deterministic extraction step; it does not invent new artwork.
    silhouette = [
        (326, 44), (392, 94), (470, 170), (566, 236), (670, 286),
        (780, 327), (904, 386), (1016, 454), (1044, 500), (1018, 532),
        (949, 554), (916, 615), (882, 702), (842, 806), (801, 937),
        (741, 1064), (684, 1149), (603, 1216), (515, 1258), (448, 1268),
        (500, 1206), (549, 1117), (593, 1012), (623, 919), (645, 833),
        (616, 760), (575, 690), (525, 629), (467, 603), (399, 597),
        (337, 579), (292, 553), (250, 524), (195, 480), (145, 458),
        (104, 463), (73, 480), (84, 455), (141, 429), (213, 423),
        (281, 438), (343, 461), (401, 478), (445, 468), (461, 431),
        (468, 374), (451, 313), (430, 259), (403, 208), (375, 152),
    ]
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).polygon(silhouette, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=1.2))
    background = Image.new("RGBA", image.size, (255, 0, 255, 255))
    result = Image.composite(image, background, mask)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    result.save(OUTPUT)


if __name__ == "__main__":
    main()

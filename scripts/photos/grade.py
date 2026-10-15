#!/usr/bin/env python3
"""Grade the client's job photos for the web.

Reads the untouched originals in photos/originals/, and for each photo in RECIPES:
crops, cleans up JPEG noise, upscales small phone/Instagram images 2x with the
FSRCNN super-resolution model, applies a light colour grade, and writes two
WebP files to src/assets/images/work/: <name>.webp (long edge up to 1600px) and
<name>-sm.webp (720px wide) for the srcset. Metadata is never copied across.

Also writes the logo in two versions (for dark and light backgrounds) and the
1200x630 social sharing image.

    pip install pillow numpy opencv-contrib-python-headless fonttools brotli
    python3 scripts/photos/grade.py            # everything
    python3 scripts/photos/grade.py media-wall # one photo
    python3 scripts/photos/grade.py --sheet    # also save a before/after contact sheet to .cache/

The FSRCNN model (39 kB) is downloaded on first run into scripts/photos/.cache/.
Without it the script falls back to Lanczos resampling.
"""

from __future__ import annotations

import io
import json
import sys
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

try:
    import cv2
except ImportError:  # pragma: no cover
    cv2 = None

ROOT = Path(__file__).resolve().parents[2]
ORIGINALS = ROOT / 'photos' / 'originals'
OUT = ROOT / 'src' / 'assets' / 'images' / 'work'
BRAND = ROOT / 'src' / 'assets' / 'brand'
CACHE = Path(__file__).resolve().parent / '.cache'
MODEL_URL = 'https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x2.pb'

LARGE_EDGE = 1600
SMALL_WIDTH = 720


@dataclass
class Recipe:
    source: str
    # Crop box as fractions of the original (left, top, right, bottom).
    crop: tuple[float, float, float, float] = (0, 0, 1, 1)
    rotate: float = 0.0  # degrees, anticlockwise
    denoise: int = 3  # strength of the JPEG/noise clean-up (0 = off)
    white_balance: float = 0.0  # 0..1, how far to pull mid-tones towards neutral grey
    temperature: float = 0.0  # + warmer, - cooler
    exposure: float = 0.0  # stops
    shadows: float = 0.0  # lift (+) or deepen (-) shadows
    highlights: float = 0.0  # recover (-) or push (+) highlights
    contrast: float = 0.12
    clarity: float = 0.25  # local contrast (CLAHE) blend
    vibrance: float = 0.12
    saturation: float = 0.0
    split_tone: float = 0.25  # navy shadows / warm highlights
    vignette: float = 0.12
    sharpen: float = 0.6
    extra: dict = field(default_factory=dict)


# One look across the set: clean whites, warm light, cool navy shadows. Dusk
# shots keep their glow; interiors are neutralised and brightened.
RECIPES: dict[str, Recipe] = {
    'media-wall': Recipe('media-wall.jpg', crop=(0, 0.04, 1, 1), denoise=4, white_balance=0.35, exposure=0.08, shadows=0.12, contrast=0.14, clarity=0.3, vibrance=0.14, split_tone=0.3, vignette=0.16),
    'media-wall-angle': Recipe('media-wall-angle.jpg', crop=(0, 0.03, 1, 1), denoise=4, white_balance=0.35, exposure=0.06, shadows=0.12, contrast=0.14, clarity=0.3, vibrance=0.14, split_tone=0.3, vignette=0.16),
    'hero': Recipe('media-wall.jpg', crop=(0, 0.07, 1, 0.92), denoise=4, white_balance=0.35, exposure=0.06, shadows=0.1, contrast=0.16, clarity=0.3, vibrance=0.14, split_tone=0.3, vignette=0.2),
    'kitchen-peninsula': Recipe('kitchen-peninsula.jpg', denoise=3, white_balance=0.7, temperature=-0.01, exposure=0.22, shadows=0.12, highlights=-0.05, contrast=0.12, clarity=0.3, vibrance=0.08, split_tone=0.15, vignette=0.1),
    'kitchen-corner': Recipe('kitchen-corner.jpg', crop=(0, 0, 1, 0.97), denoise=3, white_balance=0.7, exposure=0.2, shadows=0.12, highlights=-0.08, contrast=0.12, clarity=0.3, vibrance=0.08, split_tone=0.15, vignette=0.1),
    'kitchen-window': Recipe('kitchen-window.jpg', crop=(0, 0, 0.87, 1), denoise=3, white_balance=0.7, exposure=0.16, shadows=0.12, highlights=-0.1, contrast=0.12, clarity=0.3, vibrance=0.08, split_tone=0.15, vignette=0.1),
    'kitchen-strip-out': Recipe('kitchen-strip-out.jpg', denoise=3, white_balance=0.3, exposure=0.1, shadows=0.14, contrast=0.16, clarity=0.35, vibrance=0.1, split_tone=0.25, vignette=0.16),
    'kitchen-strip-out-electrician': Recipe('kitchen-strip-out-electrician.jpg', denoise=3, white_balance=0.3, exposure=0.1, shadows=0.14, contrast=0.16, clarity=0.35, vibrance=0.1, split_tone=0.25, vignette=0.16),
    'consumer-unit': Recipe('consumer-unit.jpg', crop=(0, 0.02, 1, 1), denoise=2, white_balance=0.45, exposure=0.12, shadows=0.16, highlights=-0.2, contrast=0.14, clarity=0.3, vibrance=0.16, split_tone=0.2, vignette=0.14),
    'garage-wall-lights': Recipe('garage-wall-lights.jpg', denoise=5, white_balance=0.1, shadows=0.12, highlights=-0.1, contrast=0.14, clarity=0.25, vibrance=0.16, split_tone=0.35, vignette=0.18),
    'garage-wall-lights-close': Recipe('garage-wall-lights-close.jpg', denoise=5, white_balance=0.1, shadows=0.12, highlights=-0.1, contrast=0.14, clarity=0.25, vibrance=0.16, split_tone=0.35, vignette=0.18),
    'garage-floodlight': Recipe('garage-floodlight.jpg', denoise=4, white_balance=0.2, exposure=0.05, shadows=0.12, highlights=-0.12, contrast=0.14, clarity=0.25, vibrance=0.16, split_tone=0.25, vignette=0.14),
    'soffit-downlights': Recipe('soffit-downlights.jpg', denoise=4, white_balance=0.2, exposure=0.06, shadows=0.12, highlights=-0.12, contrast=0.14, clarity=0.25, vibrance=0.16, split_tone=0.28, vignette=0.14),
    'extension-uplights': Recipe('extension-uplights.jpg', crop=(0.07, 0.03, 1, 0.86), denoise=6, white_balance=0.05, shadows=0.1, highlights=-0.08, contrast=0.14, clarity=0.22, vibrance=0.14, split_tone=0.38, vignette=0.2),
    'decking-lights': Recipe('decking-lights.jpg', denoise=5, white_balance=0.1, shadows=0.1, highlights=-0.08, contrast=0.14, clarity=0.25, vibrance=0.12, split_tone=0.35, vignette=0.18),
    'cctv-dome': Recipe('cctv-dome.jpg', denoise=4, white_balance=0.15, exposure=0.02, shadows=0.08, highlights=-0.1, contrast=0.12, clarity=0.25, vibrance=0.12, split_tone=0.2, vignette=0.14),
    'air-conditioning': Recipe('air-conditioning.jpg', crop=(0, 0, 1, 0.68), denoise=2, white_balance=0.25, exposure=0.04, shadows=0.1, highlights=-0.12, contrast=0.12, clarity=0.25, vibrance=0.16, split_tone=0.2, vignette=0.12),
}


# --- helpers ----------------------------------------------------------------

def load_rgb(name: str) -> np.ndarray:
    with Image.open(ORIGINALS / name) as im:
        return np.asarray(im.convert('RGB'), dtype=np.float32) / 255.0


def luminance(rgb: np.ndarray) -> np.ndarray:
    return rgb[..., 0] * 0.2126 + rgb[..., 1] * 0.7152 + rgb[..., 2] * 0.0722


def smoothstep(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


_sr = None


def super_resolution():
    global _sr
    if _sr is not None or cv2 is None or not hasattr(cv2, 'dnn_superres'):
        return _sr
    model = CACHE / 'FSRCNN_x2.pb'
    if not model.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        try:
            urllib.request.urlretrieve(MODEL_URL, model)
        except Exception as err:  # offline: fall back to Lanczos
            print(f'  (no super-resolution model: {err})')
            return None
    _sr = cv2.dnn_superres.DnnSuperResImpl_create()
    _sr.readModel(str(model))
    _sr.setModel('fsrcnn', 2)
    return _sr


def to_u8(rgb: np.ndarray) -> np.ndarray:
    return (np.clip(rgb, 0, 1) * 255 + 0.5).astype(np.uint8)


def denoise(rgb: np.ndarray, strength: int) -> np.ndarray:
    if strength <= 0 or cv2 is None:
        return rgb
    bgr = cv2.cvtColor(to_u8(rgb), cv2.COLOR_RGB2BGR)
    clean = cv2.fastNlMeansDenoisingColored(bgr, None, strength, strength, 5, 15)
    return cv2.cvtColor(clean, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0


def upscale_if_small(rgb: np.ndarray) -> np.ndarray:
    h, w = rgb.shape[:2]
    if max(h, w) >= LARGE_EDGE:
        return rgb
    sr = super_resolution()
    if sr is None:
        im = Image.fromarray(to_u8(rgb)).resize((w * 2, h * 2), Image.LANCZOS)
        return np.asarray(im, dtype=np.float32) / 255.0
    bgr = cv2.cvtColor(to_u8(rgb), cv2.COLOR_RGB2BGR)
    up = sr.upsample(bgr)
    return cv2.cvtColor(up, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0


def white_balance(rgb: np.ndarray, strength: float) -> np.ndarray:
    if strength <= 0:
        return rgb
    lum = luminance(rgb)
    mask = (lum > 0.25) & (lum < 0.85)
    if mask.sum() < 1000:
        return rgb
    means = rgb[mask].mean(0)
    gains = (means.mean() / np.maximum(means, 1e-4)) ** strength
    return rgb * gains


def temperature(rgb: np.ndarray, amount: float) -> np.ndarray:
    if amount == 0:
        return rgb
    return rgb * np.array([1 + amount, 1 + amount * 0.25, 1 - amount], dtype=np.float32)


def tone(rgb: np.ndarray, r: Recipe) -> np.ndarray:
    # Exposure on approximately linear light.
    if r.exposure:
        lin = np.power(np.clip(rgb, 0, 1), 2.2) * (2 ** r.exposure)
        rgb = np.power(np.clip(lin, 0, None), 1 / 2.2)
    # Gentle black/white point stretch.
    lum = luminance(rgb)
    lo, hi = np.percentile(lum, 0.4), np.percentile(lum, 99.85)
    lo = min(lo, 0.06) * 0.8
    hi = max(hi, 0.9)
    rgb = (rgb - lo) / (hi - lo)
    lum = np.clip(luminance(rgb), 1e-4, None)
    target = lum.copy()
    if r.shadows:
        target = target + r.shadows * np.power(1 - np.clip(target, 0, 1), 3) * np.clip(target, 0, 1) * 2.2
    if r.highlights:
        t = np.clip(target, 0, 1)
        target = target + r.highlights * np.power(t, 3) * (1 - t) * 3.0
    if r.contrast:
        target = target + r.contrast * (smoothstep(target) - target) * 2
    rgb = rgb * (target / lum)[..., None]
    return rgb


def clarity(rgb: np.ndarray, amount: float) -> np.ndarray:
    if amount <= 0 or cv2 is None:
        return rgb
    lab = cv2.cvtColor(to_u8(rgb), cv2.COLOR_RGB2LAB)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l2 = clahe.apply(lab[..., 0])
    lab2 = lab.copy()
    lab2[..., 0] = l2
    out = cv2.cvtColor(lab2, cv2.COLOR_LAB2RGB).astype(np.float32) / 255.0
    return rgb * (1 - amount) + out * amount


def vibrance(rgb: np.ndarray, vib: float, sat: float) -> np.ndarray:
    if not vib and not sat:
        return rgb
    lum = luminance(rgb)[..., None]
    chroma = rgb - lum
    s = np.abs(chroma).max(-1, keepdims=True)
    boost = 1 + sat + vib * (1 - np.clip(s * 2.5, 0, 1))
    return lum + chroma * boost


def split_tone(rgb: np.ndarray, amount: float) -> np.ndarray:
    if amount <= 0:
        return rgb
    lum = np.clip(luminance(rgb), 0, 1)[..., None]
    shadow_tint = np.array([-0.035, -0.008, 0.045], dtype=np.float32)  # towards brand navy
    highlight_tint = np.array([0.03, 0.012, -0.03], dtype=np.float32)  # warm lamp light
    w_sh = np.power(1 - lum, 2)
    w_hi = np.power(lum, 2)
    return rgb + amount * (w_sh * shadow_tint + w_hi * highlight_tint)


def vignette(rgb: np.ndarray, amount: float) -> np.ndarray:
    if amount <= 0:
        return rgb
    h, w = rgb.shape[:2]
    y, x = np.ogrid[-1:1:complex(0, h), -1:1:complex(0, w)]
    d = np.sqrt(x * x + y * y) / np.sqrt(2)
    mask = 1 - amount * smoothstep((d - 0.45) / 0.55)
    return rgb * mask[..., None]


def resize(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def save_webp(im: Image.Image, path: Path, sharpen: float, quality: int = 80) -> None:
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.9, percent=int(sharpen * 100), threshold=2))
    im.save(path, 'WEBP', quality=quality, method=6)


# --- pipeline ---------------------------------------------------------------

def grade(name: str, r: Recipe) -> tuple[Image.Image, Image.Image]:
    original = Image.open(ORIGINALS / r.source).convert('RGB')
    rgb = np.asarray(original, dtype=np.float32) / 255.0
    if r.rotate:
        im = Image.fromarray(to_u8(rgb)).rotate(r.rotate, Image.BICUBIC, expand=False)
        rgb = np.asarray(im, dtype=np.float32) / 255.0
    h, w = rgb.shape[:2]
    l, t, rr, b = r.crop
    rgb = rgb[round(t * h):round(b * h), round(l * w):round(rr * w)]
    before = Image.fromarray(to_u8(rgb))

    rgb = denoise(rgb, r.denoise)
    rgb = upscale_if_small(rgb)
    rgb = white_balance(rgb, r.white_balance)
    rgb = temperature(rgb, r.temperature)
    rgb = tone(np.clip(rgb, 0, 1), r)
    rgb = clarity(np.clip(rgb, 0, 1), r.clarity)
    rgb = vibrance(rgb, r.vibrance, r.saturation)
    rgb = split_tone(rgb, r.split_tone)
    rgb = vignette(rgb, r.vignette)
    after = Image.fromarray(to_u8(rgb))

    large = after
    if max(large.size) > LARGE_EDGE:
        scale = LARGE_EDGE / max(large.size)
        large = large.resize((round(large.width * scale), round(large.height * scale)), Image.LANCZOS)
    small = resize(after, SMALL_WIDTH)
    OUT.mkdir(parents=True, exist_ok=True)
    save_webp(large, OUT / f'{name}.webp', r.sharpen, quality=80)
    save_webp(small, OUT / f'{name}-sm.webp', r.sharpen * 0.8, quality=78)
    print(f'  {name}: {large.size[0]}x{large.size[1]} + {small.size[0]}x{small.size[1]}')
    return before, after


def logos() -> None:
    """The client's logo, trimmed, for dark backgrounds and (recoloured) light ones."""
    BRAND.mkdir(parents=True, exist_ok=True)
    src = Image.open(ORIGINALS / 'logo.png').convert('RGBA')
    src = src.crop(src.getbbox())
    a = np.asarray(src).astype(np.float32)
    # "Electrical Ltd" and its rules are white with a dark outline. For light
    # backgrounds, turn that white into brand navy (#0A1E45). Only the text band
    # below the cables is touched.
    light = a.copy()
    h = light.shape[0]
    band = np.zeros(light.shape[:2], bool)
    band[int(h * 0.835):] = True
    rgb = light[..., :3]
    whiteness = np.clip((rgb.min(-1) - 150) / 105, 0, 1)
    k = (whiteness * band)[..., None]
    navy = np.array([10, 30, 69], dtype=np.float32)
    light[..., :3] = rgb * (1 - k) + navy * k
    for suffix, arr in (('dark', a), ('light', light)):
        im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA')
        for width in (320, 640):
            out = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            out.save(BRAND / f'logo-on-{suffix}-{width}.webp', 'WEBP', quality=88, method=6)
        im.resize((640, round(im.height * 640 / im.width)), Image.LANCZOS).save(BRAND / f'logo-on-{suffix}.png', optimize=True)
    print('  logos written')


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    from fontTools.ttLib import TTFont

    tt = TTFont(str(path))
    tt.flavor = None
    buf = io.BytesIO()
    tt.save(buf)
    buf.seek(0)
    return ImageFont.truetype(buf, size)


def social_image() -> None:
    """1200x630 sharing image: the media wall, a navy wash, the logo and a line of text."""
    W, H = 1200, 630
    photo = Image.open(OUT / 'hero.webp').convert('RGB')
    scale = max(W / photo.width, H / photo.height)
    photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    left = photo.width - W
    top = round((photo.height - H) * 0.62)
    photo = photo.crop((left, top, left + W, top + H))
    canvas = np.asarray(photo, dtype=np.float32)
    x = np.linspace(0, 1, W)[None, :, None]
    wash = np.clip(1.15 - x * 1.5, 0, 1) * 0.92
    navy = np.array([10, 30, 69], dtype=np.float32)
    canvas = canvas * (1 - wash) + navy * wash
    img = Image.fromarray(canvas.astype(np.uint8)).convert('RGBA')
    logo = Image.open(BRAND / 'logo-on-dark.png').convert('RGBA')
    lw = 470
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    img.alpha_composite(logo, (64, 70))
    draw = ImageDraw.Draw(img)
    fonts = ROOT / 'src' / 'assets' / 'fonts'
    head = font(fonts / 'barlow-condensed-latin-800-italic.woff2', 76)
    body = font(fonts / 'barlow-latin-600-normal.woff2', 30)
    y = 70 + logo.height + 46
    draw.text((64, y), 'EXPERT ELECTRICAL', font=head, fill='white')
    y += 78
    tw = draw.textlength('SOLUTIONS', font=head)
    draw.polygon([(60 + 10, y + 8), (60 + tw + 26, y + 8), (60 + tw + 14, y + 84), (60 - 2, y + 84)], fill=(200, 16, 46))
    draw.text((68, y), 'SOLUTIONS', font=head, fill='white')
    draw.text((64, H - 84), 'NICEIC Approved  ·  Essex & London  ·  07964 154458', font=body, fill=(233, 237, 245))
    img.convert('RGB').save(ROOT / 'public' / 'og.jpg', 'JPEG', quality=86, optimize=True, progressive=True)
    print('  public/og.jpg written')


def contact_sheet(pairs: list[tuple[str, Image.Image, Image.Image]], path: Path) -> None:
    tile = 360
    rows = []
    for name, before, after in pairs:
        b = before.copy()
        b.thumbnail((tile, tile))
        a = after.copy()
        a.thumbnail((tile, tile))
        row = Image.new('RGB', (tile * 2 + 30, tile + 26), 'white')
        row.paste(b, (0, 26))
        row.paste(a, (tile + 30, 26))
        ImageDraw.Draw(row).text((4, 6), f'{name}: before / after', fill='black')
        rows.append(row)
    cols = 2
    sheet = Image.new('RGB', ((tile * 2 + 50) * cols, (tile + 36) * ((len(rows) + 1) // cols)), (230, 230, 230))
    for i, row in enumerate(rows):
        sheet.paste(row, ((i % cols) * (tile * 2 + 50), (i // cols) * (tile + 36)))
    sheet.save(path, quality=85)
    print(f'  contact sheet: {path}')


def write_manifest() -> None:
    """Pixel sizes of every graded photo, read by src/assets/images/work.ts."""
    manifest = {}
    for name in sorted(RECIPES):
        with Image.open(OUT / f'{name}.webp') as large, Image.open(OUT / f'{name}-sm.webp') as small:
            manifest[name] = {'width': large.width, 'height': large.height, 'smallWidth': small.width}
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print('  manifest.json written')


def main(argv: list[str]) -> None:
    sheet = '--sheet' in argv
    names = [a for a in argv if not a.startswith('--')] or list(RECIPES)
    pairs = []
    for name in names:
        before, after = grade(name, RECIPES[name])
        pairs.append((name, before, after))
    write_manifest()
    if len(names) == len(RECIPES):
        logos()
        social_image()
    if sheet:
        CACHE.mkdir(parents=True, exist_ok=True)
        contact_sheet(pairs, CACHE / 'contact-sheet.jpg')


if __name__ == '__main__':
    main(sys.argv[1:])

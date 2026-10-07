import math
from PIL import Image, ImageDraw, ImageFilter

def create_docmatrix_icon(size=1024):
    scale = size / 512.0

    def s(v):
        return v * scale

    # 1. Base Image
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # Gradient background (Deep Emerald / Forest Slate)
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    bg_draw = ImageDraw.Draw(bg)
    c_top = (14, 61, 47)      # #0E3D2F
    c_mid = (11, 53, 40)      # #0B3528
    c_bot = (5, 28, 20)       # #051C14

    for y in range(size):
        t = y / float(size)
        if t < 0.5:
            factor = t / 0.5
            r = int(c_top[0] * (1 - factor) + c_mid[0] * factor)
            g = int(c_top[1] * (1 - factor) + c_mid[1] * factor)
            b = int(c_top[2] * (1 - factor) + c_mid[2] * factor)
        else:
            factor = (t - 0.5) / 0.5
            r = int(c_mid[0] * (1 - factor) + c_bot[0] * factor)
            g = int(c_mid[1] * (1 - factor) + c_bot[1] * factor)
            b = int(c_mid[2] * (1 - factor) + c_bot[2] * factor)
        bg_draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Rounded squircle mask
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = int(s(116))
    mask_draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner_radius, fill=255)

    base.paste(bg, (0, 0), mask)

    # Outer border (Mint glow)
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle(
        [s(6), s(6), size - s(7), size - s(7)],
        radius=int(s(110)),
        outline=(16, 185, 129, 140),
        width=int(s(6))
    )

    # 2. Ambient Core Radial Glow
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        [s(256 - 190), s(256 - 190), s(256 + 190), s(256 + 190)],
        fill=(16, 185, 129, 90)
    )
    glow = glow.filter(ImageFilter.GaussianBlur(int(s(45))))
    base = Image.alpha_composite(base, glow)
    draw = ImageDraw.Draw(base)

    # 3. Matrix Orbit Rings
    def draw_dashed_circle(cx, cy, r, color, dash_len=10, space_len=10, width=2.5):
        circumference = 2 * math.pi * r
        num_dashes = int(circumference / (dash_len + space_len))
        if num_dashes == 0:
            return
        step = (2 * math.pi) / num_dashes
        for i in range(num_dashes):
            start_angle = i * step
            end_angle = start_angle + (dash_len / circumference) * 2 * math.pi
            pts = []
            for a_idx in range(6):
                angle = start_angle + (end_angle - start_angle) * (a_idx / 5.0)
                pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
            draw.line(pts, fill=color, width=int(width))

    draw_dashed_circle(s(256), s(256), s(196), (5, 150, 105, 75), dash_len=s(10), space_len=s(10), width=s(2.5))
    draw_dashed_circle(s(256), s(256), s(140), (16, 185, 129, 65), dash_len=s(8), space_len=s(8), width=s(2))

    # 4. Matrix Corner Connectors & Nodes
    corner_nodes = [
        (s(110), s(110), (16, 185, 129), (52, 211, 153)),
        (s(402), s(110), (5, 150, 105), (16, 185, 129)),
        (s(110), s(402), (5, 150, 105), (16, 185, 129)),
        (s(402), s(402), (16, 185, 129), (52, 211, 153)),
    ]

    diag_targets = [(s(185), s(185)), (s(327), s(185)), (s(185), s(327)), (s(327), s(327))]
    for (nx, ny, _, _), (tx, ty) in zip(corner_nodes, diag_targets):
        dx = tx - nx
        dy = ty - ny
        dist = math.hypot(dx, dy)
        steps = int(dist / s(14))
        for step_i in range(0, steps, 2):
            p1 = (nx + dx * (step_i / steps), ny + dy * (step_i / steps))
            p2 = (nx + dx * (min(step_i + 1, steps) / steps), ny + dy * (min(step_i + 1, steps) / steps))
            draw.line([p1, p2], fill=(16, 185, 129, 90), width=int(s(2.5)))

    for nx, ny, stroke_c, fill_c in corner_nodes:
        draw.ellipse([nx - s(18), ny - s(18), nx + s(18), ny + s(18)], fill=(11, 53, 40, 255), outline=stroke_c + (220,), width=int(s(3.5)))
        draw.ellipse([nx - s(7), ny - s(7), nx + s(7), ny + s(7)], fill=fill_c + (255,))

    # 5. Bold Healthcare Cross (Emerald to Mint gradient)
    cross_grad = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cg_draw = ImageDraw.Draw(cross_grad)
    c1 = (5, 150, 105)    # #059669
    c2 = (16, 185, 129)   # #10B981
    c3 = (52, 211, 153)   # #34D399

    for y in range(size):
        t = y / float(size)
        if t < 0.5:
            factor = t / 0.5
            r = int(c1[0] * (1 - factor) + c2[0] * factor)
            g = int(c1[1] * (1 - factor) + c2[1] * factor)
            b = int(c1[2] * (1 - factor) + c2[2] * factor)
        else:
            factor = (t - 0.5) / 0.5
            r = int(c2[0] * (1 - factor) + c3[0] * factor)
            g = int(c2[1] * (1 - factor) + c3[1] * factor)
            b = int(c2[2] * (1 - factor) + c3[2] * factor)
        cg_draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    cross_mask = Image.new("L", (size, size), 0)
    cm_draw = ImageDraw.Draw(cross_mask)
    cm_draw.rounded_rectangle([s(204), s(96), s(308), s(416)], radius=int(s(34)), fill=255)
    cm_draw.rounded_rectangle([s(96), s(204), s(416), s(308)], radius=int(s(34)), fill=255)

    cross_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cross_img.paste(cross_grad, (0, 0), cross_mask)

    # Glow shadow behind cross
    cross_glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cglow_draw = ImageDraw.Draw(cross_glow)
    cglow_draw.rounded_rectangle([s(204), s(96), s(308), s(416)], radius=int(s(34)), fill=(16, 185, 129, 140))
    cglow_draw.rounded_rectangle([s(96), s(204), s(416), s(308)], radius=int(s(34)), fill=(16, 185, 129, 140))
    cross_glow = cross_glow.filter(ImageFilter.GaussianBlur(int(s(20))))

    base = Image.alpha_composite(base, cross_glow)
    base = Image.alpha_composite(base, cross_img)

    # 6. Central Pulse (ECG Heartbeat line)
    pulse_pts = [
        (s(120), s(256)),
        (s(192), s(256)),
        (s(212), s(276)),
        (s(244), s(146)),
        (s(274), s(362)),
        (s(302), s(236)),
        (s(322), s(256)),
        (s(392), s(256)),
    ]

    # Pulse Mint Glow Layer
    glow_mask = Image.new("L", (size, size), 0)
    gm_draw = ImageDraw.Draw(glow_mask)
    gm_draw.line(pulse_pts, fill=255, width=int(s(24)), joint="round")
    for pt in pulse_pts:
        gm_draw.ellipse([pt[0] - s(12), pt[1] - s(12), pt[0] + s(12), pt[1] + s(12)], fill=255)

    pulse_glow = Image.new("RGBA", (size, size), (16, 185, 129, 210))
    pulse_glow_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pulse_glow_layer.paste(pulse_glow, (0, 0), glow_mask)
    pulse_glow_layer = pulse_glow_layer.filter(ImageFilter.GaussianBlur(int(s(7))))
    base = Image.alpha_composite(base, pulse_glow_layer)

    # Pulse Crisp White Stroke Layer
    white_mask = Image.new("L", (size, size), 0)
    wm_draw = ImageDraw.Draw(white_mask)
    wm_draw.line(pulse_pts, fill=255, width=int(s(14)), joint="round")
    for pt in pulse_pts:
        wm_draw.ellipse([pt[0] - s(7), pt[1] - s(7), pt[0] + s(7), pt[1] + s(7)], fill=255)

    white_layer = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    base.paste(white_layer, (0, 0), white_mask)

    draw = ImageDraw.Draw(base)

    # Data Matrix Peak Dots
    draw.ellipse([s(244) - s(9), s(146) - s(9), s(244) + s(9), s(146) + s(9)], fill=(52, 211, 153, 255))
    draw.ellipse([s(244) - s(4), s(146) - s(4), s(244) + s(4), s(146) + s(4)], fill=(255, 255, 255, 255))

    draw.ellipse([s(274) - s(9), s(362) - s(9), s(274) + s(9), s(362) + s(9)], fill=(16, 185, 129, 255))
    draw.ellipse([s(274) - s(4), s(362) - s(4), s(274) + s(4), s(362) + s(4)], fill=(255, 255, 255, 255))

    return base

if __name__ == '__main__':
    print("Generating refined master icon in fresh medical green...")
    master = create_docmatrix_icon(1024)
    master.save(r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\icon-master-1024.png", "PNG")

    sizes = [
        (512, r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\android-chrome-512x512.png"),
        (192, r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\android-chrome-192x192.png"),
        (180, r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\apple-touch-icon.png"),
        (48,  r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\favicon-48x48.png"),
        (32,  r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\favicon-32x32.png"),
        (16,  r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\favicon-16x16.png"),
    ]

    for sz, path in sizes:
        resized = master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(path, "PNG")
        print(f"Saved {path}")

    # Generate multi-size favicon.ico (16, 32, 48)
    ico_img = master.resize((48, 48), Image.Resampling.LANCZOS)
    ico_img.save(
        r"c:\Users\LENOVO\Desktop\doc-matrix - Copy\doc-matrix\public\favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("Saved favicon.ico")

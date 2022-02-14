import sys
from fontTools.ttLib import TTFont
# electron-builder --mac

font_path = sys.argv[1]

def get_best_family_name(font_obj):
    for name_id in [21, 16, 1]:
        name = font_obj['name'].getDebugName(name_id)
        if name is not None:
            return name

font_obj = TTFont(font_path)
fam_name = get_best_family_name(font_obj)

print(f"fam_name: {fam_name}")

sys.stdout.flush()
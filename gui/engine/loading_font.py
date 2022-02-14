import sys
from fontTools.ttLib import TTFont
# electron-builder --mac
# pip install --target=/Users/ollimeier/Documents/GitHub/olli/electron-quick-start/gui/python/lib/python3.9/site-packages fonttools
# wget https://github.com/indygreg/python-build-standalone/releases/download/20210724/cpython-3.9.6-x86_64-apple-darwin-install_only-20210724T1424.tar.gz
# tar -xzvf cpython-3.9.6-x86_64-apple-darwin-install_only-20210724T1424.tar.gz
# pip install --target=/Users/ollimeier/Documents/GitHub/olli/electron-quick-start/gui/python/lib/python3.9/site-packages spawn
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
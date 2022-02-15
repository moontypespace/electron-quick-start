import sys
import io
from fontTools.ttLib import TTFont
# electron-builder --mac
# pip install --target=/Users/ollimeier/Documents/GitHub/olli/electron-quick-start/gui/python/lib/python3.9/site-packages fonttools
# wget https://github.com/indygreg/python-build-standalone/releases/download/20210724/cpython-3.9.6-x86_64-apple-darwin-install_only-20210724T1424.tar.gz
# tar -xzvf cpython-3.9.6-x86_64-apple-darwin-install_only-20210724T1424.tar.gz
# pip install --target=/Users/ollimeier/Documents/GitHub/olli/electron-quick-start/gui/python/lib/python3.9/site-packages spawn

font_path = sys.argv[1]
font_table_tag = sys.argv[2]

def get_font_table_ttx(font_path, font_table_tag):
    font_obj = TTFont(font_path)
    f = io.StringIO()
    font_obj.saveXML(f, tables=[font_table_tag])
    ttx = f.getvalue().splitlines()
    ttx = ttx[3:-2]  # strip XML header and <ttFont> element
    return ttx

font_table_ttx = get_font_table_ttx(font_path, font_table_tag)

print(font_table_ttx)

sys.stdout.flush()
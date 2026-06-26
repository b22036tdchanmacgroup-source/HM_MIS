import urllib.request
import re

url = "https://b22036tdchanmacgroup-source.github.io/HM_MISystem/"
try:
    response = urllib.request.urlopen(url)
    html = response.read().decode('utf-8')
    print("HTML Length:", len(html))
    
    # Find script src
    match = re.search(r'src="([^"]+)"', html)
    if match:
        print("Found src:", match.group(1))
        js_url = url + match.group(1).lstrip('/')
        print("JS URL:", js_url)
        js_response = urllib.request.urlopen(js_url)
        js_content = js_response.read().decode('utf-8')
        print("JS Length:", len(js_content))
        with open("C:/Users/user/.gemini/antigravity/scratch/ref_js.js", "w", encoding="utf-8") as f:
            f.write(js_content)
        print("Saved JS file.")
    else:
        print("No script src found.")
except Exception as e:
    print("Error:", e)

#!/usr/bin/env python3
import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import re
import random
import sys
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

MANYAO_QUERIES = [
    "manyao remix 慢摇",
    "慢摇 嗨曲 2026",
    "manyao edm remix",
    "92ccdj manyao mix",
    "dj remix 慢摇 抖音",
    "全中文慢摇 舞曲",
    "夜店慢摇 嗨曲",
    "electro manyao remix",
    "慢摇 重低音 舞曲",
    "manyao lover remix",
    "越南鼓 慢摇 remix"
]

MANYAO_MIX_QUERIES = [
    "manyao nonstop",
    "manyao remix",
    "92ccdj manyao",
    "chinese dj manyao nonstop",
    "manyao club mix",
    "electro manyao nonstop",
    "dj manyao full bass",
    "chinese dj remix nonstop"
]

# Cache for SoundCloud client_id
_cached_sc_client_id = "Pb72ranhoyt6gw7hM7TkzUItXlMWSNSo"

def get_soundcloud_client_id():
    global _cached_sc_client_id
    try:
        url = "https://soundcloud.com"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
            scripts = re.findall(r"window\.__sc_hydration\s*=\s*(\[.*?\]);</script>", html, re.DOTALL)
            if scripts:
                data = json.loads(scripts[0])
                for item in data:
                    if item.get("hydratable") == "apiClient":
                        cid = item.get("data", {}).get("id")
                        if cid:
                            _cached_sc_client_id = cid
                            return cid
    except Exception as e:
        print("SoundCloud client ID auto-refresh failed, using cached:", e)
    return _cached_sc_client_id

def format_duration(seconds):
    if not seconds:
        return "1h+"
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    if h > 0:
        return f"{h}h {m}m" if m > 0 else f"{h} hrs"
    return f"{m}m"

def search_youtube(query, max_results=15):
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={encoded_query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
    }
    req = urllib.request.Request(url, headers=headers)
    videos = []
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode("utf-8", errors="ignore")
            match = re.search(r"var ytInitialData = ({.*?});</script>", html)
            if match:
                data = json.loads(match.group(1))
                sections = data.get("contents", {}).get("twoColumnSearchResultsRenderer", {}).get("primaryContents", {}).get("sectionListRenderer", {}).get("contents", [])
                for section in sections:
                    contents = section.get("itemSectionRenderer", {}).get("contents", [])
                    for item in contents:
                        if "videoRenderer" in item:
                            vr = item["videoRenderer"]
                            vid = vr.get("videoId")
                            title = vr.get("title", {}).get("runs", [{}])[0].get("text", "")
                            channel = vr.get("ownerText", {}).get("runs", [{}])[0].get("text", "Manyao DJ")
                            
                            if vid and title and len(vid) == 11 and not vr.get("badges"):
                                videos.append({
                                    "id": vid,
                                    "title": title,
                                    "channel": channel
                                })
    except Exception as e:
        print(f"Error searching YouTube for '{query}': {e}")
    return videos[:max_results]

def search_soundcloud(query, min_duration_sec=3600, max_results=20):
    client_id = get_soundcloud_client_id()
    encoded = urllib.parse.quote(query)
    url = f"https://api-v2.soundcloud.com/search/tracks?q={encoded}&filter.duration=epic&limit=30&client_id={client_id}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    })
    tracks = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            for t in data.get("collection", []):
                dur_ms = t.get("duration", 0)
                dur_sec = dur_ms // 1000
                if dur_sec >= min_duration_sec:
                    tracks.append({
                        "id": str(t.get("id")),
                        "title": t.get("title", "Manyao Mix"),
                        "channel": t.get("user", {}).get("username", "SoundCloud DJ"),
                        "duration": dur_sec,
                        "duration_formatted": format_duration(dur_sec),
                        "url": t.get("permalink_url"),
                        "artwork": t.get("artwork_url") or t.get("user", {}).get("avatar_url") or ""
                    })
    except Exception as e:
        print(f"Error searching SoundCloud for '{query}': {e}")
    return tracks[:max_results]

def search_mixcloud(query, min_duration_sec=3600, max_results=20):
    encoded = urllib.parse.quote(query)
    url = f"https://api.mixcloud.com/search/?q={encoded}&type=cloudcast"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    })
    tracks = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            for item in data.get("data", []):
                dur_sec = item.get("audio_length", 0)
                if dur_sec >= min_duration_sec:
                    pictures = item.get("pictures", {})
                    artwork = pictures.get("large") or pictures.get("medium") or ""
                    tracks.append({
                        "id": item.get("key"),
                        "key": item.get("key"),
                        "title": item.get("name", "Manyao Cloudcast"),
                        "channel": item.get("user", {}).get("name", "Mixcloud DJ"),
                        "duration": dur_sec,
                        "duration_formatted": format_duration(dur_sec),
                        "url": item.get("url"),
                        "artwork": artwork
                    })
    except Exception as e:
        print(f"Error searching Mixcloud for '{query}': {e}")
    return tracks[:max_results]

class ManyaoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/search":
            self.handle_youtube_search(parsed.query)
        elif parsed.path == "/api/soundcloud/search":
            self.handle_soundcloud_search(parsed.query)
        elif parsed.path == "/api/mixcloud/search":
            self.handle_mixcloud_search(parsed.query)
        else:
            super().do_GET()

    def handle_youtube_search(self, query_string):
        params = urllib.parse.parse_qs(query_string)
        q = params.get("q", [None])[0]
        count = int(params.get("count", [10])[0])

        if not q:
            q = random.choice(MANYAO_QUERIES)

        videos = search_youtube(q, max_results=max(count * 2, 20))
        if videos:
            random.shuffle(videos)
            results = videos[:count]
        else:
            results = []

        self.send_json_response({
            "platform": "youtube",
            "query": q,
            "count": len(results),
            "tracks": results
        })

    def handle_soundcloud_search(self, query_string):
        params = urllib.parse.parse_qs(query_string)
        q = params.get("q", [None])[0]
        count = int(params.get("count", [10])[0])
        min_dur = int(params.get("min_duration", [3600])[0])

        if not q:
            q = random.choice(MANYAO_MIX_QUERIES)

        tracks = search_soundcloud(q, min_duration_sec=min_dur, max_results=max(count * 2, 20))
        if tracks:
            random.shuffle(tracks)
            results = tracks[:count]
        else:
            results = []

        self.send_json_response({
            "platform": "soundcloud",
            "query": q,
            "min_duration": min_dur,
            "count": len(results),
            "tracks": results
        })

    def handle_mixcloud_search(self, query_string):
        params = urllib.parse.parse_qs(query_string)
        q = params.get("q", [None])[0]
        count = int(params.get("count", [10])[0])
        min_dur = int(params.get("min_duration", [3600])[0])

        if not q:
            q = random.choice(MANYAO_MIX_QUERIES)

        tracks = search_mixcloud(q, min_duration_sec=min_dur, max_results=max(count * 2, 20))
        if tracks:
            random.shuffle(tracks)
            results = tracks[:count]
        else:
            results = []

        self.send_json_response({
            "platform": "mixcloud",
            "query": q,
            "min_duration": min_dur,
            "count": len(results),
            "tracks": results
        })

    def send_json_response(self, data):
        response_data = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Content-Length", str(len(response_data)))
        self.end_headers()
        self.wfile.write(response_data)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

if __name__ == "__main__":
    port = PORT
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), ManyaoHandler) as httpd:
        print(f"Manyao Server running with YouTube, SoundCloud & Mixcloud support at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

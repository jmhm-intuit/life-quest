#!/usr/bin/env python3
from __future__ import annotations

import http.server
import socket
import socketserver
import threading
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORTS = range(8765, 8786)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


class ReusableThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


def local_network_ip() -> str:
    """Return a LAN address when available, without relying on host DNS."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return str(sock.getsockname()[0])
    except OSError:
        try:
            return socket.gethostbyname(socket.gethostname())
        except OSError:
            return "127.0.0.1"
    finally:
        sock.close()


server = None
port = None
for candidate in PORTS:
    try:
        server = ReusableThreadingTCPServer(("0.0.0.0", candidate), Handler)
        server.daemon_threads = True
        port = candidate
        break
    except OSError:
        continue

if server is None or port is None:
    raise SystemExit("No free local port found between 8765 and 8785.")

host = local_network_ip()
local_url = f"http://localhost:{port}/index.html"
network_url = f"http://{host}:{port}/index.html"
print(f"Questline v3.4.0 desktop: {local_url}")
print(f"Questline phone (same Wi-Fi): {network_url}")
print("Press Ctrl+C to stop the local server.")
threading.Timer(0.5, lambda: webbrowser.open(local_url)).start()

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()

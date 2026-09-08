
// ==========================================================================
// AUTOTRADE MIAMI LLC
// Soporte dual: Cliente Navegador + Servidor Node.js para Hostinger
// ==========================================================================

if (typeof window !== 'undefined') {
    // ----------------------------------------------------------------------
    // Lógica en el Navegador
    // ----------------------------------------------------------------------
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Solo en dispositivos móviles (ancho <= 768px)
            if (window.innerWidth <= 768) {
                if (window.scrollY > lastScrollY && window.scrollY > 80) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            lastScrollY = window.scrollY;
        });
    }
} else {
    // ----------------------------------------------------------------------
    // Servidor HTTP Nativo para Despliegue en Node.js (Hostinger)
    // ----------------------------------------------------------------------
    const http = require('http');
    const fs = require('fs');
    const path = require('path');

    const PORT = process.env.PORT || 3000;

    const MIME_TYPES = {
        '.html': 'text/html; charset=UTF-8',
        '.css': 'text/css; charset=UTF-8',
        '.js': 'application/javascript; charset=UTF-8',
        '.json': 'application/json; charset=UTF-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm'
    };

    const server = http.createServer((req, res) => {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        let safePath = decodeURIComponent(parsedUrl.pathname);

        if (safePath === '/' || safePath === '') {
            safePath = '/index.html';
        }

        const filePath = path.join(__dirname, safePath);

        // Prevenir directory traversal
        if (!filePath.startsWith(__dirname)) {
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('403 Prohibido');
            return;
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                const fallbackPath = filePath + '.html';
                fs.stat(fallbackPath, (err2, stats2) => {
                    if (!err2 && stats2.isFile()) {
                        serveFile(fallbackPath, res);
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                        res.end('404 No Encontrado');
                    }
                });
                return;
            }

            serveFile(filePath, res);
        });
    });

    function serveFile(filePath, res) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const isAsset = ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.svg' || ext === '.mp4' || ext === '.webm' || ext === '.ico';

        const stream = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': isAsset ? 'public, max-age=86400' : 'no-cache, no-store, must-revalidate'
        });

        stream.pipe(res);
        stream.on('error', () => {
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('500 Error Interno');
            }
        });
    }

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor Auto Trader LLC activo en puerto ${PORT}`);
    });
}

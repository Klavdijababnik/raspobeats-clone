const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = process.env.PORT || 4910;
const TARGET = 'https://raspobeats.com';

function proxy(req, res) {
  const targetUrl = new URL(req.url, TARGET);
  const headers = { ...req.headers };
  headers.host = 'raspobeats.com';
  headers.origin = TARGET;
  headers.referer = TARGET + '/';
  headers['user-agent'] = headers['user-agent'] || 'Mozilla/5.0';

  const upstream = https.request(targetUrl, {
    method: req.method,
    headers,
  }, (up) => {
    const outHeaders = { ...up.headers };
    delete outHeaders['content-security-policy'];
    delete outHeaders['content-security-policy-report-only'];
    delete outHeaders['x-frame-options'];
    delete outHeaders['strict-transport-security'];
    outHeaders['access-control-allow-origin'] = '*';
    res.writeHead(up.statusCode || 200, outHeaders);
    up.pipe(res);
  });

  upstream.on('error', (err) => {
    res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Proxy error: ' + err.message);
  });

  req.pipe(upstream);
}

http.createServer(proxy).listen(PORT, '127.0.0.1', () => {
  console.log(`Raspo mirror proxy running at http://127.0.0.1:${PORT}`);
});

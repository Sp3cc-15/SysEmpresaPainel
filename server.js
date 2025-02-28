import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://testeapi.sysempresa.com.br/',
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Ajusta o cabeçalho CORS aqui
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});




// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// const app = express();

// // Middleware para interpretar JSON antes do proxy
// app.use('/api', express.json(), createProxyMiddleware({
//   target: 'https://testeapi.sysempresa.com.br/',
//   changeOrigin: true,
//   selfHandleResponse: false, // Deixe o proxy lidar com a resposta
//   onProxyReq: (proxyReq, req, res) => {
//     if (req.body) {
//       const bodyData = JSON.stringify(req.body);
//       // Altera o método para POST se necessário
//       // proxyReq.method = 'POST'; // Descomente se o endpoint só aceitar POST
//       proxyReq.setHeader('Content-Type', 'application/json');
//       proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
//       proxyReq.write(bodyData);
//     }
//   },
//   onProxyRes: (proxyRes, req, res) => {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   },
// }));

// app.listen(3000, () => {
//   console.log('Proxy server running on http://localhost:3000');
// });

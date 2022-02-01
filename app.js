const Koa = require('koa');
const Router = require('koa-router');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const app = new Koa();
const router = new Router();

function connectWebSocket() {
  const wss = new WebSocket.WebSocketServer({ port: 4000 });
  wss.on('connection', ws => {
    console.log('已开启连接');

    // 监听客户端消息
    ws.on('message', message => {
      ws.send(JSON.parse(message));
    });

    ws.on('close', params => {
      console.log('已关闭连接');
      ws.close();
    });
  });
}
connectWebSocket();

router.get('/', (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(path.join(__dirname, './index.html'));
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

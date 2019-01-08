const Koa = require('koa');
const koaBody = require('koa-body');
const { argv } = require('yargs');
const fs = require('fs');

const dataFile = `${__dirname}/data.json`;
const mockData = require(dataFile); // eslint-disable-line

const app = new Koa();
app.use(koaBody());

app.use(({ request, response }) => {
  const { url, method, body } = request;
  // eslint-disable-next-line
  console.log(method, url, body)
  if (request.method === 'POST') {
    fs.writeFileSync(`${__dirname}/receive_data.json`, JSON.stringify(body));
    response.body = { success: true };
  } else {
    response.body = {
      id: '0x84',
      uid: mockData[0].uid,
      d_sync: 0,
      resultArray: mockData.map((item) => {
        const { time, items: [{ Value: value }] } = item;
        return { time: time.substr(0, 12), temp: value };
      }),
    };
  }
});

app.listen(argv.port || 9999);
// eslint-disable-next-line
console.log(`server start on port ${argv.port || 9999} at ${(new Date().toISOString())}`)

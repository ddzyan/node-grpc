const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  // call 是 gRPC 给封装好的对象
  // callback 是client要执行的回调
  // request对象中,只有 HelloRequest 中定义的字段
  console.log(call.request);
  // callback 第一个参数,如果报错可以传入 error
  let err = null;
  // callback 第二个参数,返回的字段也和 HelloReply 相同
  callback(err, {
    message: 'Hello ' + call.request.name,
  });
}

const server = new grpc.Server();
server.addService(hello_proto.Greeter.service, {
  sayHello,
});
// 这里绑定的地址要和client请求的一致
server.bind('0.0.0.0:50055', grpc.ServerCredentials.createInsecure());
server.start();

console.log('服务启动成功 http://127.0.0.1:50055');

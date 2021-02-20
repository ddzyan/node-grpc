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

const client = new hello_proto.Greeter('127.0.0.1:50055', grpc.credentials.createInsecure());
const user = 'world';

// client.sayHello(call,callback)
client.sayHello(
  {
    name: user,
    age: 'no',
  },
  function (err, response) {
    // callback的 err 是server 来返回的 如果无 null 说明无错误
    if (err === null) {
      // 说明server端没有出现错误 (两段式请求,只能通过 err 来判断)
    }
    // server端给返回的数据 response 和 HelloReply 定义的一样
    console.log('Greeting:', response);
  }
);

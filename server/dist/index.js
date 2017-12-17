'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _apolloServerKoa = require('apollo-server-koa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();
var PORT = 3000;

// koaBody is needed just for POST.
router.post('/graphql', (0, _koaBodyparser2.default)(), (0, _apolloServerKoa.graphqlKoa)({ schema: '' }));
router.get('/graphql', (0, _apolloServerKoa.graphqlKoa)({ schema: '' }));

router.get('/graphiql', (0, _apolloServerKoa.graphiqlKoa)({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

console.log('GraphQL up');
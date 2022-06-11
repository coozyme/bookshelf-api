const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
   const server = Hapi.server({
      port: 5000,
      host: 'localhost',
      routes: {
         cors: {
            origin: ['*'],
            headers: ['Authorization'],
            exposedHeaders: ['Accept', 'Content-Type'],
            additionalExposedHeaders: ['Accept'],
            maxAge: 60,
            credentials: true
         },
      },
   });

   server.route(routes);

   await server.start();
   console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
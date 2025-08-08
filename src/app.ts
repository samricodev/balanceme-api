import { envs } from './config';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/mongodb';

(() => {
  main();
})()

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.router
  })
    .start()
}

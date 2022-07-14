import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 80;

// const httpsPort = HTTPS_PORT;
// const privateKey = fs.readFileSync("config/cert/private.key");
// const certificate = fs.readFileSync("config/cert/certificate.crt");
// const ca = fs.readFileSync("config/cert/ca_bundle.crt");
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// }
// https.createServer(credentials, app)
//   .listen(httpsPort, () => {
//     console.log(`[TFTB] servier is running at port ${httpsPort} as https.`);
//   });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();

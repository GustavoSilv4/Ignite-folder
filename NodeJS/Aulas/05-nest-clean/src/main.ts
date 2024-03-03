import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, // Desabilitar o console de logs do nest
  })
  await app.listen(3333)
}
bootstrap()

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  const corsOrigins = process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()) || [
    "http://localhost:3000",
  ];

  app.enableCors({
    origin: corsOrigins,
  });

  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}

void bootstrap();

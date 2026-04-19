import { NestFactory } from "@nestjs/core";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import swaggerUi from "swagger-ui-express";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

  const corsOriginsRaw = process.env.CORS_ORIGINS;
  const corsOrigins = corsOriginsRaw?.split(",").map(origin => origin.trim()) ?? [
    "http://localhost:3000",
  ];

  app.enableCors({
    origin: corsOrigins,
  });

  // Swagger UI (из сгенерированного Nestia swagger.json)
  const swaggerPath = join(__dirname, "..", "..", "swagger.json");

  if (existsSync(swaggerPath)) {
    const swaggerDocument = JSON.parse(readFileSync(swaggerPath, "utf-8"));

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } else {
    console.log("⚠ swagger.json не найден. Выполните: pnpm sdk");
  }

  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/docs`);
}

void bootstrap();

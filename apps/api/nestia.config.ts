import type { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";

const config: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);
    return app;
  },
  output: "../../packages/api-sdk/src",
  clone: true,
  simulate: true,
  distribute: "../../packages/api-sdk",
  swagger: {
    output: "swagger.json",
    security: {},
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
    ],
  },
};

export default config;

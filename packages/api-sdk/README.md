# API SDK

Типизированный клиент для API, сгенерированный с помощью Nestia.

## Использование

```typescript
import { api } from "@repo/api-sdk";

// В компоненте или функции
const response = await api.hello.getHello({
  host: "http://localhost:3001",
});

console.log(response.message); // "Hello World!"
```

## Регенерация SDK

После изменения контроллеров в API:

```bash
pnpm sdk
```

SDK будет автоматически обновлён в `packages/api-sdk/src`.

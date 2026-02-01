# Turbo Template с Nestia

Monorepo с NestJS API и Next.js frontend, использующий Nestia для типобезопасного E2E SDK.

## Структура

- `apps/api` - NestJS backend с Nestia
- `apps/web` - Next.js frontend
- `packages/api-sdk` - Автоматически генерируемый типизированный SDK

## Основные команды

```bash
# Установка зависимостей
pnpm install

# Разработка
pnpm dev          # Запуск всех приложений
pnpm dev:api      # Только API
pnpm dev:web      # Только Web

# Генерация SDK
pnpm sdk          # Генерирует SDK из контроллеров API

# Проверка
pnpm check-types  # Проверка типов
pnpm lint         # Линтинг
pnpm test         # Тесты

# Сборка
pnpm build        # Сборка всех приложений
```

## Nestia Workflow

1. Создаёте/обновляете контроллеры в `apps/api/src` с декораторами `@TypedRoute.*`
2. Запускаете `pnpm sdk`
3. Используете типизированный клиент из `@repo/api-sdk` во frontend

## Технологии

- **Package Manager**: pnpm
- **API**: NestJS + Nestia + typia
- **Frontend**: Next.js 15 + React 19
- **Monorepo**: Turborepo
- **SDK Generation**: Nestia

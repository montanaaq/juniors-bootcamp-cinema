# juniors-bootcamp-cinema by montanaaq

## Стек

**Runtime**

- [Next.js 16](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- [@siberiacancode/fetches](https://www.npmjs.com/package/@siberiacancode/fetches)
- [@siberiacancode/reactuse](https://reactuse.org)
- [nuqs](https://nuqs.47ng.com)
- [React Hook Form](https://react-hook-form.com)
- [kanjou](https://github.com/kanjoujs/kanjou)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

**Инструменты**

- [oxlint](https://oxc.rs/docs/guide/usage/linter) — линтер
- [oxformat](https://oxc.rs/docs/guide/usage/formatter) — форматтер
- [apicraft](https://www.npmjs.com/package/@siberiacancode/apicraft)
- [lefthook](https://github.com/evilmartians/lefthook) — git-хуки

## Требования

- Node.js 20+
- pnpm 11+

## Установка

```bash
pnpm install
```

## Разработка

```bash
pnpm dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
pnpm build
```

Собранный проект можно запустить локально командой:

```bash
pnpm start
```

## Скрипты

| Команда         | Описание                        |
| --------------- | ------------------------------- |
| `pnpm dev`      | Запуск в режиме разработки      |
| `pnpm build`    | Продакшн-сборка                 |
| `pnpm start`    | Запуск собранного приложения    |
| `pnpm types`    | Проверка типов (`tsc --noEmit`) |
| `pnpm lint`     | Линтинг кода (oxlint)           |
| `pnpm lint:fix` | Линтинг с автофиксом            |
| `pnpm format`   | Форматирование кода (oxformat)  |

## Структура проекта

```
.
├── src/
│   ├── app/            # роуты и страницы (Next.js App Router)
│   ├── components/     # UI-компоненты (shadcn/ui)
│   ├── features/       # фичи (чекаут, бронирование мест и т.д.)
│   ├── hooks/          # кастомные хуки
│   ├── lib/            # утилиты, схемы валидации (valibot)
│   └── shared/         # общие типы, константы
├── public/
├── lefthook.yml
└── package.json
```

## Git-хуки

Проект использует `lefthook` для автоматического запуска линтера и форматтера перед коммитом.

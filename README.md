# juniors-bootcamp-cinema by montanaaq

## Main Page

<img title="Main Page" alt="Juniors Bootcamp Cinema" src="/screenshots/Juniors Bootcamp Cinema.jpeg">

## Select your schedule

<img title="Main Page" alt="Juniors Bootcamp Cinema" src="/screenshots/SelectSchedule.jpeg">

## Стек

**Runtime**

- [Next.js 16](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- [@siberiacancode/fetches](https://www.npmjs.com/package/@siberiacancode/fetches)
- [@siberiacancode/reactuse](https://reactuse.org)
- [React Hook Form](https://react-hook-form.com)
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

## Git-хуки

Проект использует `lefthook` для автоматического запуска линтера и форматтера перед коммитом.

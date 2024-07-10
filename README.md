# Super File World

View the app on GitHub pages: https://jonandrewdavis.github.io/super-device-world-public/

A challenge to design a set of reusable components for displaying and downloading files. Includes a re-usable `Table.tsx` component with supporting types that can be customized for many column layouts or file types. The app includes a `FileViewComponent.tsx` example that uses the table with the `FileItem` type but it could easily be changed to support a `Report` or `BillingItem` type, for example. Designed to meet and exceed all of the requirements, including tests.

Pre-requisties:

- Node https://nodejs.org/en/download/package-manager
- A package manager like `npm`, `yarn`, or `pnpm`
  - pnpm https://pnpm.io/installation (preferred)
  - yarn https://yarnpkg.com/getting-started/install (works as well!)

```
brew install pnpm
```

To run this project locally:

```
pnpm install
pnpm dev
```

Then view on http://localhost:5174/

There are 10 tests, to run them:

```
pnpm test
```

A brief list of tools used:

- TypeScript
- React
- Vite
- React Testing Library
- HeadlessUI (Dialog)

Vite provides a minimal template to get React working in TypeScript, HMR, and some ESLint rules To learn more see: https://vitejs.dev/guide/

HeadlessUI provides one Dialog component to assist with accessibility. See full explanation in: `TableToolbarDownloader.tsx`

## Async and TypeScript ORM with Supabase

Additional pre-requisites are required:
https://orm.drizzle.team/learn/tutorials/drizzle-with-supabase

## Seed the DBwith the Sample Data

```
    createItems([
      {
        name: "smss.exe",
        device: "Mario",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: statusEnum.enumValues[1],
      },
      {
        name: "netsh.exe",
        device: "Luigi",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: statusEnum.enumValues[2],
      },
      {
        name: "uxtheme.dll",
        device: "Peach",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
        status: statusEnum.enumValues[2],
      },
      {
        name: "aries.sys",
        device: "Daisy",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
        status: statusEnum.enumValues[1],
      },

      {
        name: "cryptbase.dll",
        device: "Yoshi",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
        status: statusEnum.enumValues[1],
      },
      {
        name: "7za.exe",
        device: "Toad",
        path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
        status: statusEnum.enumValues[1],
      },
    ]);
```

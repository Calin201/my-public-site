# Acvariul Interactiv — Proiect Starter pentru Deploy

Acest proiect React + `motion` este conceput ca repository de start pentru studenți. Fă **Fork** pe contul tău GitHub, personalizează-ți numele și publică-l gratuit pe oricare dintre platformele din laborator.

## 1. Personalizează proiectul (după Fork)

Deschide fișierul `src/studentConfig.ts` direct pe GitHub (butonul **Edit this file** ✏️) și schimbă datele tale:

```ts
export const STUDENT_CONFIG = {
  numePeste: 'Nori',
  numeStudent: 'Numele Tău Aici',
  grupa: 'Grupa Web',
  mesaj: 'Publicat live din fork-ul meu GitHub!',
};
```

Dă **Commit changes** pe ramura `main` — platforma conectată va reconstrui și actualiza site-ul automat.

## 2. Publicare rapidă din Fork

- **GitHub Pages**:
  1. Intră în tab-ul **Actions** al fork-ului tău și apasă *„I understand my workflows, go ahead and enable them”*.
  2. Intră în **Settings → Pages → Source: GitHub Actions**.
  3. Pornește workflow-ul din **Actions → Run workflow** (sau printr-un commit).
- **Vercel**: Importă fork-ul în `vercel.com` → **Deploy** (`vercel.json` și `vite.config.ts` sunt deja configurate).
- **Netlify**: Importă fork-ul în `app.netlify.com` → **Deploy site** (`netlify.toml` este deja configurat).
- **Railway**: Importă fork-ul în `railway.app` — rulează `npm run build` și apoi `npm start` (`server.mjs` ascultă pe `process.env.PORT` și `0.0.0.0`).

## Rulare locală

```bash
npm install
npm run dev
```

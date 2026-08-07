# Budapesti Kincskereső

Mobilra készült városfelfedező játék öt budapesti állomással. Rejtvények, fotófeltöltés, térkép és menetlevél. Szerver nem kell hozzá: minden a böngészőben fut, az adatok a telefonon maradnak.

## Feltöltés GitHubra

1. Hozz létre egy új, **publikus** repót (pl. `kincskereso`).
2. Töltsd fel ennek a mappának a **teljes tartalmát** a repó gyökerébe (a fájlokat, ne magát a mappát).
3. A repóban: **Settings → Pages**.
4. **Source**: `Deploy from a branch`, **Branch**: `main`, mappa: `/ (root)`. Mentés.
5. 1-2 perc múlva élesedik a cím: `https://FELHASZNALONEV.github.io/kincskereso/`

## Telefonra telepítés

Nyisd meg a fenti címet a telefonon, majd:

- **Android (Chrome)**: menü ⋮ → *Alkalmazás telepítése* / *Hozzáadás a kezdőképernyőhöz*
- **iPhone (Safari)**: megosztás ikon → *Hozzáadás a Home képernyőhöz*

Telepítés után teljes képernyőn, saját ikonnal indul, és offline is működik (a térképcsempékhez kell net).

## Fájlok

| Fájl | Szerep |
|---|---|
| `index.html` | Az egész játék egyetlen fájlban |
| `manifest.webmanifest` | Alkalmazásnév, ikonok, indítási mód |
| `sw.js` | Offline gyorsítótár |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Ikonok |
| `.nojekyll` | Kikapcsolja a GitHub Pages feldolgozását |

## Játékmester

A célképernyőn a *Játékmester* linkre kattintva, a kód megadása után látszik az öt megoldókulcs. A kód: `1848`.

## Adatok

A megfejtések, az idő és a feltöltött fotók kizárólag a játékos telefonjának böngészőjében tárolódnak. Semmi nem kerül fel szerverre. Az *Újra* gomb mindent töröl.

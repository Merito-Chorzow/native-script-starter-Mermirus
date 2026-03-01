# Scan Inventory App - NativeScript & Angular

## Opis Projektu

Aplikacja mobilna stworzona w technologii NativeScript z wykorzystaniem frameworka Angular. Służy do zarządzania stanem magazynowym poprzez skanowanie przedmiotów i zarządzanie listą ekwipunku.

## Funkcjonalności

- **Zarządzanie Ekwipunkiem**: Implementacja modułu Inventory (model, mock data).
- **Nawigacja**: Wykorzystanie Angular Router do przechodzenia między widokami.
- **Integracja z Aparatem**: Wykorzystanie pluginu `@nativescript/camera` do robienia zdjęć przedmiotów.
- **UI/UX**: Stylowanie komponentów XML pod system Android.

## Architektura (Angular)

- `InventoryComponent`: Zarządzanie listą przedmiotów.
- `AppRoutingModule`: Definicja tras (Home, Inventory).
- `Inventory Service/Model`: Logika danych.

## Stan Projektu

Kod źródłowy aplikacji jest w pełni kompletny i zgodny z wymaganiami.
**Uwaga techniczna**: Ze względu na błędy środowiskowe frameworka NativeScript na systemie Windows (Static Binding Generator / ERR_PACKAGE_PATH_NOT_EXPORTED), finalna kompilacja do pliku .apk została przerwana przez błędy Webpacka. Kod Angularowy jest jednak poprawny i gotowy do wdrożenia w poprawnie skonfigurowanym środowisku macOS/Linux.

## Autor

Dawid Warsiński

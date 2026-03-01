# Sprawozdanie 2: Budowa aplikacji mobilnych z użyciem technologii frontendowych

**Imię i nazwisko studenta:** Dawid Warsiński  
**Data:** 01.03.2026

---

## Część teoretyczna

### Hybrydowe aplikacje mobilne vs. natywne aplikacje mobilne

**Zagadnienie:** Aplikacje natywne są pisane w dedykowanym języku dla danej platformy (Swift dla iOS, Kotlin/Java dla Androida), co daje najwyższą wydajność, ale podwaja koszty produkcji i czas wdrożenia. Aplikacje hybrydowe (cross-platformowe) wykorzystują jeden kod bazowy (np. w JavaScript lub Dart), który jest tłumaczony na komponenty natywne (React Native, NativeScript) lub renderowany własnym silnikiem (Flutter).

| Cecha                        | Aplikacje natywne                                         | Aplikacje hybrydowe                                          |
| ---------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| **Języki programowania**     | Swift, Objective-C, Kotlin, Java                          | JavaScript, TypeScript, Dart                                 |
| **Wydajność**                | Najwyższa (bezpośredni dostęp do sprzętu)                 | Bardzo wysoka (zależna od narzutu mostu/silnika)             |
| **Dostęp do API urządzenia** | Natychmiastowy i pełny                                    | Przez wtyczki (możliwe opóźnienia w dostępności dla nowości) |
| **Koszt utrzymania**         | Wysoki (wymaga dwóch osobnych zespołów)                   | Niższy (jeden kod dla obu platform)                          |
| **Czas wdrożenia**           | Długi                                                     | Krótki                                                       |
| **Aktualizacje**             | Zależne od weryfikacji w sklepach (App Store/Google Play) | Często możliwe w locie (tzw. CodePush/Over-The-Air)          |

**Wnioski:** Rozwiązania hybrydowe są idealne dla MVP i standardowych aplikacji biznesowych ze względu na oszczędność czasu i kosztów. Aplikacje natywne pozostają bezkonkurencyjne w grach 3D, aplikacjach AR/VR oraz bardzo skomplikowanych narzędziach systemowych wymagających maksymalnej optymalizacji.

### Progressive Web Apps (PWA) jako alternatywa dla tradycyjnych aplikacji mobilnych

**Zagadnienie:** PWA to nowoczesne aplikacje webowe (strony internetowe), które zachowują się jak natywne aplikacje mobilne. Wykorzystują Service Workers do działania w trybie offline i obsługi powiadomień push. Nie wymagają instalacji przez sklepy z aplikacjami – użytkownik może je dodać bezpośrednio z przeglądarki na ekran główny urządzenia (Add to Home Screen).

**Wnioski:** PWA są świetną opcją, gdy budżet jest minimalny, a aplikacja nie wymaga zaawansowanych funkcji sprzętowych (jak np. zaawansowany Bluetooth, FaceID czy pełny dostęp do systemu plików). Ich głównym ograniczeniem jest brak pełnego dostępu do natywnego API urządzenia, zwłaszcza na systemach iOS, które mocniej restrykcjonują funkcje PWA niż Android.

---

## Ćwiczenie 1 – React Native (React)

**Temat:** Field Notes - Notatnik terenowy z GPS.

### Cel ćwiczenia

Stworzenie aplikacji mobilnej do robienia notatek w terenie z wykorzystaniem geolokalizacji użytkownika.

### Opis projektu

Aplikacja pozwala na dodawanie notatek zawierających tytuł, treść oraz współrzędne geograficzne, pobierane bezpośrednio z modułu GPS urządzenia podczas zapisu.

### Wymagania funkcjonalne

- Lista notatek pobierana z zewnętrznego API (JSONPlaceholder).
- Formularz dodawania nowej notatki z walidacją (żądanie POST).
- Integracja z systemową lokalizacją (`expo-location`).

### Refleksja studenta

- **Jakie funkcje natywne zostały wykorzystane i dlaczego?**
  > GPS (Geolokalizacja). Zastosowano ją, aby automatycznie przypisywać miejsce powstania notatki, co jest kluczową funkcjonalnością w pracy terenowej.
- **Jak zrealizowano komunikację z API?**
  > Komunikację oparto o wbudowaną w JavaScript funkcję `fetch` i asynchroniczne zapytania do publicznych endpointów REST API.
- **Jakie problemy napotkałeś przy konfiguracji lub uruchomieniu projektu?**
  > Głównym problemem był konflikt najnowszej testowej wersji paczek React Native z cache'em i wersją aplikacji Expo Go na telefonie fizycznym, co wymagało wymuszenia aktualizacji środowiska lub użycia flagi `--legacy-peer-deps` w npm.
- **Jak oceniłbyś trudność zadania?**
  > Średnia. Środowisko Expo bardzo ułatwia start, a React Native ma przejrzystą strukturę dla osób znających bibliotekę React.

---

## Ćwiczenie 2 – Flutter (Dart)

**Temat:** Food Gallery - Katalog zdjęć jedzenia.

### Cel ćwiczenia

Nauka budowania interfejsu z użyciem widgetów Fluttera oraz integracja z natywną kamerą urządzenia.

### Opis projektu

Aplikacja wyświetlająca wizualną listę produktów, pozwalająca użytkownikowi na zrobienie zdjęcia potrawy i dodanie jej do lokalnej galerii w aplikacji.

### Wymagania funkcjonalne

- Nawigacja pomiędzy widokiem listy a widokiem szczegółów produktu.
- Obsługa aparatu fotograficznego do wprowadzania nowych danych.
- Asynchroniczna komunikacja z API.

### Refleksja studenta

- **Którą funkcję natywną wykorzystano i jak została zaimplementowana?**
  > Wykorzystano Aparat (Camera) za pomocą popularnych wtyczek `camera` oraz `image_picker`, które pozwalają na łatwe przechwycenie obrazu i wyświetlenie go w widoku.
- **Jak poradziłeś sobie z konfiguracją Flutter SDK?**
  > Wymagało to pobrania SDK Fluttera, rozpakowania na dysku oraz poprawnego dodania ścieżek do zmiennych środowiskowych (PATH) w systemie Windows.
- **Czy aplikacja działała poprawnie na emulatorze/urządzeniu?**
  > Tak, aplikacja działała płynnie. Flutter bardzo dobrze radzi sobie z renderowaniem interfejsu i oferuje stabilny podgląd zmian na żywo (Hot Reload).
- **Co sprawiło największą trudność?**
  > Specyficzne dla Fluttera budowanie interfejsu oparte na zasadzie "wszystko jest widgetem", co przy bardziej skomplikowanych widokach prowadzi do mocnego zagnieżdżania drzewa komponentów.

---

## Ćwiczenie 3 – NativeScript (Angular)

**Temat:** Scan Inventory - System inwentaryzacji magazynowej.

### Cel ćwiczenia

Budowa aplikacji mobilnej z użyciem środowiska NativeScript połączonego z frameworkiem Angular.

### Opis projektu

Aplikacja do zarządzania magazynem, symulująca skanowanie produktów za pomocą aparatu z automatyczną aktualizacją listy (mockowanie zapytań do API).

### Wymagania funkcjonalne

- Implementacja warstwy logiki w postaci serwisów Angulara (API).
- Wykorzystanie pluginu `@nativescript/camera` do wykonania zdjęcia kodu/produktu.
- Min. 3 widoki zarządzane przez Angular Router.

### Refleksja studenta

- **Jakiej funkcji natywnej użyto i w jaki sposób została zaimplementowana?**
  > Wykorzystano natywny Aparat telefonu do symulacji skanowania przedmiotów w magazynie, zarządzany za pomocą modułu `camera.takePicture()`.
- **Jak przebiegała integracja z API?**
  > Integracja przebiegała bardzo strukturalnie dzięki wbudowanemu w Angular modułowi `HttpClientModule` i operowaniu na strumieniach RxJS.
- **Jak oceniłbyś pracę z NativeScript i Angular w kontekście mobilnym?**
  > Jest to środowisko najtrudniejsze w konfiguracji, szczególnie na systemie Windows. Bardzo często występują błędy środowiskowe związane z wersjami Javy (JDK), Android SDK i Static Binding Generatorem.
- **Co chciałbyś ulepszyć w kolejnym projekcie?**
  > Przygotować i pracować na środowisku opartym o macOS lub Linux, co wyeliminowałoby większość problemów z kompilatorami i bundlerami (Webpack) specyficznymi dla Windowsa.

---

## Podsumowanie

- **Które środowisko okazało się najłatwiejsze do konfiguracji?**
  > Zdecydowanie React Native w połączeniu z narzędziem Expo. Pozwala to na rozpoczęcie pisania kodu natychmiast, z minimalnym nakładem konfiguracji.
- **Które najlepiej wspiera natywne funkcje urządzenia?**
  > Flutter. Wtyczki są oficjalnie wspierane i rozwijane przez Google, co gwarantuje bardzo dużą stabilność i przewidywalność ich działania (np. aparat, lokalizacja).
- **Które oferuje najbardziej intuicyjny model pracy z API?**
  > NativeScript w połączeniu z Angularem. Angular narzuca rygorystyczną, ale bardzo czystą architekturę usług (services) i używa biblioteki RxJS, co czyni pracę z danymi z zewnątrz wysoce uporządkowaną.
- **Jakie wnioski wyciągnąłeś z porównania tych trzech frameworków?**
  > Nie ma idealnego rozwiązania do wszystkiego. React Native to świetny wybór przy braku czasu i doświadczeniu z Reactem. Flutter przoduje w wydajności UI i płynnych animacjach, z kolei NativeScript z Angularem sprawdza się tam, gdzie zespół biznesowy opiera całą architekturę frontendową (webową) na potężnym frameworku Angular.

# Email Blur

🇬🇧 [English version](README_EN.md)

Rozszerzenie do przeglądarki, które automatycznie zamazuje adresy e-mail na każdej stronie. Przydaje się, gdy nagrywasz ekran, robisz screenshoty, prowadzisz prezentację albo udostępniasz ekran na callu i nie chcesz pokazać czyichś danych kontaktowych.

- Działa od razu po instalacji, bez konfiguracji i bez zakładania konta.
- Jedno kliknięcie w ikonę koperty włącza lub wyłącza zamazywanie.
- Nic nie wysyła do internetu. Całe działanie odbywa się lokalnie w Twojej przeglądarce.

---

## Co jest w paczce

| Element | Do czego służy |
|---|---|
| `email-blur/` | Rozszerzenie dla Chrome, Edge, Brave, Opery, Vivaldi, Arc i innych przeglądarek opartych na Chromium |
| `email-blur-firefox/` | To samo rozszerzenie przygotowane dla Firefoksa |
| `README_PL.md` | Ten plik |
| `README_EN.md` | Instrukcja po angielsku |

W każdym folderze z rozszerzeniem są: `manifest.json` (opis rozszerzenia dla przeglądarki), `content.js` (wyszukuje i zamazuje adresy e-mail), `background.js` (przycisk włącz/wyłącz), `icons/` (ikony koperty) i `_locales/` (napisy po polsku i angielsku, język dobiera się sam według ustawień przeglądarki).

---

## Instalacja

Najpierw rozpakuj archiwum ZIP. Powstaną dwa foldery: `email-blur` (dla Chrome i innych przeglądarek opartych na Chromium) i `email-blur-firefox` (dla Firefoksa). **Nie usuwaj folderu ani nie przenoś go po instalacji**, bo przeglądarka wczytuje rozszerzenie bezpośrednio z niego.

Przenieś go od razu w stałe miejsce, poza Pobrane i poza foldery synchronizowane z chmurą (iCloud, OneDrive), bo system potrafi trzymać tam pliki tylko w chmurze i rozszerzenie przestanie działać. Dobre miejsca:

- **Mac:** `/Users/twoja_nazwa/Extensions/email-blur` (w Finderze: Idź → Katalog domowy, utwórz tam folder `Extensions`)
- **Windows:** `C:\Users\twoja_nazwa\Extensions\email-blur`

Aktualizacje przeglądarki nie wpływają na rozszerzenie, dopóki folder leży w tym samym miejscu. Rozszerzenia wgrane z folderu nie synchronizują się z kontem przeglądarki na inne komputery, więc na każdym komputerze instalujesz je raz.

### Google Chrome

1. Wpisz w pasku adresu `chrome://extensions` i naciśnij Enter.
2. W prawym górnym rogu włącz **Tryb dewelopera**.
3. Kliknij **Załaduj rozpakowane** i wskaż folder `email-blur`.
4. Kliknij ikonę puzzla na pasku narzędzi i przypnij **Email Blur** (ikona pinezki), żeby koperta była zawsze widoczna.

### Microsoft Edge

1. Wpisz w pasku adresu `edge://extensions`.
2. W menu po lewej (lub na dole strony) włącz **Tryb dewelopera**.
3. Kliknij **Załaduj rozpakowane** i wskaż folder `email-blur`.
4. Kliknij ikonę puzzla i włącz **Pokaż na pasku narzędzi** przy Email Blur.

### Brave

1. Wpisz w pasku adresu `brave://extensions`.
2. Włącz **Tryb dewelopera** w prawym górnym rogu.
3. Kliknij **Załaduj rozpakowane** i wskaż folder `email-blur`.
4. Przypnij ikonę przez menu puzzla.

### Opera

1. Wpisz w pasku adresu `opera://extensions`.
2. Włącz **Tryb dewelopera** w prawym górnym rogu.
3. Kliknij **Załaduj rozpakowane** i wskaż folder `email-blur`.
4. Przypnij ikonę przez menu kostki (rozszerzenia) na pasku.

### Vivaldi, Arc i inne przeglądarki oparte na Chromium

Postępuj tak samo jak w Chrome: otwórz stronę rozszerzeń (`vivaldi://extensions`, w Arc przez menu **Extensions → Manage extensions**), włącz tryb dewelopera i wybierz **Załaduj rozpakowane** / **Load unpacked**.

### Mozilla Firefox (tryb tymczasowy)

Firefox pozwala wczytać rozszerzenie spoza sklepu tylko tymczasowo, do zamknięcia przeglądarki.

1. Wpisz w pasku adresu `about:debugging#/runtime/this-firefox`.
2. Kliknij **Załaduj tymczasowy dodatek…** i wskaż plik `manifest.json` w folderze `email-blur-firefox`.
3. Kliknij ikonę puzzla, wybierz Email Blur i zezwól mu na działanie **na wszystkich stronach** (Firefox domyślnie pyta o tę zgodę).
4. Po ponownym uruchomieniu Firefoksa kroki 1 do 3 trzeba powtórzyć.

### Safari

Safari nie wczytuje rozszerzeń w tej postaci. Wymagałoby to przebudowania w Xcode i podpisania przez konto Apple Developer, więc ta wersja nie obsługuje Safari.

### Telefony

Przeglądarki mobilne (Chrome na Androidzie i iPhonie, Safari na iOS) nie pozwalają instalować takich rozszerzeń. Email Blur działa tylko na komputerze.

### Pliki otwierane z dysku

Jeśli chcesz, żeby rozszerzenie działało też na plikach HTML otwieranych z dysku (`file://`), w Chrome i pokrewnych wejdź w **Szczegóły** rozszerzenia i włącz **Zezwalaj na dostęp do adresów URL plików**. Zwykłe strony internetowe tego nie wymagają.

---

## Jak używać

- Po instalacji rozszerzenie jest **włączone** i działa na każdej otwartej stronie.
- **Kliknij ikonę koperty**, aby wyłączyć zamazywanie. Na ikonie pojawi się napis **OFF**, a adresy odkryją się od razu na wszystkich kartach, bez przeładowania.
- Kliknij jeszcze raz, aby znów włączyć.
- Ustawienie jest zapamiętywane, także po zamknięciu przeglądarki.

---

## Jak to działa

1. Po wczytaniu strony skrypt przegląda jej tekst i szuka fragmentów wyglądających jak adres e-mail (np. `jan.kowalski@firma.pl`).
2. Element strony, w którym jest taki adres, dostaje efekt rozmycia. Krawędzie rozmycia łagodnie zanikają po lewej i prawej stronie, więc całość wygląda naturalnie, a nie jak wycięty prostokąt.
3. Sprawdzane są też:
   - pola formularzy (wpisany tekst i podpowiedź w pustym polu),
   - linki typu `mailto:`,
   - teksty dymków (`title`) i opisy dla czytników ekranu (`aria-label`).
4. Skrypt cały czas obserwuje stronę. Gdy coś się doładuje (np. lista kontaktów w CRM, kolejna wiadomość w skrzynce, przewinięcie listy), nowe adresy też zostaną zamazane. Gdy wpisujesz e-mail w pole formularza, pole rozmyje się w trakcie pisania.
5. Rozszerzenie działa także w ramkach osadzonych na stronie (np. widżety, okna logowania).

Rozszerzenie ma tylko jedno uprawnienie: `storage`, czyli zapamiętanie, czy jest włączone. Nie czyta historii, nie zbiera danych i nie łączy się z żadnym serwerem.

---

## Ograniczenia

Warto je znać, zanim zaczniesz nagrywać.

- **Krótki moment bez rozmycia przy ładowaniu strony.** Skrypt startuje, gdy strona się wczyta, więc przez ułamek sekundy adres może być widoczny. Przy nagrywaniu ekranu otwórz stronę przed startem nagrania albo przytnij początek.
- **Rozmywany jest cały element z adresem.** Jeśli adres stoi w jednym zdaniu z innym tekstem (np. „Napisz do nas: biuro@firma.pl lub zadzwoń”), rozmyje się całe zdanie, a nie sam adres.
- **Tylko tekst.** Adresy na obrazkach, zrzutach ekranu, w filmach, w PDF-ach otwartych w przeglądarce oraz narysowane na elemencie `canvas` (np. Google Docs, Figma) nie zostaną wykryte.
- **Zamaskowane adresy nie są rozpoznawane**, np. `jan [at] firma [dot] pl` albo adres rozbity na kilka elementów strony.
- **Shadow DOM.** Niektóre nowoczesne komponenty ukrywają swoją zawartość w tzw. Shadow DOM. Adresy schowane w środku takich komponentów mogą nie zostać zamazane.
- **Strony systemowe.** Przeglądarki nie pozwalają rozszerzeniom działać na swoich stronach wewnętrznych (`chrome://…`, `edge://…`, ustawienia) ani w sklepach z rozszerzeniami.
- **Zmiana rozmiaru okna.** Zanikające krawędzie są dopasowane do szerokości adresu w chwili wykrycia. Po mocnej zmianie szerokości okna krawędź rozmycia może się nieco przesunąć. Przeładowanie strony to naprawia.
- **To nie jest zabezpieczenie danych.** Rozmycie działa tylko wizualnie. Adres nadal jest w kodzie strony, da się go skopiować i zobaczyć w narzędziach deweloperskich. Rozszerzenie chroni przed przypadkowym pokazaniem adresu na ekranie, a nie przed kimś, kto ma dostęp do Twojego komputera.
- **Komunikat o trybie dewelopera.** Chrome i Edge mogą co jakiś czas przypominać, że masz włączone rozszerzenia w trybie dewelopera. To normalne przy instalacji spoza sklepu i można je spokojnie zamknąć.
- **Firefox** zapomina rozszerzenie po restarcie (patrz instrukcja wyżej).

---

## Odinstalowanie

Wejdź na stronę rozszerzeń swojej przeglądarki (np. `chrome://extensions`), znajdź **Email Blur** i kliknij **Usuń**. Potem możesz skasować folder `email-blur`.

---

## Dostosowanie (dla zaawansowanych)

W pliku `content.js` możesz zmienić:

- **siłę rozmycia**: `blur(6px)` (większa liczba to mocniejsze rozmycie),
- **długość zanikania krawędzi**: `20%` i `80%` (np. `35%` i `65%` to dłuższe, miększe zanikanie).

Po zmianie wejdź na stronę rozszerzeń i kliknij ikonę odświeżenia przy Email Blur.

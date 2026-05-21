/**
 * Localization module (l10n)
 *
 * Contains the static language catalogue, all UI translations, and helpers
 * for formatting numbers / distances in the active locale.
 */

import { state, setCookie, getCookie, triggerRerender } from './state.js';

// ---------------------------------------------------------------------------
// Static language catalogue (replaces the old /languages endpoint)
// ---------------------------------------------------------------------------

export const LANGUAGES = [
  { code: 'en',    name: 'English',        countryCode: 'GB', useImperial: false },
  { code: 'en-US', name: 'English (US)',   countryCode: 'US', useImperial: true  },
  { code: 'cs',    name: 'Čeština',        countryCode: 'CZ', useImperial: false },
  { code: 'sk',    name: 'Slovenčina',     countryCode: 'SK', useImperial: false },
  { code: 'de',    name: 'Deutsch',        countryCode: 'DE', useImperial: false },
  { code: 'fr',    name: 'Français',       countryCode: 'FR', useImperial: false },
  { code: 'es',    name: 'Español',        countryCode: 'ES', useImperial: false },
  { code: 'it',    name: 'Italiano',       countryCode: 'IT', useImperial: false },
  { code: 'pt',    name: 'Português',      countryCode: 'PT', useImperial: false },
  { code: 'pl',    name: 'Polski',         countryCode: 'PL', useImperial: false },
  { code: 'nl',    name: 'Nederlands',     countryCode: 'NL', useImperial: false },
  { code: 'ru',    name: 'Русский',        countryCode: 'RU', useImperial: false },
  { code: 'ja',    name: '日本語',           countryCode: 'JP', useImperial: false },
  { code: 'zh',    name: '中文',             countryCode: 'CN', useImperial: false },
  { code: 'ar',    name: 'العربية',         countryCode: 'SA', useImperial: false },
  { code: 'ko',    name: '한국어',            countryCode: 'KR', useImperial: false },
  { code: 'sv',    name: 'Svenska',        countryCode: 'SE', useImperial: false },
  { code: 'tr',    name: 'Türkçe',         countryCode: 'TR', useImperial: false },
  { code: 'fi',    name: 'Suomi',          countryCode: 'FI', useImperial: false },
  { code: 'hu',    name: 'Magyar',         countryCode: 'HU', useImperial: false },
  { code: 'no',    name: 'Norsk',          countryCode: 'NO', useImperial: false },
];

// ---------------------------------------------------------------------------
// Translation dictionaries
// ---------------------------------------------------------------------------

const TRANSLATIONS = {
  en: {
    title: 'City Distance Calculator',
    subtitle: 'Find the distance between any two cities',
    from: 'From',
    to: 'To',
    placeholder: 'Search for a city...',
    calculate: 'Calculate Distance',
    calculating: 'Calculating...',
    select_both_cities: 'Please select both cities from the suggestions.',
    same_city: 'Cannot calculate distance between the same city. Please select two different cities.',
    already_selected: 'This city is already selected as the {0}. Please select a different city.',
    origin: 'origin',
    destination: 'destination',
    distance_format: '{0} {1} between {2} and {3}',
    km: 'km',
    miles: 'miles',
    language: 'Language',
    network_error: 'Could not reach the server. Check your network connection.',
    server_error: 'Server error ({0}). Please try again later.',
    unexpected_error: 'An unexpected error occurred. Please try again later.',
    request_error: 'Request error ({0})',
    no_suggestions: 'No cities found',
  },
  'en-US': {
    title: 'City Distance Calculator',
    subtitle: 'Find the distance between any two cities',
    from: 'From',
    to: 'To',
    placeholder: 'Search for a city...',
    calculate: 'Calculate Distance',
    calculating: 'Calculating...',
    select_both_cities: 'Please select both cities from the suggestions.',
    same_city: 'Cannot calculate distance between the same city. Please select two different cities.',
    already_selected: 'This city is already selected as the {0}. Please select a different city.',
    origin: 'origin',
    destination: 'destination',
    distance_format: '{0} {1} between {2} and {3}',
    km: 'km',
    miles: 'miles',
    language: 'Language',
    network_error: 'Could not reach the server. Check your network connection.',
    server_error: 'Server error ({0}). Please try again later.',
    unexpected_error: 'An unexpected error occurred. Please try again later.',
    request_error: 'Request error ({0})',
    no_suggestions: 'No cities found',
  },
  cs: {
    title: 'Kalkulačka vzdálenosti měst',
    subtitle: 'Najděte vzdálenost mezi libovolnými dvěma městy',
    from: 'Z',
    to: 'Do',
    placeholder: 'Hledejte město...',
    calculate: 'Vypočítat vzdálenost',
    calculating: 'Počítání...',
    select_both_cities: 'Vyberte prosím obě města z návrhů.',
    same_city: 'Nelze vypočítat vzdálenost mezi stejným městem. Vyberte prosím dvě různá města.',
    already_selected: 'Toto město je již vybráno jako {0}. Vyberte prosím jiné město.',
    origin: 'výchozí bod',
    destination: 'cíl',
    distance_format: '{0} {1} mezi {2} a {3}',
    km: 'km',
    miles: 'mil',
    language: 'Jazyk',
    network_error: 'Nepodařilo se připojit k serveru. Zkontrolujte připojení k internetu.',
    server_error: 'Chyba serveru ({0}). Zkuste to prosím později.',
    unexpected_error: 'Došlo k neočekávané chybě. Zkuste to prosím později.',
    request_error: 'Chyba požadavku ({0})',
    no_suggestions: 'Nenalezena žádná města',
  },
  sk: {
    title: 'Kalkulačka vzdialenosti miest',
    subtitle: 'Nájdite vzdialenosť medzi ľubovoľnými dvoma mestami',
    from: 'Z',
    to: 'Do',
    placeholder: 'Hľadajte mesto...',
    calculate: 'Vypočítať vzdialenosť',
    calculating: 'Počítanie...',
    select_both_cities: 'Vyberte prosím obe mestá z návrhov.',
    same_city: 'Nemožno vypočítať vzdialenosť medzi rovnakým mestom. Vyberte prosím dve rôzne mestá.',
    already_selected: 'Toto mesto je už vybrané ako {0}. Vyberte prosím iné mesto.',
    origin: 'východiskový bod',
    destination: 'cieľ',
    distance_format: '{0} {1} medzi {2} a {3}',
    km: 'km',
    miles: 'míľ',
    language: 'Jazyk',
    network_error: 'Nepodarilo sa pripojiť k serveru. Skontrolujte pripojenie k internetu.',
    server_error: 'Chyba serveru ({0}). Skúste to prosím neskôr.',
    unexpected_error: 'Vyskytla sa neočakávaná chyba. Skúste to prosím neskôr.',
    request_error: 'Chyba požiadavky ({0})',
    no_suggestions: 'Nenájdené žiadne mestá',
  },
  de: {
    title: 'Städte-Entfernungsrechner',
    subtitle: 'Finden Sie die Entfernung zwischen zwei beliebigen Städten',
    from: 'Von',
    to: 'Nach',
    placeholder: 'Stadt suchen...',
    calculate: 'Entfernung berechnen',
    calculating: 'Berechnung...',
    select_both_cities: 'Bitte wählen Sie beide Städte aus den Vorschlägen aus.',
    same_city: 'Die Entfernung zwischen der gleichen Stadt kann nicht berechnet werden. Bitte wählen Sie zwei verschiedene Städte.',
    already_selected: 'Diese Stadt ist bereits als {0} ausgewählt. Bitte wählen Sie eine andere Stadt.',
    origin: 'Start',
    destination: 'Ziel',
    distance_format: '{0} {1} zwischen {2} und {3}',
    km: 'km',
    miles: 'Meilen',
    language: 'Sprache',
    network_error: 'Verbindung zum Server konnte nicht hergestellt werden. Überprüfen Sie Ihre Internetverbindung.',
    server_error: 'Serverfehler ({0}). Bitte versuchen Sie es später erneut.',
    unexpected_error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    request_error: 'Anfragefehler ({0})',
    no_suggestions: 'Keine Städte gefunden',
  },
  fr: {
    title: 'Calculateur de distance entre villes',
    subtitle: 'Trouvez la distance entre deux villes',
    from: 'De',
    to: 'À',
    placeholder: 'Rechercher une ville...',
    calculate: 'Calculer la distance',
    calculating: 'Calcul en cours...',
    select_both_cities: 'Veuillez sélectionner les deux villes parmi les suggestions.',
    same_city: 'Impossible de calculer la distance entre la même ville. Veuillez sélectionner deux villes différentes.',
    already_selected: 'Cette ville est déjà sélectionnée comme {0}. Veuillez sélectionner une autre ville.',
    origin: 'origine',
    destination: 'destination',
    distance_format: '{0} {1} entre {2} et {3}',
    km: 'km',
    miles: 'miles',
    language: 'Langue',
    network_error: 'Impossible de joindre le serveur. Vérifiez votre connexion internet.',
    server_error: 'Erreur serveur ({0}). Veuillez réessayer plus tard.',
    unexpected_error: 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.',
    request_error: 'Erreur de requête ({0})',
    no_suggestions: 'Aucune ville trouvée',
  },
  es: {
    title: 'Calculadora de distancia entre ciudades',
    subtitle: 'Encuentra la distancia entre dos ciudades',
    from: 'Desde',
    to: 'Hasta',
    placeholder: 'Buscar una ciudad...',
    calculate: 'Calcular distancia',
    calculating: 'Calculando...',
    select_both_cities: 'Seleccione ambas ciudades de las sugerencias.',
    same_city: 'No se puede calcular la distancia entre la misma ciudad. Seleccione dos ciudades diferentes.',
    already_selected: 'Esta ciudad ya está seleccionada como {0}. Seleccione una ciudad diferente.',
    origin: 'origen',
    destination: 'destino',
    distance_format: '{0} {1} entre {2} y {3}',
    km: 'km',
    miles: 'millas',
    language: 'Idioma',
    network_error: 'No se pudo conectar con el servidor. Compruebe su conexión a internet.',
    server_error: 'Error del servidor ({0}). Inténtelo de nuevo más tarde.',
    unexpected_error: 'Se produjo un error inesperado. Inténtelo de nuevo más tarde.',
    request_error: 'Error de solicitud ({0})',
    no_suggestions: 'No se encontraron ciudades',
  },
  it: {
    title: 'Calcolatore distanza città',
    subtitle: 'Trova la distanza tra due città',
    from: 'Da',
    to: 'A',
    placeholder: 'Cerca una città...',
    calculate: 'Calcola distanza',
    calculating: 'Calcolo in corso...',
    select_both_cities: 'Seleziona entrambe le città dai suggerimenti.',
    same_city: 'Impossibile calcolare la distanza tra la stessa città. Seleziona due città diverse.',
    already_selected: 'Questa città è già selezionata come {0}. Seleziona un\'altra città.',
    origin: 'origine',
    destination: 'destinazione',
    distance_format: '{0} {1} tra {2} e {3}',
    km: 'km',
    miles: 'miglia',
    language: 'Lingua',
    network_error: 'Impossibile raggiungere il server. Controlla la connessione internet.',
    server_error: 'Errore del server ({0}). Riprova più tardi.',
    unexpected_error: 'Si è verificato un errore imprevisto. Riprova più tardi.',
    request_error: 'Errore nella richiesta ({0})',
    no_suggestions: 'Nessuna città trovata',
  },
  pt: {
    title: 'Calculadora de distância entre cidades',
    subtitle: 'Encontre a distância entre duas cidades',
    from: 'De',
    to: 'Para',
    placeholder: 'Pesquisar uma cidade...',
    calculate: 'Calcular distância',
    calculating: 'A calcular...',
    select_both_cities: 'Selecione ambas as cidades das sugestões.',
    same_city: 'Não é possível calcular a distância entre a mesma cidade. Selecione duas cidades diferentes.',
    already_selected: 'Esta cidade já está selecionada como {0}. Selecione uma cidade diferente.',
    origin: 'origem',
    destination: 'destino',
    distance_format: '{0} {1} entre {2} e {3}',
    km: 'km',
    miles: 'milhas',
    language: 'Idioma',
    network_error: 'Não foi possível contactar o servidor. Verifique a sua ligação à internet.',
    server_error: 'Erro do servidor ({0}). Tente novamente mais tarde.',
    unexpected_error: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    request_error: 'Erro no pedido ({0})',
    no_suggestions: 'Nenhuma cidade encontrada',
  },
  pl: {
    title: 'Kalkulator odległości miast',
    subtitle: 'Znajdź odległość między dwoma miastami',
    from: 'Z',
    to: 'Do',
    placeholder: 'Wyszukaj miasto...',
    calculate: 'Oblicz odległość',
    calculating: 'Obliczanie...',
    select_both_cities: 'Wybierz oba miasta z sugestii.',
    same_city: 'Nie można obliczyć odległości między tym samym miastem. Wybierz dwa różne miasta.',
    already_selected: 'To miasto jest już wybrane jako {0}. Wybierz inne miasto.',
    origin: 'miejsce wyjazdu',
    destination: 'miejsce docelowe',
    distance_format: '{0} {1} między {2} a {3}',
    km: 'km',
    miles: 'mil',
    language: 'Język',
    network_error: 'Nie można połączyć się z serwerem. Sprawdź połączenie z internetem.',
    server_error: 'Błąd serwera ({0}). Spróbuj ponownie później.',
    unexpected_error: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.',
    request_error: 'Błąd żądania ({0})',
    no_suggestions: 'Nie znaleziono miast',
  },
  nl: {
    title: 'Stedenafstandscalculator',
    subtitle: 'Vind de afstand tussen twee steden',
    from: 'Van',
    to: 'Naar',
    placeholder: 'Zoek een stad...',
    calculate: 'Bereken afstand',
    calculating: 'Bezig met berekenen...',
    select_both_cities: 'Selecteer beide steden uit de suggesties.',
    same_city: 'Kan geen afstand berekenen tussen dezelfde stad. Selecteer twee verschillende steden.',
    already_selected: 'Deze stad is al geselecteerd als {0}. Selecteer een andere stad.',
    origin: 'vertrek',
    destination: 'bestemming',
    distance_format: '{0} {1} tussen {2} en {3}',
    km: 'km',
    miles: 'miles',
    language: 'Taal',
    network_error: 'Kon geen verbinding maken met de server. Controleer uw internetverbinding.',
    server_error: 'Serverfout ({0}). Probeer het later opnieuw.',
    unexpected_error: 'Er is een onverwachte fout opgetreden. Probeer het later opnieuw.',
    request_error: 'Verzoekfout ({0})',
    no_suggestions: 'Geen steden gevonden',
  },
  ru: {
    title: 'Калькулятор расстояния между городами',
    subtitle: 'Найдите расстояние между любыми двумя городами',
    from: 'Откуда',
    to: 'Куда',
    placeholder: 'Поиск города...',
    calculate: 'Рассчитать расстояние',
    calculating: 'Вычисление...',
    select_both_cities: 'Выберите оба города из предложений.',
    same_city: 'Невозможно рассчитать расстояние между одним и тем же городом. Выберите два разных города.',
    already_selected: 'Этот город уже выбран как {0}. Пожалуйста, выберите другой город.',
    origin: 'пункт отправления',
    destination: 'пункт назначения',
    distance_format: '{0} {1} между {2} и {3}',
    km: 'км',
    miles: 'миль',
    language: 'Язык',
    network_error: 'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
    server_error: 'Ошибка сервера ({0}). Пожалуйста, попробуйте позже.',
    unexpected_error: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.',
    request_error: 'Ошибка запроса ({0})',
    no_suggestions: 'Города не найдены',
  },
  ja: {
    title: '都市間距離計算',
    subtitle: '任意の2都市間の距離を調べる',
    from: '出発地',
    to: '到着地',
    placeholder: '都市を検索...',
    calculate: '距離を計算',
    calculating: '計算中...',
    select_both_cities: '候補から両方の都市を選択してください。',
    same_city: '同じ都市間の距離は計算できません。異なる2つの都市を選択してください。',
    already_selected: 'この都市は既に{0}として選択されています。別の都市を選択してください。',
    origin: '出発地',
    destination: '到着地',
    distance_format: '{2} と {3} 間の距離は {0} {1}',
    km: 'km',
    miles: 'マイル',
    language: '言語',
    network_error: 'サーバーに接続できませんでした。インターネット接続を確認してください。',
    server_error: 'サーバーエラー ({0})。後でもう一度お試しください。',
    unexpected_error: '予期しないエラーが発生しました。後でもう一度お試しください。',
    request_error: 'リクエストエラー ({0})',
    no_suggestions: '都市が見つかりません',
  },
  zh: {
    title: '城市距离计算器',
    subtitle: '查找任意两座城市之间的距离',
    from: '出发地',
    to: '目的地',
    placeholder: '搜索城市...',
    calculate: '计算距离',
    calculating: '计算中...',
    select_both_cities: '请从建议中选择两座城市。',
    same_city: '无法计算同一城市之间的距离。请选择两座不同的城市。',
    already_selected: '该城市已被选为{0}。请选择另一座城市。',
    origin: '出发地',
    destination: '目的地',
    distance_format: '{2} 和 {3} 之间的距离是 {0} {1}',
    km: '公里',
    miles: '英里',
    language: '语言',
    network_error: '无法连接到服务器。请检查您的网络连接。',
    server_error: '服务器错误 ({0})。请稍后再试。',
    unexpected_error: '发生了意外错误。请稍后再试。',
    request_error: '请求错误 ({0})',
    no_suggestions: '未找到城市',
  },
  ar: {
    title: 'حاسبة مسافة المدن',
    subtitle: 'اعثر على المسافة بين أي مدينتين',
    from: 'من',
    to: 'إلى',
    placeholder: 'ابحث عن مدينة...',
    calculate: 'احسب المسافة',
    calculating: 'جاري الحساب...',
    select_both_cities: 'يرجى اختيار المدينتين من الاقتراحات.',
    same_city: 'لا يمكن حساب المسافة بين نفس المدينة. يرجى اختيار مدينتين مختلفتين.',
    already_selected: 'تم اختيار هذه المدينة بالفعل كـ {0}. يرجى اختيار مدينة مختلفة.',
    origin: 'نقطة الانطلاق',
    destination: 'الوجهة',
    distance_format: '{1} {0} بين {2} و {3}',
    km: 'كم',
    miles: 'ميل',
    language: 'اللغة',
    network_error: 'تعذر الوصول إلى الخادم. تحقق من اتصالك بالإنترنت.',
    server_error: 'خطأ في الخادم ({0}). يرجى المحاولة مرة أخرى لاحقًا.',
    unexpected_error: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.',
    request_error: 'خطأ في الطلب ({0})',
    no_suggestions: 'لم يتم العثور على مدن',
  },
  ko: {
    title: '도시 간 거리 계산기',
    subtitle: '두 도시 간 거리 찾기',
    from: '출발',
    to: '도착',
    placeholder: '도시 검색...',
    calculate: '거리 계산',
    calculating: '계산 중...',
    select_both_cities: '제안에서 두 도시를 모두 선택하세요.',
    same_city: '같은 도시 간 거리는 계산할 수 없습니다. 두 개의 다른 도시를 선택하세요.',
    already_selected: '이 도시는 이미 {0}(으)로 선택되었습니다. 다른 도시를 선택하세요.',
    origin: '출발지',
    destination: '도착지',
    distance_format: '{2}와(과) {3} 사이의 거리는 {0} {1}',
    km: 'km',
    miles: '마일',
    language: '언어',
    network_error: '서버에 연결할 수 없습니다. 인터넷 연결을 확인하세요.',
    server_error: '서버 오류 ({0}). 나중에 다시 시도해 주세요.',
    unexpected_error: '예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
    request_error: '요청 오류 ({0})',
    no_suggestions: '도시를 찾을 수 없습니다',
  },
  sv: {
    title: 'Avståndskalkylator för städer',
    subtitle: 'Hitta avståndet mellan två städer',
    from: 'Från',
    to: 'Till',
    placeholder: 'Sök efter en stad...',
    calculate: 'Beräkna avstånd',
    calculating: 'Beräknar...',
    select_both_cities: 'Välj båda städerna från förslagen.',
    same_city: 'Kan inte beräkna avståndet mellan samma stad. Välj två olika städer.',
    already_selected: 'Denna stad är redan vald som {0}. Vänligen välj en annan stad.',
    origin: 'ursprung',
    destination: 'destination',
    distance_format: '{0} {1} mellan {2} och {3}',
    km: 'km',
    miles: 'miles',
    language: 'Språk',
    network_error: 'Kunde inte nå servern. Kontrollera din internetanslutning.',
    server_error: 'Serverfel ({0}). Försök igen senare.',
    unexpected_error: 'Ett oväntat fel inträffade. Försök igen senare.',
    request_error: 'Begäranfel ({0})',
    no_suggestions: 'Inga städer hittades',
  },
  tr: {
    title: 'Şehir Mesafe Hesaplayıcı',
    subtitle: 'Herhangi iki şehir arasındaki mesafeyi bulun',
    from: 'Nereden',
    to: 'Nereye',
    placeholder: 'Şehir ara...',
    calculate: 'Mesafe Hesapla',
    calculating: 'Hesaplanıyor...',
    select_both_cities: 'Lütfen her iki şehri de önerilerden seçin.',
    same_city: 'Aynı şehir arasındaki mesafe hesaplanamaz. Lütfen iki farklı şehir seçin.',
    already_selected: 'Bu şehir zaten {0} olarak seçildi. Lütfen farklı bir şehir seçin.',
    origin: 'kalkış',
    destination: 'varış',
    distance_format: '{2} ve {3} arasındaki mesafe {0} {1}',
    km: 'km',
    miles: 'mil',
    language: 'Dil',
    network_error: 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.',
    server_error: 'Sunucu hatası ({0}). Lütfen daha sonra tekrar deneyin.',
    unexpected_error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    request_error: 'İstek hatası ({0})',
    no_suggestions: 'Şehir bulunamadı',
  },
  fi: {
    title: 'Kaupunkietäisyyslaskuri',
    subtitle: 'Etsi kahden kaupungin välinen etäisyys',
    from: 'Lähtöpaikka',
    to: 'Määränpää',
    placeholder: 'Hae kaupunkia...',
    calculate: 'Laske etäisyys',
    calculating: 'Lasketaan...',
    select_both_cities: 'Valitse molemmat kaupungit ehdotuksista.',
    same_city: 'Etäisyyttä saman kaupungin välillä ei voi laskea. Valitse kaksi eri kaupunkia.',
    already_selected: 'Tämä kaupunki on jo valittu {0}:ksi. Valitse toinen kaupunki.',
    origin: 'lähtöpaikka',
    destination: 'määränpää',
    distance_format: '{0} {1} {2}:n ja {3}:n välillä',
    km: 'km',
    miles: 'mailia',
    language: 'Kieli',
    network_error: 'Palvelimeen ei saatu yhteyttä. Tarkista internet-yhteytesi.',
    server_error: 'Palvelinvirhe ({0}). Yritä myöhemmin uudelleen.',
    unexpected_error: 'Tapahtui odottamaton virhe. Yritä myöhemmin uudelleen.',
    request_error: 'Pyyntövirhe ({0})',
    no_suggestions: 'Kaupunkeja ei löytynyt',
  },
  hu: {
    title: 'Várostávolság-kalkulátor',
    subtitle: 'Keresse meg két város közötti távolságot',
    from: 'Honnan',
    to: 'Hova',
    placeholder: 'Keresés város...',
    calculate: 'Távolság számítása',
    calculating: 'Számítás...',
    select_both_cities: 'Kérjük, válassza ki mindkét várost a javaslatokból.',
    same_city: 'Nem lehet kiszámolni a távolságot ugyanazon város között. Kérjük, válasszon két különböző várost.',
    already_selected: 'Ez a város már ki van választva {0}ként. Kérjük, válasszon egy másik várost.',
    origin: 'indulás',
    destination: 'érkezés',
    distance_format: '{0} {1} {2} és {3} között',
    km: 'km',
    miles: 'mérföld',
    language: 'Nyelv',
    network_error: 'Nem sikerült kapcsolódni a szerverhez. Ellenőrizze az internetkapcsolatot.',
    server_error: 'Szerverhiba ({0}). Kérjük, próbálja meg később.',
    unexpected_error: 'Váratlan hiba történt. Kérjük, próbálja meg később.',
    request_error: 'Kérés hiba ({0})',
    no_suggestions: 'Nem található város',
  },
  no: {
    title: 'Avstandskalkulator for byer',
    subtitle: 'Finn avstanden mellom to byer',
    from: 'Fra',
    to: 'Til',
    placeholder: 'Søk etter en by...',
    calculate: 'Beregn avstand',
    calculating: 'Beregner...',
    select_both_cities: 'Velg begge byene fra forslagene.',
    same_city: 'Kan ikke beregne avstanden mellom samme by. Velg to ulike byer.',
    already_selected: 'Denne byen er allerede valgt som {0}. Velg en annen by.',
    origin: 'opprinnelse',
    destination: 'destinasjon',
    distance_format: '{0} {1} mellom {2} og {3}',
    km: 'km',
    miles: 'miles',
    language: 'Språk',
    network_error: 'Kunne ikke nå serveren. Sjekk internettforbindelsen din.',
    server_error: 'Serverfeil ({0}). Prøv igjen senere.',
    unexpected_error: 'Det oppstod en uventet feil. Prøv igjen senere.',
    request_error: 'Forespørselsfeil ({0})',
    no_suggestions: 'Ingen byer funnet',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a 2-letter country code to a flag emoji */
function toFlagEmoji(value) {
  if (!value) return '';
  if ([...value].some(c => c.codePointAt(0) > 0x7F)) return value; // already emoji
  if (/^[A-Za-z]{2}$/.test(value)) {
    return [...value.toUpperCase()]
      .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
      .join('');
  }
  return value;
}

/** Look up a translation key and interpolate {0}, {1}, … */
export function t(key, ...args) {
  const lang = state.language || 'en';
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  let text = dict[key];
  if (text === undefined) {
    text = TRANSLATIONS['en'][key] || key;
  }
  args.forEach((arg, i) => {
    text = text.replace(new RegExp('\\{' + i + '\\}', 'g'), arg);
  });
  return text;
}

/** Set the active UI language, persist to cookie, and trigger rerender */
export function setLanguage(code) {
  const cfg = LANGUAGES.find(l => l.code === code);
  if (!cfg) return;
  state.language = code;
  setCookie('cds_lang', code, 365);
  document.documentElement.lang = code;
  // RTL support for Arabic
  document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
  triggerRerender();
}

/** Get the currently active language code */
export function getLanguage() {
  return state.language;
}

/** Get the full config object for the active language */
export function getLanguageConfig() {
  return LANGUAGES.find(l => l.code === (state.language || 'en')) || LANGUAGES[0];
}

/** Format a number using the active locale */
export function formatNumber(num, decimals = 2) {
  const lang = state.language || 'en';
  return Number(num).toLocaleString(lang, { maximumFractionDigits: decimals });
}

/** Convert kilometres to miles when the active language uses imperial */
export function convertDistance(km) {
  const cfg = getLanguageConfig();
  if (cfg.useImperial) {
    return km * 0.621371;
  }
  return km;
}

/** Return the localized unit for the active language */
export function getDistanceUnit() {
  const cfg = getLanguageConfig();
  return cfg.useImperial ? t('miles') : t('km');
}

/** Build a full localized distance sentence */
export function formatDistanceSentence(distanceKm, city1Name, city2Name) {
  const converted = convertDistance(distanceKm);
  const unit = getDistanceUnit();
  const value = formatNumber(converted, 2);
  return t('distance_format', value, unit, city1Name, city2Name);
}

/** Build a flag emoji for a language entry */
export function getLangFlag(lang) {
  return toFlagEmoji(lang.countryCode) || '🏳️';
}

/** Resolve the best initial language from cookie or browser preference */
export function resolveInitialLanguage() {
  const cookie = getCookie('cds_lang');
  if (cookie && LANGUAGES.some(l => l.code === cookie)) {
    return cookie;
  }
  const browser = (navigator.language || '').split('-')[0].toLowerCase();
  if (browser && LANGUAGES.some(l => l.code === browser)) {
    return browser;
  }
  return 'en';
}

// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    packageName: '',
    location: '',
    searchTerms: [],
    appInfo: null,
    rankings: [],
    currentLanguage: 'pt'
};

// ========================================
// TRANSLATIONS
// ========================================
const translations = {
    pt: {
        'app-title': '📱 SEO Ranking Monitor',
        'app-subtitle': 'Monitore o ranking do seu app na Google Play Store',
        'form-title': 'Informações do App',
        'label-package': 'Package Name do App *',
        'label-location': 'Localização *',
        'label-search-terms': 'Termos de Busca *',
        'select-country': 'Selecione um país',
        'placeholder-package': 'Ex: com.exemplo.meuapp',
        'placeholder-search': 'Digite um termo e pressione Enter',
        'help-package': 'Digite o identificador único do seu app (package name)',
        'help-search-terms': 'Adicione até 10 termos de busca (pressione Enter ou clique em Adicionar)',
        'btn-add-term': 'Adicionar',
        'btn-search': '🔍 Realizar Buscas',
        'btn-new-search': '🔄 Realizar Nova Busca',
        'terms-counter': 'termos adicionados',
        'loading': 'Processando...',
        'results-title': 'Resultados da Busca',
        'table-term': 'Termo de Busca',
        'table-rank': 'Posição no Ranking',
        'rank-not-found': 'Não encontrado',
        'rank-error': 'Erro na busca'
    },
    es: {
        'app-title': '📱 Monitor de Ranking SEO',
        'app-subtitle': 'Monitorea el ranking de tu app en Google Play Store',
        'form-title': 'Información de la App',
        'label-package': 'Nombre del Paquete *',
        'label-location': 'Ubicación *',
        'label-search-terms': 'Términos de Búsqueda *',
        'select-country': 'Seleccione un país',
        'placeholder-package': 'Ej: com.ejemplo.miapp',
        'placeholder-search': 'Escriba un término y presione Enter',
        'btn-add-term': 'Agregar',
        'btn-search': '🔍 Realizar Búsquedas',
        'btn-new-search': '🔄 Nueva Búsqueda',
        'terms-counter': 'términos agregados',
        'loading': 'Procesando...',
        'results-title': 'Resultados de Búsqueda',
        'table-term': 'Término de Búsqueda',
        'table-rank': 'Posición en Ranking',
        'rank-not-found': 'No encontrado',
        'rank-error': 'Error en búsqueda'
    },
    en: {
        'app-title': '📱 SEO Ranking Monitor',
        'app-subtitle': 'Monitor your app ranking on Google Play Store',
        'form-title': 'App Information',
        'label-package': 'App Package Name *',
        'label-location': 'Location *',
        'label-search-terms': 'Search Terms *',
        'select-country': 'Select a country',
        'placeholder-package': 'Ex: com.example.myapp',
        'placeholder-search': 'Type a term and press Enter',
        'btn-add-term': 'Add',
        'btn-search': '🔍 Search',
        'btn-new-search': '🔄 New Search',
        'terms-counter': 'terms added',
        'loading': 'Processing...',
        'results-title': 'Search Results',
        'table-term': 'Search Term',
        'table-rank': 'Ranking Position',
        'rank-not-found': 'Not found',
        'rank-error': 'Search error'
    },
    de: {
        'app-title': '📱 SEO Ranking Monitor',
        'app-subtitle': 'Überwachen Sie Ihr App-Ranking im Google Play Store',
        'form-title': 'App-Informationen',
        'label-package': 'App-Paketname *',
        'label-location': 'Standort *',
        'label-search-terms': 'Suchbegriffe *',
        'select-country': 'Land auswählen',
        'placeholder-package': 'Z.B: com.beispiel.meineapp',
        'placeholder-search': 'Begriff eingeben und Enter drücken',
        'btn-add-term': 'Hinzufügen',
        'btn-search': '🔍 Suchen',
        'btn-new-search': '🔄 Neue Suche',
        'terms-counter': 'Begriffe hinzugefügt',
        'loading': 'Verarbeitung...',
        'results-title': 'Suchergebnisse',
        'table-term': 'Suchbegriff',
        'table-rank': 'Ranking-Position',
        'rank-not-found': 'Nicht gefunden',
        'rank-error': 'Suchfehler'
    },
    fr: {
        'app-title': '📱 Moniteur de Classement SEO',
        'app-subtitle': 'Surveillez le classement de votre application sur Google Play Store',
        'form-title': 'Informations sur l\'application',
        'label-package': 'Nom du package *',
        'label-location': 'Emplacement *',
        'label-search-terms': 'Termes de recherche *',
        'select-country': 'Sélectionner un pays',
        'placeholder-package': 'Ex: com.exemple.monapp',
        'placeholder-search': 'Tapez un terme et appuyez sur Entrée',
        'btn-add-term': 'Ajouter',
        'btn-search': '🔍 Rechercher',
        'btn-new-search': '🔄 Nouvelle recherche',
        'terms-counter': 'termes ajoutés',
        'loading': 'Traitement...',
        'results-title': 'Résultats de recherche',
        'table-term': 'Terme de recherche',
        'table-rank': 'Position de classement',
        'rank-not-found': 'Non trouvé',
        'rank-error': 'Erreur de recherche'
    },
    ko: {
        'app-title': '📱 SEO 순위 모니터',
        'app-subtitle': 'Google Play 스토어에서 앱 순위를 모니터링하세요',
        'form-title': '앱 정보',
        'label-package': '앱 패키지 이름 *',
        'label-location': '위치 *',
        'label-search-terms': '검색어 *',
        'select-country': '국가 선택',
        'placeholder-package': '예: com.example.myapp',
        'placeholder-search': '검색어를 입력하고 Enter를 누르세요',
        'btn-add-term': '추가',
        'btn-search': '🔍 검색',
        'btn-new-search': '🔄 새 검색',
        'terms-counter': '개 검색어 추가됨',
        'loading': '처리 중...',
        'results-title': '검색 결과',
        'table-term': '검색어',
        'table-rank': '순위',
        'rank-not-found': '찾을 수 없음',
        'rank-error': '검색 오류'
    },
    el: {
        'app-title': '📱 Παρακολούθηση Κατάταξης SEO',
        'app-subtitle': 'Παρακολουθήστε την κατάταξη της εφαρμογής σας στο Google Play Store',
        'form-title': 'Πληροφορίες Εφαρμογής',
        'label-package': 'Όνομα Πακέτου *',
        'label-location': 'Τοποθεσία *',
        'label-search-terms': 'Όροι Αναζήτησης *',
        'select-country': 'Επιλέξτε χώρα',
        'placeholder-package': 'Π.χ: com.example.myapp',
        'placeholder-search': 'Πληκτρολογήστε όρο και πατήστε Enter',
        'btn-add-term': 'Προσθήκη',
        'btn-search': '🔍 Αναζήτηση',
        'btn-new-search': '🔄 Νέα Αναζήτηση',
        'terms-counter': 'όροι προστέθηκαν',
        'loading': 'Επεξεργασία...',
        'results-title': 'Αποτελέσματα Αναζήτησης',
        'table-term': 'Όρος Αναζήτησης',
        'table-rank': 'Θέση Κατάταξης',
        'rank-not-found': 'Δεν βρέθηκε',
        'rank-error': 'Σφάλμα αναζήτησης'
    },
    fi: {
        'app-title': '📱 SEO-sijoitusten seuranta',
        'app-subtitle': 'Seuraa sovelluksesi sijoitusta Google Play Storessa',
        'form-title': 'Sovelluksen tiedot',
        'label-package': 'Sovelluksen pakettitnimi *',
        'label-location': 'Sijainti *',
        'label-search-terms': 'Hakutermit *',
        'select-country': 'Valitse maa',
        'placeholder-package': 'Esim: com.esimerkki.sovellus',
        'placeholder-search': 'Kirjoita termi ja paina Enter',
        'btn-add-term': 'Lisää',
        'btn-search': '🔍 Hae',
        'btn-new-search': '🔄 Uusi haku',
        'terms-counter': 'termiä lisätty',
        'loading': 'Käsitellään...',
        'results-title': 'Hakutulokset',
        'table-term': 'Hakutermi',
        'table-rank': 'Sijoitus',
        'rank-not-found': 'Ei löytynyt',
        'rank-error': 'Hakuvirhe'
    },
    pl: {
        'app-title': '📱 Monitor Rankingu SEO',
        'app-subtitle': 'Monitoruj ranking swojej aplikacji w Google Play Store',
        'form-title': 'Informacje o aplikacji',
        'label-package': 'Nazwa pakietu *',
        'label-location': 'Lokalizacja *',
        'label-search-terms': 'Terminy wyszukiwania *',
        'select-country': 'Wybierz kraj',
        'placeholder-package': 'Np: com.przyklad.mojaaplikacja',
        'placeholder-search': 'Wpisz termin i naciśnij Enter',
        'btn-add-term': 'Dodaj',
        'btn-search': '🔍 Szukaj',
        'btn-new-search': '🔄 Nowe wyszukiwanie',
        'terms-counter': 'terminów dodanych',
        'loading': 'Przetwarzanie...',
        'results-title': 'Wyniki wyszukiwania',
        'table-term': 'Termin wyszukiwania',
        'table-rank': 'Pozycja w rankingu',
        'rank-not-found': 'Nie znaleziono',
        'rank-error': 'Błąd wyszukiwania'
    },
    it: {
        'app-title': '📱 Monitor Ranking SEO',
        'app-subtitle': 'Monitora il posizionamento della tua app su Google Play Store',
        'form-title': 'Informazioni App',
        'label-package': 'Nome pacchetto app *',
        'label-location': 'Posizione *',
        'label-search-terms': 'Termini di ricerca *',
        'select-country': 'Seleziona un paese',
        'placeholder-package': 'Es: com.esempio.miaapp',
        'placeholder-search': 'Digita un termine e premi Invio',
        'btn-add-term': 'Aggiungi',
        'btn-search': '🔍 Cerca',
        'btn-new-search': '🔄 Nuova ricerca',
        'terms-counter': 'termini aggiunti',
        'loading': 'Elaborazione...',
        'results-title': 'Risultati della ricerca',
        'table-term': 'Termine di ricerca',
        'table-rank': 'Posizione in classifica',
        'rank-not-found': 'Non trovato',
        'rank-error': 'Errore di ricerca'
    }
};

// ========================================
// CORS PROXY CONFIGURATION
// ========================================
// Since we're fetching from Google Play Store directly, we'll face CORS issues.
// For GitHub Pages, we need to use a CORS proxy service.
// 
// RECOMMENDED: corsproxy.io is faster than allorigins
const CORS_PROXY = 'https://corsproxy.io/?';

// Alternative proxies (uncomment to use if corsproxy.io is slow):
// const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// const CORS_PROXY = 'https://api.codetabs.com/v1/proxy?quest=';

// BEST OPTION: Set up your own CORS proxy for production (see README.md)

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    // Form elements
    packageNameInput: document.getElementById('packageName'),
    locationSelect: document.getElementById('location'),
    searchTermInput: document.getElementById('searchTermInput'),
    addTermBtn: document.getElementById('addTermBtn'),
    termsList: document.getElementById('termsList'),
    termsCounter: document.getElementById('termsCounter'),
    searchBtn: document.getElementById('searchBtn'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    loadingStatus: document.getElementById('loadingStatus'),
    errorMessage: document.getElementById('errorMessage'),
    
    // Sections
    formSection: document.getElementById('formSection'),
    resultsSection: document.getElementById('resultsSection'),
    
    // Results elements
    appIcon: document.getElementById('appIcon'),
    appTitle: document.getElementById('appTitle'),
    appDescription: document.getElementById('appDescription'),
    rankingsTable: document.getElementById('rankingsTable'),
    newSearchBtn: document.getElementById('newSearchBtn'),
    mobileFormToggle: document.getElementById('mobileFormToggle')
};

// ========================================
// INITIALIZATION
// ========================================
function init() {
    setupEventListeners();
    setupLanguageSwitcher();
    loadFromLocalStorage();
    updateLanguage(state.currentLanguage);
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Add term button
    elements.addTermBtn.addEventListener('click', addSearchTerm);
    
    // Add term on Enter key
    elements.searchTermInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSearchTerm();
        }
    });
    
    // Validate form on input changes
    elements.packageNameInput.addEventListener('input', validateForm);
    elements.locationSelect.addEventListener('change', validateForm);
    
    // Search button
    elements.searchBtn.addEventListener('click', performSearch);
    
    // Mobile form toggle
    elements.mobileFormToggle.addEventListener('click', toggleMobileForm);
}

// ========================================
// LANGUAGE SWITCHER
// ========================================
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
}

function updateLanguage(lang) {
    state.currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update terms counter
    updateTermsCounter();
    
    // Save language preference
    localStorage.setItem('seoRankingMonitor_lang', lang);
}

// ========================================
// SEARCH TERMS MANAGEMENT
// ========================================
function addSearchTerm() {
    const term = elements.searchTermInput.value.trim();
    
    if (!term) {
        showError('Digite um termo de busca válido');
        return;
    }
    
    if (state.searchTerms.length >= 10) {
        showError('Limite máximo de 10 termos atingido');
        return;
    }
    
    if (state.searchTerms.includes(term)) {
        showError('Este termo já foi adicionado');
        return;
    }
    
    state.searchTerms.push(term);
    elements.searchTermInput.value = '';
    renderTermsList();
    validateForm();
    hideError();
}

function removeSearchTerm(term) {
    state.searchTerms = state.searchTerms.filter(t => t !== term);
    renderTermsList();
    validateForm();
}

function renderTermsList() {
    elements.termsList.innerHTML = state.searchTerms.map(term => `
        <div class="term-tag">
            <span>${term}</span>
            <button onclick="removeSearchTerm('${term.replace(/'/g, "\\'")}')">×</button>
        </div>
    `).join('');
    
    updateTermsCounter();
}

function updateTermsCounter() {
    const counterText = translations[state.currentLanguage]['terms-counter'] || 'terms added';
    elements.termsCounter.textContent = `${state.searchTerms.length}/10 ${counterText}`;
}

// ========================================
// FORM VALIDATION
// ========================================
function validateForm() {
    const packageName = elements.packageNameInput.value.trim();
    const location = elements.locationSelect.value;
    const hasTerms = state.searchTerms.length > 0;
    
    const isValid = packageName && location && hasTerms;
    elements.searchBtn.disabled = !isValid;
    
    return isValid;
}

// ========================================
// MAIN SEARCH FUNCTION
// ========================================
async function performSearch() {
    if (!validateForm()) return;
    
    // Save form data to state
    state.packageName = elements.packageNameInput.value.trim();
    state.location = elements.locationSelect.value;
    
    // Save to localStorage for persistence
    saveToLocalStorage();
    
    // Show loading
    showLoading('Buscando informações do app...');
    hideError();
    
    try {
        // Step 1: Fetch app metadata
        await fetchAppMetadata();
        
        // Step 2: Check rankings for each search term
        await checkRankings();
        
        // Step 3: Display results
        displayResults();
        
        hideLoading();
        
    } catch (error) {
        hideLoading();
        showError('Erro ao realizar a busca: ' + error.message);
        console.error('Search error:', error);
    }
}

// ========================================
// FETCH APP METADATA
// ========================================
async function fetchAppMetadata() {
    const url = `https://play.google.com/store/apps/details?id=${state.packageName}&hl=pt&gl=${state.location}`;
    const proxyUrl = CORS_PROXY + encodeURIComponent(url);
    
    try {
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            }
        });
        
        if (!response.ok) {
            throw new Error('Falha ao buscar informações do app');
        }
        
        const html = await response.text();
        
        // Extract app title
        const titleMatch = html.match(/<h1[^>]*>\s*<span[^>]*>(.*?)<\/span>\s*<\/h1>/i);
        const title = titleMatch ? titleMatch[1].trim() : 'Título não encontrado';
        
        // Extract short description
        const shortDescMatch = html.match(/<meta itemprop="description" content="([^"]+)"/i);
        const shortDescription = shortDescMatch ? shortDescMatch[1].trim() : 'Descrição não encontrada';
        
        // Extract app icon from div.class "Mqg6jb Mhrnjf"
        const iconMatch = html.match(/<div[^>]*class="[^"]*Mqg6jb[^"]*"[^>]*>\s*<img[^>]*src="([^"]+)"/i) ||
                         html.match(/<img[^>]*class="[^"]*T75of[^"]*nm4vBd[^"]*"[^>]*src="([^"]+)"/i) ||
                         html.match(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/i);
        const iconUrl = iconMatch ? iconMatch[1].trim() : 'https://via.placeholder.com/120?text=App';
        
        state.appInfo = {
            title,
            description: shortDescription,
            iconUrl
        };
        
    } catch (error) {
        console.error('Error fetching app metadata:', error);
        throw new Error('Não foi possível obter as informações do app. Verifique se o package name está correto.');
    }
}

// ========================================
// CHECK RANKINGS
// ========================================
async function checkRankings() {
    state.rankings = [];
    const targetHref = `/store/apps/details?id=${state.packageName}`;
    
    for (let i = 0; i < state.searchTerms.length; i++) {
        const term = state.searchTerms[i];
        
        updateLoadingStatus(`Verificando ranking para "${term}" (${i + 1}/${state.searchTerms.length})...`);
        
        const url = `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps&gl=${state.location}`;
        const proxyUrl = CORS_PROXY + encodeURIComponent(url);
        
        try {
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html'
                }
            });
            
            const html = await response.text();
            
            // Extract all app links using the same regex as example.gs
            const regex = /<a[^>]*class="Si6A0c Gy4nib"[^>]*href="([^"]+)"[^>]*>/g;
            const hrefs = [];
            let match;
            
            while ((match = regex.exec(html)) !== null) {
                hrefs.push(match[1]);
            }
            
            // Find the ranking position
            let rank = 'NF'; // Not Found
            for (let j = 0; j < hrefs.length; j++) {
                if (hrefs[j].includes(targetHref)) {
                    rank = j + 1;
                    break;
                }
            }
            
            state.rankings.push({
                term,
                rank
            });
            
            // Reduced delay to 300ms for faster results
            await sleep(300);
            
        } catch (error) {
            console.error(`Error checking ranking for "${term}":`, error);
            state.rankings.push({
                term,
                rank: 'Erro'
            });
        }
    }
}

// ========================================
// DISPLAY RESULTS
// ========================================
function displayResults() {
    // Update app info
    elements.appIcon.src = state.appInfo.iconUrl;
    elements.appIcon.alt = state.appInfo.title;
    elements.appTitle.textContent = state.appInfo.title;
    elements.appDescription.textContent = state.appInfo.description;
    
    // Render rankings table (desktop)
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Termo de Busca</th>
                    <th>Posição no Ranking</th>
                </tr>
            </thead>
            <tbody>
                ${state.rankings.map(r => `
                    <tr>
                        <td>${r.term}</td>
                        <td class="rank ${getRankClass(r.rank)}">${formatRank(r.rank)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Render rankings mobile layout
    const mobileHTML = `
        <div class="rankings-mobile">
            ${state.rankings.map(r => `
                <div class="ranking-item">
                    <div class="ranking-term">${r.term}</div>
                    <div class="ranking-result ${getRankClass(r.rank)}">${formatRank(r.rank)}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    elements.rankingsTable.innerHTML = tableHTML + mobileHTML;
    
    // Switch to results view - hide form completely on both mobile and desktop
    elements.formSection.style.display = 'none';
    elements.resultsSection.style.display = 'block';
}

// ========================================
// RANKING HELPERS
// ========================================
function getRankClass(rank) {
    if (rank === 'NF' || rank === 'Erro') return 'rank-not-found';
    
    const numRank = parseInt(rank);
    if (numRank >= 1 && numRank <= 5) return 'rank-green';
    if (numRank >= 6 && numRank <= 14) return 'rank-blue';
    if (numRank >= 15 && numRank <= 100) return 'rank-yellow';
    
    return 'rank-not-found';
}

function formatRank(rank) {
    const lang = state.currentLanguage;
    if (rank === 'NF') return translations[lang]['rank-not-found'] || 'Not found';
    if (rank === 'Erro') return translations[lang]['rank-error'] || 'Error';
    return `#${rank}`;
}

// ========================================
// UI HELPERS
// ========================================
function showLoading(message = 'Processando...') {
    elements.loadingIndicator.style.display = 'block';
    elements.loadingStatus.textContent = message;
    elements.searchBtn.disabled = true;
}

function hideLoading() {
    elements.loadingIndicator.style.display = 'none';
    elements.searchBtn.disabled = false;
    validateForm();
}

function updateLoadingStatus(message) {
    elements.loadingStatus.textContent = message;
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = 'block';
}

function hideError() {
    elements.errorMessage.style.display = 'none';
}

function resetToForm() {
    elements.resultsSection.style.display = 'none';
    elements.formSection.style.display = 'block';
    
    // Optionally clear the form
    // elements.packageNameInput.value = '';
    // elements.locationSelect.value = '';
    // state.searchTerms = [];
    // renderTermsList();
    // validateForm();
}

function toggleMobileForm() {
    // Toggle form visibility (same behavior for mobile and desktop now)
    if (elements.formSection.style.display === 'none') {
        elements.resultsSection.style.display = 'none';
        elements.formSection.style.display = 'block';
    } else {
        elements.formSection.style.display = 'none';
        elements.resultsSection.style.display = 'block';
    }
}

// ========================================
// LOCAL STORAGE
// ========================================
function saveToLocalStorage() {
    const data = {
        packageName: state.packageName,
        location: state.location,
        searchTerms: state.searchTerms
    };
    localStorage.setItem('seoRankingMonitor', JSON.stringify(data));
}

function loadFromLocalStorage() {
    // Load language preference
    const savedLang = localStorage.getItem('seoRankingMonitor_lang');
    if (savedLang) {
        state.currentLanguage = savedLang;
    }
    
    // Load form data
    const data = localStorage.getItem('seoRankingMonitor');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            if (parsed.packageName) elements.packageNameInput.value = parsed.packageName;
            if (parsed.location) elements.locationSelect.value = parsed.location;
            if (parsed.searchTerms && Array.isArray(parsed.searchTerms)) {
                state.searchTerms = parsed.searchTerms;
                renderTermsList();
            }
            validateForm();
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make removeSearchTerm globally accessible for onclick handlers
window.removeSearchTerm = removeSearchTerm;

// ========================================
// START APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', init);

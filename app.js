// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    packageName: '',
    location: '',
    searchTerms: [],
    appInfo: null,
    rankings: []
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
    loadFromLocalStorage();
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
    
    // New search button
    elements.newSearchBtn.addEventListener('click', resetToForm);
    
    // Mobile form toggle
    elements.mobileFormToggle.addEventListener('click', toggleMobileForm);
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
    
    elements.termsCounter.textContent = `${state.searchTerms.length}/10 termos adicionados`;
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
    if (rank === 'NF') return 'Não encontrado';
    if (rank === 'Erro') return 'Erro na busca';
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

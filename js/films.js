// const TMDB_API_KEY = 'ce56d5168166bd06bebbe91ca3947d95';
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTU2ZDUxNjgxNjZiZDA2YmViYmU5MWNhMzk0N2Q5NSIsIm5iZiI6MTc3NDAyMDI5OC43MjMsInN1YiI6IjY5YmQ2NmNhMzZiMzczOThhNjhjMjA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qZHzUibYrQURc_FyQxXTiahhPKZwpE63bK3ULcNR0dU';
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`
    }
};

let currentGenres = {};
let currentPage = 1;
let totalPages = 1;
let totalMovies = 0;
let allMovies = [];

const movieListContainer = document.getElementById('movie-list');
const paginationInfo = document.getElementById('pagination-info');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const loginButton = document.getElementById('login-button');
const userProfile = document.getElementById('user-profile');

// Fetch genres once to map integer IDs to full strings
const fetchGenres = async () => {
    try {
        const res = await fetch(`${TMDB_API_BASE_URL}/genre/movie/list?language=en-US`, options);
        const data = await res.json();
        data.genres.forEach(g => {
            currentGenres[g.id] = g.name;
        });

        console.log(currentGenres);
    } catch (e) {
        console.error("Failed to load genres", e);
    }
};

// Fetch movies paginated via Discover endpoint
const fetchMovies = async (page) => {
    try {
        const res = await fetch(`${TMDB_API_BASE_URL}/discover/movie?language=en-US&page=${page}`, options);
        const data = await res.json();
        console.log(data);
        
        allMovies = data.results;
        totalPages = data.total_pages
        totalMovies = data.total_results;
        
        renderMovies();
        updatePagination();
    } catch (e) {
        console.error("Failed to load movies", e);
    }
};

const renderMovies = () => {
    movieListContainer.innerHTML = '';
    
    allMovies.forEach((movie) => {
        // Find human readable names for genres
        const genresHtml = (movie.genre_ids || [])
            .map(id => currentGenres[id])
            .filter(Boolean)
            .map(g => `<span class="border border-vintage text-vintage text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">${g}</span>`)
            .join('');

        const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/400x600/1a1a1a/e0e0e0?text=No+Poster';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
        const overview = movie.overview ? (movie.overview.length > 250 ? movie.overview.substring(0, 250) + '...' : movie.overview) : 'No description available.';

        const card = document.createElement('div');
        card.className = 'movie-card flex flex-col md:flex-row gap-8 items-start group animation-fade-in';
        card.innerHTML = `
            <div class="w-full md:w-48 flex-shrink-0">
                <div class="w-full aspect-[2/3] bg-vintage rounded-lg flex items-center justify-center text-main font-bold relative overflow-hidden shadow-lg shadow-black/50">
                    <img src="${posterUrl}" alt="${movie.title} Poster" class="w-full h-full object-cover">
                </div>
            </div>
            
            <div class="flex-grow flex flex-col pt-2 max-w-2xl h-full">
                <div class="mb-3">
                    <h2 class="text-2xl font-bold font-heading text-ivory mb-2">${movie.title}</h2>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        ${genresHtml}
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded shadow">IMDb</span>
                        <span class="text-ivory text-sm font-medium">${rating} <span class="text-yellow-500">★</span></span>
                    </div>
                </div>
                
                <p class="text-vintage text-sm leading-relaxed mb-6 opacity-80">
                    ${overview}
                </p>
                
                <div class="flex flex-wrap gap-4 mt-auto">
                    <button class="bg-ivory text-main px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-white uppercase">View Details</button>
                    <button class="btn-watchlist bg-transparent border border-ivory text-ivory px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-ivory hover:text-main uppercase">Add to Watchlists</button>
                </div>
            </div>
        `;
        movieListContainer.appendChild(card);
    });

    // Add to watchlist event listeners
    document.querySelectorAll('.btn-watchlist').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'ADD TO WATCHLISTS') {
                this.textContent = 'ADDED';
                this.classList.add('bg-accent', 'border-accent');
                this.classList.remove('bg-transparent', 'border-ivory', 'hover:bg-ivory');
            } else {
                this.textContent = 'ADD TO WATCHLISTS';
                this.classList.remove('bg-accent', 'border-accent');
                this.classList.add('bg-transparent', 'border-ivory', 'hover:bg-ivory');
            }
        });
    });
};

const updatePagination = () => {
    // TMDB lists 20 objects per page. 
    const itemsPerPage = 20;
    const startItem = ((currentPage - 1) * itemsPerPage) + 1;
    let endItem = currentPage * itemsPerPage;
    
    if (allMovies.length === 0) endItem = 0;
    else if (allMovies.length < itemsPerPage) endItem = startItem + allMovies.length - 1;

    // We changed the UI "Items per page: 10" text dynamically here to avoid mismatched HTML
    const itemsTextSpan = paginationInfo.previousElementSibling;
    if (itemsTextSpan) itemsTextSpan.textContent = `Items per page: ${itemsPerPage}`;

    paginationInfo.textContent = `${startItem} - ${endItem} of ${totalMovies.toLocaleString('id-ID')}`;

    // Disable/enable buttons
    prevPageBtn.disabled = currentPage === 1;
    prevPageBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
    prevPageBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
    
    nextPageBtn.disabled = currentPage === totalPages;
    nextPageBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    nextPageBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
};

// Initialize
const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
    loginButton.classList.add('hidden');
    userProfile.classList.remove('hidden');
    userProfile.textContent = loggedInUser === 'admin@moviespace.com' ? 'AD' : loggedInUser.charAt(0).toUpperCase();
} else {
    loginButton.classList.remove('hidden');
    userProfile.classList.add('hidden');
}

fetchGenres();
fetchMovies(currentPage);

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

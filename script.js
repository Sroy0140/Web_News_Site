// Function to fetch news data from NewsAPI

window.addEventListener("load", () => fetchNews("all"));

function reload() {
    window.location.reload();
}

async function fetchNews(category) {
    const apiKey = 'pub_38332b4a075d7cf4b96cbf44c3c6974da3d9f';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${category}&language=en`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API Response:', data);  // Log the response

        if (data.status === 'success') {
            return data.results;  // Update this line to match the new structure
        } else {
            console.error('Error fetching news:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Call the function to fetch and log the response
fetchNews("technology").then(newsData => console.log('News Data:', newsData));


// Create a Set to store unique article URLs
const uniqueArticles = new Set();

async function createNewsCards(category) {
    const newsContainer = document.querySelector('.news-container');

    try {
        const newsData = await fetchNews(category);
        console.log('News Data:', newsData);
        const articlesArray = Array.isArray(newsData) ? newsData : [newsData];
        for (const article of articlesArray) {
            const card = document.createElement('div');
            card.classList.add('news-card');
    
            const image = document.createElement('img');
            image.src = article.image_url || './assets/placeholder.jpg';
            image.alt = 'News Image';
            card.appendChild(image);
    
            const title = document.createElement('h2');
            title.classList.add('news-title');
            title.textContent = article.title || 'News Title';
            card.appendChild(title);
    
            const source = document.createElement('p');
            source.classList.add('news-source');
            source.textContent = `Source: ${article.source_id || 'Unknown Source'}`;
            card.appendChild(source);
    
            const date = document.createElement('p');
            date.classList.add('news-date');
            date.textContent = article.pubDate ? new Date(article.pubDate).toDateString() : 'Unknown Date';
            card.appendChild(date);
    
            const summary = document.createElement('p');
            summary.classList.add('news-summary');
            summary.textContent = article.description || 'News summary not available.';
            card.appendChild(summary);
    
            const articleLink = document.createElement('a');
            articleLink.href = article.link; // Use the article link from the API response
            articleLink.target = '_blank'; // Open in a new window/tab
            articleLink.textContent = 'Read More';
    
            card.appendChild(articleLink);
            newsContainer.appendChild(card);
        }
        // Further use of newsData
    } catch (error) {
        console.error('Error fetching news:', error);
    }
    console.log(newsData);
    // Check if newsData is an array, if not, create an array with the single object
    const articlesArray = Array.isArray(newsData) ? newsData : [newsData];
}

// Function to create news cards and populate with data
/***


async function createNewsCards(category) {
    const newsContainer = document.querySelector('.news-container');

    const newsData = await fetchNews(category);

    if (!newsData) {
        console.error('News data is undefined or null.');
        return;
    }
   

    newsData.forEach(article => {
        // Check if the article URL is already added
        
        if (!uniqueArticles.has(article.url)) {
            const card = document.createElement('div');
            card.classList.add('news-card');

            // Populate card content...

            const image = document.createElement('img');
            image.src = article.urlToImage || 'placeholder.jpg';
            image.alt = 'News Image';
            card.appendChild(image);

            const title = document.createElement('h2');
            title.classList.add('news-title');
            title.textContent = article.title || 'News Title';
            card.appendChild(title);

            const source = document.createElement('p');
            source.classList.add('news-source');
            source.textContent = `Source: ${article.source.name || 'Unknown Source'}`;
            card.appendChild(source);

            const date = document.createElement('p');
            date.classList.add('news-date');
            date.textContent = article.publishedAt ? new Date(article.publishedAt).toDateString() : 'Unknown Date';
            card.appendChild(date);

            const summary = document.createElement('p');
            summary.classList.add('news-summary');
            summary.textContent = article.description || 'News summary not available.';
            card.appendChild(summary);

            const articleLink = document.createElement('a');
            articleLink.href = article.url; // Use the article URL from the API response
            articleLink.target = '_blank'; // Open in a new window/tab

            // Add a click event listener to the card
            card.addEventListener('click', function () {
                articleLink.click(); // Programmatically trigger the link click
            });
            card.appendChild(articleLink);

            newsContainer.appendChild(card);

            // Add the article URL to the Set to prevent duplicates
            uniqueArticles.add(article.url);
        }
    });
}
*/

// Call the function to populate news cards
createNewsCards("technology");

// Function to filter news by category and populate news cards
async function filterAndDisplayNews(category) {
    console.log('Selected Category:', category);

    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = ''; // Clear existing news cards

    createNewsCards(category);
}
// Function to attach event listeners to category links
function attachCategoryEventListeners() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const category = link.getAttribute('id');
            console.log(category);
            filterAndDisplayNews(category);
        });
    });
}

// Call the function to attach event listeners
attachCategoryEventListeners();

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    console.log(query);
    if (!query) return;
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = '';
    createNewsCards(query);
});

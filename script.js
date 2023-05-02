// select elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.querySelector('.loader');
// Get Quotes From API
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newRandomQuote() {
  showLoadingSpinner();
  const random = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[random];
  const { author, text } = quote;
  //  Check if Author is blank and replace it with unknown
  if (!author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = author;
  }
  //Check quote length to determine styling
  if (text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = text;
  removeLoadingSpinner();
  console.log(quote);
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newRandomQuote();
  } catch (error) {
    // catch error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twittertUrl = `https://twitter.com/intent/tweet?tweet=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twittertUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newRandomQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();

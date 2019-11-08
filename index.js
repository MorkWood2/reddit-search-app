import reddit from './redditapi';

//Dom elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//form event listener
searchForm.addEventListener('submit', (e)=>{
  //get Search term
  const searchTerm = searchInput.value;
  //get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  //get Limit
  const searchLimit = document.getElementById('limit').value;

  //check input
  if (searchTerm === '') {
    //show message
    showMessage('Please add a seach term', 'alert-danger');
  }

  //clear input
  searchInput.value = '';

  //Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    let output = '<div class="card-columns">';
    results.forEach( post => {
      // console.log(results);
      //check for image
      const image = post.preview
      ? post.preview.images[0].source.url :
      'https://altosagency.com/images/blog/2019/september/reddit_advertising_blog/reddit-blog-post-hero-large.jpg';

      output += `
      <div class="card">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${truncateText(post.selftext, 100)}</p>
      <a href="${post.url}"  target ="blank" class="btn btn-primary">Read more</a>
      <hr>
      <span class = "badge badge-secondary">Subreddit:
      ${post.subreddit}
      </span>
      <span class = "badge badge-dark">Score:
      ${post.score}
      </span>
      </div>
      </div>
      `;
    });
    output += "</div>"
    document.getElementById('results').innerHTML = output;
    // console.log(results);
  })

  e.preventDefault();
});

// Show message
function showMessage(message, className){
  //create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //Get parent container id of search-container and id of searchForm
  const searchContainer = document.getElementById('search-container');
  //get search
  const search = document.getElementById('search');

//insert message insert div before search element
searchContainer.insertBefore(div, search);

//timeout alert
setTimeout(() => document.querySelector('.alert').remove(), 3000);

}

//truncate text
function truncateText(text,limit){
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}

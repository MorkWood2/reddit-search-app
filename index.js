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
  reddit.search(searchTerm, searchLimit, sortBy);

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

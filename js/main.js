//Form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
// Get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

if(!validateForm(siteName, siteUrl)){
  return false;
}

var bookmark = {
  name: siteName,
  url: siteUrl
}

// Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null) {
  // Init array
  var bookmarks = [];
  // Add to array
  bookmarks.push(bookmark);
  // Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Add bookmark to array
  bookmarks.push(bookmark);
  //Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Clear form
document.getElementById('myForm').reset();

// Re-fetch bookmarks
fetchBookmarks();

// Prevent form from submitting
e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarksResults
function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Get output id
   var bookmarksResults = document.getElementById('bookmarksResults');

   //Build output
   bookmarksResults.innerHTML = '';
   for(var i = 0; i < bookmarks.length; i++){
     var name = bookmarks[i].name;
     var url = bookmarks[i].url;

   bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
                                 '<h3>'+name+
                                 ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                 '</h3>'+
                                 '</div>';
   }
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

/* span.onclick = function() {
    modal.style.display = "none";
}
*/

// Validate form
function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl){
    modal.style.display = "block";
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    modal.style.display = "block"
    return false;
  }

  return true;
}

/* When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 
*/


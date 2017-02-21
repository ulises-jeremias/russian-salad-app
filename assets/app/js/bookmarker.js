const Func = require('./functions.js');
const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : new Array();

// Delete bookmark
deleteBookmark = (url) => {
  // Loop throught bookmarks
  for(var i = 0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
fetchBookmarks = () => {
  // Build output
  var result = '<article>';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].SiteName;
    var url = bookmarks[i].SiteURL;
    result += '<h2>'+name+
              ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
              ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">Delete</a> ' +
              '</h2>';
  }
  result += '</article>';
  Func.$('#bookmarksResults').innerHTML = result;
}

validateURL = ({ SiteName, SiteURL }) => {
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
      regex = new RegExp(expression);
  return SiteURL.match(regex);
}

saveBookmark = () => {
  let bookmark = Func.getFormData();
  if (!validateURL(bookmark)) {
    alert('Please use a valid URL');
    return;
  }
  /*
    Func.localTest();
  */
  // Add bookmark to array
  bookmarks.push(bookmark);
  // Set or Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Clear form
  Func.$('#umd_form').reset();
  // Re-fetch bookmarks
  fetchBookmarks();
}

document.addEventListener('DOMContentLoaded', function() {
  fetchBookmarks();
  // Event to show umd_form
  Func.$('#add_button').addEventListener('click', function(event) {
    if (document.umd_form) {
      this.innerHTML = '<i class="glyphicon glyphicon-plus"></i> Add Bookmark';
      Func.$('#bookmarker').removeChild(Func.$('#bookmarker').firstElementChild);
      return;
    }
    this.innerHTML = '<i class="glyphicon glyphicon-remove"></i> Cancel';
    Func.render_form(
        Func.$('#bookmarker')
      , ['SiteName', 'SiteURL'] // inputs
      , 'saveBookmark();'
    );
    return;
  });
});

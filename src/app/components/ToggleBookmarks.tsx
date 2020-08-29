const toggleBookmarks = (isWorkMode: boolean, workBookmarksId: string, homeBookmarksId: string, 
  setWorkBookmarksId: (s:string) => void, setHomeBookmarksId: (s:string) => void,) => {    
  chrome.bookmarks.getTree(bookmarkTree => {
    // Store bookmarks in bookmark bar
    if (!bookmarkTree[0].children) {
      // Error because bookmark tree always has two children
      return;
    }
    let bookmarkBar = bookmarkTree[0].children[0];

    if (isWorkMode) {
      chrome.bookmarks.create({
        'title': 'Home Bookmarks'
      }, (homeBookmarks) => {
        setHomeBookmarksId(homeBookmarks.id);
        bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
          chrome.bookmarks.move(bookmark.id, { 'parentId': homeBookmarks.id });
        });
      });

      chrome.bookmarks.getChildren(workBookmarksId, children => {
        children.forEach(bookmark => {
          chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
        });

        chrome.bookmarks.remove(workBookmarksId);
      });
      setWorkBookmarksId('');

    } else {
      chrome.bookmarks.create({
        'title': 'Work Bookmarks'
      }, (workBookmarks) => {
        setWorkBookmarksId(workBookmarks.id);
        bookmarkBar.children && bookmarkBar.children.forEach(bookmark => {
          chrome.bookmarks.move(bookmark.id, { 'parentId': workBookmarks.id });
        });
      });

      chrome.bookmarks.getChildren(homeBookmarksId, children => {
        children.forEach(bookmark => {
          chrome.bookmarks.move(bookmark.id, { 'parentId': bookmarkBar.id });
        });

        chrome.bookmarks.remove(homeBookmarksId);
      });
      setHomeBookmarksId('');

    }
  });
};

export default toggleBookmarks;
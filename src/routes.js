const  {addBookshelfHandler, getAllBookshelfHandler, getBookshelfByIdHandler, editBookshelfHandler, deleteBookByIdHandler}  = require('./handler');

const routes = [
   {
      method: 'POST',
      path: '/books',
      handler: addBookshelfHandler
   },
   {
      method: 'GET',
      path: '/books',
      handler: getAllBookshelfHandler
   },
   {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookshelfByIdHandler
   },
   {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBookshelfHandler
   },
   {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler
   },

]

module.exports = routes

const { nanoid } = require('nanoid');
const bookshelfs = require('./bookshelfs');


// addBookshelfHandler
const addBookshelfHandler = (request, h) => {
   const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

   const id = nanoid(16);
   const insertedAt = new Date().toISOString();
   const updatedAt = insertedAt;
   const finished = false;

   const newAddBookshelf = {
      id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished
   };

   if (request.payload.name == undefined) {
      const response = h.response({
         status: "fail",
         message: "Gagal menambahkan buku. Mohon isi nama buku"
      });
      response.code(400);
      return response;
   }
   
   if (readPage > pageCount) {
      const response = h.response({
         status: "fail",
         message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      });
      response.code(400);
      return response;
   }

   bookshelfs.push(newAddBookshelf)
   const isSuccess = bookshelfs.filter((v) => v.id === id).length > 0;

   if (isSuccess) {
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil ditambahkan',
         data: {
            bookId: id
         },
      });
      response.code(201);
      return response
   }

   const response = h.response({
      status: 'error',
      message: 'Catatan gagal ditambahkan',
   });
   response.code(500);
   return response;
}


// getAllBookshelfHandler
const getAllBookshelfHandler = (request) => {
   const { name, reading, finished } = request.query;
   const isUsingQuery = name !== undefined || reading !== undefined || finished !== undefined;

   let newData = bookshelfs;

   if (bookshelfs.length > 0) {
      console.log('bookshelfs.length > 0',bookshelfs.length > 0)
      if (isUsingQuery) {
         if (name !== undefined) {
            newData = bookshelfs.filter((book) => book.name.toString().toUpperCase()
               .includes(name.toString().toUpperCase()));
         }
         if (reading === '1') {
            newData = (bookshelfs.filter((book) => book.reading === true));
         } else if (reading === '0') {
            newData = (bookshelfs.filter((book) => book.reading === false));
         }
         if (finished === '1') {
            newData = (bookshelfs.filter((book) => book.finished === true));
         } else if (finished === '0') {
            newData = (bookshelfs.filter((book) => book.finished === false));
         }
         return {
            status: 'success',
            data: {
               books: newData.map((book) => ({
                  id: book.id,
                  name: book.name,
                  publisher: book.publisher,
               })),
            },
         };
      }

      let datafilter = [];
      bookshelfs.forEach((v) => {
         const picked = ((({ id, name, publisher }) => ({ id, name, publisher }))(v))
         datafilter.push(picked);
      });

      console.log('dasd', datafilter);
      return {
         "status": "success",
         "data": {
            "books": datafilter,
         }
      }

   } else {
      console.log('false',false)
       return {
         "status": "success",
         "data": {
            "books": [],
         }
      }
   }

}


// getBookshelfByIdHandler
const getBookshelfByIdHandler = (request, h) => {
   const { bookId } = request.params;
   const bookshelf = bookshelfs.filter((n) => n.id === bookId)[0];

   if (bookshelf !== undefined) {
      const response = h.response({
         status: 'success',
         data: {
            book: bookshelf
         }
      });
      response.code(200);
      return response;
   }

   const response = h.response({
      status: 'fail',
      message: "Buku tidak ditemukan",
   });
   response.code(404);
   return response
}


// editBookshelfHandler
const editBookshelfHandler = (request, h) => {
   const { bookId } = request.params;

   const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
   } = request.payload;
   const finished = readPage === pageCount;
   const updatedAt = new Date().toISOString();

   const index = bookshelfs.findIndex((book) => book.id === bookId);
   console.log('index', index)

   if (index !== -1) {
      if (name !== undefined) {
         if (readPage <= pageCount) {
            bookshelfs[index] = {
               ...bookshelfs[index],
               bookId,
               name,
               year,
               author,
               summary,
               publisher,
               pageCount,
               readPage,
               finished,
               reading,
               updatedAt,
            };

            const response = h.response({
               status: 'success',
               message: 'Buku berhasil diperbarui',
            });
            response.code(200);
            return response;
         }
         const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
         });
         response.code(400);
         return response;
      }
      const response = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
   }

   const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
   });
   response.code(404);
   return response;
};


const deleteBookByIdHandler = (request, h) => {
   const { bookId } = request.params;

   const index = bookshelfs.findIndex((book) => book.id === bookId);

   if (index !== -1) {
      bookshelfs.splice(index, 1);

      const response = h.response({
         status: 'success',
         message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
   }

   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
   });
   response.code(404);
   return response;
};

module.exports = { addBookshelfHandler, getAllBookshelfHandler, getBookshelfByIdHandler, editBookshelfHandler, deleteBookByIdHandler };
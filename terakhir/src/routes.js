const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler 
} = require('./handler');

const routes = [
    {
        method:'POST',
        path: '/books',
        handler: 'addBookHandler',
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getAllBooksHandler, 
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;
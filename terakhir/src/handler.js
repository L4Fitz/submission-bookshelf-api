const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request,h) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if(!name){
        const messageText  = 'Isi nama Buku !';

        const response = h
        .response({
            status: 'gagal',
            message: `Buku tidak berhasil ditambahkan. ${messageText}`,
        });

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const messageText = 'readPage tidak dapat melebihi pageCount';

        const response = h
        .response({
            status:'Gagal',
            message:`Buku tidak berhasil ditambahkan, ${messageText}`,
        });

        response.code(400);
        return response;
    }

    const id = nanoid(16);

    let finished = false;
    if(pageCount === readPage) {
        finished = true;
    }
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updateAt,
    };
    
    books.push(newBook);

    const isSuccess = books.filter((note) => note.id === id).length>0;
    
    if(isSuccess){
        const response = h
        .response ({
            status: 'Berhasil',
            message: 'Berhasil! Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }


const response = h
.response ({
    status:'Gagal',
    message: 'Gagal menambahkan',
});

response.code(500);
return response;

};

const getAllBooksHandler = (request,h) => {
    const {name, reading, finished} = request.query;

    if(name !== undefined){
        constBooksName = books.filter((book) => book.name.toLowerCase(). includes(name.toLowerCase()));
    const response = h
    .response({
        status:'Berhasil',
        data:{
            books: BooksName.map((book) => 
            ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });

    response.code(200);

    return response;
    } else if(reading !== undefined){
        const BooksReading = books.filter(
            (book) => Number(book.reading) === Number(reading),
        );

        const response = h
        .response({
            status:'Berhasil',
            data:{
                books: BooksReading.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
        },
        });
        response.code(200);

        return response;
    } else{
        const response = h
        .response({
            status:'berhasil',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
};

const getBookByIdHandler = (request,h) => {
    const{bookId} = request.params;
    const book = bookshelf.filter((book) => book.id === bookId)[0];
    if(book !== undefined){
        return{
            status: 'Berhasil',
            data: {
                book,
            },
        };
    }

const response = h
.response ({
    status: 'GAgal',
    message: 'Mohon masukkan nama buku dengan benar, Buku tidak ditemukan',
})

response.code(404);

return response;

};

const editBookByIdHandler = (request,h) => {
    const{bookId} = request.paramas;

    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        } = request.payload;
        if(name === undefined) {
            const response = h
            .response({
                status:'Gagal',
                message:'Nama buku harus diisi, Gagal memperbaharui buku',
            });

            response.code(400);

            return response;
        }

        if(readPage > pageCount){
            const response = h
            .response({
                status:'Gagal',
                message:'readPage tidak boleh melebihi pageCount, Gagal memperbaharui buku',
            });

            response.code(400);
            return response;
        }
        const updateAt = new Date().toISOString();
        const index = bookshelf.findIndex((book) => book.id === bookId);
        if(index !== -1){
            bookshelf[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updateAt,
            };

            const response = h
            .response({
                status:'Berhasil',
                message:'Buku telah diperbarui',
            });

            response.code(200);

            return response;
        } else {
            const response = h
            .response({
                status:'Gagal',
                message:'Buku gagal diperbarui, mohon masukkan id yang benar',
            });

            response.code(404);
            
            return response;
        }
    };

    const deleteBookByIdHandler = (request,h) => {
        const{id} = request.params;
        const index = books.findIndex((book) => book.id === id);

        if(index !== -1){
            books.splice(index,1);
            const response = h
            .response ({
                status:'Berhasil',
                message:'Buku telah dihapus',
            });

            response.code(200);

            return response;
        }

        const response = h
        .response({
            status:'Gagal',
            message:'Buku tidak berhasil dihapus, mohon masukkan id yang benar',
        });

        response.code(404);

        return response;
    };

    module.exports = {
        addBookHandler,
        getAllBooksHandler,
        getBookByIdHandler,
        editBookByIdHandler,
        deleteBookByIdHandler,
    };

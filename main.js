// main.js

document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    const searchForm = document.getElementById('searchBook');
  
    // Memuat buku dari localStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    // Fungsi untuk menyimpan buku ke localStorage
    function saveBooks() {
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    // Fungsi untuk menampilkan buku
    function renderBooks() {
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');
  
        bookItem.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          </div>
        `;
  
        // Tombol "Selesai dibaca"
        bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
          toggleBookCompletion(book.id);
        });
  
        // Tombol "Hapus Buku"
        bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
          deleteBook(book.id);
        });
  
        // Menentukan di mana buku ditampilkan
        if (book.isComplete) {
          completeBookList.appendChild(bookItem);
        } else {
          incompleteBookList.appendChild(bookItem);
        }
      });
    }
  
    // Fungsi untuk menambah buku baru
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('bookFormTitle').value;
      const author = document.getElementById('bookFormAuthor').value;
      const year = parseInt(document.getElementById('bookFormYear').value);
      const isComplete = document.getElementById('bookFormIsComplete').checked;
  
      const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(newBook);
      saveBooks(); // Simpan ke localStorage
      bookForm.reset();
      renderBooks();
    });
  
    // Fungsi untuk menghapus buku
    function deleteBook(id) {
      books = books.filter(book => book.id !== id);
      saveBooks(); // Simpan ke localStorage
      renderBooks();
    }
  
    // Fungsi untuk memindahkan buku antara "belum selesai" dan "selesai"
    function toggleBookCompletion(id) {
      const book = books.find(book => book.id === id);
      if (book) {
        book.isComplete = !book.isComplete;
        saveBooks(); // Simpan ke localStorage
        renderBooks();
      }
    }
  
    // Fungsi untuk mencari buku
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
      
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      filteredBooks.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');
  
        bookItem.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          </div>
        `;
  
        bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
          toggleBookCompletion(book.id);
        });
  
        bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
          deleteBook(book.id);
        });
  
        if (book.isComplete) {
          completeBookList.appendChild(bookItem);
        } else {
          incompleteBookList.appendChild(bookItem);
        }
      });
    });
  
    // Render buku yang sudah ada saat pertama kali dimuat
    renderBooks();
  });
  
//  
// Iverson(HouYanchao)  
// ID：223190608
  

const sqlite3 = require('sqlite3').verbose();  
  
// Note 2: Create a database connection  
let db = new sqlite3.Database('./books.db', (err) => {  
    if (err) {  
        return console.error(err.message);  
    }  
    console.log('Connected to the in-memory SQlite database.');  
});  
  
// Note 3: Initialize the database table  
db.serialize(() => {  
    db.run('CREATE TABLE IF NOT EXISTS books (title TEXT, author TEXT, ISBN TEXT, content TEXT)');  
});  
  
  
// const os = require('os');  
// const { exec } = require('child_process');  
// const macUsername = os.userInfo().username;  
// exec('ipconfig getifaddr en0', (error, stdout, stderr) => {  
//     if (error) {  
//         console.error(`exec error: ${error}`);  
//         return;  
//     }  
//     const macIP = stdout.trim();  
//     console.log(`Mac Username: ${macUsername}, IP Address: ${macIP}`);  
// });  
  
// Function: Add a book  
function addBook(title, author, ISBN, content) {  
    db.run('INSERT INTO books (title, author, ISBN, content) VALUES (?, ?, ?, ?)',  
        [title, author, ISBN, content], function(err) {  
            if (err) {  
                return console.log(err.message);  
            }  
            console.log(`A row has been inserted with rowid ${this.lastID}`);  
        });  
}  
  
// Function: Lists all books  
function listBooks() {  
    db.all('SELECT * FROM books', [], (err, rows) => {  
        if (err) {  
            throw err;  
        }  
        rows.forEach((row) => {  
            console.log(`Title: ${row.title}, Author: ${row.author}, ISBN: ${row.ISBN}, Content: ${row.content}`);  
        });  
    });  
}  
  
 
const readline = require('readline');  
const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout  
});  
  
rl.question('Please enter a title for the book (title): ', (title) => {  
    rl.question('Please enter the author of the book (author): ', (author) => {  
        rl.question('Please enter the ISBN of the book (ISBN): ', (ISBN) => {  
            rl.question('Please enter the contents of the book (content): ', (content) => {  
                addBook(title, author, ISBN, content);  
                rl.question('Do you want to continue entering book information?(yes/no): ', (continueInput) => {  
                    if (continueInput.toLowerCase() === 'yes') {  
                       
                        rl.question('Please enter a title for the book (title): ', (title) => {  
                           
                        });  
                    } else {  
                        listBooks();  
                        rl.close();  
                    }  
                });  
            });  
        });  
    });  
});

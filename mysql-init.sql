CREATE TABLE poem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    pronunciation TEXT NOT NULL,
    translation TEXT NOT NULL,
    background TEXT NOT NULL,
    appreciation TEXT NOT NULL
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,

    creationDate DATETIME NOT NULL,
    modificationDate DATETIME NOT NULL,
    creationUser VARCHAR(255) NOT NULL,
    modificationUser VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE builds (
    id UUID PRIMARY KEY,
    user INT NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT,
    items TEXT NOT NULL,
    version VARCHAR(255),
    tags TEXT,
    visibility BOOLEAN NOT NULL,

    creationDate DATETIME NOT NULL,
    modificationDate DATETIME NOT NULL,
    creationUser VARCHAR(255) NOT NULL,
    modificationUser VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,

    FOREIGN KEY (user) REFERENCES users(id)
);
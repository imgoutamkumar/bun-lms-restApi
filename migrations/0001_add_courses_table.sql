CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    level TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
)
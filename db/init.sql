CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    date_created DATE,
    date_updated DATE,
    category VARCHAR(255),
    duration INT,
    difficulty VARCHAR(255),
    quantity TEXT,
    ingredients JSONB,
    instructions TEXT[],
    image BYTEA
);
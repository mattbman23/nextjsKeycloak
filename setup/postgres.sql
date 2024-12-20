CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    resources VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (task, is_completed) VALUES 
('Buy groceries', FALSE),
('Read a book', FALSE),
('Call mom', TRUE),
('Finish project report', FALSE),
('Water plants', TRUE),
('Go for a run', FALSE),
('Prepare dinner', FALSE),
('Fix the leaking faucet', TRUE),
('Schedule doctor appointment', FALSE),
('Organize the desk', TRUE);

CREATE ROLE anon NOLOGIN;

CREATE ROLE standard NOLOGIN;

CREATE ROLE admin NOLOGIN;
-- STANDARD

GRANT USAGE ON SCHEMA public TO standard;

GRANT ALL ON todos TO standard;

GRANT USAGE, SELECT ON SEQUENCE todos_id_seq TO standard;

-- ADMIN

GRANT USAGE ON SCHEMA public TO admin;

GRANT ALL ON todos TO admin;

GRANT USAGE, SELECT ON SEQUENCE todos_id_seq TO admin;
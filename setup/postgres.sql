CREATE TABLE todolist (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todolist (task, is_completed) VALUES 
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

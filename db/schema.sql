
-- Database Schema for References App
-- Execute this in your PostgreSQL instance

CREATE TABLE IF NOT EXISTS preregistrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups if needed
CREATE INDEX idx_preregistrations_email ON preregistrations(email);

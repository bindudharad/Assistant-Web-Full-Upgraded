-- Basic seed data for assistant-web-full
INSERT INTO users (id, name) VALUES (gen_random_uuid(), 'Demo User') ON CONFLICT DO NOTHING;
INSERT INTO jobs (title) VALUES ('Frontend Engineer'), ('Backend Engineer');
INSERT INTO alerts (type) VALUES ('medicine'), ('job');

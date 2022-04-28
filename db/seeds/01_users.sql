-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

INSERT INTO categories (name) VALUES ('Social Media');
INSERT INTO categories (name) VALUES ('Shopping');
INSERT INTO categories (name) VALUES ('Email');
INSERT INTO categories (name) VALUES ('Online Streaming');
INSERT INTO categories (name) VALUES ('Education');

INSERT INTO orgs (name) VALUES ('Lighthouse Lab');
INSERT INTO orgs (name) VALUES ('Facebook');
INSERT INTO orgs (name) VALUES ('Microsoft');
INSERT INTO orgs (name) VALUES ('Google');
INSERT INTO orgs (name) VALUES ('Apple');

INSERT INTO users (org_id, name, email, password) VALUES (1, 'Michael', 'Michael@gmail.com', '12345678');
INSERT INTO users (org_id, name, email, password) VALUES (1, 'Joe', 'Joe@gmail.com', '23456789');
INSERT INTO users (org_id, name, email, password) VALUES (2, 'Artem', 'Artem@gmail.com', '34567890');
INSERT INTO users (org_id, name, email, password) VALUES (2, 'Jessica', 'Jessica@gmail.com', '45678901');
INSERT INTO users (org_id, name, email, password) VALUES (3, 'Bruce', 'Bruce@gmail.com', '56789012');

INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (1, 1, 'Facebook', 'www.facebook.com', 'lighthouse_lab@gmail.com', 'l1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (2, 1, 'Amazon CA', 'www.amazon.ca', 'lighthouse_lab@gmail.com', 'l1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (2, 1, 'Amazon US', 'www.amazon.com', 'lighthouse_lab@gmail.com', 'l1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (3, 1, 'Gmail', 'www.gmail.com', 'lighthouse_lab@gmail.com', 'l1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (4, 1, 'Netflix', 'www.netflix.com', 'lighthouse_lab@gmail.com', 'l1234567');

INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (1, 2, 'Facebook', 'www.facebook.com', 'facebook@facebook.com', 'f1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (2, 2, 'Apple', 'www.apple.ca', 'facebook@facebook.com', 'f1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (5, 2, 'Lighthouse Lab', 'www.lighthouselab.com', 'facebook@facebook.com', 'f1234567');

INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (1, 3, 'Facebook', 'www.facebook.com', 'microsoft@hotmail.com', 'm1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (2, 3, 'Amazon CA', 'www.amazon.ca', 'microsoft@hotmail.com', 'm1234567');
INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (4, 3, 'Amazon Prime', 'www.primevideo.com', 'microsoft@hotmail.com', 'm1234567');





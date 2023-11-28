CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE message (
    message_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    kinde_id CHAR(35) UNIQUE NOT NULL
);

CREATE TABLE organizer (
    account_id INTEGER PRIMARY KEY
        REFERENCES account(account_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    organization_name VARCHAR(500)
);

CREATE TABLE guest (
    account_id INTEGER PRIMARY KEY
        REFERENCES account(account_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    is_ubc_student BOOLEAN NOT NULL
);

CREATE TABLE file (
    file_id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL
        REFERENCES account(account_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    url TEXT NOT NULL
);

CREATE TABLE venue_type (
    venue_type_name VARCHAR(100) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE area (
    postal_code CHAR(6),
    country VARCHAR(100),
    city TEXT NOT NULL,
    province TEXT NOT NULL,
    PRIMARY KEY (postal_code, country)
);

CREATE TABLE venue (
    venue_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    seats INTEGER,
    venue_type_name VARCHAR(100) NOT NULL
        REFERENCES venue_type(venue_type_name)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    postal_code CHAR(6) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street_number INTEGER NOT NULL,
    street_name TEXT NOT NULL,
    FOREIGN KEY (postal_code, country)
        REFERENCES area(postal_code, country)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    organizer_id INTEGER NOT NULL
        REFERENCES organizer(account_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    venue_id INTEGER NOT NULL
        REFERENCES venue(venue_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_name VARCHAR(100) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE event_in_category (
    event_id INTEGER
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    category_name VARCHAR(100)
        REFERENCES category(category_name)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_name)
);

CREATE TABLE ticket (
    ticket_id UUID DEFAULT gen_random_uuid(),
    event_id INTEGER
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    account_id SERIAL
        REFERENCES guest(account_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    cost NUMERIC(20) NOT NULL,
    PRIMARY KEY (ticket_id, event_id)
);

CREATE TABLE discounted_ticket (
    ticket_id UUID,
    event_id INTEGER,
    discount NUMERIC(3) NOT NULL,
    promo_code TEXT NOT NULL,
    PRIMARY KEY (ticket_id, event_id),
    FOREIGN KEY (ticket_id, event_id)
        REFERENCES ticket(ticket_id, event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    rating NUMERIC(2) NOT NULL,
    comment VARCHAR(512),
    account_id INTEGER NOT NULL
        REFERENCES guest(account_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    event_id INTEGER NOT NULL
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

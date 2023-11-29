CREATE TABLE users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE organizer (
    user_id SERIAL PRIMARY KEY NOT NULL
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    organization_name TEXT
);

CREATE TABLE guest (
    user_id SERIAL PRIMARY KEY NOT NULL
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    is_ubc_student BOOLEAN NOT NULL
);

CREATE TABLE venue_type (
    venue_type_name TEXT PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE area (
    postal_code CHAR(6) NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT NOT NULL,
    PRIMARY KEY (postal_code, country)
);

CREATE TABLE venue (
    venue_id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    seats INTEGER,
    venue_type_name TEXT NOT NULL
        REFERENCES venue_type(venue_type_name)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    postal_code CHAR(6) NOT NULL,
    country TEXT NOT NULL,
    street_number INTEGER NOT NULL,
    street_name TEXT NOT NULL,
    FOREIGN KEY (postal_code, country)
        REFERENCES area(postal_code, country)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    organizer_id SERIAL NOT NULL
        REFERENCES organizer(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    venue_id SERIAL NOT NULL
        REFERENCES venue(venue_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_name TEXT PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE event_in_category (
    event_id SERIAL NOT NULL
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    category_name TEXT NOT NULL
        REFERENCES category(category_name)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_name)
);

CREATE TABLE ticket (
    ticket_id SERIAL NOT NULL,
    event_id SERIAL NOT NULL
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    user_id SERIAL
        REFERENCES guest(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    cost NUMERIC(20) NOT NULL,
    PRIMARY KEY (ticket_id, event_id)
);

CREATE TABLE discounted_ticket (
    ticket_id SERIAL NOT NULL,
    event_id SERIAL NOT NULL,
    discount NUMERIC(3) NOT NULL,
    promo_code TEXT NOT NULL,
    PRIMARY KEY (ticket_id, event_id),
    FOREIGN KEY (ticket_id, event_id)
        REFERENCES ticket(ticket_id, event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY NOT NULL,
    rating NUMERIC(2) NOT NULL,
    comment VARCHAR(512),
    user_id SERIAL NOT NULL
        REFERENCES guest(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    event_id SERIAL NOT NULL
        REFERENCES event(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

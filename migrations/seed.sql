INSERT INTO
    account (account_id, kinde_id)
VALUES
    (1, 'kp_b6f850e42e1d4fc6b6ad4a6c54dec6e1'),
    (2, 'kp_3ae3677422fb4be5830e2415a4be3e13'),
    (3, 'kp_0765330c73af4fc792a68b80ebdfdafb'),
    (4, 'kp_61ff1da6b08646f68fc8b39b2b634104'),
    (5, 'kp_82d8fca74d1648de85e569a6d8d35325');

SELECT setval('account_account_id_seq', 5);

INSERT INTO
    organizer (account_id, organization_name)
VALUES
    (1, 'AMS Events'),
    (2, 'XYZ Events'),
    (3, 'Happy Events'),
    (4, 'Best Events'),
    (5, 'CVC Events');

INSERT INTO
    guest (account_id, is_ubc_student)
VALUES
    (1, false),
    (2, true),
    (3, false),
    (4, true),
    (5, false);

INSERT INTO
    venue_type (venue_type_name, description)
VALUES
    ('Concert Hall', 'Large indoor venue for music concerts'),
    ('Conference Center', 'Space for conferences and seminars'),
    ('Stadium', 'Large sports and entertainment venue'),
    ('Theater', 'Venue for stage performances'),
    ('Outdoor', 'Open-air space for events');

INSERT INTO
    area (postal_code, country, city, province)
VALUES
    ('V6T1Z4', 'Canada', 'Vancouver', 'BC'),
    ('M6P2L4', 'Canada', 'Toronto', 'ON'),
    ('90210', 'USA', 'Beverly Hills', 'CA'),
    ('M5S2K5', 'Canada', 'Toronto', 'ON'),
    ('M5G2C4', 'Canada', 'Toronto', 'ON');

INSERT INTO
    venue (venue_id, name, description, seats, venue_type_name, postal_code, country, street_number, street_name)
VALUES
    (1, 'Grand Arena', 'Large concert hall', 5000, 'Concert Hall', 'V6T1Z4', 'Canada', 123, 'Main Street'),
    (2, 'Convention Center', 'Modern conference space', 1000, 'Conference Center', 'M6P2L4', 'Canada', 60, 'Mountview Avenue'),
    (3, 'Sports Stadium', 'Football and sports events', 30000, 'Stadium', '90210', 'USA', 567, 'Sports Road'),
    (4, 'Downtown Theater', 'Intimate theater experience', 500, 'Theater', 'M5S2K5', 'Canada', 101, 'Theater Lane'),
    (5, 'UBC Field', 'Outdoor field for events', NULL, 'Outdoor', 'M5G2C4', 'Canada', 200, 'Park Avenue');

SELECT setval('venue_venue_id_seq', 5);

INSERT INTO
    event (event_id, name, description, start_date, end_date, organizer_id, venue_id)
VALUES
    (1, 'Hozier Concert', 'A night of folk music', '2023-11-15', '2023-11-16', 1, 1),
    (2, 'Angular Tech Conference', 'Innovations in Angular Web Framework', '2023-10-25', '2023-10-27', 2, 2),
    (3, 'UBC Mens Ultimate Vs Waterloo', 'The big game', '2023-12-01', '2023-12-01', 3, 3),
    (4, 'UBC Theatre Hamlet', 'Drama and comedy', '2023-11-20', '2023-11-21', 4, 4),
    (5, 'UBC CVC picnic in the Park', 'Outdoor student event', '2023-09-05', '2023-09-05', 5, 5);

SELECT setval('event_event_id_seq', 5);

INSERT INTO
    category (category_name, description)
VALUES
    ('Music', 'Events related to music and concerts'),
    ('Technology', 'Tech-related events and conferences'),
    ('Sports', 'Sports and athletic events'),
    ('Theater', 'Stage performances and plays'),
    ('Outdoor', 'Open-air and outdoor events');

INSERT INTO
    event_in_category (event_id, category_name)
VALUES
    (1, 'Music'),
    (2, 'Technology'),
    (3, 'Sports'),
    (4, 'Theater'),
    (5, 'Outdoor'),
    (5, 'Music');

INSERT INTO
    ticket (ticket_id, event_id, account_id, cost)
VALUES
    ('dd4ac94d-45cc-4ca0-83ef-f660a10bed79', 1, 2, 4000),
    ('3550a605-b645-4f05-8f6f-908888beecab', 2, 4, 15000),
    ('4edcbfe2-86be-4ae2-9bb7-e39b7320f878', 3, 3, 7500),
    ('3fb7a3d8-ec10-4397-80bf-94373bdbc43f', 4, 5, 5500),
    ('d64e1cac-c079-4da3-8491-091811fbc0b3', 5, 3, 1000);

INSERT INTO
    discounted_ticket (ticket_id, event_id, discount, promo_code)
VALUES
    ('dd4ac94d-45cc-4ca0-83ef-f660a10bed79', 1, 10, 'ROCK10'),
    ('3550a605-b645-4f05-8f6f-908888beecab', 2, 20, 'TECH20'),
    ('4edcbfe2-86be-4ae2-9bb7-e39b7320f878', 3, 15, 'SPORTS15'),
    ('3fb7a3d8-ec10-4397-80bf-94373bdbc43f', 4, 5, 'THEATER5'),
    ('d64e1cac-c079-4da3-8491-091811fbc0b3', 5, 2, 'BACK2SCHOOL');

INSERT INTO
    review (review_id, rating, comment, account_id, event_id)
VALUES
    (1, 4, 'Great concert!', 2, 1),
    (2, 5, 'I Love Angular So Much!', 4, 2),
    (3, 4, 'GO UBC!', 3, 3),
    (4, 4, 'All time favourite production of Hamlet!', 5, 4),
    (5, 2, 'It rained :(.', 1, 5);

SELECT setval('review_review_id_seq', 5);

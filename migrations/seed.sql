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
    (5, 'UBC Field', 'Outdoor field for events', 1000, 'Outdoor', 'M5G2C4', 'Canada', 200, 'Park Avenue');

SELECT setval('venue_venue_id_seq', 5);

INSERT INTO
    event (event_id, name, description, start_date, end_date, organizer_id, venue_id)
VALUES
    (1, 'Hozier Concert', 'A night of folk music', '2024-01-15', '2024-01-16', 1, 1),
    (2, 'Angular Tech Conference', 'Innovations in Angular Web Framework', '2024-01-25', '2024-01-27', 2, 2),
    (3, 'UBC Mens Ultimate Vs Waterloo', 'The big game', '2024-01-01', '2024-01-01', 3, 3),
    (4, 'UBC Theatre Hamlet', 'Drama and comedy', '2024-01-20', '2024-01-21', 4, 4),
    (5, 'UBC CVC picnic in the Park', 'Outdoor student event', '2024-01-05', '2024-01-05', 5, 5),
    (6, 'Tech Summit', 'Exploring the latest in technology', '2024-01-10', '2024-01-12', 1, 1),
    (7, 'Fitness Expo', 'Showcasing the latest in fitness trends', '2024-01-15', '2024-01-17', 2, 2),
    (8, 'Science Fair', 'A showcase of student research projects', '2024-01-05', '2024-01-07', 3, 3),
    (9, 'Comedy Night', 'An evening of laughter and entertainment', '2024-01-25', '2024-01-26', 4, 4),
    (10, 'Food Festival', 'Celebrating diverse cuisines from around the world', '2024-01-15', '2024-01-17', 5, 5),
    (11, 'Art Exhibition', 'Featuring works from local artists', '2024-01-08', '2024-01-10', 1, 1),
    (12, 'Startup Pitch Day', 'Entrepreneurs pitch their innovative ideas', '2024-01-05', '2024-01-07', 2, 2),
    (13, 'Fashion Show', 'Showcasing the latest trends in fashion', '2024-01-20', '2024-01-21', 3, 3),
    (14, 'Gaming Tournament', 'Compete in your favorite video games', '2024-01-30', '2024-02-01', 4, 4),
    (15, 'Book Fair', 'Explore a wide range of books and literature', '2024-01-28', '2024-01-30', 5, 5),
    (16, 'Music Festival', 'A weekend of live music performances', '2024-01-01', '2024-01-03', 1, 1),
    (17, 'Coding Bootcamp', 'Intensive coding training for beginners', '2024-01-10', '2024-01-12', 2, 2),
    (18, 'Environmental Summit', 'Discussing solutions for a sustainable future', '2024-01-20', '2024-01-22', 3, 3),
    (19, 'Dance Competition', 'Showcasing the best dance talent in the region', '2024-01-08', '2024-01-10', 4, 4),
    (20, 'Film Festival', 'Celebrating independent and international cinema', '2024-01-18', '2024-01-20', 5, 5),
    (21, 'Science and Technology Expo', 'Exploring advancements in science and tech', '2024-01-15', '2024-01-17', 1, 1),
    (22, 'Wellness Retreat', 'A weekend of relaxation and self-care', '2024-01-12', '2024-01-14', 2, 2),
    (23, 'Culinary Workshop', 'Learn cooking techniques from renowned chefs', '2024-01-30', '2024-02-01', 3, 3),
    (24, 'Robotics Competition', 'Teams compete in building and programming robots', '2024-01-05', '2024-01-07', 4, 4),
    (25, 'Literary Symposium', 'Discussions on literature and literary criticism', '2024-01-28', '2024-01-30', 5, 5),
    (26, 'Rock Concert', 'An electrifying night of rock music', '2024-02-15', '2024-02-16', 1, 1),
    (27, 'Web Development Workshop', 'Hands-on session on web development', '2024-02-25', '2024-02-27', 2, 2),
    (28, 'Basketball Championship', 'The finals of the basketball tournament', '2024-02-01', '2024-02-01', 3, 3),
    (29, 'Shakespearean Play', 'Classic Shakespearean drama on stage', '2024-02-20', '2024-02-21', 4, 4),
    (30, 'Outdoor Yoga Session', 'Yoga and meditation in the park', '2024-02-05', '2024-02-05', 5, 5),
    (31, 'Data Science Conference', 'Exploring the latest in data science', '2024-02-10', '2024-02-12', 1, 1),
    (32, 'Health and Wellness Expo', 'Promoting a healthy lifestyle', '2024-02-15', '2024-02-17', 2, 2),
    (33, 'Robotics Workshop', 'Hands-on workshop on building robots', '2024-02-05', '2024-02-07', 3, 3),
    (34, 'Stand-up Comedy Night', 'A night of laughter with stand-up comedians', '2024-02-25', '2024-02-26', 4, 4),
    (35, 'International Food Fair', 'Taste cuisines from around the globe', '2024-02-15', '2024-02-17', 5, 5),
    (36, 'Digital Art Exhibition', 'Showcasing digital art creations', '2024-02-08', '2024-02-10', 1, 1),
    (37, 'Entrepreneurship Seminar', 'Learn from successful entrepreneurs', '2024-02-05', '2024-02-07', 2, 2),
    (38, 'Fashion Gala', 'A glamorous night of fashion and style', '2024-02-20', '2024-02-21', 3, 3),
    (39, 'Esports Tournament', 'Competitive gaming across various titles', '2024-02-28', '2024-03-01', 4, 4),
    (40, 'Literary Festival', 'Celebrating literature and authors', '2024-02-28', '2024-03-01', 5, 5),
    (41, 'Jazz Music Festival', 'A weekend of smooth jazz performances', '2024-02-01', '2024-02-03', 1, 1),
    (42, 'Python Coding Bootcamp', 'Intensive Python programming training', '2024-02-10', '2024-02-12', 2, 2),
    (43, 'Sustainability Summit', 'Discussing sustainable practices', '2024-02-20', '2024-02-22', 3, 3),
    (44, 'Latin Dance Competition', 'Showcasing the rhythm of Latin dance', '2024-02-08', '2024-02-10', 4, 4),
    (45, 'Indie Film Showcase', 'Highlighting independent and international films', '2024-02-18', '2024-02-20', 5, 5),
    (46, 'Space and Technology Exhibition', 'Exploring advancements in space tech', '2024-02-15', '2024-02-17', 1, 1),
    (47, 'Wellness Retreat', 'A weekend of relaxation and self-care', '2024-02-12', '2024-02-14', 2, 2),
    (48, 'Gourmet Cooking Class', 'Learn gourmet cooking from top chefs', '2024-02-28', '2024-03-01', 3, 3),
    (49, 'Drone Racing Championship', 'Fast-paced drone racing competition', '2024-02-05', '2024-02-07', 4, 4),
    (50, 'Poetry Reading Session', 'An evening of poetic expressions', '2024-02-28', '2024-03-01', 5, 5);

SELECT setval('event_event_id_seq', 50);

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
    (5, 'Music'),
    (6, 'Music'),
    (7, 'Sports'),
    (10, 'Outdoor'),
    (11, 'Theater'),
    (12, 'Technology'),
    (13, 'Theater'),
    (15, 'Outdoor'),
    (16, 'Music'),
    (17, 'Technology'),
    (18, 'Sports'),
    (19, 'Theater'),
    (20, 'Outdoor'),
    (21, 'Technology'),
    (22, 'Outdoor'),
    (23, 'Theater'),
    (24, 'Sports'),
    (26, 'Music'),
    (27, 'Music'),
    (28, 'Music'),
    (29, 'Music'),
    (30, 'Music'),
    (31, 'Technology'),
    (32, 'Technology'),
    (33, 'Technology'),
    (34, 'Technology'),
    (35, 'Technology'),
    (36, 'Sports'),
    (37, 'Sports'),
    (38, 'Sports'),
    (39, 'Sports'),
    (40, 'Sports'),
    (41, 'Theater'),
    (42, 'Theater'),
    (43, 'Theater'),
    (44, 'Theater'),
    (45, 'Theater'),
    (46, 'Outdoor'),
    (47, 'Outdoor'),
    (48, 'Outdoor'),
    (49, 'Outdoor'),
    (50, 'Outdoor');

INSERT INTO
    ticket (ticket_id, event_id, account_id, cost)
VALUES
    ('dd4ac94d-45cc-4ca0-83ef-f660a10bed79', 1, 2, 4000),
    ('34ad0e19-c18b-4e69-b031-a3cafa7ce114', 1, 1, 4000),
    ('2f7cdaee-d9a5-4c49-ab12-21cedfca3549', 1, 3, 4000),
    ('5a544e5a-bcf6-4703-a715-79088c0780fa', 1, 4, 4000),
    ('c03beaa9-5962-4c48-ae9c-37798c898eb9', 1, NULL, 2500),
    ('3550a605-b645-4f05-8f6f-908888beecab', 2, 4, 15000),
    ('4edcbfe2-86be-4ae2-9bb7-e39b7320f878', 3, 3, 7500),
    ('3fb7a3d8-ec10-4397-80bf-94373bdbc43f', 4, 5, 5500),
    ('f7f9d38c-a94d-4e42-afe1-735d833a69d2', 4, 5, 5500),
    ('e807be91-3b6c-430b-b8b9-b59f99cf23c5', 4, 1, 5500),
    ('97858855-f89e-4159-ac9a-a1a8a94e0b3b', 4, 3, 5500),
    ('d64e1cac-c079-4da3-8491-091811fbc0b3', 5, 3, 1000);

INSERT INTO
    discounted_ticket (ticket_id, event_id, discount, promo_code)
VALUES
    ('dd4ac94d-45cc-4ca0-83ef-f660a10bed79', 1, 10, 'ROCK10'),
    ('3550a605-b645-4f05-8f6f-908888beecab', 2, 20, 'TECH20'),
    ('c03beaa9-5962-4c48-ae9c-37798c898eb9', 1, 20, 'AWESOME20'),
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

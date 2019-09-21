CREATE TABLE dogs (
  	dog_id SERIAL PRIMARY KEY,
  	bred_for VARCHAR,
	name VARCHAR(100) NOT NULL,
	breed_group VARCHAR,
	country_code VARCHAR(30),
	description VARCHAR,
	history VARCHAR,
	life_span VARCHAR,
	id VARCHAR,
	origin VARCHAR,
	temperament VARCHAR,
	imperial_weight VARCHAR,
	metric_weight VARCHAR,
	imperial_height VARCHAR,
	metric_height VARCHAR
	);


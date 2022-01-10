CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE, 
	"task" VARCHAR (250) NOT NULL,
	"priority" VARCHAR (250) NOT NULL,
	"completion_status" BOOLEAN DEFAULT FALSE);
	
	
INSERT INTO "todo" 
	("task", "date", "priority")
VALUES
	('Wake up','9-1-2022', 'High Priority'),
	('Vacuum floor','9-1-2022', 'Low Priority' ),
	('Eat breakfast','9-1-2022', 'Mid Priority');
	
	
SELECT * FROM todo

DROP TABLE todo


	

	
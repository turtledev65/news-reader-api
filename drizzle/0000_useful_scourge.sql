CREATE TABLE IF NOT EXISTS "article" (
	"title" varchar NOT NULL,
	"source" varchar NOT NULL,
	"url" varchar PRIMARY KEY NOT NULL,
	"createdOn" date
);

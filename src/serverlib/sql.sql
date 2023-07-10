CREATE TABLE "users" (
	"id" VARCHAR(16) NOT NULL,
	"username" VARCHAR(64) NOT NULL,
	"password" VARCHAR(128) NOT NULL,
	"email" VARCHAR(128) NULL DEFAULT 'NULL::character varying',
	"timecreated" NUMERIC NOT NULL,
	"admin" BOOLEAN NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE "spaces" (
	"id" VARCHAR(16) NOT NULL,
	"name" VARCHAR(256) NOT NULL,
	"timecreated" NUMERIC NOT NULL,
	PRIMARY KEY ("id")
);
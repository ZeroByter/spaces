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

CREATE TABLE "threads" (
	"id" VARCHAR(16) NOT NULL,
	"createdby" VARCHAR(16) NOT NULL,
	"title" VARCHAR(256) NOT NULL,
	"text" TEXT NOT NULL,
	"timecreated" NUMERIC NOT NULL,
	"spaceid" VARCHAR(16) NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "FK__users" FOREIGN KEY ("createdby") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT "FK_threads_spaces" FOREIGN KEY ("spaceid") REFERENCES "spaces" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE "comments" (
	"id" VARCHAR(16) NOT NULL,
	"createdby" VARCHAR(16) NOT NULL,
	"threadid" VARCHAR(16) NOT NULL,
	"text" TEXT NOT NULL,
	"timecreated" NUMERIC NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "FK__threads" FOREIGN KEY ("threadid") REFERENCES "threads" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT "FK__users" FOREIGN KEY ("createdby") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

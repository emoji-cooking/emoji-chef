-- command to connect to db and run script that creates tables
-- psql -d <elephant-url> -f src/server/emoji_db_create.sql

-- using open emoji api
-- table for emoji combos
CREATE TABLE public.emoji_combos (
    "_id" serial NOT NULL,
    "slug" varchar NOT NULL,
    "unicode" varchar NOT NULL,
    "category" varchar NOT NULL,
    "parents" varchar NOT NULL, -- ["u-1222", "u-1314"]
    "data_url" varchar NOT NULL,
    CONSTRAINT "emoji_combos_pk" PRIMARY KEY ("_id")
)

CREATE TABLE public.emojis (
    "_id" serial NOT NULL,
    "emoji" nvarchar NOT NULL,
    "slug" varchar NOT NULL,
    "unicode" varchar NOT NULL,
    "category" varchar NOT NULL,
    "keywords" varchar[] NOT NULL,
    "version" varchar NOT NULL,
    CONSTRAINT "emojis_pk" PRIMARY KEY ("_id")
)
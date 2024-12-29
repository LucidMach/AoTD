create table if not exists adventures (
   datetime  timestamp,
   adventure text,
   completed boolean
);

create table if not exists memories (
   datetime  timestamp,
   adventure text
);
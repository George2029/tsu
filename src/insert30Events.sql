insert into "public"."Events" 
(
	title, 
	type, 
	location, 
	description, 
	"startTime",
	"endTime",
	"userId",
	"placesTotal", 
	"createdAt", 
	"updatedAt"
) 
select
	'Some Event Title', 
	'BOARD_GAMES_EVENT', 
	'TSU 12', 
	'Some description',
	'"2024-04-03T15:04:41.665Z"', 
	'"2024-04-03T15:04:41.665Z"',
	1,
	10,
	'"2024-04-03T15:04:41.665Z"', 
	'"2024-04-03T15:04:41.665Z"'
from generate_series(1, 30);


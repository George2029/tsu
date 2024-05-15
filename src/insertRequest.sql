insert into "public"."Requests" 
(
	title, 
	type, 
	location, 
	description, 
	"startTime",
	"endTime",
	"userId",
	"endOfRequestTime", 
	"createdAt", 
	"updatedAt"
) 
values (
	'Some Request Title', 
	'CUSTOM_EVENT', 
	'TSU 12', 
	'Some description',
	'"2024-04-03T15:04:41.665Z"', 
	'"2024-04-03T15:04:41.665Z"',
	1,
	'"2024-04-03T15:04:41.665Z"',
	'"2024-04-03T15:04:41.665Z"', 
	'"2024-04-03T15:04:41.665Z"'
); 


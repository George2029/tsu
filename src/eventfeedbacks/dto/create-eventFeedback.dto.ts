export class CreateEventFeedbackDto {
	rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	review: string | null;
}

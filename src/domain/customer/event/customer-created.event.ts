import EventInterface from "../../@shared/event/event.interface";

interface CustomerCreatedEventPayload {
	id: string;
	name: string;
	active: boolean;
}

export class CustomerCreatedEvent implements EventInterface {
	dataTimeOccurred: Date;
	eventData: CustomerCreatedEventPayload;
  
	constructor(eventPayload: CustomerCreatedEventPayload) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventPayload;
	}
}

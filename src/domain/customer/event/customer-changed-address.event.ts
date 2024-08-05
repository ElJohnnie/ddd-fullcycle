import EventInterface from "../../@shared/event/event.interface";

interface Address {
  street: string;
  number: number;
  city: string;
  zip: string;
}

interface CustomerChangedAddressEventPayload {
    id: string;
    name: string;
    oldAddress: Address;
    newAddress: Address;
}

export class CustomerChangedAddressEvent implements EventInterface {
	dataTimeOccurred: Date;
	eventData: CustomerChangedAddressEventPayload;

	constructor(eventData: CustomerChangedAddressEventPayload) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventData;
	}
}

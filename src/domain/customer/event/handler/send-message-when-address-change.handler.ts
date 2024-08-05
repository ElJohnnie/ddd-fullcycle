import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import { CustomerChangedAddressEvent } from '../customer-changed-address.event';


export class SendMessageWhenAddressChangeHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} 
       alterado para: ${event.eventData.newAddress.city},
       ${event.eventData.newAddress.street}, 
       ${event.eventData.newAddress.number}, 
       ${event.eventData.newAddress.zip},`,
    );
  }
}

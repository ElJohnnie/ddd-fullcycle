import { CustomerCreatedEvent } from './customer-created.event';
import { SendMessageOneWhenCustomerCreatedHandler } from './handler/send-message-one-when-customer-created.handler';
import { SendMessagetwoWhenCustomerCreatedHandler } from './handler/send-message-two-when-customer-created.handler';
import { CustomerChangedAddressEvent } from './customer-changed-address.event';
import { SendMessageWhenAddressChangeHandler } from './handler/send-message-when-address-change.handler';
import EventDispatcher from '../../@shared/event/event-dispatcher';
import Customer from '../entity/customer';
import Address from '../value-object/address';

describe('domain events tests: customer', () => {
  it('should notify all event handlers when customer is created', () => {
    const eventDispatcher = new EventDispatcher();

    const sendMessageOneEventHandler =
      new SendMessageOneWhenCustomerCreatedHandler();

    const sendMessageTwoEventHandler =
      new SendMessagetwoWhenCustomerCreatedHandler();

    /**
     * spyEventHandler fica "espiando" se o método handle é executado
     */
    const spyEventHandlerMessageOne = jest.spyOn(
      sendMessageOneEventHandler,
      'handle',
    );
    const spyEventHandlerMessageTwo = jest.spyOn(
      sendMessageTwoEventHandler,
      'handle',
    );

    eventDispatcher.register(
      'CustomerCreatedEvent',
      sendMessageOneEventHandler,
    );
    eventDispatcher.register(
      'CustomerCreatedEvent',
      sendMessageTwoEventHandler,
    );

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
    ).toMatchObject(sendMessageOneEventHandler);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
    ).toMatchObject(sendMessageTwoEventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: '1',
      name: 'Customer name',
      active: true,
    });

    /**
     * Quando o notify for executado, o sendEmailWhenCustomerCreatedHandler.handler() deve ser chamado
     */
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerMessageOne).toHaveBeenCalled();
    expect(spyEventHandlerMessageTwo).toHaveBeenCalled();
  });

  it('should notify all event handlers when customer address changes', () => {
    const eventDispatcher = new EventDispatcher();
    const sendMessageWhenAddressChangeHandler = new SendMessageWhenAddressChangeHandler();
  
    const spyEventHandlerMessageOne = jest.spyOn(sendMessageWhenAddressChangeHandler, 'handle');
  
    let customer = new Customer('123', 'Customer 1');
    const previousAddress = customer.Address;
  
    const newAddress = new Address('Street 1', 1, 'City 1', 'Zipcode 1');
    customer.changeAddress(newAddress);
  
    eventDispatcher.register('CustomerChangedAddressEvent', sendMessageWhenAddressChangeHandler);
  
    const customerAddressChangeEvent = new CustomerChangedAddressEvent({
      id: customer.id,
      name: customer.name,
      oldAddress: previousAddress,
      newAddress: newAddress
    });
  
    // Notify the event
    eventDispatcher.notify(customerAddressChangeEvent);
  
    // Check if the event handler's handle method was called
    expect(spyEventHandlerMessageOne).toHaveBeenCalled();
  });
});

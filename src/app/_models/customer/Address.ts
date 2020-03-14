import { Contact } from './Contact';

export class Address {
  street1: string;
  street2: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
  paymentTerms: string;
  shippingPreference: string;
  shippingPreferenceAccount: string;
  shippingInstructions: string;
  contact: Contact;
  billing: boolean;
}

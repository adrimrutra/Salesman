import { FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/_models/customer/Address';

export class AddressForm {
  street1 = new FormControl('', Validators.required);
  street2 = new FormControl('');
  city = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  postcode = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);
  paymentTerms = new FormControl('', Validators.required);
  shippingPreference = new FormControl('', Validators.required);
  shippingPreferenceAccount = new FormControl('', Validators.required);
  shippingInstructions = new FormControl('');
  billing = new FormControl(false);
  constructor(address: Address) {
    this.street1.setValue(address.street1);
    this.street2.setValue(address.street2);
    this.city.setValue(address.city);
    this.state.setValue(address.state);
    this.postcode.setValue(address.postcode);
    this.paymentTerms.setValue(address.paymentTerms);
    this.shippingPreference.setValue(address.shippingPreference);
    this.shippingPreferenceAccount.setValue(address.shippingPreferenceAccount);
    this.shippingInstructions.setValue(address.shippingInstructions);
    this.billing.setValue(address.billing);
  }
}

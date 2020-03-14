import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/_models/customer/Address';

export class AddressForm {
  street1 = new FormControl(null, Validators.required);
  street2 = new FormControl(null, Validators.required);
  city = new FormControl(null, Validators.required);
  state = new FormControl(null, Validators.required);
  postcode = new FormControl(null, Validators.required);
  country = new FormControl(null, Validators.required);
  paymentTerms = new FormControl(null, Validators.required);
  shippingPreference = new FormControl(null, Validators.required);
  shippingPreferenceAccount = new FormControl(null, Validators.required);
  shippingInstructions = new FormControl(null, Validators.required);
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

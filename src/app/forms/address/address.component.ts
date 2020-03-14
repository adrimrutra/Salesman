import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getTerms, getPreference } from 'src/app/commons/common';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() addressForm: FormGroup;
  @Input() index: number;
  @Output() deleteAddress: EventEmitter<number> = new EventEmitter();

  terms = getTerms();
  preference = getPreference();

  constructor() {}

  ngOnInit() {
  }

  delete() {
    this.deleteAddress.emit(this.index);
  }

}

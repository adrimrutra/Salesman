import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { Customer } from 'src/app/_models/customer/Customer';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormStorageService } from 'src/app/_services/form-storage.service';

@Component({
  selector: 'app-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrls: ['./customer-select.component.css']
})
export class CustomerSelectComponent implements OnInit {
  @ViewChild('modalRef', { static: true }) modalRef: BsModalRef;
  @Input() customerId: number | null;
  @Output() selectedCustomer = new EventEmitter<Customer>();

  gridApi: any;
  gridColumnApi: any;

  customers: Customer[];
  subscription: Subscription;
  isSelected = false;

  columnDefs = [
    { headerName: 'Company', field: 'companyName' },
    { headerName: 'DBA', field: 'dba' },
    { headerName: 'Vat Number', field: 'vatNumber' },
    { headerName: 'Website', field: 'website' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Mobile', field: 'phoneCell' },
    { headerName: 'Phone', field: 'phoneLandline' },
    { headerName: 'Notes', field: 'notes' }
  ];
  rowData: Array<{}> = [];

  constructor(
    private formStorageService: FormStorageService,
    private modalService: BsModalService
  ) {}

  onOpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.formStorageService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.customers.forEach(element => {
        this.rowData.push({
          id: element.id,
          companyName: element.companyName,
          dba: element.dba,
          vatNumber: element.vatNumber,
          website: element.website,
          email: element.email,
          phoneCell: element.phoneCell,
          phoneLandline: element.phoneLandline,
          notes: element.notes,
          salesperson1: element.salesperson1,
          salesperson2: element.salesperson2,
          addresses: element.addresses
        });
      });
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(event) {
    this.isSelected = true;
  }
  onCloseModal() {
    this.modalRef.hide();
    this.isSelected = false;
  }

  onSelectCustomer() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData) {
      const customer = selectedData[0] as Customer;
      this.selectedCustomer.emit(customer);
      this.onCloseModal();
    }
  }
}

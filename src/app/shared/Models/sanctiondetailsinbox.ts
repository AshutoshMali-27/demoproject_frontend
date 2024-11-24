import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

export class sanctionorderdetailinbox {
  id: number;
  financialYear: string;
  schemename: string;
  componentName: number;
  amount: number;
  sanctionnumber: number;
  approvalStatus: number;

  constructor(paramObject: object) {
    return Object.assign(this, paramObject);
  }

  static getForm(Sanctionorderinbox: sanctionorderdetailinbox): UntypedFormGroup {
    return new UntypedFormBuilder().group({
      id: [Sanctionorderinbox.id || null, [Validators.required]],
      financialYear: [Sanctionorderinbox.financialYear || null],
      schemename: [Sanctionorderinbox.schemename || null],
      componentName: [Sanctionorderinbox.componentName || null],
      amount: [Sanctionorderinbox.amount || null],
      sanctionnumber: [Sanctionorderinbox.sanctionnumber || null],
      approvalStatus: [
        Sanctionorderinbox.approvalStatus === 0
          ? "Pending"
          : Sanctionorderinbox.approvalStatus === 1
          ? "Approver"
          : Sanctionorderinbox.approvalStatus === -1
          ? "Rejected"
          : null,
      ],
    });
  }
}

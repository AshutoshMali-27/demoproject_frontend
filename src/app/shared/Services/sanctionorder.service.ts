import { Injectable } from '@angular/core';
import { sanction_order } from '../constants/constant';
import { Observable } from "rxjs";
import { EMPLOYEE_PATH } from "../constants/constant";
import { ApiService } from "./api.service";
import { BaseService } from "./base.service";
import { sanctionorder } from '../Models/saanctionorder';

@Injectable({
  providedIn: 'root'
})
export class SanctionorderService extends BaseService<sanctionorder,number> {
  private endpoint = sanction_order;

  constructor(protected override api: ApiService) {
    super(api, sanction_order);
}


// getComponent(schemeid:number): Observable<any> {
  
//   return this.api.getWithParams(this.endpoint + "/getComponentName",schemeid);
// }

getComponent(schemeid: number): Observable<any> {
  // Append the schemeid directly to the URL
  return this.api.getWithParams(`${this.endpoint}/getComponentName/${schemeid}`, {});
}

getScheme(): Observable<any> {
  
  return this.api.get(this.endpoint + "/getSchemeName");
}
getFinancialYear(): Observable<any> {
  
  return this.api.get(this.endpoint + "/getFinancialYear");
}


getSanctionDetails(): Observable<any> {
  debugger;
  return this.api.get(this.endpoint + "/getsanctiondetails");
}

createsanctioorder(data: object):Observable<any> {
  debugger;
  return this.api.post(this.endpoint + "/InsertSanctionOrderEntry",data);
}

// getFinancialYear(): Observable<sanctionorder[]> {
//   return this.api.get<sanctionorder[]>(`${this.endpoint}/getFinancialYear`);
// }


}

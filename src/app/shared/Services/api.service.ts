import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { SERVER_URL } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private baseUrl = SERVER_URL;
	constructor(private http: HttpClient) {
	}

	// get(url: string): Observable<any> {
	// 	return this.http.get(this.baseUrl + url);
	// }
	get<T>(url: string): Observable<T> {
		return this.http.get<T>(this.baseUrl + url);
	  }
	getWithParams<T>(url: string, params: any): Observable<any> {
		return this.http.get<T>(this.baseUrl + url, {params});
	}

	getListByQuery<T>(url: string, params: any): Observable<any> {
		return this.http.get<T>(this.baseUrl + url, {params});
	}

	post<T>(url: string, params = {}): Observable<any> {
		return this.http.post<T>(this.baseUrl + url, params);
	}

	put<T>(url: string, params = {}): Observable<any> {
		return this.http.put<T>(this.baseUrl + url, params);
	}

	patch<T>(url: string, params = {}): Observable<any> {
		return this.http.patch<T>(this.baseUrl + url, params);
	}

	delete<T>(url: string): Observable<any> {
		return this.http.delete<T>(this.baseUrl + url);
	}

	/**
	 * Uploads File to the server
	 * @param url endpoint
	 * @param file blob
	 */
	upload(url: string, file: File): Observable<any> {
		const formData = new FormData();
		formData.append("file", file);
		const headers = new HttpHeaders({
			enctype: "multipart/form-data",
		});

		return this.http.post(this.baseUrl + url, formData, {
			headers,
		});
	}

	/**
	 * Downloads File to browser
	 * @param url endpoint
	 */
	exportUsingGet(url: string): Observable<any> {
		return this.http.get(this.baseUrl + url, {
			observe: "response",
			responseType: "blob",
		});
	}


  /**
   * Get File
   * @param url endpoint
   * @param params
   */
	exportToFile(url: string, params: any) {
		return this.http.post(this.baseUrl + url, params, {
			observe: "response",
			responseType: "blob",
		});
	}

}

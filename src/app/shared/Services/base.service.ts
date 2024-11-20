import { Observable } from "rxjs";

import { ApiService } from "./api.service";

// import { CentralApiService } from "./central-api.service";

export interface EntityInterface<T, ID> {
	create(t: T): Observable<T>;

	update(t: T): Observable<T>;

	patch(t: T): Observable<T>;

	getById(id: number): Observable<T>;
	get():Observable<T>;

	getListByQuery(params: object): Observable<Array<T>>;

	delete(id: ID): Observable<any>;
}

export abstract class BaseService<T, ID> implements EntityInterface<T, ID> {

	protected constructor(protected api: ApiService, protected base: string) {
	}
	get(): Observable<T> {
		return this.api.get(`${this.base}`);
	}

	getById(id: number): Observable<T> {
		return this.api.get(`${this.base}/${id}`);
	}

	getListByQuery(params = {}): Observable<Array<T>> {
		return this.api.getListByQuery(this.base, params);
	}

	create(t: T): Observable<T> {
		return this.api.post<T>(this.base, t);
	}

	update(t: { id?: any; }): Observable<T> {
		return this.api.put<T>(`${this.base}/${t.id}`, t);
	}

	patch(t: { id?: any; }): Observable<T> {
		return this.api.put<T>(`${this.base}/${t.id}`, t);
	}

	delete(id: ID): Observable<T> {
		return this.api.delete<T>(`${this.base}/${id}`);
	}
}

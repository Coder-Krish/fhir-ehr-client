import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FhirPatient } from "../patient/models/fhir-patient-resource";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _baseUrl: string = 'http://localhost:8090/fhir';
    constructor(private _httpClient: HttpClient) { }

    registerPatient(patient: FhirPatient): Observable<any> {
        return this._httpClient.post(`${this._baseUrl}/Patient`, patient);
    }
    updatePatient(patient: FhirPatient): Observable<any> {
        return this._httpClient.put(`${this._baseUrl}/Patient/${patient.id}`, patient);
    }
    getPatients(): Observable<any> {
        return this._httpClient.get(`${this._baseUrl}/Patient`);
    }

    getPatient(id: string): Observable<any> {
        return this._httpClient.get(`${this._baseUrl}/Patient/${id}`);
    }
    deletePatient(id: string): Observable<any> {
        return this._httpClient.delete(`${this._baseUrl}/Patient/${id}`);
    }
}
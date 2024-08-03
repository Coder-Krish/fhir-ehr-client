import { FhirPatient } from "../patient/models/fhir-patient-resource";

function serializePatient(patient: FhirPatient): string {
    return JSON.stringify(patient);
}

function parsePatient(json: string): FhirPatient {
    return JSON.parse(json) as FhirPatient;
}

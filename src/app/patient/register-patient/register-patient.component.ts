import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../_helpers/api.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientResource } from '../models/fhir-patient.model';
import { FhirPatient } from '../models/fhir-patient-resource';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPatientComponent {

  patientForm!: FormGroup;
  patientId: string | undefined;
  constructor(private _apiService: ApiService, private _router: Router, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute) {
    this.patientForm = this._formBuilder.group({
      name: this._formBuilder.group({
        prefix: [''],
        given: ['', Validators.required],
        family: ['', Validators.required]
      }),
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      telecom: this._formBuilder.array([
        this._formBuilder.group({
          system: ['phone'],
          value: ['', Validators.required]
        }),
        this._formBuilder.group({
          system: ['email'],
          value: ['', Validators.required]
        })
      ]),
      address: this._formBuilder.group({
        line: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required]
      })
    });
  }

  get telecomControls(): FormArray {
    return this.patientForm.get('telecom') as FormArray;
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = id;
        this.getPatientDetails(id);
      }
    });
  }
  save(): void {
    console.log(this.patientForm);
    if (this.patientForm?.valid) {

      const formValue = this.patientForm.value;
      const fhirPatient: FhirPatient = {
        resourceType: 'Patient',
        name: [{
          prefix: formValue.name.prefix,
          given: [formValue.name.given],
          family: formValue.name.family
        }],
        gender: formValue.gender,
        birthDate: formValue.birthDate,
        telecom: formValue.telecom,
        address: [{
          line: [formValue.address.line],
          city: formValue.address.city,
          district: formValue.address.district,
          state: formValue.address.state,
          country: formValue.address.country,
          postalCode: formValue.address.postalCode
        }]
      };
      if(this.patientId){
        fhirPatient.id = this.patientId;
        this.updatePatient(fhirPatient);
      }else{
        this.registerPatient(fhirPatient);
      }
      }
  }

  private registerPatient(fhirPatient: FhirPatient) {
    this._apiService.registerPatient(fhirPatient).subscribe({
      next: () => {
        console.log('Patient registered successfully');
        this._router.navigate(['list-patients']);
      },
      error: error => console.error('Error registering patient', error)
    });
  }

  private updatePatient(fhirPatient: FhirPatient) {
    this._apiService.updatePatient(fhirPatient).subscribe({
      next: () => {
        console.log('Patient registered successfully');
        this._router.navigate(['list-patients']);
      },
      error: error => console.error('Error registering patient', error)
    });
  }

  getPatientDetails(id: string | undefined): void {
    if (id) {
      this._apiService.getPatient(id).subscribe((patient: any) => {
        console.log(patient);
        this.patientForm.patchValue({
          name: {
            prefix: patient.name[0]?.prefix || '',
            given: patient.name[0]?.given || '',
            family: patient.name[0]?.family || ''
          },
          gender: patient.gender,
          birthDate: patient.birthDate,
          address: {
            line: patient.address[0]?.line || '',
            city: patient.address[0]?.city || '',
            district: patient.address[0]?.district || '',
            state: patient.address[0]?.state || '',
            country: patient.address[0]?.country || '',
            postalCode: patient.address[0]?.postalCode || ''
          }
        });


        this.telecomControls.clear();

        patient.telecom.forEach((telecom: any) => {
          this.telecomControls.push(this._formBuilder.group({
            system: [telecom.system],
            value: [telecom.value]
          }));
        });
      });
    }
  }
}

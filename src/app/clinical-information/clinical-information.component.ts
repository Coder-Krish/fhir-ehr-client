import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../_helpers/api.service';
import { FhirPatient } from '../patient/models/fhir-patient-resource';

@Component({
  selector: 'app-clinical-information',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './clinical-information.component.html',
  styleUrl: './clinical-information.component.css'
})
export class ClinicalInformationComponent {
  patientId: string | undefined;
  patient?: FhirPatient;
  constructor(private _activatedRoute: ActivatedRoute, private _apiService: ApiService){}

  ngOnInit(): void{
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.patientId = id;
        this.getPatientDetails(id);
      }
    });
  }

  getPatientDetails(id: string | undefined): void {
    if (id) {
      this._apiService.getPatient(id).subscribe({
        next: res => {
          console.log(res);
          this.patient = res;
        },
        error: err => console.error(err)
      });
    }
  }
}

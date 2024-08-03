import { Routes } from '@angular/router';
import { RegisterPatientComponent } from './patient/register-patient/register-patient.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { ClinicalInformationComponent } from './clinical-information/clinical-information.component';
import { VitalsComponent } from './clinical-information/vitals/vitals.component';
import { ClinicalNotesComponent } from './clinical-information/clinical-notes/clinical-notes.component';
import { SoapComponent } from './clinical-information/soap/soap.component';

export const routes: Routes = [
    {path: '', redirectTo:'list-patients', pathMatch:'full'},
    {path: 'list-patients', component: ListPatientComponent},
    {path: 'register-patient', component:RegisterPatientComponent},
    {path: 'edit-patient/:id', component:RegisterPatientComponent},
    { path: 'clinical/:id', component: ClinicalInformationComponent, children: [
        { path: 'vitals', component: VitalsComponent },
        { path: 'soap', component: SoapComponent },
        { path: 'clinical-notes', component: ClinicalNotesComponent },
        { path: '', redirectTo: 'vitals', pathMatch: 'full' }  
      ]},
];

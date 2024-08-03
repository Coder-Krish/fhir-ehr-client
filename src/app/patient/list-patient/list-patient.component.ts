import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../_helpers/api.service';
import { FhirPatient } from '../models/fhir-patient-resource';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css'
})
export class ListPatientComponent {

  patients = new Array<FhirPatient>;
  pageSize = 10;
  currentPage = 1;

  get paginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.patients.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.patients.length / this.pageSize);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.patients.length);
  }

  constructor(private _apiService: ApiService){}
  ngOnInit(): void{
    this.getPatients();
  }

  pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPatients(): void {
    this._apiService.getPatients().subscribe({
      next: res =>{
        const patients = res?.entry?.map((entry: any) => entry.resource);
        if(patients?.length){
          this.patients = patients;
        }
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  delete(id: string | undefined): void{
    if(id){
      if(window.confirm("Ary you sure you want to delete this patient?")){
        this._apiService.deletePatient(id).subscribe({
          next: () => {
            console.log("patient deleted successfully");
            this.patients = this.patients.filter(patient => patient.id!== id);
          },
          error: err => console.error('Error deleting patient', err)
        });
      }
      }
  }
}

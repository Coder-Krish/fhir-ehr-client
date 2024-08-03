import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vitals',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vitals.component.html',
  styleUrl: './vitals.component.css'
})
export class VitalsComponent {
  vitals: any[] = []; // Array to hold vital signs data
  vitalsForm!: FormGroup;


  constructor(private _formBuilder: FormBuilder){
    this.vitalsForm = this._formBuilder.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }
  ngOnInit(): void{
    this.vitals = [
      { date: '2024-08-01', type: 'Heart Rate', value: 72, unit: 'bpm' },
      { date: '2024-08-01', type: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
      { date: '2024-08-01', type: 'Temperature', value: 98.6, unit: '°F' },
      { date: '2024-08-01', type: 'Respiratory Rate', value: 16, unit: 'breaths/min' }
    ];
  }

  addVital(): void{
    if (this.vitalsForm.valid) {
      this.vitals.push(this.vitalsForm.value);
      this.vitalsForm.reset(); // Reset the form after adding the vital
    }
  }
}

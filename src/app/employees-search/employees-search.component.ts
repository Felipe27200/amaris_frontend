import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { EmployeeService } from '../service/employee.service';
import { Employee } from '../interface/employee';
import { EmployeesTableComponent } from "../employees-table/employees-table.component";

@Component({
  selector: 'app-employees-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesTableComponent
],
  templateUrl: './employees-search.component.html',
  styleUrl: './employees-search.component.css'
})
export class EmployeesSearchComponent {
  private formBuilder = inject(FormBuilder);
  private employeeService = inject(EmployeeService);

  employeeList: Employee[] = [];
  errorMessage = '';

  errorValidation = '';

  employeeForm = this.formBuilder.group({
    id: []
  });

  onSubmit()
  {
    if (this.id?.value !== null && this.id?.value !== undefined 
      && (this.id.value as string).trim() !== '' && isNaN(this.id.value)
    ) {
      this.errorValidation = 'The ID must be a number.';
      return; 
    }
    else
      this.errorValidation = '';

    if (this.id?.value === null || this.id?.value === undefined || (this.id.value as string).trim() === '')
    {
      this.employeeService.getAllEmployees()
      .subscribe({
        next: (response) => {
          this.setEmployees(response)
        },
        error: (error) => {
          this.setErrorResponse(error);
        }
      });

      return;
    }
      
    this.employeeService.getById(this.id?.value)
      .subscribe({
        next: (response) => {
          this.setEmployees(response)
        },
        error: (error) => {
          this.setErrorResponse(error);
        }
      });
  }

  setEmployees(employee: Employee | Employee[])
  {
    if (Array.isArray(employee))
      this.employeeList = employee;
    else
      this.employeeList = [employee];

    this.errorValidation = '';
  }

  setErrorResponse(error: any)
  {
    this.errorMessage = error.error.message.split('for')[0];

    this.employeeList = [];
    this.errorValidation = '';
  }

  cleanErrorMessage ()
  {
    this.errorMessage = '';
  }

  get id() { return this.employeeForm.get('id'); }
}

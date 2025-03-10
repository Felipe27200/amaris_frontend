import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesTableComponent } from "../employees-table/employees-table.component";
import { EmployeeService } from '../service/employee.service';

import { Employee } from '../interface/employee';

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule, EmployeesTableComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit 
{
  errorMessage = '';

  private employeeService = inject(EmployeeService);
  employeeList!: Employee[];

  ngOnInit(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        {
          next: (response) => {
          this.employeeList = response;
        },
        error: (error) => {
          this.errorMessage = this.errorMessage = error.error.message.split('for')[0];;
        }
      });
  }

  cleanErrorMessage ()
  {
    this.errorMessage = '';
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { EmployeesTableComponent } from "../employees-table/employees-table.component";
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employees-list',
  imports: [EmployeesTableComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit 
{
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        {
          next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });  
  }
}

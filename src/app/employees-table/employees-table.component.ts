import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../interface/employee';

@Component({
  selector: 'app-employees-table',
  imports: [CommonModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css'
})
export class EmployeesTableComponent {
  @Input() employeeList: Employee[] = [];
}

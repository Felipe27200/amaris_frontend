import { Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesSearchComponent } from './employees-search/employees-search.component';

export const routes: Routes = [
    { path: '', component: EmployeesListComponent },
    { path: 'search-employee', component: EmployeesSearchComponent },
];

export default routes;

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarModelManagementComponent } from './car-model-management/car-model-management.component';
import { SalesmanCommissionComponent } from './salesman-commission/salesman-commission.component';
import { ModelListComponent } from './model-list/model-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: CarModelManagementComponent, canActivate: [AuthGuard] },
  { path: 'car-model-management', component: CarModelManagementComponent },
  { path: 'salesman-commission', component: SalesmanCommissionComponent },
  { path: 'car-model-list', component: ModelListComponent },
  { path: 'model', loadChildren: () => import('./app.module').then(m => m.AppModule) }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

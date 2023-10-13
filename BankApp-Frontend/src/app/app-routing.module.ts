import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path : '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'home', component: DashboardComponent
  },
  {
    path:'transactions', component: TransactionsComponent
  },
  {
    path:'**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

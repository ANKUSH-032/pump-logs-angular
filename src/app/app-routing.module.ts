import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { DispensingListComponent } from './Dispensing/dispensing-list/dispensing-list.component';
import { DispensingAddComponent } from './Dispensing/dispensing-add/dispensing-add.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginAdminComponent },
  { path: 'dispensing-list', component: DispensingListComponent,canActivate: [AuthguardService] },
  { path: 'dispensing-add', component: DispensingAddComponent,canActivate: [AuthguardService] },
  { path: '**', redirectTo: 'login' } // optional: catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

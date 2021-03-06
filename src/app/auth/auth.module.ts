import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.modules';

@NgModule({ 
  declarations: [
    AuthComponent
],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
  ],
})
export class AuthModule {}

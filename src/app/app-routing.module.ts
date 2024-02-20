import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdpaConsentComponent } from './pdpa-consent/pdpa-consent.component';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
    { 
      path: 'pdpa-consent', component: PdpaConsentComponent
    }
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

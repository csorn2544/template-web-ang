import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdpaConsentComponent } from './pdpa-consent/pdpa-consent.component';
import { MainComponent } from './shared/main/main.component';
import { PdpaPrivacyComponent } from './pdpa-privacy/pdpa-privacy.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
    { 
      path: 'pdpa-consent', component: PdpaConsentComponent
    },
    { 
      path: 'pdpa-privacy-policy', component: PdpaPrivacyComponent
    }
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

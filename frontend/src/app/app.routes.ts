import { Routes } from '@angular/router';
import { ScenarioSelectionComponent } from './pages/scenario-selection/scenario-selection';
import { ConfigureCountsComponent } from './pages/configure-counts/configure-counts';
import { SelectUnitsComponent } from './pages/select-units/select-units';
import { ResultsComponent } from './pages/results/results';

export const routes: Routes = [
  { path: '', component: ScenarioSelectionComponent },
  { path: 'configure', component: ConfigureCountsComponent },
  { path: 'select-units', component: SelectUnitsComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];

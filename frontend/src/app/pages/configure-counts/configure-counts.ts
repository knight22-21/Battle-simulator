import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service'; // ✅ Adjust path if needed
 
@Component({
  selector: 'app-configure-counts',
  standalone: true,
  imports: [RouterModule, FormsModule, TitleCasePipe, NgIf],
  templateUrl: './configure-counts.html',
  styleUrls: ['./configure-counts.css'],
})

export class ConfigureCountsComponent {
  scenario: string = '';
  weaponCount: number = 1;
  targetCount: number = 1;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.scenario = params['scenario'] || '';
      if (!this.scenario) {
        this.router.navigate(['/']); // Redirect if no scenario
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.api.configureScenario(this.scenario, this.weaponCount, this.targetCount).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/select-units'], {
          queryParams: {
            scenario: this.scenario,
            weaponCount: this.weaponCount,
            targetCount: this.targetCount,
          }
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to save configuration.';
      }
    });
  }

}

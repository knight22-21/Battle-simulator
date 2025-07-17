import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service'; // ✅ Adjust path if needed

@Component({
  selector: 'app-scenario-selection',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, NgFor, NgIf],
  templateUrl: './scenario-selection.html',
  styleUrls: ['./scenario-selection.css'],
})
export class ScenarioSelectionComponent implements OnInit {
  scenarios: string[] = [];
  selectedScenario: string = '';
  loading = true;
  error = '';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getScenarios().subscribe({
      next: (data: string[]) => {
        this.scenarios = data;
        this.selectedScenario = data[0];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load scenarios.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.router.navigate(['/configure'], {
      queryParams: { scenario: this.selectedScenario },
    });
  }
}

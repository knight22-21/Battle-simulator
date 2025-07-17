import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, TitleCasePipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, WeaponConfig, TargetConfig } from '../../services/api.service';

@Component({
  selector: 'app-select-units',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    RouterModule,
    TitleCasePipe,
  ],
  templateUrl: './select-units.html',
  styleUrls: ['./select-units.css'],
})
export class SelectUnitsComponent implements OnInit {
  scenario = '';
  weaponCount = 0;
  targetCount = 0;

  availableWeapons: string[] = [];
  availableTargets: string[] = [];

  selectedWeapons: string[] = [];
  weaponRanges: number[] = [];
  weaponSpeeds: number[] = [];

  selectedTargets: string[] = [];
  targetDistances: number[] = [];
  targetSpeeds: number[] = [];

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.scenario = params['scenario'] || '';
      this.weaponCount = +params['weaponCount'];
      this.targetCount = +params['targetCount'];

      if (!this.scenario || this.weaponCount <= 0 || this.targetCount <= 0) {
        this.router.navigate(['/configure'], { queryParams: { scenario: this.scenario } });
        return;
      }

      // Fetch scenario-specific weapons & targets from Flask API
      this.api.getScenarioDetails(this.scenario).subscribe({
        next: (data) => {
          this.availableWeapons = data.available_weapons;
          this.availableTargets = data.available_targets;

          // Set defaults
          this.selectedWeapons = Array(this.weaponCount).fill(this.availableWeapons[0]);
          this.weaponRanges = Array(this.weaponCount).fill(1);
          this.weaponSpeeds = Array(this.weaponCount).fill(100);

          this.selectedTargets = Array(this.targetCount).fill(this.availableTargets[0]);
          this.targetDistances = Array(this.targetCount).fill(1);
          this.targetSpeeds = Array(this.targetCount).fill(10);

          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load scenario data.';
          this.loading = false;
        },
      });
    });
  }

  onSubmit() {
    const weaponConfigs: WeaponConfig[] = this.selectedWeapons.map((type, i) => ({
      type,
      damage: 0, // Let backend fill actual damage from stats
      range: this.weaponRanges[i],
      speed: this.weaponSpeeds[i],
    }));

    const targetConfigs: TargetConfig[] = this.selectedTargets.map((type, i) => ({
      type,
      armor: 0, // Let backend fill actual armor
      distance: this.targetDistances[i],
      speed: this.targetSpeeds[i],
    }));

    this.loading = true;
    console.log('Weapon Configs:', weaponConfigs);
    console.log('Target Configs:', targetConfigs);

    this.api.runSimulation(this.scenario, weaponConfigs, targetConfigs).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/results'], {
          queryParams: {
            lines: JSON.stringify(res.lines),
            result: res.result
          },
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Simulation failed. Please check your inputs.';
      },
    });
  }
}

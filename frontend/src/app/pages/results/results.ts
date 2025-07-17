import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './results.html',
  styleUrls: ['./results.css'],
})
export class ResultsComponent {
  lines: string[] = [];
  result: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      const linesData = params['lines'];
      const resultText = params['result'];

      if (!linesData || !resultText) {
        // Redirect if missing data
        this.router.navigate(['/']);
        return;
      }

      try {
        this.lines = JSON.parse(linesData);
        this.result = resultText;
      } catch {
        this.lines = [];
        this.result = 'Invalid result data';
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeaponConfig {
  type: string;
  damage: number;
  range: number;
  speed: number;
}

export interface TargetConfig {
  type: string;
  armor: number;
  speed: number;
  distance: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getScenarios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/scenarios`);
  }

  getScenarioDetails(scenario: string): Observable<{ available_weapons: string[], available_targets: string[] }> {
    return this.http.get<{ available_weapons: string[], available_targets: string[] }>(
      `${this.baseUrl}/scenario/${scenario}`
    );
  }

  runSimulation(
    scenario: string,
    weaponConfigs: WeaponConfig[],
    targetConfigs: TargetConfig[]
  ): Observable<{ result: string; lines: string[] }> {
    return this.http.post<{ result: string; lines: string[] }>(
      `${this.baseUrl}/simulate`,
      { scenario, weapon_configs: weaponConfigs, target_configs: targetConfigs }
    );
  }

  configureScenario(scenario: string, weaponCount: number, targetCount: number) {
    return this.http.post(`${this.baseUrl}/configure`, {
      scenario,
      weapon_count: weaponCount,
      target_count: targetCount,
    });
  }

}

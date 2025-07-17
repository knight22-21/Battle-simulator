from flask import Flask, request, jsonify, session
from flask_cors import CORS
from simulator.engine import scenarios, simulate, weapon_stats, target_stats

app = Flask(__name__)
app.secret_key = "supersecurekey"
CORS(app)  # Allow cross-origin requests from your Angular frontend

@app.route('/scenarios', methods=['GET'])
def get_scenarios():
    # Return list of scenario keys
    return jsonify(list(scenarios.keys()))

@app.route("/configure", methods=["POST"])
def save_configuration():
    data = request.get_json()
    scenario = data.get("scenario")
    weapon_count = data.get("weapon_count")
    target_count = data.get("target_count")

    if not scenario or not weapon_count or not target_count:
        return jsonify({"error": "Missing data"}), 400

    session["scenario"] = scenario
    session["weapon_count"] = weapon_count
    session["target_count"] = target_count

    return jsonify({"message": "Configuration saved successfully"})

@app.route("/config", methods=["GET"])
def get_config():
    scenario = session.get("scenario")
    weapon_count = session.get("weapon_count")
    target_count = session.get("target_count")

    if not scenario or not weapon_count or not target_count:
        return jsonify({"error": "Incomplete session"}), 400

    return jsonify({
        "scenario": scenario,
        "weapon_count": weapon_count,
        "target_count": target_count
    })


@app.route('/scenario/<scenario_name>', methods=['GET'])
def get_scenario_details(scenario_name):
    # Return details about one scenario
    if scenario_name not in scenarios:
        return jsonify({"error": "Scenario not found"}), 404
    
    scenario = scenarios[scenario_name]
    return jsonify({
        "available_weapons": scenario["available_weapons"],
        "available_targets": scenario["available_targets"],
    })



@app.route('/simulate', methods=['POST'])
def run_simulation():
    data = request.json

    scenario = data.get("scenario")
    weapon_configs = data.get("weapon_configs")
    target_configs = data.get("target_configs")

    if not scenario or not weapon_configs or not target_configs:
        return jsonify({"error": "Missing scenario or configs"}), 400

    # 🛠️ Enrich weapons and targets using scenario data
    for w in weapon_configs:
        stats = weapon_stats.get(w['type'], {})
        w['damage'] = stats.get('damage', 0)

    for t in target_configs:
        stats = target_stats.get(t['type'], {})
        t['armor'] = stats.get('armor', 0)

    result_text, result_lines = simulate(scenario, weapon_configs, target_configs)

    return jsonify({
        "result": result_text,
        "lines": result_lines
    })


if __name__ == '__main__':
    app.run(debug=True)

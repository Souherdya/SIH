import json

data = {
    "dg": 1.234,
    "amt":4.526,
    "ag":6.78
}

data_json = json.dumps(data, indent=4)


with open('data.js', 'r') as f:
    existing_content = f.read()


with open('data.js', 'a') as f:
    f.write(f'const data = {data_json};\n')
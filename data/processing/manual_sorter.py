import os
import json
import csv

#MANUAL_SEQUENCE_JSON = "in/seq.json"
DEF_REL_SEQ_PATH = "in/seq.csv"


def flatten(l:list[list]) -> list:
    return [item for sublist in l for item in sublist]


def save_json_to_csv(json_data, file_path):
    with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, delimiter=';')
        for row in json_data:
            writer.writerow(row)

def read_csv_to_json(file_path):
    json_data = []
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        for row in reader:
            json_data.append(row)
    return json.dumps(json_data)

def sort_manually(seq_path:str, datalist:list[dict]) -> list[list[dict]]:
    #f = open(MANUAL_SEQUENCE_JSON, encoding="utf8")
    #data:list = json.load(f)
    full_seq_path = os.path.join(os.getcwd(), seq_path) if seq_path != None else os.path.join(os.path.dirname(__file__), DEF_REL_SEQ_PATH)
    data:list = json.loads(read_csv_to_json(full_seq_path))

    sorted_data = [[] for _ in range(len(data))]

    for i, row in enumerate(data):
        for col in row:
            for subject in datalist:
                if col == "":
                    sorted_data[i].append(None)
                    break
                if subject["id"] == col:
                    # check if subject is already in the sequence
                    if subject["id"] in [s["id"] for s in flatten(sorted_data) if s != None]:
                        print(f"Subject {subject['id']} is already in the sequence")
                    sorted_data[i].append(subject)
                    break
            # list the ids of subjects that are not in the data list (debug)
            else:
                print(f"Subject {col} not found in data")
                sorted_data[i].append(None)


    # list the ids of subjects that are not in the manual sequence (debug)
    for subject in datalist:
        if subject not in flatten(sorted_data):
            print(f"Subject {subject['id']} not found in manual sequence")
    
    #f.close()
    return sorted_data

if __name__ == "__main__":
    pass
    #f = open(MANUAL_SEQUENCE_JSON, encoding="utf8")
    #data:list = json.load(f)
    #save_json_to_csv(data, MANUAL_SEQUENCE_CSV)
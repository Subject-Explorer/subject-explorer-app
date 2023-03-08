import json

MANUAL_SEQUENCE_JSON = "./seq.json"


def flatten(l: list[list]) -> list:
    return [item for sublist in l for item in sublist]


def sort_manually(datalist:list[dict]) -> list[list[dict]]:
    f = open(MANUAL_SEQUENCE_JSON, encoding="utf8")
    data:list = json.load(f)
    
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
    
    f.close()
    return sorted_data
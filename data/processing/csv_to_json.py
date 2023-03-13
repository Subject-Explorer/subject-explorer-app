import sys
import os
import argparse
import json
from manual_sorter import sort_manually

DEF_REL_CSV_PATH = "../csv"
DEF_REL_OUT_PATH = "../../public/data.json"
parser = argparse.ArgumentParser()

def parse_csv(path:str, file_name:str, table_type:str) -> list[dict]:
    data = []

    with open(f"{path}/{file_name}", mode="r", encoding="utf-8") as file:
        lines = csv_to_lines(file)

    for line in lines:
        id = line[0]
        name = line[1]
        lesson_count = get_lesson_count(line)
        test = line[6]
        credit = int(line[7])
        semesters = get_semesters(line[8])
        prerequisites = get_prerequisites(line[9])
        field = get_field(line[16])
        specializations = get_specializations(line, table_type)

        subject_data = {
            "id": id,
            "type": table_type,
            "name": name,
            "lessonCount": lesson_count,
            "test": test,
            "credit": credit,
            "semesters": semesters,
            "prerequisites": prerequisites,
            "field": field,
            "specializations": specializations
        }

        data.append(subject_data)

    return data


def csv_to_lines(file) -> list[list[str]]:
    lines = file.readlines()
    # remove trailing whitespaces
    lines = [line.strip() for line in lines]
    # remove header
    lines = lines[1:]
    # remove empty lines
    lines = [line for line in lines if line]
    # split lines
    lines = [line.split(";") for line in lines]
    # remove trailing spaces
    lines = [[item.strip() for item in line] for line in lines]
    return lines


def get_lesson_count(line:list[str]) -> dict:
    return {
        "lecture": int(line[2]),
        "practice": int(line[3]),
        "laboratory": int(line[4]),
        "consultation": int(line[5])
    }


def get_semesters(semesters_str:str) -> list[int]:
    return [int(semester) for semester in semesters_str.split(",")]


def get_prerequisites(prerequisites_str:str) -> list[dict]:
    prerequisites = []
    prerequisites_raw = prerequisites_str.strip().split(", ")
    for prerequisite in prerequisites_raw:
        if prerequisite:
            prerequisite_id = prerequisite.split("(gyenge)")[0].replace(" ", "")
            weak = "(gyenge)" in prerequisite
            prerequisites.append({"id": prerequisite_id, "weak": weak})
    return prerequisites


def get_field(field_str:str) -> str:
    match field_str:
        case "Inf":
            return "informatika"
        case "Szám":
            return "számítástechnika"
        case "Mat":
            return "matematika"
        case _:
            return "egyéb"


def get_specializations(line:list[str], table_type:str) -> list[str]:
    specializations = []
    if len(line) < 18:
        if table_type == "spec-kotval":
            specializations = [line[0]]
        else:
            specializations = ["A", "B", "C"]
    else:
        if 'M' in line[17]:
            specializations.append('A')
        if 'T' in line[17]:
            specializations.append('B')
        if 'F' in line[17]:
            specializations.append('C')
    return specializations


def flatten(l:list[list]) -> list:
    return [item for sublist in l for item in sublist]


def map_parents_as_children(subject_data_list:list[dict]) -> list[dict]:
    # - Fills the children field of each subject data with the IDs of its children.
    # - Also fills the children_specializations field of each subject data with the specializations of its children.

    # Create a dictionary to map each subject data ID to its children IDs and siblings' IDs.
    child_map = {}
    for subject_data in subject_data_list:
        prerequisites = subject_data.pop('prerequisites', [])
        for prerequisite in prerequisites:
            prerequisite_id = prerequisite['id']
            child_map.setdefault(prerequisite_id, []).append({
                "id": subject_data['id'],
                "specializations": subject_data['specializations'],
                "weak": prerequisite["weak"]
            })

    # Add the children's IDs to each subject data.
    for subject_data in subject_data_list:
        subject_data['children'] = [child for child in child_map.get(subject_data['id'], [])]

    return subject_data_list


def sort_into_semesters(subject_data_list) -> list[list[dict]]:
    semesters = 6
    data = [[] for _ in range(semesters)]
    for subject_data in subject_data_list:
        data[subject_data['semesters'][0] - 1].append(subject_data)
    return data


def merge_data(data:list[dict]) -> list[dict]:
    merged_data = {}
    for subject in data:
        subject_id = subject["id"]
        if subject_id not in merged_data:
            merged_data[subject_id] = subject.copy()
            merged_data[subject_id]["prerequisites"] = [{"id": prereq["id"], "weak": prereq["weak"]} for prereq in merged_data[subject_id]["prerequisites"]]
            merged_data[subject_id]["specializations"] = set(merged_data[subject_id]["specializations"])
        else:
            merged_data[subject_id]["prerequisites"].extend({"id": prereq["id"], "weak": prereq["weak"]} for prereq in subject["prerequisites"])
            merged_data[subject_id]["specializations"].update(subject["specializations"])

    for subject_id in merged_data:
        merged_data[subject_id]["prerequisites"] = remove_duplicates(merged_data[subject_id]["prerequisites"])
        merged_data[subject_id]["specializations"] = sorted(list(merged_data[subject_id]["specializations"]))

    return list(merged_data.values())

def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item["id"] not in seen:
            seen.add(item["id"])
            result.append(item)
    return result


def process_files(files_to_process:list[tuple], csv_dir_path:str) -> list[dict]:
    data = []
    for file_name, table_type in files_to_process:
        # parse the current file
        new_data = parse_csv(csv_dir_path, file_name, table_type)
        data.extend(new_data)

    # merge same-coded subjects
    merged_data = merge_data(data)

    return merged_data


def save_data(data, path:str) -> None:
    with open(path, "wb") as f:
        f.write(json.dumps(data, ensure_ascii=False).encode("utf8"))


def output_csv_files(data, path:str) -> None:
    pass


def check_args():
    parser.add_argument("-csv", "--csv", help="Path to the directory of the csv files", required = False)
    parser.add_argument("-o", "--out", help="Path to the output file", required = False)
    parser.add_argument("-m", "--manual-sorting", help="Sort manually, needs a sequence.csv file, use -mp <path> to change the default sequence file path which is defined in manual_sorter.py", required = False, action='store_true')
    parser.add_argument("-mp", "--manual-sequence", help="Path to the manual sequence file", required = False)
    parser.add_argument("-ocsv", "--output-csv-files", help="Path to custom csv files for further processing, generates these files if this flag is set", required = False)

    args = parser.parse_args()

    csv_path = os.path.abspath(args.csv) if args.csv else None
    manual_seq_path = os.path.abspath(args.manual_sequence) if args.manual_sequence else None

    if manual_seq_path != None:
        if not os.path.isfile(manual_seq_path):
            print("Error: path does not exist: " + manual_seq_path)
            sys.exit(1)
    
    if csv_path != None:
        if not os.path.exists(csv_path):
                print("Error: path for CSV files does not exist: " + csv_path)
                sys.exit(1)
    
    return args


def main():
    args = check_args()

    files_to_process = [
        # (filename, table_type)
        ("torzsanyag.csv", "torzs"),
        ("A_spec_kotelezo.csv", "spec-kot"),
        ("A_spec_kotval.csv", "spec-kotval"),
        ("B_spec_kotelezo.csv", "spec-kot"),
        ("B_spec_kotval.csv", "spec-kotval"),
        ("C_spec_kotelezo.csv", "spec-kot"),
        ("C_spec_kotval.csv", "spec-kotval")
    ]

    full_csv_dir_path = os.path.join(os.getcwd(), args.csv) if args.csv != None else os.path.join(os.path.dirname(__file__), DEF_REL_CSV_PATH)
    full_out_file_path = os.path.join(os.getcwd(), args.out) if args.out != None else os.path.join(os.path.dirname(__file__), DEF_REL_OUT_PATH)
    
    #print("FULL CSV PATH:\n" + full_csv_dir_path)
    #print("FULL OUT PATH:\n" + full_out_file_path)
    
    data = process_files(files_to_process, full_csv_dir_path)
    data = map_parents_as_children(data)
    
    if args.output_csv_files:
        output_csv_files(data, args.output_csv_files)

    if args.manual_sorting:
        data = sort_manually(args.manual_sequence, data)
    else:
        pass
        # auto sort

    
    save_data(data, full_out_file_path)


if __name__ == "__main__":
    main()

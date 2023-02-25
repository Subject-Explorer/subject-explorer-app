import itertools
import json
from itertools import permutations


def closest_permutation(semesters):
    # subject dictionary with id as key
    subjects = {}
    for semester in semesters:
        for subject in semester:
            subjects[subject["id"]] = subject

    def distance_function(subject, child):
        # find index of subject and child in semesters
        subject_index = next(i for i, semester in enumerate(semesters) if subject in semester)
        child_index = next(i for i, semester in enumerate(semesters) if child in semester)

        return abs(subject_index - child_index)

    def get_distance(subject):
        if subject is None:
            return 0

        children_ids = subject["children"]

        # if no children, return 0
        if not children_ids:
            return 0

        # if children, return sum of distances, if children are present
        children = [subjects[child_id] for child_id in children_ids]
        return sum(distance_function(subject, child) for child in children)


    # find longest semester, fill others with None
    max_semester_length = max(len(semester) for semester in semesters)
    semesters = [semester + [None] * (max_semester_length - len(semester)) for semester in semesters]

    min_distance = float('inf')
    min_permutation = None
    for permutation in permutations(semesters):
        distance = sum(get_distance(subject) for semester in permutation for subject in semester)
        if distance < min_distance:
            min_distance = distance
            min_permutation = permutation

    return min_permutation


def parse_csv(file_name, specialization, table_type) -> list[dict]:
    subjects = []

    with open(f"./csv/{file_name}", mode="r", encoding="utf-8") as file:
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

        subjects.append(subject_data)

    return subjects


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


def get_lesson_count(line) -> dict:
    return {
        "lecture": int(line[2]),
        "practice": int(line[3]),
        "laboratory": int(line[4]),
        "consultation": int(line[5])
    }


def get_semesters(semesters_str) -> list[int]:
    return [int(semester) for semester in semesters_str.split(",")]


def get_prerequisites(prerequisites_str) -> list[dict]:
    prerequisites = []
    prerequisites_raw = prerequisites_str.strip().split(", ")
    for prerequisite in prerequisites_raw:
        if prerequisite:
            prerequisite_id = prerequisite.split("(gyenge)")[0].replace(" ", "")
            weak = "(gyenge)" in prerequisite
            prerequisites.append({"id": prerequisite_id, "weak": weak})
    return prerequisites


def get_field(field_str) -> str:
    match field_str:
        case "Inf":
            return "informatika"
        case "Szám":
            return "számítástechnika"
        case "Mat":
            return "matematika"
        case _:
            return "egyéb"


def get_specializations(line, table_type) -> list[str]:
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


def fix_prerequisites(data, spec) -> None:
    subjects_dict = {}

    # create a dictionary of subjects, with their IDs as keys
    for semester in data:
        for subject in semester:
            subject_id = subject["id"].split('_')[0]
            subjects_dict[subject_id] = subject

    # replace prerequisite IDs with subject codes
    for semester in data:
        for subject in semester:
            for prerequisite in subject["prerequisites"]:
                prerequisite_id = prerequisite["id"]
                if prerequisite_id in subjects_dict:
                    prerequisite_subject = subjects_dict[prerequisite_id]
                    prerequisite["id"] = prerequisite_subject["code"] + "_" + spec


def map_parents_as_children(subject_data_list):
    # Create a dictionary to map each subject data ID to its children IDs and siblings' IDs.
    child_map = {}
    for subject_data in subject_data_list:
        subject_data_id = subject_data['id']
        prerequisites = subject_data.pop('prerequisites', [])
        for prerequisite in prerequisites:
            prerequisite_id = prerequisite['id']
            if prerequisite_id in child_map:
                child_map[prerequisite_id].append(subject_data_id)
            else:
                child_map[prerequisite_id] = [subject_data_id]

    # Add the children's IDs and siblings' IDs to each subject data.
    for subject_data in subject_data_list:
        subject_data_id = subject_data['id']
        if subject_data_id in child_map:
            subject_data['children'] = child_map[subject_data_id]
        else:
            subject_data['children'] = []

    return subject_data_list


def sort_into_semesters(subject_data_list) -> list[list[dict]]:
    semesters = 6
    data = [[] for _ in range(semesters)]
    for subject_data in subject_data_list:
        data[subject_data['semesters'][0] - 1].append(subject_data)
    return data


def get_depth(subject_id, prerequisites_dict) -> int:
    # base case: subject has no prerequisites
    if subject_id not in prerequisites_dict:
        return 0

    # recursive case: return depth of deepest prerequisite plus one
    depths = []
    for prerequisite_id in prerequisites_dict[subject_id]:
        depths.append(get_depth(prerequisite_id, prerequisites_dict))
    return max(depths) + 1


def sort_data(data) -> None:
    for semester in data:
        semester.sort(key=lambda x: (x["code"], [prereq["id"] for prereq in x["prerequisites"]], x["field"]),
                      reverse=False)


def brute_force_sort(data) -> None:
    # create a dictionary of subjects, with their IDs as keys
    subjects_dict = {}
    for semester in data:
        for subject in semester:
            subject_id = subject["id"]
            subjects_dict[subject_id] = subject

    # find semester with the most subjects
    max_semester = max_semester = max(list(data), key=len)

    table = [[0 for _ in range(len(max_semester))] for _ in range(len(max_semester))]
    # try every possible permutation of subjects, and find the one with the shortest sum of distances of children
    min_distance = float("inf")
    min_permutation = None
    for permutation in itertools.permutations(max_semester):
        distance = 0
        for i, subject in enumerate(permutation):
            for child in subject["children"]:
                child_index = [s["id"] for s in permutation].index(child)
                distance += abs(i - child_index)
        if distance < min_distance:
            min_distance = distance
            min_permutation = permutation


def process_files(files_to_process) -> list[dict]:
    subjects = []
    for file_name, specialization, table_type in files_to_process:
        new_data = parse_csv(file_name, specialization, table_type)
        # add new data to the list of subjects, where subject ids are unique
        for subject in new_data:
            if subject["id"] not in [s["id"] for s in subjects]:
                subjects.append(subject)
    return subjects


def save_data(data) -> None:
    with open("../public/data.json", "wb") as f:
        f.write(json.dumps(data, ensure_ascii=False).encode("utf8"))


def main():
    files_to_process = [
        # (filename, specialization, table_type)
        ("torzsanyag.csv", "", "torzs"),
        ("A_spec_kotelezo.csv", "A", "spec-kot"),
        ("A_spec_kotval.csv", "A", "spec-kotval"),
        ("B_spec_kotelezo.csv", "B", "spec-kot"),
        ("B_spec_kotval.csv", "B", "spec-kotval"),
        ("C_spec_kotelezo.csv", "C", "spec-kot"),
        ("C_spec_kotval.csv", "C", "spec-kotval")
    ]
    subjects = process_files(files_to_process)
    map_parents_as_children(subjects)
    data = sort_into_semesters(subjects)
    # brute_force_sort(subjects)
    data = closest_permutation(data)
    # sort_data(data)
    save_data(data)


if __name__ == "__main__":
    main()

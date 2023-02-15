import json


def parse_csv(file_name, specialization, table_type) -> list[list[dict]]:
    data = [[], [], [], [], [], []]

    with open(f"./csv/{file_name}", mode="r", encoding="utf-8") as file:
        lines = csv_to_lines(file)

    for line in lines:
        id = get_id(line[0], specialization, table_type)
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
            "code": line[0],
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

        data[semesters[0] - 1].append(subject_data)

    if table_type == "spec-kotval":
        fix_prerequisites(data, specialization)

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


def get_id(code, specialization, table_type) -> str:
    if table_type == "spec-kotval":
        return f"{code}_{specialization}"
    else:
        return code


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


def process_files(files_to_process) -> list[list[dict]]:
    semesters = 6
    data = [[] for _ in range(semesters)]
    for file_name, specialization, table_type in files_to_process:
        # parse the current file
        new_data = parse_csv(file_name, specialization, table_type)
        # merge the new data of the current file with the existing data
        data = [semester_data + new_semester_data for semester_data, new_semester_data in zip(data, new_data)]
    return data


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
    data = process_files(files_to_process)
    sort_data(data)
    save_data(data)


if __name__ == "__main__":
    main()

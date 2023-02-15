import json

def parseCSV(fileName: str, reqU: str) -> list:
    data: list(list) = [[],[],[],[],[],[]]

    with open("./csv/" + fileName, mode="r", encoding="utf-8") as f:
        lines = [line.rstrip() for line in f]

        # remove first line
        lines = lines[1:]

        # remove empty lines
        lines = [x for x in lines if x != ""]

        # split by semicolon
        lines = [x.split(";") for x in lines]

        # remove trailing spaces
        lines = [[x.strip() for x in y] for y in lines]

        # convert to SubjectData
        for line in lines:
            id:              str                = line[0] + '_' + fileName[0] if reqU == "spec-kotval" else line[0]
            code:            str                = line[0]
            subjectType:     str                = reqU
            name:            str                = line[1]
            lessonCount:     dict               = {"lecture": int(line[2]), "practice": int(line[3]), "laboratory": int(line[4]), "consultation": int(line[5])}
            test:            str                = line[6]
            credit:          int                = int(line[7])
            semesters:       list(int)          = [int(x) for x in line[8].split(",")]
            prerequisites:   list(dict)         = []
            field:           str                = ""
            specializations: list(str)          = []

            # prerequisites
            preqArray: str = line[9].strip().split(', ')
            for preq in preqArray:
                if (preq == ""): continue
                preqId: str = preq.split('(gyenge)')[0].replace(' ', '')
                preqWeak: bool = '(gyenge)' in preq
                prerequisites.append({"id":preqId, "weak":preqWeak})

            # field
            match line[16]:
                case 'Inf':
                    field = 'informatika'
                case 'Szám':
                    field = 'számítástechnika'
                case 'Mat':
                    field = 'matematika'
                case _:
                    field = 'egyéb'

            # specializations
            if (len(line) < 18):
                if (reqU == "spec-kotval"): specializations = [fileName[0]];
                else:      specializations = ['A', 'B', 'C'];
            else:
                if ('M' in line[17]): specializations.append('A')
                if ('T' in line[17]): specializations.append('B')
                if ('F' in line[17]): specializations.append('C')

            subjectData = {
                "id": id, 
                "code": code,
                "type": subjectType,
                "name": name,
                "lessonCount": lessonCount,
                "test": test,
                "credit": credit,
                "semesters": semesters,
                "prerequisites": prerequisites,
                "field": field,
                "specializations": specializations
            }
            
            data[semesters[0] - 1].append(subjectData)

        if reqU == "spec-kotval":
            fixPrerequisites(data)

        return data


def fixPrerequisites(data):
    for semester in data:
        for subject in semester:
            #if subject["subjectType"] is not "spec-kotval": continue
            for prereq in subject["prerequisites"]:
                for semester2 in data:
                    for subject2 in semester2:
                        #if subject2["subjectType"] is not "spec-kotval": continue
                        if subject2["id"].split('_')[0] == prereq["id"]:
                            prereq["id"] = subject2["code"] + "_" + subject2["specializations"][0]
                

def processCSVs(filesToProcess: list((str, bool))) -> object:
    data = [[],[],[],[],[],[]]

    for (fileName, reqU) in filesToProcess:
        newarr = parseCSV(fileName, reqU)
        for subarrIndex in range(len(data)):
            data[subarrIndex] = data[subarrIndex] + newarr[subarrIndex]

    #fixPrerequisites(data)

    return data

def main():
    filesToProcess = [ # (filename, requiresUniquification)
        ("torzsanyag.csv",      "torzs"),
        ("A_spec_kotelezo.csv", "spec-kot"),
        ("A_spec_kotval.csv",   "spec-kotval"),
        ("B_spec_kotelezo.csv", "spec-kot"),
        ("B_spec_kotval.csv",   "spec-kotval"),
        ("C_spec_kotelezo.csv", "spec-kot"),
        ("C_spec_kotval.csv",   "spec-kotval")
    ]
    data = processCSVs(filesToProcess)
    with open("data.json", "wb") as f:
        f.write(json.dumps(data, ensure_ascii=False).encode("utf8"))


if __name__ == "__main__":
    main()

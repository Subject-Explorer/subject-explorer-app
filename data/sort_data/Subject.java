import java.util.List;
import java.util.Map;

public class Subject {
    private String id;
    private String type;
    private String name;
    private Map<String, Integer> lessonCount;
    private String test;
    private int credit;
    private List<Integer> semesters;
    private String field;
    private List<String> specializations;
    private List<String> children;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Integer> getLessonCount() {
        return lessonCount;
    }

    public void setLessonCount(Map<String, Integer> lessonCount) {
        this.lessonCount = lessonCount;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public int getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public List<Integer> getSemesters() {
        return semesters;
    }

    public void setSemesters(List<Integer> semesters) {
        this.semesters = semesters;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public List<String> getSpecializations() {
        return specializations;
    }

    public void setSpecializations(List<String> specializations) {
        this.specializations = specializations;
    }

    public String[] getChildren() {
        return children.toArray(new String[0]);
    }

    public void setChildren(List<String> children) {
        this.children = children;
    }
}

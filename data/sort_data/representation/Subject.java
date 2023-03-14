package representation;

import java.util.List;
import java.util.Map;

/**
 * representation.Subject.java
 * <p>
 * The subject of the curriculum (Data class).
 * This class represents a subject of the curriculum.
 * It contains the subject's
 * <ul>
 *     <li>{@link Subject#id}</li>
 *     <li>{@link Subject#type}</li>
 *     <li>{@link Subject#name}</li>
 *     <li>{@link Subject#lessonCount}</li>
 *     <li>{@link Subject#test}</li>
 *     <li>{@link Subject#credit}</li>
 *     <li>{@link Subject#semesters}</li>
 *     <li>{@link Subject#field}</li>
 *     <li>{@link Subject#specializations}</li>
 *     <li>{@link Subject#children}</li>
 * </ul>
 * </p>
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
public class Subject {
    /**
     * The id of the subject (IP-18XXXX)
     */
    private String id;
    /**
     * The type of the subject:
     * <ul>
     *     <li>torzsanyag - Törzsanyag része</li>
     *     <li>spec-kot - Specializáción kötelező</li>
     *     <li>spec-kotval - Specializáción kötelezően választható</li>
     * </ul>
     */
    private String type;
    /**
     * The name of the subject
     */
    private String name;
    /**
     * The lesson count of the subject
     */
    private Map<String, Integer> lessonCount;
    /**
     * The test type of the subject:
     * <ul>
     *      <li>G - Gyakorlati jegy számonkérésű tárgy</li>
     *      <li>K - Kollokvium számonkérésű tárgy</li>
     *      <li>FG - Folyamatos számonkérésű gyakorlat</li>
     *      <li>XG - Összevont, gyakorlati jegy számonkérésű tárgy</li>
     *      <li>XFG - Összevont, folyamatos számonkérésű gyakorlat</li>
     *      <li>XK - Összevont, kollokvium számonkérésű tárgy</li>
     * </ul>
     */
    private String test;
    /**
     * The credit value of the subject
     */
    private int credit;
    /**
     * The semesters in which the subject is advised to be taken
     */
    private List<Integer> semesters;
    /**
     * The field of the subject:
     * <ul>
     *     <li>matematika</li>
     *     <li>informatika</li>
     *     <li>számítástechnika</li>
     *     <li>egyéb</li>
     * </ul>
     */
    private String field;
    /**
     * The specializations of the subject
     * <ul>
     *     <li>A - Modellező</li>
     *     <li>B - Tervező</li>
     *     <li>B - Fejlesztő</li>
     * </ul>
     */
    private List<String> specializations;
    /**
     * The children of the subject
     */
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

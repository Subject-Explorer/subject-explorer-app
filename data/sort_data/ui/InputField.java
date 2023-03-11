package ui;

// TODO: Add javadoc
/**
 * ui.InputField.java
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
class InputField {
    private final float WIDTH, HEIGHT, X, Y;

    private final Window window;
    private final String label;
    private String text = "";
    private boolean active = false;

    InputField(Window window) {
        this(window, "", 0, 0);
    }

    InputField(Window window, float x, float y) {
        this(window, "", x, y);
    }

    InputField(Window window, String label, float x, float y) {
        this(window, label, x, y, 200f, 40f);
    }

    InputField(Window window, String label, float x, float y, float width, float height) {
        this.window = window;
        this.label = label;
        this.X = x;
        this.Y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
    }

    void display() {
        window.fill(active ? 40 : 0);
        window.stroke(255);
        window.rect(X, Y, WIDTH, HEIGHT);

        window.textAlign(window.LEFT, window.CENTER);
        window.fill(255);

        window.textSize(16);
        window.text(label, X + 10, Y - 20);

        window.textSize(20);
        window.text(text + (active ? "|" : ""), X + 10, Y + HEIGHT / 2f);
    }

    void keyPressed() {
        if (!active) return;
        if (window.key == window.BACKSPACE) {
            if (text.length() > 0) {
                text = text.substring(0, text.length() - 1);
            }
        } else if (window.key == window.ENTER) {
            text = "";
            active = false;
        } else {
            text += window.key;
        }
    }

    void mousePressed() {
        active = window.mouseX > X && window.mouseX < X + WIDTH && window.mouseY > Y && window.mouseY < Y + HEIGHT;
    }

    String getText() {
        return text;
    }

    void setText(String text) {
        this.text = text;
    }

    void clear() {
        text = "";
    }
}

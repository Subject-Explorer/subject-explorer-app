package ui;

/**
 * ui.InputField.java
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
class InputField {
    /**
     * The width of the input field
     */
    private final float WIDTH;
    /**
     * The height of the input field
     */
    private final float HEIGHT;
    /**
     * The X coordinate of the input field
     */
    private final float X;
    /**
     * The Y coordinate of the input field
     */
    private final float Y;

    /**
     * The window of which the input field is a part of
     */
    private final Window window;
    /**
     * The label of the input field
     */
    private final String label;
    /**
     * The content of the input field
     */
    private String content = "";
    /**
     * Whether the input field is active or not
     */
    private boolean active = false;

    /**
     * Creates a new input field.
     *
     * @param window The window of which the input field is a part of
     */
    InputField(Window window) {
        this(window, "", 0, 0);
    }

    /**
     * Creates a new input field.
     *
     * @param window The window of which the input field is a part of
     * @param x      The X coordinate of the input field
     * @param y      The Y coordinate of the input field
     */
    InputField(Window window, float x, float y) {
        this(window, "", x, y);
    }

    /**
     * Creates a new input field.
     *
     * @param window The window of which the input field is a part of
     * @param label  The label of the input field
     * @param x      The X coordinate of the input field
     * @param y      The Y coordinate of the input field
     */
    InputField(Window window, String label, float x, float y) {
        this(window, label, x, y, 200f, 40f);
    }

    /**
     * Creates a new input field.
     *
     * @param window The window of which the input field is a part of
     * @param label  The label of the input field
     * @param x      The X coordinate of the input field
     * @param y      The Y coordinate of the input field
     * @param width  The width of the input field
     * @param height The height of the input field
     */
    InputField(Window window, String label, float x, float y, float width, float height) {
        this.window = window;
        this.label = label;
        this.X = x;
        this.Y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
    }

    /**
     * Draws the input field to the screen.
     */
    void display() {
        // If the input field is active, draw a grey background, otherwise draw a black background
        window.fill(active ? 0.4f : 0f);
        window.stroke(1f);
        window.rect(X, Y, WIDTH, HEIGHT);

        // Make the text white and left-aligned
        window.textAlign(window.LEFT, window.CENTER);
        window.fill(1f);

        // Draw the label of the input field
        window.textSize(16);
        window.text(label, X + 10, Y - 20);

        // Draw the content of the input field
        window.textSize(20);
        window.text(content + (active ? "|" : ""), X + 10, Y + HEIGHT / 2f);
    }

    /**
     * Handles a key press event on the parent window.
     */
    void keyPressed() {
        // If the input field is not active, do nothing
        if (!active) return;

        // If the key is backspace, remove the last character from the content
        if (window.key == window.BACKSPACE) {
            if (content.length() > 0) {
                content = content.substring(0, content.length() - 1);
            }
        }
        // If the key is enter, clear the content and deactivate the input field
        else if (window.key == window.ENTER) {
            content = "";
            active = false;
        }
        // If the key is any other character, add it to the content
        else {
            content += window.key;
        }
    }

    /**
     * Handles a mouse press event on the parent window.
     */
    void mousePressed() {
        // If the mouse is pressed inside the input field, activate it
        active = window.mouseX > X && window.mouseX < X + WIDTH && window.mouseY > Y && window.mouseY < Y + HEIGHT;
    }

    /**
     * Gets the content of the input field.
     *
     * @return The content of the input field
     */
    String getContent() {
        return content;
    }

    /**
     * Sets the content of the input field.
     *
     * @param content The content of the input field
     */
    void setContent(String content) {
        this.content = content;
    }

    /**
     * Clears the content of the input field.
     */
    void clear() {
        content = "";
    }
}

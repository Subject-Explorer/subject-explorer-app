package ui;

import processing.core.PApplet;

/**
 * ui.Window.java
 * <p>
 * The main window of the application.
 * This class is the main class of the application, and is responsible for
 * creating the window and handling the input.
 * It also contains the main method of the application.
 * The window is a {@link PApplet} instance, and is responsible for drawing
 * the NodeGrid to the screen.
 * The window also contains the {@link InputField} for the JSON source path.
 * <p>
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
public class Window extends PApplet {
    /**
     * The width of the window
     */
    private static final int WIDTH = 640;

    /**
     * The height of the window
     */
    private static final int HEIGHT = 400;

    /**
     * The zoom of the window
     */
    public float zoom = 1;

    /**
     * The offset of the window on the X axis
     */
    public float offsetX = 0;

    /**
     * The offset of the window on the Y axis
     */
    public float offsetY = 0;

    /**
     * The input field of the window for the JSON source path
     */
    private InputField source;

    /**
     * The settings of the window, overriding the default {@link PApplet} settings.
     * This method is called once at the start of the program.
     */
    @Override
    public void settings() {
        size(WIDTH, HEIGHT);
        pixelDensity(displayDensity());
    }

    /**
     * The setup of the window, overriding the default {@link PApplet} setup.
     * This method is called once at the start of the program.
     */
    @Override
    public void setup() {
        // Set the title of the window
        surface.setTitle("Visual graph sorting");

        // Initialize the navigator with the current window instance
        Navigator.initialize(this);

        // Reset the zoom and offset of the window
        Navigator.reset();

        // Initialize the "JSON source" input field
        source = new InputField(this, "JSON source", width * 0.2f, height * 0.2f);
    }

    /**
     * The draw of the window, overriding the default {@link PApplet} draw.
     * This method is called every frame.
     */
    @Override
    public void draw() {
        background(0);

        // Update the position of the window through the navigator
        Navigator.update();

        // Draw the input field
        source.display();
    }

    /**
     * The key pressed event of the window, overriding the default {@link PApplet} key pressed event.
     * This method is called every time a key is pressed.
     */
    @Override
    public void keyPressed() {
        // Notify the input field of the key press
        source.keyPressed();

        // Notify the navigator of the key press
        Navigator.keyNavigate();
    }

    /**
     * The mouse pressed event of the window, overriding the default {@link PApplet} mouse pressed event.
     * This method is called every time a mouse button is pressed.
     */
    @Override
    public void mousePressed() {
        // Notify the input field of the mouse press
        source.mousePressed();
    }

    /**
     * The mouse dragged event of the window, overriding the default {@link PApplet} mouse dragged event.
     * This method is called every time a mouse button is dragged.
     */
    @Override
    public void mouseDragged() {
        // Notify the navigator of the mouse drag
        Navigator.mouseNavigate();
    }
}

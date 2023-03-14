package ui;

import processing.core.PApplet;

/**
 * ui.Navigator.java
 * <p>
 * The navigator of the window.
 * This class is responsible for handling the navigation of the window.
 * It is responsible for handling the input and calculating the new offsets
 * and zoom of the window.
 * <p>
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
public class Navigator {
    /**
     * The zoom of the window
     */
    private static float ZOOM = 1;
    /**
     * The offset of the window on the X axis
     */
    private static float X = 0;
    /**
     * The offset of the window on the Y axis
     */
    private static float Y = 0;
    /**
     * The window of the navigator
     */
    private static Window window;

    /**
     * Initializes the navigator.
     * This method is called once at the start of the program.
     *
     * @param window The window of the navigator
     */
    public static void initialize(Window window) {
        Navigator.window = window;
    }

    /**
     * Calculates the new offsets and zoom of the window.
     * This method is called once per frame while key navigating.
     */
    public static void keyNavigate() {
        if (window.keyPressed) {
            if (window.key == window.CODED) {
                if (window.keyCode == window.UP) {
                    Y -= 10;
                } else if (window.keyCode == window.DOWN) {
                    Y += 10;
                } else if (window.keyCode == window.LEFT) {
                    X -= 10;
                } else if (window.keyCode == window.RIGHT) {
                    X += 10;
                }
            } else if (window.key == 'w') {
                ZOOM += 0.1;
            } else if (window.key == 's') {
                ZOOM -= 0.1;
            }
        }
    }

    /**
     * Handles the mouse navigation of the window.
     * This method is called once per frame while mouse navigating.
     */
    public static void mouseNavigate() {
        if (window.mousePressed) {
            X += window.mouseX - window.pmouseX;
            Y += window.mouseY - window.pmouseY;
        }
    }

    /**
     * Updates the navigator and the window.
     * This method is called once per frame.
     */
    public static void update() {
        calculate();
        apply();
    }

    /**
     * Calculates the new offsets and zoom of the window.
     * This method is called once per frame.
     */
    private static void calculate() {
        window.offsetX = PApplet.lerp(window.offsetX, X, 0.1f);
        window.offsetY = PApplet.lerp(window.offsetY, Y, 0.1f);
        window.zoom = PApplet.lerp(window.zoom, ZOOM, 0.1f);

        if (Math.abs(window.offsetX - X) < 0.1) window.offsetX = X;
        if (Math.abs(window.offsetY - Y) < 0.1) window.offsetY = Y;
        if (Math.abs(window.zoom - ZOOM) < 0.1) window.zoom = ZOOM;
    }

    /**
     * Applies the calculated offsets and zoom to the window.
     * This method is called once per frame.
     */
    private static void apply() {
        // window.translate(window.width / 2f, window.height / 2f);
        window.scale(window.zoom);
        window.translate(window.offsetX, window.offsetY);
    }

    /**
     * Resets the navigator.
     * This method is called once at the start of the program.
     */
    public static void reset() {
        ZOOM = 1;
        X = 0;
        Y = 0;

        window.offsetX = 0;
        window.offsetY = 0;
        window.zoom = 1;
    }
}

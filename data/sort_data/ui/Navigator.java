package ui;

import processing.core.PApplet;

public class Navigator {
    private static float ZOOM = 1;
    private static float X = 0, X0 = 0;
    private static float Y = 0, Y0 = 0;
    private static Window window;


    public static void initialize(Window window) {
        Navigator.window = window;
    }

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

    public static void mouseNavigate() {
        if (window.mousePressed) {
            X += window.mouseX - window.pmouseX;
            Y += window.mouseY - window.pmouseY;
        }
    }

    public static void apply() {
        X0 = PApplet.lerp(X0, X, 0.1f);
        Y0 = PApplet.lerp(Y0, Y, 0.1f);
        window.translate(window.width / 2f, window.height / 2f);
        window.scale(ZOOM);
        window.translate(X0, Y0);
    }
}

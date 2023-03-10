package ui;

import processing.core.PApplet;

/**
 * visualization.Window.java
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
public class Window extends PApplet {
    private static final int WIDTH = 640;
    private static final int HEIGHT = 400;
    InputField source;

    public void settings() {
        size(WIDTH, HEIGHT);
        pixelDensity(displayDensity());
    }

    public void setup() {
        surface.setTitle("Visual graph sorting");
        Navigator.initialize(this);
        source = new InputField(this, "JSON source", width*0.2f, height*0.2f);
    }

    public void draw() {
        background(0);
        Navigator.apply();
        source.display();
    }

    public void keyPressed(){
        source.keyPressed();
        Navigator.keyNavigate();
    }

    public void mousePressed() {
        source.mousePressed();
    }

    public void mouseDragged() {
        Navigator.mouseNavigate();
    }
}

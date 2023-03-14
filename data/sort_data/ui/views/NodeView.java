package ui.views;

import processing.core.PConstants;
import ui.Window;

public class NodeView {
    private static final float WIDTH = 40;
    private static final float HEIGHT = 20;
    private static final float GAP = 5;
    private static final float CORNER_RADIUS = 5;

    public static void display(Window window, int id, float x, float y) {
        window.pushStyle();
        window.fill(0.8f);
        window.stroke(0);
        window.rect((x - 0.5f) * (WIDTH + GAP), (y - 0.5f) * (HEIGHT + GAP), WIDTH, HEIGHT, CORNER_RADIUS);

        window.fill(0.2f);
        window.noStroke();
        window.textAlign(PConstants.CENTER, PConstants.CENTER);
        window.textSize(18);
        window.text("r"+y+"-id"+id, x, y);
        window.popStyle();
    }
}

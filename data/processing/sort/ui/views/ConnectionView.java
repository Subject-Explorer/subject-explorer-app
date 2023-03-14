package ui.views;

import ui.Window;

public class ConnectionView {
    private static final float WIDTH = 80;
    private static final float HEIGHT = 40;
    private static final float GAP = 10;
    public static void display(Window window, short[] connection, short[][] nodes) {
        int row1 = connection[0];
        int id1 = connection[1];
        int row2 = connection[2];
        int id2 = connection[3];

        float x1 = nodes[row1][id1] * (WIDTH + GAP);
        x1 += row1 % 2 == 0 ? WIDTH/2 : 0;
        float y1 = row1 * (HEIGHT + GAP) * 2f;

        float x2 = nodes[row2][id2] * (WIDTH + GAP);
        x2 += row2 % 2 == 0 ? WIDTH/2 : 0;
        float y2 = row2 * (HEIGHT + GAP) * 2f;

        window.noFill();
        window.stroke(0, 0.8f, 1);
        window.bezier(x1, y1, x1, (y1+y2)/2, x2, (y1+y2)/2, x2, y2);
    }
}

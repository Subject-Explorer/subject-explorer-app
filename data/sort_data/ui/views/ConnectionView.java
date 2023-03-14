package ui.views;

import ui.Window;

public class ConnectionView {
    private static final float WIDTH = 40;
    private static final float HEIGHT = 20;
    private static final float GAP = 5;
    public static void display(Window window, int[] connection, int[][] nodes) {
        int row1 = connection[0];
        int id1 = connection[1];
        int row2 = connection[2];
        int id2 = connection[3];

        float x1 = nodes[row1][id1] * (WIDTH + GAP);
        float y1 = row1 * (HEIGHT + GAP);
        float x2 = nodes[row2][id2] * (WIDTH + GAP);
        float y2 = row2 * (HEIGHT + GAP);

        window.stroke(0.8f);
        window.bezier(x1, y1, x1, (y1+y2)/2, x2, (y1+y2)/2, x2, y2);
    }
}

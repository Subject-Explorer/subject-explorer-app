package ui.views;

import ui.Window;

public class IndividualView {
    private final Window window;
    private genetic_algorithm.Individual individual;
    private final float X = 80;
    private final float Y = 40;

    public IndividualView(Window window) {
        this.window = window;
    }

    public void setIndividual(genetic_algorithm.Individual individual) {
        this.individual = individual;
    }

    public void display() {
        window.pushMatrix();
        window.translate(X, Y);
        displayConnections();
        displayNodes();
        window.popMatrix();
    }

    private void displayNodes() {
        if (individual == null) return;

        short[][] nodes = individual.getChromosome();
        for (int row = 0; row < nodes.length; row++) {
            for (int id = 0; id < nodes[row].length; id++) {
                int colum = nodes[row][id];
                NodeView.display(window, id, (float) (colum + (row % 2 == 0 ? 0.5 : 0)), row * 2);
            }
        }
    }

    private void displayConnections() {
        if (individual == null) return;

        short[][] connections = individual.getConnections();
        for (short[] connection : connections) {
            ConnectionView.display(window, connection, individual.getChromosome());
        }
    }
}

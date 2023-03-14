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
        int[][] nodes = individual.getChromosome();
        for (int row = 0; row < nodes.length; row++) {
            for (int id = 0; id < nodes[row].length; id++) {
                int colum = nodes[row][id];
                NodeView.display(window, id, colum, row);
            }
        }
    }

    private void displayConnections() {
        if(individual == null) return;
        int[][] connections = individual.getConnections();
        for (int[] connection : connections) {
            ConnectionView.display(window, connection, individual.getChromosome());
        }
    }
}

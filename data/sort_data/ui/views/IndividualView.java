package ui.views;

import ui.Window;

public class IndividualView {
    private final Window window;
    private genetic.Individual individual;

    public IndividualView(Window window) {
        this.window = window;
    }

    public void setIndividual(genetic.Individual individual) {
        this.individual = individual;
    }

    public void display() {
        displayConnections();
        displayNodes();
    }

    private void displayNodes() {
        int[][] nodes = individual.getChromosome();
        for (int row = 0; row < nodes.length; row++) {
            for (int id = 0; id < nodes[row].length; id++) {
                int colum = nodes[row][id];
                NodeView.display(window, id, colum, row);
            }
        }
    }

    private void displayConnections() {
        int[][] connections = individual.getConnections();
        for (int[] connection : connections) {
            ConnectionView.display(window, connection, individual.getChromosome());
        }
    }
}

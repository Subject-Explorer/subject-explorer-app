import data_access.CSVParser;
import genetic_algorithm.Individual;
import genetic_algorithm.Population;
import processing.core.PApplet;
import representation.NodeGrid;
import ui.Window;

/**
 * Main.java
 * <p>
 * The main class of the application.
 * This class is responsible for initializing the application.
 * It is responsible for initializing the processing window, reading the data
 * from the files, initializing the base individual, initializing the population,
 * running the genetic algorithm, getting the solution, and writing the solution
 * to a file.
 * <p>
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
public class Main {
    private static final String NODE_PATH = "data/processing/out/solution_v3.csv";
    private static final String CONNECTION_PATH = "data/processing/out/connections.csv";
    private static final String SOLUTION_PATH = "data/processing/out/solution_v3.csv";

    /**
     * The main method of the application.
     * This method is called once at the start of the program.
     *
     * @param args The command line arguments
     */
    public static void main(String[] args) {
        // Initialize the processing window
        String[] processingArgs = {Window.class.getName()};
        Window window = new Window();
        PApplet.runSketch(processingArgs, window);

        try {
            // Read the data from the files
            NodeGrid nodes = NodeGrid.fromFiles(NODE_PATH, CONNECTION_PATH);

            // Initialize the base individual
            Individual.initializeChromosome(nodes);
            Individual base = new Individual(); // For multi-run evolution
            window.setIndividual(base);

            // Initialize the population
            Population population = new Population(1000, 0.008, 0.9, 0.3);
            // population.initialize();
            population.fill(base);

            for (int i = 0; i < 1000; i++) {
                // Run the genetic algorithm
                population.progress(200);

                // Get the solution
                Individual winner = population.getFittestIndividual();
                window.setIndividual(winner);
                String[][] solution = Individual.Chromosome.apply(nodes.getNodes(), winner.getChromosome());

                try {
                    // Write the solution to a file
                    CSVParser.write(solution, SOLUTION_PATH);
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
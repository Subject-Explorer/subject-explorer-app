import data_access.CSVParser;
import genetic.Individual;
import genetic.Population;
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
    private static final String NODE_PATH = "data/solution.csv";
    private static final String CONNECTION_PATH = "data/test_connections.csv";
    private static final String SOLUTION_PATH = "data/solution.csv";

    /**
     * The main method of the application.
     * This method is called once at the start of the program.
     *
     * @param args The command line arguments
     */
    public static void main(String[] args) {
        // Initialize the processing window
        // PApplet.main(Window.class);

        String[] processingArgs = {Window.class.getName()};
        Window window = new Window();
        PApplet.runSketch(processingArgs, window);

        try {
            // Read the data from the files
            NodeGrid nodes = NodeGrid.fromFiles(NODE_PATH, CONNECTION_PATH);

            // Initialize the base individual
            Individual.initializeChromosome(nodes);
            Individual base = new Individual(); // For multi-run evolution

            // Initialize the population
            Population population = new Population(100, 0.8, 0.9, 10);
            // population.initialize();
            population.fill(base);

            // Run the genetic algorithm
            for (int i = 0; i < 1000; i++) {
                population.progress(100);
                window.setIndividual(population.getFittestIndividual());
                Thread.sleep(5000);
            }

            // Get the solution
            Individual winner = population.getFittestIndividual();
            String[][] solution = Individual.Chromosome.apply(nodes.getNodes(), winner.getChromosome());

            // Write the solution to a file
            CSVParser.write(solution, SOLUTION_PATH);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
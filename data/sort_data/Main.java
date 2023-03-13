import processing.core.PApplet;
import ui.Window;

/**
 * Main.java
 * <p>
 *     The main class of the application.
 *     This class is responsible for initializing the application.
 *     It is responsible for initializing the processing window, reading the data
 *     from the files, initializing the base individual, initializing the population,
 *     running the genetic algorithm, getting the solution, and writing the solution
 *     to a file.
 * <p>
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
public class Main {

    /**
     * The main method of the application.
     * This method is called once at the start of the program.
     *
     * @param args The command line arguments
     */
    public static void main(String[] args) {
        // Initialize the processing window
        PApplet.main(Window.class);

        // Read the data from the files
        String nodePath = "./../seq.csv";
        String connectionPath = "./../connections.csv";
        NodeGrid nodes = NodeGrid.fromFiles(nodePath, connectionPath);

        // Initialize the base individual
        Individual.initializeChromosome(nodes);
        Individual base = new Individual();

        // Initialize the population
        Population population = new Population();
        population.fill(base);

        // Run the genetic algorithm
        population.progress(1000);

        // Get the solution
        Individual winner = population.getFittestIndividual();
        String[][] solution = Individual.Chromosome.apply(nodes.getNodes(), winner.getChromosome());

        // Write the solution to a file
        try {
            CSVParser.write(solution, "./../solution.csv");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
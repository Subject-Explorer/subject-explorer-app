package genetic_algorithm;

import representation.NodeGrid;

import java.util.Random;

/**
 * genetic.IndividualView.java
 * <p>
 * The individual of the genetic algorithm.
 * This class is responsible for creating and managing the individuals of the
 * genetic algorithm.
 * It is responsible for creating a new individual, copying an existing individual,
 * and for evaluating the fitness of an individual.
 * An individual is represented by a chromosome, which is a 2D array of integers.
 * The chromosome is a representation of the connections between the nodes of the
 * graph.
 * The fitness of an individual is inversely proportional to the length of the
 * total path of the individual.
 * </p>
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
public class Individual {
    /**
     * Row count of any chromosome
     */
    private static short rows = 0;
    /**
     * Column count of any chromosome
     */
    private static short columns = 0;
    /**
     * The connections between the nodes, represented by a 2D array of integers
     * Each row represents a connection between two nodes:
     * <ul>
     *     <li>connections[i][0] represents the source node row</li>
     *     <li>connections[i][1] represents the source node column</li>
     *     <li>connections[i][2] represents the destination node row</li>
     *     <li>connections[i][3] represents the destination node column</li>
     * </ul>
     * indices of the node in the chromosome
     */
    private static short[][] connections;

    private static short[][] secondary_connections;
    /**
     * The random number generator
     */
    private static final Random random = new Random();

    /**
     * The chromosome of the individual.
     * Each row contains the column indices of the nodes in the row.
     */
    private final short[][] chromosome;
    /**
     * The fitness of the individual
     */
    float pain = Float.MAX_VALUE;

    /**
     * Creates a new individual with a random chromosome.
     */
    public Individual() {
        this.chromosome = Chromosome.base.clone();
        this.evaluate();
    }

    /**
     * Creates a new individual with the given chromosome.
     *
     * @param chromosome The chromosome of the individual
     */
    public Individual(short[][] chromosome) {
        this.chromosome = chromosome;
        this.evaluate();
    }

    /**
     * Initializes the chromosome with the given node grid.
     *
     * @param nodeGrid The node grid
     */
    public static void initializeChromosome(NodeGrid nodeGrid) {
        Chromosome.initializeWith(nodeGrid);
    }

    /**
     * Generates an individual with a random chromosome.
     *
     * @return The individual with a random chromosome
     */
    public static Individual randomized() {
        return new Individual(Chromosome.randomized());
    }

    /**
     * Generates an individual with a chromosome based on the given parents.
     *
     * @param parents The parents of the individual
     * @return The individual with a chromosome based on the given parents
     */
    public static Individual fromParents(Individual... parents) {
        return new Individual(Chromosome.combine(parents));
    }

    /**
     * Makes a copy of the individual.
     * The copy is a new individual with the same chromosome as the original.
     * The fitness of the copy is not calculated.
     *
     * @return The copy of the individual
     */
    public Individual copy() {
        short[][] chromosomeCopy = new short[rows][columns];
        for (int i = 0; i < chromosome.length; i++) {
            System.arraycopy(chromosome[i], 0, chromosomeCopy[i], 0, chromosome[0].length);
        }
        return new Individual(chromosomeCopy);
    }

    /**
     * Swaps the values of the given columns in the given row.
     *
     * @param row     The row of the columns
     * @param columnA The first column
     * @param columnB The second column
     */
    private void swap(int row, int columnA, int columnB) {
        short temp = chromosome[row][columnA];
        chromosome[row][columnA] = chromosome[row][columnB];
        chromosome[row][columnB] = temp;
    }

    /**
     * Returns the chromosome of the individual.
     *
     * @return The chromosome of the individual
     */
    public short[][] getChromosome() {
        return chromosome;
    }

    /**
     * Returns the connections of the individual.
     *
     * @return The connections of the individual
     */
    public short[][] getConnections() {
        return connections;
    }

    /**
     * Mutates the individual.
     * The individual is mutated by swapping the values of two random columns in a random row.
     *
     * @param mutations The number of mutations
     */
    public void mutate(int mutations) {
        int row, columnA, columnB;
        for (int counter = mutations; counter > 0; --counter) {
            // Randomly select a row and two columns
            row = random.nextInt(rows);
            columnA = random.nextInt(columns);
            columnB = random.nextInt(columns);

            // Swap the values of the columns
            this.swap(row, columnA, columnB);
        }
    }
    public void mutate(double mutationRate) {
        int row, columnA, columnB;
        for (int counter = (int) (mutationRate * rows * columns); counter > 0; --counter) {
            // Randomly select a row and two columns
            row = random.nextInt(rows);
            columnA = random.nextInt(columns);
            columnB = random.nextInt(columns);

            // Swap the values of the columns
            this.swap(row, columnA, columnB);
        }
    }

    /**
     * Evaluates the fitness of the individual.
     * The fitness of the individual is inversely proportional to the length of the total path of the individual.
     */
    public void evaluate() {
        // Calculate the total distance of the individual
        float totalDistance = 0;
        for (short[] connection : connections) {
            // Calculate the distance between the two nodes in 1D, and add it to the total distance
            totalDistance += Math.pow(Math.abs(chromosome[connection[0]][connection[1]] - chromosome[connection[2]][connection[3]]), 2);

            // Calculate the distance between the two nodes in 2D, and add it to the total distance
            // totalDistance += Math.pow(Math.sqrt(Math.pow(chromosome[connection[0]][connection[1]] - chromosome[connection[2]][connection[3]], 2) + Math.pow(connection[0] - connection[2], 2)), 2);
        }

        // The fitness is inversely proportional to the total distance
        this.pain = totalDistance;
    }

    /**
     * Returns the fitness of the individual.
     *
     * @return The fitness of the individual
     */
    public float getPain() {
        return this.pain;
    }

    /**
     * Helper class for the chromosome.
     */
    public static class Chromosome {
        /**
         * The base chromosome
         */
        public static short[][] base;

        /**
         * Initializes the chromosome without any swapping.
         *
         * @return The base chromosome
         */
        private static short[][] base() {
            // Create the base chromosome
            short[][] chromosome = new short[rows][columns];
            for (short row = 0; row < rows; row++) {
                for (short column = 0; column < columns; column++) {
                    // The value of each cell in a row is the column index
                    chromosome[row][column] = column;
                }
            }
            return chromosome;
        }

        /**
         * Initializes a randomized chromosome.
         *
         * @return The randomized chromosome
         */
        private static short[][] randomized() {
            // Create a copy of the base chromosome
            short[][] chromosome = new short[rows][columns];
            for (short row = 0; row < rows; row++) {
                System.arraycopy(base[row], 0, chromosome[row], 0, columns);
            }

            // Swap the values of each column in each row
            for (short row = 0; row < rows; row++) {
                for (short column = 0; column < columns; column++) {
                    int rnd = random.nextInt(chromosome[row].length);
                    short temp = chromosome[row][column];
                    chromosome[row][column] = chromosome[row][rnd];
                    chromosome[row][rnd] = temp;
                }
            }
            return chromosome;
        }

        /**
         * Combines the chromosomes of the given parents.
         *
         * @param parents The parents of the individual
         * @return The chromosome of the individual
         */
        public static short[][] combine(Individual... parents) {
            // Create a new chromosome
            short[][] chromosome = new short[rows][columns];
            boolean[][] unavailable = new boolean[rows][columns];

            // Fill the chromosome with the values of the parents
            for (short row = 0; row < rows; row++) {
                for (short column = 0; column < columns; column++) {
                    // Randomly select a parent
                    Individual parent = parents[random.nextInt(parents.length)];
                    short gene = parent.chromosome[row][column];
                    short adjustedLeft = gene;
                    short adjustedRight = gene;

                    // Find the closest available value to the gene
                    while (unavailable[row][adjustedLeft] && unavailable[row][adjustedRight]) {
                        adjustedLeft = (short) ((adjustedLeft - 1 + columns) % columns);
                        adjustedRight = (short) ((adjustedRight + 1) % columns);
                    }

                    // Add the value to the chromosome
                    if (unavailable[row][adjustedLeft]) {
                        chromosome[row][column] = adjustedRight;
                        unavailable[row][adjustedRight] = true;
                    } else {
                        chromosome[row][column] = adjustedLeft;
                        unavailable[row][adjustedLeft] = true;
                    }
                }
            }
            return chromosome;
        }

        /**
         * Initializes the dimensions and conections of chromosomes, based on the given node grid.
         *
         * @param nodeGrid The node grid to initialize the chromosomes with
         */
        public static void initializeWith(NodeGrid nodeGrid) {
            // Get the nodes and connections of the node grid
            String[][] nodes = nodeGrid.getNodes();
            String[][] connections = nodeGrid.getConnections();

            // Set the dimensions of the chromosomes
            Individual.rows = (short) nodes.length;
            Individual.columns = (short) nodes[0].length;

            // Set the base chromosome
            Chromosome.base = Chromosome.base();

            // Set the connections of the chromosomes
            Individual.connections = mapConnections(nodes, connections);
        }

        /**
         * Maps the connections of the node grid to the chromosome.
         *
         * @param nodes       The nodes of the node grid
         * @param connections The connections of the node grid
         * @return The mapped connections
         */
        private static short[][] mapConnections(String[][] nodes, String[][] connections) {
            // Map the connections to the chromosome
            short[][] mappedConnections = new short[connections.length][4];

            // Find the position of each node in the node grid
            for (int i = 0; i < connections.length; i++) {
                // Translate the nodes to positions
                short[] positionA = findPosition(connections[i][0], nodes);
                short[] positionB = findPosition(connections[i][1], nodes);

                // Add the positions to the mapped connections
                mappedConnections[i] = new short[]{positionA[0], positionA[1], positionB[0], positionB[1]};
            }
            return mappedConnections;
        }

        /**
         * Finds the position of the given node in the node grid.
         *
         * @param wanted The node to find the position of
         * @param nodes  The node grid to find the position in
         * @return The position of the node
         */
        private static short[] findPosition(String wanted, String[][] nodes) {
            // Find the position of the node in the node grid with a linear search
            for (short row = 0; row < rows; row++) {
                for (short column = 0; column < columns; column++) {
                    if (wanted.equals(nodes[row][column])) return new short[]{row, column};
                }
            }

            // Return an invalid position if the node was not found
            return new short[]{-1, -1};
        }

        /**
         * Applies the given chromosome to the given node matrix.
         * The nodes are mapped to the chromosome, based on the order of the columns.
         *
         * @param nodes      The node matrix to apply the chromosome to
         * @param chromosome The chromosome to apply to the node matrix
         * @return The node matrix rearranged according to the chromosome
         */
        public static String[][] apply(String[][] nodes, short[][] chromosome) {
            String[][] newSubjects = new String[rows][columns];
            // Iterate over the rows and columns of the chromosome
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    // Add the node to the new node matrix
                    newSubjects[row][chromosome[row][column]] = nodes[row][column];
                }
            }
            return newSubjects;
        }
    }
}
import java.util.Random;

// TODO: Add javadoc
public class Individual {
    private static int rows = 0, columns = 0;
    private static int[][] connections;
    private static final Random random = new Random();

    private final int[][] chromosome;
    double fitness = -1;

    public Individual() {
        this.chromosome = Chromosome.base.clone();
    }

    public Individual(int[][] chromosome) {
        this.chromosome = chromosome;
        this.evaluate();
    }

    public static void initializeChromosome(NodeGrid nodeGrid) {
        Chromosome.initializeWith(nodeGrid);
    }

    public static Individual randomized() {
        return new Individual(Chromosome.randomized());
    }

    public static Individual fromParents(Individual... parents) {
        return new Individual(Chromosome.combine(parents));
    }

    public Individual copy() {
        int[][] chromosomeCopy = new int[rows][columns];
        for (int i = 0; i < chromosome.length; i++) {
            System.arraycopy(chromosome[i], 0, chromosomeCopy[i], 0, chromosome[0].length);
        }
        return new Individual(chromosomeCopy);
    }

    private void swap(int row, int columnA, int columnB) {
        int temp = chromosome[row][columnA];
        chromosome[row][columnA] = chromosome[row][columnB];
        chromosome[row][columnB] = temp;
    }

    public int[][] getChromosome() {
        return chromosome;
    }

    public void mutate(int mutations) {
        int row, columnA, columnB;
        for (int counter = mutations; counter > 0; --counter) {
            row = random.nextInt(rows);
            columnA = random.nextInt(columns);
            columnB = random.nextInt(columns);
            this.swap(row, columnA, columnB);
        }
    }

    public void evaluate() {
        double totalDistance = 0;
        for (int[] connection : connections) {
            totalDistance += Math.abs(chromosome[connection[0]][connection[1]] - chromosome[connection[2]][connection[3]]);
        }
        this.fitness = 1 / totalDistance;
    }

    public double getFitness() {
        return this.fitness;
    }

    public static class Chromosome {
        public static final int[][] base = base();

        private static int[][] base() {
            int[][] chromosome = new int[rows][columns];
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    chromosome[row][column] = column;
                }
            }
            return chromosome;
        }

        private static int[][] randomized() {
            int[][] chromosome = new int[rows][columns];
            for (int row = 0; row < rows; row++) {
                System.arraycopy(base[row], 0, chromosome[row], 0, columns);
            }
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    int rnd = random.nextInt(chromosome[row].length);
                    int temp = chromosome[row][column];
                    chromosome[row][column] = chromosome[row][rnd];
                    chromosome[row][rnd] = temp;
                }
            }
            return chromosome;
        }

        public static int[][] combine(Individual... parents) {
            int[][] chromosome = new int[rows][columns];
            boolean[][] unavailable = new boolean[rows][columns];

            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    Individual parent = parents[random.nextInt(parents.length)];
                    int gene = parent.chromosome[row][column];
                    int adjustedLeft = gene;
                    int adjustedRight = gene;

                    while (unavailable[row][adjustedLeft] && unavailable[row][adjustedRight]) {
                        adjustedLeft = (adjustedLeft - 1 + columns) % columns;
                        adjustedRight = (adjustedRight + 1) % columns;
                    }

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

        public static void initializeWith(NodeGrid nodeGrid) {
            String[][] nodes = nodeGrid.getNodes();
            String[][] connections = nodeGrid.getConnections();

            Individual.rows = nodes.length;
            Individual.columns = nodes[0].length;
            Individual.connections = mapConnections(nodes, connections);
        }

        private static int[][] mapConnections(String[][] nodes, String[][] connections) {
            int[][] mappedConnections = new int[connections.length][4];
            for (int i = 0; i < connections.length; i++) {
                int[] positionA = findPosition(connections[i][0], nodes);
                int[] positionB = findPosition(connections[i][1], nodes);
                mappedConnections[i] = new int[]{positionA[0], positionA[1], positionB[0], positionB[1]};
            }
            return mappedConnections;
        }

        private static int[] findPosition(String wanted, String[][] nodes) {
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    if (nodes[row][column].equals(wanted)) return new int[]{row, column};
                }
            }
            return new int[]{-1, -1};
        }

        public static String[][] apply(String[][] nodes, int[][] chromosome) {
            String[][] newSubjects = new String[rows][columns];
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    newSubjects[row][chromosome[row][column]] = nodes[row][column];
                }
            }
            return newSubjects;
        }
    }
}
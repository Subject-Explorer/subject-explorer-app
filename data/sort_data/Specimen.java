import java.util.LinkedList;
import java.util.Random;

public class Specimen {
    static int rows;
    static int columns;
    private static int[][] connections;

    private final int[][] chromosome;
    double fitness = -1;

    public Specimen(int[][] chromosome) {
        this.chromosome = chromosome;
    }

    public static Specimen fromNodes(NodeGrid nodeGrid) {
        NodeParser.initializeWith(nodeGrid);
        return new Specimen(NodeParser.getChromosome());
    }

    public Specimen copy() {
        int[][] chromosomeCopy = new int[rows][columns];
        for (int i = 0; i < chromosome.length; i++) {
            System.arraycopy(chromosome[i], 0, chromosomeCopy[i], 0, chromosome[0].length);
        }
        return new Specimen(chromosomeCopy);
    }

    private void swap(int row, int columnA, int columnB) {
        int temp = chromosome[row][columnA];
        chromosome[row][columnA] = chromosome[row][columnB];
        chromosome[row][columnB] = temp;
    }

    public int[][] getChromosome() {
        return chromosome;
    }

    public int[][] getConnections() {
        return connections;
    }

    public void shuffle(int changes) {
        Random random = new Random();
        for (int row = 0; row < chromosome.length; row++) {
            for (int column = 0; column < chromosome[row].length; column++) {
                int rnd = random.nextInt(chromosome[row].length);
                swap(row, column, rnd);
            }
        }
    }

    public void evaluate() {
        double totalDistance = 0;
        for (int[] connection : connections) {
            // INFO:
            // connections[n][0] <- source row
            // connections[n][1] <- source column
            // connections[n][2] <- target row
            // connections[n][3] <- target column
            // add distance between source and target node to total distance
            totalDistance += Math.abs(
                    chromosome[connection[0]][connection[1]] -
                            chromosome[connection[2]][connection[3]]
            );
        }
        this.fitness = 1 / totalDistance;
    }

    public double getFitness() {
        return this.fitness;
    }

    public static class NodeParser {
        public static void initializeWith(NodeGrid nodeGrid) {
            Subject[][] subjects = nodeGrid.getNodes();

            Specimen.rows = subjects.length;
            Specimen.columns = subjects[0].length;
            Specimen.connections = connectionsFromSubjects(subjects);

            Specimen.this.chromosome = getChromosome();
        }

        private static int[][] connectionsFromSubjects(Subject[][] subjects) {
            LinkedList<int[]> connections = new LinkedList<>();
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    if (subjects[row][column] == null) continue;
                    for (String id : subjects[row][column].getChildren()) {
                        int[] position = findPositionByID(subjects, id);
                        connections.add(new int[]{
                                row,
                                column,
                                position[0],
                                position[1]
                        });
                    }
                }
            }
            return connections.toArray(new int[0][0]);
        }

        private static int[] findPositionByID(Subject[][] subjects, String id) {
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    if (subjects[row][column].getId().equals(id)) return new int[]{row, column};
                }
            }
            return new int[]{-1, -1};
        }

        private static int[][] getChromosome() {
            int[][] chromosome = new int[rows][columns];
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    chromosome[row][column] = column;
                }
            }
            return chromosome;
        }

        public static Subject[][] applyChromosome(Subject[][] subjects, int[][] chromosome) {
            Subject[][] newSubjects = new Subject[rows][columns];
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    newSubjects[row][chromosome[row][column]] = subjects[row][column];
                }
            }
            return newSubjects;
        }
    }
}
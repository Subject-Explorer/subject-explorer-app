import java.util.Arrays;
import java.util.HashMap;
import java.util.Random;

public class Chromosome {
    private final HashMap<Integer, int[]> connections;
    private final int[][] permutation;
    int fitness = -1;

    public Chromosome(HashMap<Integer, int[]> connections, int[][] permutation) {
        this.connections = connections;
        this.permutation = permutation;
    }

    public static Chromosome fromNodes(NodeGrid nodeGrid) {
        NodeParser nodeParser = new NodeParser(nodeGrid);

        HashMap<Integer, int[]> connections = nodeParser.getSimpleConnections();
        int[][] permutation = nodeParser.getSimpleGrid();

        return new Chromosome(connections, permutation);
    }

    public Chromosome copy() {
        HashMap<Integer, int[]> connectionsCopy = new HashMap<>();
        for (int node : connections.keySet()) {
            connectionsCopy.put(node, connections.get(node).clone());
        }
        int[][] permutationCopy = new int[permutation.length][];
        for (int i = 0; i < permutation.length; i++) {
            permutationCopy[i] = permutation[i].clone();
        }
        return new Chromosome(connectionsCopy, permutationCopy);
    }

    private void swap(int row, int columnA, int columnB) {
        int temp = permutation[row][columnA];
        permutation[row][columnA] = permutation[row][columnB];
        permutation[row][columnB] = temp;
    }

    public int[][] getPermutation() {
        return permutation;
    }

    public HashMap<Integer, int[]> getConnections() {
        return connections;
    }

    public void shuffle() {
        Random random = new Random();
        for (int row = 0; row < permutation.length; row++) {
            for (int column = 0; column < permutation[row].length; column++) {
                int rnd = random.nextInt(permutation[row].length);
                swap(row, column, rnd);
            }
        }
    }

    public double getFitness() {
        if (fitness != -1) {
            return fitness;
        }
        double totalDistance = 0;
        for (int node : connections.keySet()) {
            int[] nodeConnections = connections.get(node);
            for (int connection : nodeConnections) {
                totalDistance += flatDistance(node, connection);
            }
        }
        return 1 / totalDistance;
    }

    public double flatDistance(int i, int j) {
        int nodeAColumn = findNode(i)[1];
        int nodeBColumn = findNode(j)[1];
        if (nodeAColumn == -1 || nodeBColumn == -1) {
            return 0;
        }
        return Math.abs(nodeAColumn - nodeBColumn);
    }

    private int[] findNode(int node) {
        for (int i = 0; i < permutation.length; i++) {
            for (int j = 0; j < permutation[i].length; j++) {
                if (permutation[i][j] == node) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[] { -1, -1 };
    }

    public static class NodeParser {
        private final String[] mappings;

        private final HashMap<Integer, int[]> simpleConnections;
        public  HashMap<Integer, int[]> getSimpleConnections() {
            return this.simpleConnections;
        }

        private final int[][] simpleGrid;
        public  int[][] getSimpleGrid() {
            return this.simpleGrid;
        }

        private final HashMap<String, String[]> nodeConnections;
        public  HashMap<String, String[]> getNodeConnections() {
            return this.nodeConnections;
        }

        private final String[][] nodeGrid;
        public  String[][] getNodeGrid() {
            return this.nodeGrid;
        }

        public NodeParser(NodeGrid nodeGrid) {
            this.nodeConnections = nodeGrid.getConnections();
            this.nodeGrid = nodeGrid.getNodes();

            this.mappings = getMappings(nodeGrid);

            this.simpleConnections = mapConnections(nodeGrid);
            this.simpleGrid = mapGrid(nodeGrid);
        }

        public static String[] getMappings(NodeGrid nodeGrid) {
            String[][] nodes = nodeGrid.getNodes();
            int width = nodes.length;
            int height = nodes[0].length;

            String[] nodeMappings = new String[width * height];
            int index = 0;
            for (String[] node : nodes) {
                for (int j = 0; j < height; j++) {
                    if (node[j] == null)
                        continue;

                    nodeMappings[index] = node[j];
                    index++;
                }
            }
            return Arrays.copyOf(nodeMappings, index);
        }

        private HashMap<Integer, int[]> mapConnections(NodeGrid nodeGrid) {
            HashMap<Integer, int[]> connections = new HashMap<>();
            HashMap<String, String[]> nodeConnections = nodeGrid.getConnections();

            for (String node : nodeConnections.keySet()) {
                int nodeIndex = Arrays.asList(mappings).indexOf(node);
                String[] nodeConnectionStrings = nodeConnections.get(node);
                int[] nodeConnectionInts = new int[nodeConnectionStrings.length];
                for (int i = 0; i < nodeConnectionStrings.length; i++) {
                    nodeConnectionInts[i] = Arrays.asList(mappings).indexOf(nodeConnectionStrings[i]);
                }
                connections.put(nodeIndex, nodeConnectionInts);
            }
            return connections;
        }
        private HashMap<String, String[]> mapConnections(Chromosome chromosome) {
            HashMap<String, String[]> nodeConnections = new HashMap<>();
            HashMap<Integer, int[]> connections = chromosome.connections;

            for (int node : connections.keySet()) {
                String nodeString = mappings[node];
                int[] nodeConnectionInts = connections.get(node);
                String[] nodeConnectionStrings = new String[nodeConnectionInts.length];
                for (int i = 0; i < nodeConnectionInts.length; i++) {
                    nodeConnectionStrings[i] = mappings[nodeConnectionInts[i]];
                }
                nodeConnections.put(nodeString, nodeConnectionStrings);
            }
            return nodeConnections;
        }

        public int[][] mapGrid(NodeGrid nodeGrid) {
            String[][] nodes = nodeGrid.getNodes();
            int width = nodes.length;
            int height = nodes[0].length;
            int[][] permutation = new int[width][height];
            for (int i = 0; i < width; i++) {
                for (int j = 0; j < height; j++) {
                    if (nodes[i][j] == null) {
                        permutation[i][j] = -1;
                    } else {
                        permutation[i][j] = Arrays.asList(mappings).indexOf(nodes[i][j]);
                    }
                }
            }
            return permutation;
        }
        public String[][] mapGrid(Chromosome chromosome) {
            int[][] permutation = chromosome.getPermutation();
            String[][] nodes = new String[permutation.length][permutation[0].length];
            for (int i = 0; i < permutation.length; i++) {
                for (int j = 0; j < permutation[i].length; j++) {
                    if (permutation[i][j] == -1) {
                        nodes[i][j] = null;
                    } else {
                        nodes[i][j] = mappings[permutation[i][j]];
                    }
                }
            }
            return nodes;
        }
    }
}
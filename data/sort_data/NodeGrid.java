import java.io.FileNotFoundException;

/**
 * NodeGrid.java
 * <p>
 * This class is used to store the data from the node and connection files.
 * It is used to create a grid of nodes and connections.
 * </p>
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
class NodeGrid {
    /**
     * The nodes matrix
     */
    String[][] nodes;
    /**
     * The connections matrix
     */
    String[][] connections;

    /**
     * The constructor of the NodeGrid class.
     * This method is called once at the start of the program.
     *
     * @param nodes       The nodes matrix
     * @param connections The connections matrix
     */
    NodeGrid(String[][] nodes, String[][] connections) {
        this.nodes = nodes;
        this.connections = connections;
    }

    /**
     * The static method for creating a NodeGrid instance from the node and connection files.
     * This method is called once at the start of the program.
     *
     * @param nodePath       The path of the node file
     * @param connectionPath The path of the connection file
     * @return The NodeGrid instance
     */
    public static NodeGrid fromFiles(String nodePath, String connectionPath) throws FileNotFoundException {
        // Parse the data from the files
        String[][] nodeData = CSVParser.parse(nodePath);
        String[][] connectionData = CSVParser.parse(connectionPath);

        // Create and return a new NodeGrid instance
        return new NodeGrid(nodeData, connectionData);
    }

    /**
     * The getter for the nodes array.
     *
     * @return The nodes array
     */
    public String[][] getNodes() {
        return nodes;
    }

    /**
     * The getter for the connections array.
     *
     * @return The connections array
     */
    public String[][] getConnections() {
        return connections;
    }
}
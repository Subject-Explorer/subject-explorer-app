package representation;

import data_access.CSVParser;

import java.io.FileNotFoundException;

/**
 * representation.NodeGrid.java
 * <p>
 * This class is used to store the data from the node and connection files.
 * It is used to create a grid of nodes and connections.
 * </p>
 * <ul>
 *     <li>{@link #nodes} The nodes matrix</li>
 *     <li>{@link #connections} The connections matrix</li>
 * </ul>
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
public class NodeGrid {
    /**
     * The nodes matrix
     */
    String[][] nodes;
    /**
     * The connections matrix
     */
    String[][] connections;

    /**
     * The constructor of the representation.NodeGrid class.
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
     * The static method for creating a representation.NodeGrid instance from the node and connection files.
     * This method is called once at the start of the program.
     *
     * @param nodePath       The path of the node file
     * @param connectionPath The path of the connection file
     * @return The representation.NodeGrid instance
     */
    public static NodeGrid fromFiles(String nodePath, String connectionPath) throws FileNotFoundException {
        // Parse the data from the files
        String[][] nodeData = CSVParser.parse(nodePath);
        String[][] connectionData = CSVParser.parse(connectionPath);

        // Create and return a new representation.NodeGrid instance
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
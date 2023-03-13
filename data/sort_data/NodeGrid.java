// TODO: Add javadoc
class NodeGrid{
    String[][] nodes;
    String[][] connections;

    NodeGrid(String[][] nodes, String[][] connections){
        this.nodes = nodes;
        this.connections = connections;
    }

    public static NodeGrid fromFiles(String nodePath, String connectionPath){
        String[][] nodeData = CSVParser.parse(nodePath);
        String[][] connectionData = CSVParser.parse(connectionPath);

        return new NodeGrid(nodeData, connectionData);
    }

    public String[][] getNodes(){
        return nodes;
    }

    public String[][] getConnections(){
        return connections;
    }
}
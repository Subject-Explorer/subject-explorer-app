import java.util.HashMap;

class NodeGrid{
    String[][] nodes;
    HashMap<String, String[]> connections;
    int[] lastInRow;

    NodeGrid(int width, int height){
        nodes = new String[width][height];
        lastInRow = new int[width];
        for(int i = 0; i < width; i++){
            lastInRow[i] = 0;
        }
        connections = new HashMap<>();
    }

    public static NodeGrid fromFile(String path){
        JSONParser parser = new JSONParser(path);
        String[][] nodes = parser.getNodes();
        HashMap<String, String[]> connections = parser.getConnections();

        NodeGrid grid = new NodeGrid(nodes.length, nodes[0].length);
        grid.nodes = nodes;
        grid.connections = connections;
        return grid;
    }

    public NodeGrid addNodeToRow(int row, String node){
        nodes[row][lastInRow[row]] = node;
        lastInRow[row]++;
        return this;
    }

    public NodeGrid setNode(int x, int y, String node){
        nodes[x][y] = node;
        return this;
    }

    public NodeGrid setConnection(String node, String[] connections){
        this.connections.put(node, connections);
        return this;
    }

    public int getWidth(){
        return nodes.length;
    }

    public int getHeight(){
        return nodes[0].length;
    }

    public String getNode(int x, int y){
        return nodes[x][y];
    }

    public String[] getRow(int row){
        return nodes[row];
    }

    public String[] getColumn(int column){
        String[] columnNodes = new String[nodes.length];
        for(int i = 0; i < nodes.length; i++){
            columnNodes[i] = nodes[i][column];
        }
        return columnNodes;
    }

    public String[][] getNodes(){
        return nodes;
    }

    public HashMap<String, String[]> getConnections(){
        return connections;
    }
}
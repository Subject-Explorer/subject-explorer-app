import java.util.HashMap;

class NodeGrid{
    Subject[][] nodes;
    HashMap<Subject, Subject[]> connections;
    int[] lastInRow;

    NodeGrid(int width, int height){
        nodes = new Subject[width][height];
        lastInRow = new int[width];
        for(int i = 0; i < width; i++){
            lastInRow[i] = 0;
        }
        connections = new HashMap<>();
    }

    public static NodeGrid fromFile(String path){
        NodeGridJSONParser parser = new NodeGridJSONParser(path);
        Subject[][] nodes = parser.getNodes();
        HashMap<String, String[]> connections = parser.getConnections();

        NodeGrid grid = new NodeGrid(nodes.length, nodes[0].length);
        grid.nodes = nodes;
        grid.connections = connections;
        return grid;
    }

    public Subject[][] getNodes(){
        return nodes;
    }

    public HashMap<Subject, Subject[]> getConnections(){
        return connections;
    }
}
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
        HashMap<Subject, Subject[]> connections = parser.getConnections();

        // TODO: Refactor types
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

    public int[][] childrenPositions(Subject subject){
        String[] children = subject.getChildren();
        int[][] positions = new int[children.length][2];
        for(int i = 0; i < children.length; i++){
            positions[i] = positionOf(children[i]);
        }
        return positions;
    }

    public int[] positionOf(String id){
        for(int row = 0; row < nodes.length; row++){
            for(int column = 0; column < nodes[row].length; column++){
                if(nodes[row][column] != null && nodes[row][column].getId().equals(id)){
                    return new int[]{row, column};
                }
            }
        }
        return null;
    }
}
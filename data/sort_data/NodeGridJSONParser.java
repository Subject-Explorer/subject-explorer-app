import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.ParseException;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

class NodeGridJSONParser {
    private final String path;

    private Subject[][] nodes;
    public Subject[][] getNodes(){
        return nodes;
    }

    private HashMap<Subject, Subject[]> connections;
    public HashMap<Subject, Subject[]> getConnections(){
        return connections;
    }

    NodeGridJSONParser(String path) {
        this.path = path;
    }

    private void readData() throws IOException, ParseException{
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            File file = new File(this.path);
            Subject[][] data = objectMapper.readValue(file, Subject[][].class);
            // use the data variable as needed
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
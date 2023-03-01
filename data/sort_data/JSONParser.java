import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;

class JSONParser {
   private final Scanner scanner;

   private String[][] nodes;
   public String[][] getNodes(){
      return nodes;
   }

   private HashMap<String, String[]> connections;
   public HashMap<String, String[]> getConnections(){
      return connections;
   }

   JSONParser(String path){
      this.scanner = new Scanner(path);
      this.scanner.useDelimiter("\\s*:\\s*|\\s*,\\s*|\\s*\\[\\s*|\\s*\\s*|\\s*\\{\\s*|\\s*\"\\s*");
      this.readData();
      this.scanner.close();
   }

   private void readData(){
      this.nodes = readArrayArray();
   }

   private String[][] readArrayArray(){
      scanner.skip("\\[");
      LinkedList<String[]> arrays = new LinkedList<>();
      while(scanner.hasNext()){
         String[] nextArray = readNextArray();
         arrays.add(nextArray);
      }
      scanner.skip("]");
      scanner.skip(",");

      return arrays.toArray(new String[0][0]);
   }

   private String[] readNextArray(){
      scanner.skip("\\[");
      LinkedList<String> nodes = new LinkedList<>();
      while(scanner.hasNext()){
         String nextNode = readNextNode();
         if(nextNode == null) break;
         nodes.add(nextNode);
      }
      scanner.skip("]");
      scanner.skip(",");

      return nodes.toArray(new String[0]);
   }

   private String readNextNode(){
      scanner.skip("\\{");
      // Read the id
      scanner.skip("\"id\":");
      String id = scanner.next();
      // Read the children
      scanner.skip("\"children\":");
      scanner.skip("\\[");
      String[] children = new String[0];
      while (scanner.hasNext()) {
         String child = scanner.next();
         if (child.equals("]")) {
            break;
         }
         children = Arrays.copyOf(children, children.length + 1);
         children[children.length - 1] = child;
      }
      scanner.skip("}");
      scanner.skip(",");

      return id;
   }
}
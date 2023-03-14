package data_access;

import java.io.*;
import java.util.LinkedList;
import java.util.Scanner;

/**
 * Utility class for reading and writing CSV files.
 *
 * @author Boér Bence
 * @version 2023-03-13
 */
public class CSVParser {
    /**
     * Writes the given data to the given path.
     *
     * @param data The data to write
     * @param path The path to write the data to
     * @throws IOException If an I/O error occurs while writing the data
     */
    public static void write(String[][] data, String path) throws IOException {
        // Open the file
        BufferedWriter writer = new BufferedWriter(new FileWriter(path));
        // Format the data so that the null values are replaced with empty strings
        String[][] formattedData = nullsToEmpty(data);

        // Write the data to the file
        for (String[] row : formattedData) {
            writer.write(String.join(";", row));
            writer.newLine();
        }
        writer.close();
    }

    /**
     * Parses the given CSV file.
     *
     * @param path The path to the CSV file
     * @return The parsed data
     */
    public static String[][] parse(String path) throws FileNotFoundException {
        // Read the lines
        Scanner scanner = new Scanner(new File(path));
        LinkedList<String[]> lines = new LinkedList<>();

        // Parse the lines
        while (scanner.hasNextLine()) {
            lines.add(scanner.nextLine().split(";"));
        }
        scanner.close();

        // Format the lines
        return emptyToNull(padded(lines));
    }

    /**
     * Formats the given lines, so that the data is in a rectangular shape,
     * by padding the shorter lines with null values.
     *
     * @param lines The lines to format
     * @return The padded lines
     */
    private static String[][] padded(LinkedList<String[]> lines) {
        // Find the longest line
        int maxLineLength = 0;
        for (String[] line : lines) {
            if (line.length > maxLineLength) {
                maxLineLength = line.length;
            }
        }

        // Pad the shorter lines with nulls
        String[][] formattedLines = new String[lines.size()][maxLineLength];
        for (int i = 0; i < lines.size(); i++) {
            formattedLines[i] = new String[maxLineLength];
            System.arraycopy(lines.get(i), 0, formattedLines[i], 0, lines.get(i).length);
        }
        return formattedLines;
    }

    /**
     * Creates a new array with the same dimensions as the given array,
     * but with all the null values replaced with empty strings.
     *
     * @param data The data to replace the null values in
     * @return The data with the null values replaced
     */
    private static String[][] nullsToEmpty(String[][] data) {
        // Create a new array with the same dimensions as the given array
        String[][] newData = new String[data.length][data[0].length];

        // Replace the null values with empty strings in the new array
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length; j++) {
                if (data[i][j] == null) {
                    newData[i][j] = "";
                } else {
                    newData[i][j] = data[i][j];
                }
            }
        }

        // Return the new, formatted array
        return newData;
    }

    /**
     * Creates a new array with the same dimensions as the given array,
     * but with all the empty strings replaced with null values.
     *
     * @param data The data to replace the empty strings in
     * @return The data with the empty strings replaced
     */
    private static String[][] emptyToNull(String[][] data) {
        // Create a new array with the same dimensions as the given array
        String[][] newData = new String[data.length][data[0].length];

        // Replace the empty strings with null values in the new array
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length; j++) {
                if (data[i][j] == null || data[i][j].equals("")) {
                    newData[i][j] = null;
                } else {
                    newData[i][j] = data[i][j];
                }
            }
        }

        // Return the new, formatted array
        return newData;
    }
}
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        int populationSize = 100;
        int parentSize = 10;

        NodeGrid base = NodeGrid.fromFile("./../../data.json");
        Chromosome[] population = new Chromosome[populationSize];
        for (int i = 0; i < populationSize; i++) {
            population[i] = Chromosome.fromNodes(base);
        }

        Chromosome[] parents = new Chromosome[parentSize];
        for (int i = 0; i < parentSize; i++) {
            parents[i] = tournamentSelection(population);
        }

        Chromosome[] offspring = new Chromosome[parentSize];
        for (int i = 0; i < parentSize; i += 2) {
            offspring[i] = orderCrossover(parents[i], parents[i + 1]);
            offspring[i + 1] = orderCrossover(parents[i + 1], parents[i]);
        }
    }
}
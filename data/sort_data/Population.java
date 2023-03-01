import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

public class Population {
    private final Chromosome[] population;
    private final int size;

    public Population(int size) {
        this.size = size;
        this.population = new Chromosome[size];
    }

    public void initialize(NodeGrid base) {
        Chromosome baseChromosome = Chromosome.fromNodes(base);
        this.fill(baseChromosome);
        this.mutate(0.3);
    }

    public void fill(Chromosome base) {
        for (int i = 0; i < size; i++) {
            population[i] = base.copy();
        }
    }

    public void mutate(double mutationRate) {
        Random random = new Random();
        for (Chromosome chromosome : population) {
            if (random.nextDouble() < mutationRate) {
                chromosome.shuffle();
            }
        }
    }

    public void elitism(int offspringSize) {
        Arrays.sort(population, Comparator.comparingDouble(Chromosome::getFitness));
        for (int i = 0; i < offspringSize; i++) {
            population[size - i - 1] = offspring[i];
        }
    }

    public Chromosome[] getPopulation() {
        return population;
    }

    public Chromosome getChromosome(int index) {
        return population[index];
    }

    public void setChromosome(int index, Chromosome chromosome) {
        population[index] = chromosome;
    }

    public int getSize() {
        return size;
    }

    public Chromosome[] getParents(int parentSize) {
        Chromosome[] parents = new Chromosome[parentSize];
        for (int i = 0; i < parentSize; i++) {
            parents[i] = tournamentSelection();
        }
        return parents;
    }

    private Chromosome tournamentSelection() {
        int indexA = (int) (Math.random() * size);
        int indexB = (int) (Math.random() * size);
        Chromosome chromosomeA = population[indexA];
        Chromosome chromosomeB = population[indexB];
        return chromosomeA.getFitness() < chromosomeB.getFitness() ? chromosomeA : chromosomeB;
    }

    public Chromosome[] getOffspring(Chromosome[] parents) {
        Chromosome[] offspring = new Chromosome[parents.length];
        for (int i = 0; i < parents.length; i += 2) {
            offspring[i] = orderCrossover(parents[i], parents[i + 1]);
            offspring[i + 1] = orderCrossover(parents[i + 1], parents[i]);
        }
        return offspring;
    }

    private Chromosome orderCrossover(Chromosome parentA, Chromosome parentB) {
        int[][] permutationA = parentA.getPermutation();
        int[][] permutationB = parentB.getPermutation();
        int[][] offspringPermutation = new int[permutationA.length][permutationA[0].length];
        int row = (int) (Math.random() * permutationA.length);
        int columnA = (int) (Math.random() * permutationA[row].length);
        int columnB = (int) (Math.random() * permutationA[row].length);
        int start = Math.min(columnA, columnB);
        int end = Math.max(columnA, columnB);
        System.arraycopy(permutationA[row], start, offspringPermutation[row], start, end - start);

        int[] remaining = new int[permutationA[row].length - (end - start)];
        int remainingIndex = 0;
        for (int i = 0; i < permutationA[row].length; i++) {
            if (i < start || i >= end) {
                remaining[remainingIndex] = permutationA[row][i];
                remainingIndex++;
            }
        }
        int remainingIndexB = 0;
        for (int i = 0; i < permutationB[row].length; i++) {
            if (remainingIndexB >= remaining.length) {
                break;
            }
            int value = permutationB[row][i];
            boolean found = false;
            for (int k : remaining) {
                if (k == value) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                offspringPermutation[row][remainingIndexB] = value;
                remainingIndexB++;
            }
        }
        return new Chromosome(parentA.getConnections(), offspringPermutation);
    }
}

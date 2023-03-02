import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

public class Population {
    private Chromosome[] population;
    private final int populationSize;
    private final double mutationRate;
    private final double crossoverRate;
    private final int elitismCount;
    private final int maxGeneration;

    public Population(int populationSize, double mutationRate, double crossoverRate, int elitismCount,
            int maxGeneration) {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.elitismCount = elitismCount;
        this.maxGeneration = maxGeneration;
        this.population = new Chromosome[populationSize];
    }

    public Chromosome solve() {
        // Step 1: Evaluate the fitness of each individual
        evaluatePopulation(population);

        // Step 2: Repeat the evolution process until the termination criterion is met
        int generation = 0;
        while (generation < maxGeneration) {
            this.evolve();

            generation++;
        }

        // Step 3: Return the fittest individual as the solution
        return getFittestIndividual(population);
    }

    private void evaluatePopulation(Chromosome[] population) {
        for (Chromosome chromosome : population) {
            chromosome.evaluate();
        }

        Arrays.sort(population, Comparator.comparingDouble(Chromosome::getFitness));
    }

    private Chromosome[] selectParents(Chromosome[] population) {
        // select parents using tournament selection
        Chromosome[] parents = new Chromosome[population.length];
        for (int i = 0; i < population.length; i++) {
            parents[i] = tournamentSelection(population);
        }
        return parents;
    }

    public void initializeWith(NodeGrid base) {
        Chromosome baseChromosome = Chromosome.fromNodes(base);
        this.fill(baseChromosome);
        this.mutateOffspring(population);
    }

    public Chromosome getFittestIndividual(Chromosome[] population) {
        return population[0];
    }

    public void evolve() {
        // Step 3.1: Select the parents for crossover
        Chromosome[] parents = selectParents(population);

        // Step 3.2: Perform crossover to generate offspring
        Chromosome[] offspring = performCrossover(parents);

        // Step 3.3: Mutate the offspring
        mutateOffspring(offspring);

        // Step 3.4: Evaluate the fitness of the offspring
        evaluatePopulation(offspring);

        // Step 3.5: Select the individuals for the next generation
        population = selectPopulation(population, offspring);

        // Step 3.6: Evaluate the fitness of the new population
        evaluatePopulation(population);
    }

    public void fill(Chromosome base) {
        for (int i = 0; i < populationSize; i++) {
            population[i] = base.copy();
        }
    }

    public void mutateOffspring(Chromosome[] offspring) {
        Random random = new Random();
        for (Chromosome chromosome : offspring) {
            if (random.nextDouble() < mutationRate) {
                chromosome.shuffle();
            }
        }
    }

    public Chromosome[] selectPopulation(Chromosome[] population, Chromosome[] offspring) {
        Chromosome[] newPopulation = new Chromosome[populationSize];
        Arrays.sort(population, Comparator.comparingDouble(Chromosome::getFitness));
        Arrays.sort(offspring, Comparator.comparingDouble(Chromosome::getFitness));
        for (int i = 0; i < elitismCount; i++) {
            newPopulation[i] = population[i];
        }
        for (int i = elitismCount; i < populationSize; i++) {
            newPopulation[i] = offspring[i - elitismCount];
        }
        return newPopulation;
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

    public int getPopulationSize() {
        return populationSize;
    }

    private Chromosome tournamentSelection(Chromosome[] population) {
        int indexA = (int) (Math.random() * populationSize);
        int indexB = (int) (Math.random() * populationSize);
        Chromosome chromosomeA = population[indexA];
        Chromosome chromosomeB = population[indexB];
        return chromosomeA.getFitness() < chromosomeB.getFitness() ? chromosomeA : chromosomeB;
    }

    public Chromosome[] performCrossover(Chromosome[] parents) {
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

    public static class Initializer {
        private int populationSize;
        private double mutationRate;
        private double crossoverRate;
        private int elitismCount;
        private int maxGeneration;

        public Initializer() {
            this.populationSize = 100;
            this.mutationRate = 0.01;
            this.crossoverRate = 0.95;
            this.elitismCount = 10;
            this.maxGeneration = 100;
        }

        public Initializer withPopulationSize(int populationSize) {
            this.populationSize = populationSize;
            return this;
        }

        public Initializer withMutationRate(double mutationRate) {
            this.mutationRate = mutationRate;
            return this;
        }

        public Initializer withCrossoverRate(double crossoverRate) {
            this.crossoverRate = crossoverRate;
            return this;
        }

        public Initializer withElitismCount(int elitismCount) {
            this.elitismCount = elitismCount;
            return this;
        }

        public Initializer withMaxGeneration(int maxGeneration) {
            this.maxGeneration = maxGeneration;
            return this;
        }

        public Population initialize() {
            return new Population(populationSize, mutationRate, crossoverRate, elitismCount, maxGeneration);
        }
    }
}

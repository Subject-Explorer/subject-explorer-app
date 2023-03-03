import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

public class Population {
    private Specimen[] population;
    private final int populationSize;
    private final double mutationRate;
    private final double crossoverRate;
    private final int eliteSize;

    public Population(int populationSize, double mutationRate, double crossoverRate, int eliteSize) {
        this.population = new Specimen[populationSize];
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.eliteSize = eliteSize;
    }

    public void initializeWith(Specimen base) {
        this.fill(base);
        this.mutateOffspring(population);
        this.evaluatePopulation(population);
    }

    public void progress(int generations) {
        for (int generation = 0; generation < generations; generation++) {
            this.evolve();
            this.evaluatePopulation(population);
        }
    }

    private void evolve() {
        Specimen[] parents = selectParents(population);
        Specimen[] offspring = performCrossover(parents);
        mutateOffspring(offspring);
        evaluatePopulation(offspring);
        population = selectPopulation(population, offspring);
    }

    private void evaluatePopulation(Specimen[] population) {
        for (Specimen specimen : population) {
            specimen.evaluate();
        }

        Arrays.sort(population, Comparator.comparingDouble(Specimen::getFitness));
    }

    private Specimen[] selectParents(Specimen[] population) {
        // select parents using tournament selection
        Specimen[] parents = new Specimen[population.length];
        for (int i = 0; i < population.length; i++) {
            parents[i] = tournamentSelection(population);
        }
        return parents;
    }

    public Specimen getFittestIndividual() {
        return population[0];
    }

    public void fill(Specimen base) {
        for (int i = 0; i < populationSize; i++) {
            population[i] = base.copy();
        }
    }

    public void mutateOffspring(Specimen[] offspring) {
        Random random = new Random();
        for (Specimen specimen : offspring) {
            if (random.nextDouble() < mutationRate) {
                specimen.shuffle();
            }
        }
    }

    public Specimen[] selectPopulation(Specimen[] population, Specimen[] offspring) {
        Specimen[] newPopulation = new Specimen[populationSize];
        Arrays.sort(population, Comparator.comparingDouble(Specimen::getFitness));
        Arrays.sort(offspring, Comparator.comparingDouble(Specimen::getFitness));
        if (eliteSize >= 0) System.arraycopy(population, 0, newPopulation, 0, eliteSize);
        if (populationSize - eliteSize >= 0)
            System.arraycopy(offspring, 0, newPopulation, eliteSize, populationSize - eliteSize);
        return newPopulation;
    }

    private Specimen tournamentSelection(Specimen[] population) {
        int indexA = (int) (Math.random() * populationSize);
        int indexB = (int) (Math.random() * populationSize);
        Specimen specimenA = population[indexA];
        Specimen specimenB = population[indexB];
        return specimenA.getFitness() < specimenB.getFitness() ? specimenA : specimenB;
    }

    public Specimen[] performCrossover(Specimen[] parents) {
        Specimen[] offspring = new Specimen[parents.length];
        for (int i = 0; i < parents.length; i += 2) {
            offspring[i] = orderCrossover(parents[i], parents[i + 1]);
            offspring[i + 1] = orderCrossover(parents[i + 1], parents[i]);
        }
        return offspring;
    }

    private Specimen orderCrossover(Specimen parentA, Specimen parentB) {
        int[][] permutationA = parentA.getChromosome();
        int[][] permutationB = parentB.getChromosome();
        int[][] offspringChromosome = new int[Specimen.rows][Specimen.columns];

        int row = (int) (Math.random() * Specimen.rows);
        int columnA = (int) (Math.random() * Specimen.columns);
        int columnB = (int) (Math.random() * Specimen.columns);
        int start = Math.min(columnA, columnB);
        int end = Math.max(columnA, columnB);
        System.arraycopy(permutationA[row], start, offspringChromosome[row], start, end - start);

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
                offspringChromosome[row][remainingIndexB] = value;
                remainingIndexB++;
            }
        }
        return new Specimen(offspringChromosome);
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
            return new Population(populationSize, mutationRate, crossoverRate, elitismCount);
        }
    }
}

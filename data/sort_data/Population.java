import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

/**
 * Population.java
 * <p>
 * The population of the genetic algorithm.
 * This class is responsible for creating and managing the population of the
 * genetic algorithm.
 * It is responsible for creating the initial population, and for evolving
 * the population.
 * It also contains the methods for selecting parents, performing crossover,
 * and mutating the offspring.
 * The population is an array of {@link Individual} instances.
 * <p>
 *
 * @author Boér Bence
 * @version 2023-03-10
 */
public class Population {
    /**
     * The population of the genetic algorithm
     */
    private Individual[] population;
    /**
     * The size of the population
     */
    private final int populationSize;
    /**
     * The mutation rate of the genetic algorithm
     */
    private final double mutationRate;
    /**
     * The crossover rate of the genetic algorithm
     */
    private final double crossoverRate;
    /**
     * The size of the elite
     */
    private final int eliteSize;

    /**
     * Creates a new population with the given parameters.
     * <p>
     * The population is initialized with random individuals.
     * <p>
     *
     * @param populationSize The size of the population
     * @param mutationRate   The mutation rate of the genetic algorithm
     * @param crossoverRate  The crossover rate of the genetic algorithm
     * @param eliteSize      The size of the elite
     */
    public Population(int populationSize, double mutationRate, double crossoverRate, int eliteSize) {
        this.population = new Individual[populationSize];
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.eliteSize = eliteSize;
    }

    /**
     * Initializes the population with random individuals, spanning the entire search space.
     */
    public void initialize() {
        this.randomize();
    }

    /**
     * Initializes the population with the given individual.
     * <p>
     * The population is filled with copies of the given individual.
     * <p>
     *
     * @param base The individual to fill the population with
     */
    public void initializeWith(Individual base) {
        this.fill(base);
        this.mutateOffspring(population);
        this.evaluatePopulation(population);
    }

    /**
     * Performs the genetic algorithm for the given number of generations.
     * <p>
     * The population is evolved for the given number of generations.
     * <p>
     *
     * @param generations The number of generations to evolve the population for
     */
    public void progress(int generations) {
        for (int generation = 0; generation < generations; generation++) {
            this.evolve();
            this.evaluatePopulation(population);
        }
    }

    /**
     * Evolves the population.
     * <p>
     * The population is evolved by selecting parents, performing crossover,
     * mutating the offspring, and selecting the next generation.
     * <p>
     */
    private void evolve() {
        Individual[] parents = selectParents(population);
        Individual[] offspring = performCrossover(parents);
        mutateOffspring(offspring);
        evaluatePopulation(offspring);
        population = selectPopulation(population, offspring);
    }

    /**
     * Evaluates the fitness of each individual in the given population, and sorts the population by fitness.
     * @param population
     */
    private void evaluatePopulation(Individual[] population) {
        for (Individual individual : population) {
            individual.evaluate();
        }

        Arrays.sort(population, Comparator.comparingDouble(Individual::getFitness));
    }

    /**
     * Selects two parents from the population using tournament selection.
     * @param population
     * @return The selected parents
     */
    private Individual[] selectParents(Individual[] population) {
        // select parents using tournament selection
        Individual[] parents = new Individual[population.length];
        for (int i = 0; i < population.length; i++) {
            parents[i] = tournamentSelection(population);
        }
        return parents;
    }

    /**
     * Returns the best individual from the sorted population.
     * @return The best individual
     */
    public Individual getFittestIndividual() {
        return population[0];
    }

    /**
     * Fills the population with copies of the given individual.
     * @param base
     */
    private void fill(Individual base) {
        for (int i = 0; i < populationSize; i++) {
            population[i] = base.copy();
        }
    }

    /**
     * Fills the population with random individuals.
     */
    private void randomize() {
        for (int i = 0; i < populationSize; i++) {
            population[i] = Individual.randomized();
        }
    }


    /**
     * Introduces random mutations into the offspring.
     * @param offspring
     */
    public void mutateOffspring(Individual[] offspring) {
        Random random = new Random();
        for (Individual individual : offspring) {
            if (random.nextDouble() < mutationRate) {
                individual.mutate(10);
            }
        }
    }

    /**
     * Selects the next generation from the current population and the offspring.
     * <p>
     * The next generation is selected by selecting the best individuals from the
     * current population and the offspring.
     * The best individuals are selected by sorting the individuals by their fitness,
     * and selecting the best individuals from the beginning of the sorted array.
     * <p>
     *
     * @param population The current population
     * @param offspring  The offspring
     * @return The next generation
     */
    public Individual[] selectPopulation(Individual[] population, Individual[] offspring) {
        Individual[] newPopulation = new Individual[populationSize];
        Arrays.sort(population, Comparator.comparingDouble(Individual::getFitness));
        Arrays.sort(offspring, Comparator.comparingDouble(Individual::getFitness));
        if (eliteSize >= 0) System.arraycopy(population, 0, newPopulation, 0, eliteSize);
        if (populationSize - eliteSize >= 0)
            System.arraycopy(offspring, 0, newPopulation, eliteSize, populationSize - eliteSize);
        return newPopulation;
    }

    /**
     * Selects two individuals from the population using tournament selection.
     * <p>
     * Tournament selection is a selection method where two individuals are selected
     * from the population at random, and the individual with the best fitness is
     * returned.
     * <p>
     *
     * @param population The population to select the individuals from
     * @return The selected individual
     */
    private Individual tournamentSelection(Individual[] population) {
        int indexA = (int) (Math.random() * populationSize);
        int indexB = (int) (Math.random() * populationSize);
        Individual individualA = population[indexA];
        Individual individualB = population[indexB];
        return individualA.getFitness() < individualB.getFitness() ? individualA : individualB;
    }

    /**
     * Performs crossover on the given parents.
     * <p>
     * The parents are paired up, and each pair is used to create two offspring.
     * The offspring are created by selecting a random crossover point, and swapping
     * the genes after the crossover point between the two parents.
     * <p>
     *
     * @param parents The parents to perform crossover on
     * @return The offspring
     */
    public Individual[] performCrossover(Individual[] parents) {
        Individual[] offspring = new Individual[parents.length];
        for (int i = 0; i < parents.length; i += 2) {
            offspring[i] = Individual.fromParents(parents[i], parents[i + 1]);
            offspring[i + 1] = Individual.fromParents(parents[i + 1], parents[i]);
        }
        return offspring;
    }

    // TODO: Add javadoc
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

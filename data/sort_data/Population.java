import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

public class Population {
    private Individual[] population;
    private final int populationSize;
    private final double mutationRate;
    private final double crossoverRate;
    private final int eliteSize;

    public Population(int populationSize, double mutationRate, double crossoverRate, int eliteSize) {
        this.population = new Individual[populationSize];
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.eliteSize = eliteSize;
    }

    public void initialize(){
        this.randomize();
    }

    public void initializeWith(Individual base) {
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
        Individual[] parents = selectParents(population);
        Individual[] offspring = performCrossover(parents);
        mutateOffspring(offspring);
        evaluatePopulation(offspring);
        population = selectPopulation(population, offspring);
    }

    private void evaluatePopulation(Individual[] population) {
        for (Individual individual : population) {
            individual.evaluate();
        }

        Arrays.sort(population, Comparator.comparingDouble(Individual::getFitness));
    }

    private Individual[] selectParents(Individual[] population) {
        // select parents using tournament selection
        Individual[] parents = new Individual[population.length];
        for (int i = 0; i < population.length; i++) {
            parents[i] = tournamentSelection(population);
        }
        return parents;
    }

    public Individual getFittestIndividual() {
        return population[0];
    }

    private void fill(Individual base) {
        for (int i = 0; i < populationSize; i++) {
            population[i] = base.copy();
        }
    }

    private void randomize(){
        for(int i = 0; i < populationSize; i++){
            population[i] = Individual.randomized();
        }
    }

    public void mutateOffspring(Individual[] offspring) {
        Random random = new Random();
        for (Individual individual : offspring) {
            if (random.nextDouble() < mutationRate) {
                individual.mutate(10);
            }
        }
    }

    public Individual[] selectPopulation(Individual[] population, Individual[] offspring) {
        Individual[] newPopulation = new Individual[populationSize];
        Arrays.sort(population, Comparator.comparingDouble(Individual::getFitness));
        Arrays.sort(offspring, Comparator.comparingDouble(Individual::getFitness));
        if (eliteSize >= 0) System.arraycopy(population, 0, newPopulation, 0, eliteSize);
        if (populationSize - eliteSize >= 0)
            System.arraycopy(offspring, 0, newPopulation, eliteSize, populationSize - eliteSize);
        return newPopulation;
    }

    private Individual tournamentSelection(Individual[] population) {
        int indexA = (int) (Math.random() * populationSize);
        int indexB = (int) (Math.random() * populationSize);
        Individual individualA = population[indexA];
        Individual individualB = population[indexB];
        return individualA.getFitness() < individualB.getFitness() ? individualA : individualB;
    }

    public Individual[] performCrossover(Individual[] parents) {
        Individual[] offspring = new Individual[parents.length];
        for (int i = 0; i < parents.length; i += 2) {
            offspring[i] = Individual.fromParents(parents[i], parents[i + 1]);
            offspring[i + 1] = Individual.fromParents(parents[i + 1], parents[i]);
        }
        return offspring;
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

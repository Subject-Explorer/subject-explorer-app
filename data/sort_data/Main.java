import processing.core.PApplet;
import ui.Window;

// TODO: Add javadoc
public class Main {

    public static void main(String[] args) {
        PApplet.main(Window.class);
    }

    private void initialize() {
        NodeGrid subjects = NodeGrid.fromFile("./../../public/data.json");
        Individual.initializeChromosome(subjects);
        Individual base = new Individual();

        Population population = new Population.Initializer()
                .withPopulationSize(100)
                .withMutationRate(0.3)
                .withCrossoverRate(0.7)
                .withElitismCount(10)
                .withMaxGeneration(100)
                .initialize();
        population.initializeWith(base);

        population.progress(1000);
        Individual winner = population.getFittestIndividual();
    }
}
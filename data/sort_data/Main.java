public class Main {

    public static void main(String[] args) {
        NodeGrid subjects = NodeGrid.fromFile("./../../public/data.json");
        Specimen base = Specimen.fromNodes(subjects);

        Population population = new Population.Initializer()
                .withPopulationSize(100)
                .withMutationRate(0.3)
                .withCrossoverRate(0.7)
                .withElitismCount(10)
                .withMaxGeneration(100)
                .initialize();
        population.initializeWith(base);

        population.progress(1000);
        Specimen winner = population.getFittestIndividual();

    }
}
namespace hackathon_template.Models; 

public class Meal {
    public int Id { get; set; }
    public string Name { get; set; }
    public Nutrients Nutrients { get; set; }
    public DateTime MealTime { get; set; }
}
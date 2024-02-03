using hackathon_template.Controllers;
using hackathon_template.Models;

namespace hackathon_template.Services;

public interface IUserService {
    User? GetUserById(string userId);
    public Task AddRole(User user, UserRole role);
    IEnumerable<string> GetRoles(string userId);
    public Task SetupUserAccount(UserRegistrationDto userDto);
    List<Recipe> GetUserRecipes(string userId);
    void SaveRecipe(string userId, Recipe recipe);
    void SaveMeal(string userId, Meal meal);
    List<Meal> GetUserMeals(string userId);
    List<NutrientSummaryResponse> GetMonthlyNutrientSummary(string userId);
}
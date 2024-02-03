using hackathon_template.Models;
using hackathon_template.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace hackathon_template.Controllers;

public static class Routes {
    public static void ConfigureRoutes(IEndpointRouteBuilder app) {
        app.MapPost("/user-registered", async (UserRegistrationDto userDto, IUserService userService) => {
            await userService.SetupUserAccount(userDto);
        });
        
        app.MapPost("/logout", async (HttpContext httpContext, SignInManager<User> signInManager) => {
            await signInManager.SignOutAsync();
            return Results.Redirect("/");
        });

        app.MapGet("/user-info", 
            async (IUserService userService, UserManager<User> userManager, HttpContext httpContext)  => {
            var user = await userManager.GetUserAsync(httpContext.User);
            if (user is null) {
                return Results.NotFound("user not found");
            }
            return Results.Json(new {user.FirstName, user.LastName, user.Email});
        });

        app.MapGet("/api/get-user-recipes/", 
            async (IUserService userService, UserManager<User> userManager, HttpContext httpContext) => {
            var user = await userManager.GetUserAsync(httpContext.User);
            if (user is null) { 
                return Results.NotFound("user not found"); 
            }

            return Results.Json(userService.GetUserRecipes(user.Id));
        });

        app.MapPost("/api/save-recipe/", async (Recipe recipe, IUserService userService, UserManager<User> userManager, HttpContext httpContext) => {
            var user = await userManager.GetUserAsync(httpContext.User);
            if (user is null) { 
                return Results.NotFound("user not found"); 
            }
            
            userService.SaveRecipe(user.Id, recipe);
            return Results.Ok();
        });

        app.MapGet("/api/get-user-meals/",
            async (IUserService userService, UserManager<User> userManager, HttpContext httpContext) => {
                var user = await userManager.GetUserAsync(httpContext.User);
                if (user is null) { 
                    return Results.NotFound("user not found"); 
                }
                
                return Results.Json(userService.GetUserMeals(user.Id));
            });
        
        app.MapPost("/api/save-meal/", async (Meal meal, IUserService userService, UserManager<User> userManager, HttpContext httpContext) => {
            var user = await userManager.GetUserAsync(httpContext.User);
            if (user is null) { 
                return Results.NotFound("user not found"); 
            }
            
            userService.SaveMeal(user.Id, meal);
            return Results.Ok();
        });

        app.MapPost("/api/analyze-image", async (IFormFile image, IFoodService foodService) => {
            if (image.Length == 0) {
                return Results.BadRequest("image not provided");
            }

            var result = await foodService.AnalyzeImageAsync(image);
            if (result is null) {
                return Results.Problem("error reading image");
            }
            return Results.Json(result);
        }).DisableAntiforgery();
        
        app.MapGet("/university-cafes-data", (IFoodService foodService) => {
            var results = foodService.GetCafeData();
            return Results.Json(results);
        });

        app.MapGet("/monthly-nutrient-summary", async (IUserService userService, UserManager<User> userManager, HttpContext httpContext) => {
            var user = await userManager.GetUserAsync(httpContext.User);
            if (user is null) { 
                return Results.NotFound("user not found"); 
            }
            return Results.Json(userService.GetMonthlyNutrientSummary(user.Id));
        });
    }
}

public record UserRegistrationDto(string FirstName, string LastName, string Email);
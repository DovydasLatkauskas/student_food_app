using System.Net.Http.Headers;
using System.Text.Json;

namespace hackathon_template.Services; 

public class FoodService : IFoodService{
    private readonly string _flaskEndpoint = "http://localhost:5000/predict";
    
    public async Task<ModelResponse?> AnalyzeImageAsync(IFormFile image) {
        using var client = new HttpClient();
        using var content = new MultipartFormDataContent();

        await using var fileStream = image.OpenReadStream();
        var fileContent = new StreamContent(fileStream);
        fileContent.Headers.ContentType = new MediaTypeHeaderValue(image.ContentType);
        content.Add(fileContent, "file", image.FileName);

        var response = await client.PostAsync(_flaskEndpoint, content);
        if (!response.IsSuccessStatusCode) {
            return null;
        }

        string json = await response.Content.ReadAsStringAsync();
        ModelResponse? modelResponse = JsonSerializer.Deserialize<ModelResponse>(json);

        return modelResponse;
    }
}

public record ModelResponse(string Prediction);
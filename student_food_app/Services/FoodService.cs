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

    public CafeDataResponse GetCafeData() {
        return new CafeDataResponse(new List<CafeData>() {
            new CafeData("40 George Square",
                new OpeningTime("Mon - Fri: 08:30 - 18:00", "Mon - Fri: 08:30 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.943525712211176, -3.1862164945065525))
        });
    }
}

public record ModelResponse(string Prediction);
public record CafeDataResponse(List<CafeData> CafeData);
public record CafeData(string Address, OpeningTime OpeningTime, string MenuUrl, CafeLocation CafeLocation);
public record OpeningTime(string TermTime, string NonTermTime);
public record CafeLocation(double Latitude, double Longitude);
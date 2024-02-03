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
            new CafeData("40 George Square Cafe",
                "40 George Square",
                new OpeningTime("Mon - Fri: 08:30 - 18:00", "Mon - Fri: 08:30 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.943525712211176, -3.1862164945065525)),
            
            new CafeData("Absorb Appleton tower",
                "11 Crichton St",
                new OpeningTime("Mon - Fri: 09:00 - 16:00", "Closed"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.94454387104452, -3.1866957186267384)),
            
            new CafeData("Bayes",
                "47 Potterrow",
                new OpeningTime("Mon - Fri: 09:00 - 16:00", "Mon - Fri: 09:00 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.945324497054486, -3.1870990001809365)), 
            
            new CafeData("The Cafe",
                "ECA Hunter Building, 74 Lauriston Pl", 
                new OpeningTime("Mon - Fri: 08:30 - 17:00", "Mon - Fri: 08:30 - 15:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.94532433907282, -3.197875644839231)), 
            
            new CafeData("ECCI Cafe",
                "1, 9 High School Yards", 
                new OpeningTime("Mon - Fri: 09:00 - 16:00", "Mon - Fri: 09:00 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.94898666427008, -3.183665532194526)), 
            
            new CafeData("The Exchange cafe",
                "29 Buccleuch Place", 
                new OpeningTime("Mon - Fri: 08:30 - 17:00", "Mon - Fri: 08:30 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.943078172964555, -3.1874157660371365)), 
            
            new CafeData("Ground",
                "15a George Square", 
                new OpeningTime("Mon - Fri: 08:30 - 16:00", "Mon - Fri: 09:00 - 16:00"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.9441580875046, -3.190545015200346)),
            
            new CafeData("Levels (Holyrood Road)",
                "9C Holyrood Rd",
                new OpeningTime("Mon - Fri: 08:00 - 18:00", "Sat: 09:00 - 17:00\nSun: Closed"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.949557474945415, -3.1816215637837106)), 
            
            new CafeData("Library Cafe",
                "30 George Square",
                new OpeningTime("Mon - Thurs: 08:30 - 22:00\nFri: 08:30 - 18:00\nSat: 10:00 - 18:00\nSun: 10:00 - 18:00", "Mon - Thurs: 08:30 - 17:00\nFri: 08:30 - 16:00\nSat - Sun: Closed"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.94288597457484, -3.1894143235360604)), 
            
            new CafeData("Quad Cafe",
                "University of Edinburgh Old College, South Bridge",
                new OpeningTime("Mon - Fri: 09:00 - 16:00", "Non-term: CLOSED"),
                "https://grabandgo.mysaffronportal.com/",
                new CafeLocation(55.94744254767476, -3.187226979374555)) 
        });
    }
}

public record ModelResponse(string Prediction);
public record CafeDataResponse(List<CafeData> CafeData);
public record CafeData(string name, string Address, OpeningTime OpeningTime, string MenuUrl, CafeLocation CafeLocation);
public record OpeningTime(string TermTime, string NonTermTime);
public record CafeLocation(double Latitude, double Longitude);
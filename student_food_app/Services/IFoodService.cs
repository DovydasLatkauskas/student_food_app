namespace hackathon_template.Services; 

public interface IFoodService {
    Task<ModelResponse?> AnalyzeImageAsync(IFormFile image);
    CafeDataResponse GetCafeData();
}
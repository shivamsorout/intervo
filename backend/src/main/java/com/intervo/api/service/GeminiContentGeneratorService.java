package com.intervo.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intervo.api.dto.GenerateContentRequest;
import com.intervo.api.dto.GeneratedContentResponse;
import com.intervo.api.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiContentGeneratorService {

    private final RestClient.Builder restClientBuilder;
    private final ObjectMapper objectMapper;

    @Value("${app.ai.gemini.api-key}")
    private String apiKey;

    @Value("${app.ai.gemini.model}")
    private String model;

    public GeneratedContentResponse generate(GenerateContentRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI generation is not configured. Set GEMINI_API_KEY to enable it.");
        }

        String prompt = buildPrompt(request);
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt)))),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "responseSchema", Map.of(
                                "type", "OBJECT",
                                "properties", Map.of(
                                        "title", Map.of("type", "STRING"),
                                        "body", Map.of("type", "STRING")
                                ),
                                "required", List.of("title", "body")
                        )
                )
        );

        String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";

        JsonNode response;
        try {
            response = restClientBuilder.build()
                    .post()
                    .uri(url)
                    .header("x-goog-api-key", apiKey)
                    .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(JsonNode.class);
        } catch (RestClientException ex) {
            log.warn("Gemini content generation failed", ex);
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_GENERATION_FAILED", "AI generation failed. Please try again.");
        }

        String text = response.path("candidates").path(0).path("content").path("parts").path(0).path("text").asText(null);
        if (text == null || text.isBlank()) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_GENERATION_FAILED", "AI returned an empty response.");
        }

        try {
            JsonNode parsed = objectMapper.readTree(text);
            return new GeneratedContentResponse(parsed.path("title").asText(""), parsed.path("body").asText(""));
        } catch (Exception ex) {
            log.warn("Failed to parse Gemini response as JSON: {}", text, ex);
            throw new ApiException(HttpStatus.BAD_GATEWAY, "AI_GENERATION_FAILED", "AI returned an unexpected response format.");
        }
    }

    private String buildPrompt(GenerateContentRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert technical interviewer and educator writing interview-prep study material.\n")
                .append("Write a comprehensive study article in Markdown for the subtopic \"").append(request.subtopicName())
                .append("\" under the topic \"").append(request.topicName())
                .append("\" in the \"").append(request.stackName()).append("\" stack.\n")
                .append("Target difficulty: ").append(request.difficulty()).append(".\n")
                .append("Structure: start with a single '# ' title heading, use '## ' for major sections, ")
                .append("include at least one fenced code block with a realistic example where relevant, ")
                .append("and end with a short 'Common Interview Questions' section.\n");

        if (request.instructions() != null && !request.instructions().isBlank()) {
            prompt.append("Additional instructions from the author: ").append(request.instructions()).append("\n");
        }

        prompt.append("Respond with a short, descriptive title (without markdown formatting) and the full markdown body.");
        return prompt.toString();
    }
}

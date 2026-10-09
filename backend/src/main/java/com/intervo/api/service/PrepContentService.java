package com.intervo.api.service;

import com.intervo.api.dto.ContentUnitResponse;
import com.intervo.api.dto.StackResponse;
import com.intervo.api.dto.StackStatsResponse;
import com.intervo.api.dto.SubtopicResponse;
import com.intervo.api.dto.TopicResponse;
import com.intervo.api.entity.ContentStatus;
import com.intervo.api.entity.ContentType;
import com.intervo.api.entity.ContentUnit;
import com.intervo.api.entity.Stack;
import com.intervo.api.entity.Subtopic;
import com.intervo.api.entity.Topic;
import com.intervo.api.exception.ApiException;
import com.intervo.api.repository.ContentUnitRepository;
import com.intervo.api.repository.StackRepository;
import com.intervo.api.repository.SubtopicRepository;
import com.intervo.api.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrepContentService {

    private final StackRepository stackRepository;
    private final TopicRepository topicRepository;
    private final SubtopicRepository subtopicRepository;
    private final ContentUnitRepository contentUnitRepository;

    @Transactional(readOnly = true)
    public List<StackResponse> listStacks() {
        return stackRepository.findAllByOrderBySortOrderAsc().stream().map(StackResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<TopicResponse> listTopics(String stackSlug) {
        Stack stack = resolveStack(stackSlug);
        return topicRepository.findAllByStackIdOrderBySortOrderAsc(stack.getId()).stream().map(TopicResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<SubtopicResponse> listSubtopics(String stackSlug, String topicSlug) {
        Topic topic = resolveTopic(stackSlug, topicSlug);
        return subtopicRepository.findAllByTopicIdOrderBySortOrderAsc(topic.getId()).stream().map(SubtopicResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public ContentUnitResponse getArticle(String stackSlug, String topicSlug, String subtopicSlug, boolean isAuthenticated) {
        Subtopic subtopic = resolveSubtopic(stackSlug, topicSlug, subtopicSlug);
        ContentUnit unit = contentUnitRepository.findAllBySubtopicIdAndStatusOrderBySortOrderAsc(subtopic.getId(), ContentStatus.PUBLISHED)
                .stream()
                .filter(u -> u.getType() == ContentType.ARTICLE)
                .findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "CONTENT_NOT_FOUND", "No published article found for this subtopic"));

        if (!unit.isFreePreview() && !isAuthenticated) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "LOGIN_REQUIRED", "Log in to read this article");
        }

        return ContentUnitResponse.from(unit);
    }

    @Transactional(readOnly = true)
    public StackStatsResponse getStackStats(String stackSlug) {
        Stack stack = resolveStack(stackSlug);
        List<Topic> topics = topicRepository.findAllByStackIdOrderBySortOrderAsc(stack.getId());

        long publishedArticleCount = 0;
        for (Topic topic : topics) {
            for (Subtopic subtopic : subtopicRepository.findAllByTopicIdOrderBySortOrderAsc(topic.getId())) {
                publishedArticleCount += contentUnitRepository
                        .findAllBySubtopicIdAndStatusOrderBySortOrderAsc(subtopic.getId(), ContentStatus.PUBLISHED)
                        .stream()
                        .filter(unit -> unit.getType() == ContentType.ARTICLE)
                        .count();
            }
        }

        return new StackStatsResponse(topics.size(), publishedArticleCount);
    }

    private Stack resolveStack(String stackSlug) {
        return stackRepository.findBySlug(stackSlug)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "STACK_NOT_FOUND", "Stack not found"));
    }

    private Topic resolveTopic(String stackSlug, String topicSlug) {
        Stack stack = resolveStack(stackSlug);
        return topicRepository.findByStackIdAndSlug(stack.getId(), topicSlug)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "TOPIC_NOT_FOUND", "Topic not found"));
    }

    private Subtopic resolveSubtopic(String stackSlug, String topicSlug, String subtopicSlug) {
        Topic topic = resolveTopic(stackSlug, topicSlug);
        return subtopicRepository.findByTopicIdAndSlug(topic.getId(), subtopicSlug)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "SUBTOPIC_NOT_FOUND", "Subtopic not found"));
    }
}

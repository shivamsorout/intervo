package com.intervo.api.service;

import com.intervo.api.dto.ContentUnitResponse;
import com.intervo.api.dto.SaveContentRequest;
import com.intervo.api.dto.SavedContentResponse;
import com.intervo.api.entity.ContentType;
import com.intervo.api.entity.ContentUnit;
import com.intervo.api.entity.Stack;
import com.intervo.api.entity.Subtopic;
import com.intervo.api.entity.Topic;
import com.intervo.api.entity.TrackStatus;
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

import java.util.Locale;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminContentService {

    private static final Pattern NON_SLUG_CHARS = Pattern.compile("[^a-z0-9]+");

    private final StackRepository stackRepository;
    private final TopicRepository topicRepository;
    private final SubtopicRepository subtopicRepository;
    private final ContentUnitRepository contentUnitRepository;

    @Transactional
    public SavedContentResponse saveContent(SaveContentRequest request, Long editorUserId) {
        Stack stack = resolveStack(request.stack(), request.stackIsNew());
        Topic topic = resolveTopic(stack, request.topic(), request.topicIsNew());
        Subtopic subtopic = resolveSubtopic(topic, request.subtopic(), request.subtopicIsNew());

        ContentUnit contentUnit = ContentUnit.builder()
                .subtopicId(subtopic.getId())
                .type(ContentType.ARTICLE)
                .title(request.title())
                .body(request.body())
                .status(request.status())
                .isFreePreview(request.isFreePreview())
                .createdBy(editorUserId)
                .build();

        contentUnit = contentUnitRepository.save(contentUnit);
        return new SavedContentResponse(ContentUnitResponse.from(contentUnit), stack.getSlug(), topic.getSlug(), subtopic.getSlug());
    }

    private Stack resolveStack(String value, boolean isNew) {
        if (!isNew) {
            return stackRepository.findBySlug(value)
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "STACK_NOT_FOUND", "Stack not found"));
        }
        String slug = slugify(value);
        if (stackRepository.existsBySlug(slug)) {
            throw new ApiException(HttpStatus.CONFLICT, "STACK_ALREADY_EXISTS", "A stack with this name already exists");
        }
        int nextSortOrder = stackRepository.findAllByOrderBySortOrderAsc().size() + 1;
        return stackRepository.save(Stack.builder().slug(slug).name(value).sortOrder(nextSortOrder).status(TrackStatus.IN_PROGRESS).build());
    }

    private Topic resolveTopic(Stack stack, String value, boolean isNew) {
        if (!isNew) {
            return topicRepository.findByStackIdAndSlug(stack.getId(), value)
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "TOPIC_NOT_FOUND", "Topic not found"));
        }
        String slug = slugify(value);
        if (topicRepository.existsByStackIdAndSlug(stack.getId(), slug)) {
            throw new ApiException(HttpStatus.CONFLICT, "TOPIC_ALREADY_EXISTS", "A topic with this name already exists in this stack");
        }
        int nextSortOrder = topicRepository.findAllByStackIdOrderBySortOrderAsc(stack.getId()).size() + 1;
        return topicRepository.save(Topic.builder().stackId(stack.getId()).slug(slug).name(value).sortOrder(nextSortOrder).build());
    }

    private Subtopic resolveSubtopic(Topic topic, String value, boolean isNew) {
        if (!isNew) {
            return subtopicRepository.findByTopicIdAndSlug(topic.getId(), value)
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "SUBTOPIC_NOT_FOUND", "Subtopic not found"));
        }
        String slug = slugify(value);
        if (subtopicRepository.existsByTopicIdAndSlug(topic.getId(), slug)) {
            throw new ApiException(HttpStatus.CONFLICT, "SUBTOPIC_ALREADY_EXISTS", "A subtopic with this name already exists in this topic");
        }
        int nextSortOrder = subtopicRepository.findAllByTopicIdOrderBySortOrderAsc(topic.getId()).size() + 1;
        return subtopicRepository.save(Subtopic.builder().topicId(topic.getId()).slug(slug).name(value).sortOrder(nextSortOrder).build());
    }

    private String slugify(String value) {
        String slug = NON_SLUG_CHARS.matcher(value.toLowerCase(Locale.ROOT).trim()).replaceAll("-");
        slug = slug.replaceAll("^-+|-+$", "");
        if (slug.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_NAME", "Name must contain at least one letter or number");
        }
        return slug;
    }
}

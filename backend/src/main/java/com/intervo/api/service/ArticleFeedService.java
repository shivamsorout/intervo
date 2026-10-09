package com.intervo.api.service;

import com.intervo.api.dto.ArticleTeaserResponse;
import com.intervo.api.entity.ContentStatus;
import com.intervo.api.entity.ContentType;
import com.intervo.api.entity.ContentUnit;
import com.intervo.api.entity.Stack;
import com.intervo.api.entity.Subtopic;
import com.intervo.api.entity.Topic;
import com.intervo.api.repository.ContentUnitRepository;
import com.intervo.api.repository.StackRepository;
import com.intervo.api.repository.SubtopicRepository;
import com.intervo.api.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleFeedService {

    private static final int EXCERPT_LENGTH = 160;
    private static final Pattern CODE_FENCE = Pattern.compile("```[\\s\\S]*?```");
    private static final Pattern INLINE_CODE = Pattern.compile("`([^`]*)`");
    private static final Pattern HEADING_LINE = Pattern.compile("(?m)^#{1,6}\\s.*$");
    private static final Pattern HEADING_MARKER = Pattern.compile("(?m)^#{1,6}\\s*");
    private static final Pattern EMPHASIS = Pattern.compile("[*_]{1,3}");
    private static final Pattern LINK = Pattern.compile("\\[([^]]*)]\\([^)]*\\)");
    private static final Pattern WHITESPACE = Pattern.compile("\\s+");

    private final ContentUnitRepository contentUnitRepository;
    private final SubtopicRepository subtopicRepository;
    private final TopicRepository topicRepository;
    private final StackRepository stackRepository;

    @Transactional(readOnly = true)
    public List<ArticleTeaserResponse> listPublished(int limit) {
        return contentUnitRepository.findAllByStatusAndTypeOrderByUpdatedAtDesc(ContentStatus.PUBLISHED, ContentType.ARTICLE)
                .stream()
                .filter(ContentUnit::isFreePreview)
                .limit(limit)
                .map(this::toTeaser)
                .flatMap(Optional::stream)
                .toList();
    }

    private Optional<ArticleTeaserResponse> toTeaser(ContentUnit unit) {
        return subtopicRepository.findById(unit.getSubtopicId())
                .flatMap(subtopic -> topicRepository.findById(subtopic.getTopicId())
                        .flatMap(topic -> stackRepository.findById(topic.getStackId())
                                .map(stack -> buildTeaser(unit, subtopic, topic, stack))));
    }

    private ArticleTeaserResponse buildTeaser(ContentUnit unit, Subtopic subtopic, Topic topic, Stack stack) {
        return new ArticleTeaserResponse(
                unit.getId(),
                unit.getTitle(),
                excerpt(unit.getBody()),
                stack.getSlug(),
                stack.getName(),
                topic.getSlug(),
                subtopic.getSlug(),
                unit.getUpdatedAt()
        );
    }

    private String excerpt(String markdown) {
        String plain = HEADING_LINE.matcher(markdown.trim()).replaceFirst("");
        plain = CODE_FENCE.matcher(plain).replaceAll(" ");
        plain = INLINE_CODE.matcher(plain).replaceAll("$1");
        plain = HEADING_MARKER.matcher(plain).replaceAll("");
        plain = LINK.matcher(plain).replaceAll("$1");
        plain = EMPHASIS.matcher(plain).replaceAll("");
        plain = WHITESPACE.matcher(plain).replaceAll(" ").trim();

        if (plain.length() <= EXCERPT_LENGTH) {
            return plain;
        }
        int cut = plain.lastIndexOf(' ', EXCERPT_LENGTH);
        if (cut <= 0) {
            cut = EXCERPT_LENGTH;
        }
        return plain.substring(0, cut).trim() + "…";
    }
}

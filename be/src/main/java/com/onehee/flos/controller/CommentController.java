package com.onehee.flos.controller;

import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "댓글API", description = "댓글 기능을 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class CommentController {

    private final CommentService commentService;

    @Tag(name = "댓글API")
    @Operation(summary = "게시글의 댓글 리스트", description = "게시글의 댓글 리스트를 반환합니다.")
    @GetMapping("/{id}/list")
    public ResponseEntity<?> getListByPost(@RequestParam("page") Integer page, @RequestParam("size") Integer size, @PathVariable("id") Long postId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return new ResponseEntity<Slice<CommentResponseDTO>>(commentService.getCommentListByPost(postId, pageRequest), HttpStatus.OK);
    }
}
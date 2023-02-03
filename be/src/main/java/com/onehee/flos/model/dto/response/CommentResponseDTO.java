package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDTO {
    private Long id;
    private Long postId;
    private Long parentId;
    private Long primitiveId;
    private MemberResponseDTO writer;
    private String content;
    private LocalDateTime createdAt;
    //    private LocalDateTime modifiedAt;
    private Boolean isApprove;

    public static CommentResponseDTO toDto(Comment comment) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .parentId(comment.getParent().getId())
                .primitiveId(comment.getPrimitive().getId())
                .writer(MemberResponseDTO.toDto(comment.getWriter()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
//                .modifyAt(comment.getModifiedAt())
                .isApprove(comment.getIsApprove())
                .build();
    }

}
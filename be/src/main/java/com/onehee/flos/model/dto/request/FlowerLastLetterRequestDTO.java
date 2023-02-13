package com.onehee.flos.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "꽃 마지막 편지 DTO")
public class FlowerLastLetterRequestDTO {
    @Schema(description = "유언")
    private String letter;

    @Schema(description = "대상 꽃의 pk")
    private Long id;
}

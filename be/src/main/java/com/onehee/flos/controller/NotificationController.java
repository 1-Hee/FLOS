package com.onehee.flos.controller;

import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import com.onehee.flos.model.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "알람 API", description = "알람수신/확인 API")
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Tag(name = "알람 API")
    @Operation(summary = "알람 조회 메서드", description = "요청자의 알람 리스트를 반환합니다.")
    @GetMapping
    public ResponseEntity<?> getNotification() {
        NotificationResponseDTO notificationResponseDTO = notificationService.getNotification();
        HttpStatus status = notificationResponseDTO.getNotifications().size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<NotificationResponseDTO>(notificationResponseDTO, status);
    }

    @Tag(name = "알람 API")
    @Operation(summary = "알람 확인 메서드", description = "요청자의 알람을 확인 처리합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> checkNotification(@PathVariable("id") Long id) {
        NotificationResponseDTO notificationResponseDTO = notificationService.checkNotification(new NotificationCheckRequestDTO(id));
        HttpStatus status = notificationResponseDTO.getNotifications().size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<NotificationResponseDTO>(notificationResponseDTO, status);
    }
}

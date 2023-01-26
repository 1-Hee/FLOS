package com.onehee.flos.auth.model.service;

import com.onehee.flos.auth.model.dto.Subject;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    private final MemberDetailsService memberDetailsService;

    private final String TokenType = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (!Objects.isNull(authorization) && authorization.startsWith(TokenType)){
            log.info("{}", authorization);
            String token = authorization.substring(TokenType.length());
            jwtTokenProvider.validateToken(token);
            try {
                Subject subject = jwtTokenProvider.getSubject(token);
                String requestURI = request.getRequestURI();
                if (subject.getType().equals("RTK") && !requestURI.equals("/auth/reissue") && !jwtTokenProvider.isValidatedRTK(token, subject)) {
                    throw new JwtException("토큰이 유효하지 않습니다.");
                }
                UserDetails userDetails = memberDetailsService.loadUserByUsername(subject.getId().toString());
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (JwtException e) {
                request.setAttribute("exception", e.getMessage());
            }
        }
        filterChain.doFilter(request, response );
    }
}

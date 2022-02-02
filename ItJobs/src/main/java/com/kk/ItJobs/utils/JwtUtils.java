package com.kk.ItJobs.utils;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface JwtUtils {
    String generateJwt(String username, List<String> roles, String requestUrl);

    String generateRefreshToken(String username, String requestUrl);

    void setTokensToResponse(HttpServletResponse response, String accessToken) throws IOException;

    void setErrorToResponse(HttpServletResponse response, Exception exception) throws IOException;

    void setRefreshTokenToCookie(HttpServletResponse response, String refreshToken);

}

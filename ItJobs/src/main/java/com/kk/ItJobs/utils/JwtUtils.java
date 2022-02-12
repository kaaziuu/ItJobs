package com.kk.ItJobs.utils;

import com.kk.ItJobs.model.AppUser;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface JwtUtils {
    String generateJwt(String username, List<String> roles, String requestUrl);

    String generateJwt(AppUser user, String requestUrl);

    void setAuthResponseToResponse(HttpServletResponse response, String accessToken, AppUser user) throws IOException;

    void setErrorToResponse(HttpServletResponse response, Exception exception) throws IOException;

    String getUsernameFromToken(String token);
}

package com.kk.ItJobs.security;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PublicApi {
    public static List<String> publicApiList = Arrays.asList(
            "/api/login",
            "/api/token/refresh",
            "/api/register"
    );
}

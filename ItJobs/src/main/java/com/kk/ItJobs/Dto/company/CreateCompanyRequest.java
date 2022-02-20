package com.kk.ItJobs.Dto.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCompanyRequest {
    private String name;
    private Integer size;
    private String description;
    private String motto;

    public static boolean isValid(CreateCompanyRequest request){
        return request.getName() != null && request.getDescription() != null && request.getSize() != null;
    }
}

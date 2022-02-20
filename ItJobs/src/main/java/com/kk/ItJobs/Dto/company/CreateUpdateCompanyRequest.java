package com.kk.ItJobs.Dto.company;

import com.kk.ItJobs.model.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUpdateCompanyRequest {
    private String name;
    private Integer size;
    private String description;
    private String motto;

    public static boolean isValid(CreateUpdateCompanyRequest request){
        var v1 = request.getName() != null && request.getDescription() != null && request.getSize() != null;
        var v2 = false;
        if(v1) {
            v2 = request.getName().length() > 0 & request.getSize() > 0 & request.getDescription().length() > 0;
        }
        return v1 && v2;
    }
}

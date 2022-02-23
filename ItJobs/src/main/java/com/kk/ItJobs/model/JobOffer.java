package com.kk.ItJobs.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class JobOffer {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String uuid;
    private Float minimumSalary;
    private Float maximumSalary;
    private String description;
    private String position;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}

package com.kk.ItJobs.model;

import lombok.*;

import javax.persistence.*;

import java.util.Set;

import static javax.persistence.GenerationType.AUTO;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    private Integer size;
    private String description;
    private String motto;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private Set<JobOffer> jobOffers;

}

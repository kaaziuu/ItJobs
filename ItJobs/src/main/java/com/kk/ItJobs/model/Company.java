package com.kk.ItJobs.model;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;


@Entity
@Getter
@Setter
@ToString
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

}

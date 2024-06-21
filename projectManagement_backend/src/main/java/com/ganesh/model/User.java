package com.ganesh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fullName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  //this code hide password in postman
    private String password;          //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    @JsonIgnore
    @OneToMany(mappedBy = "assignee",cascade = CascadeType.ALL)

    private List<Issue> assignedIssue = new ArrayList<>();

    private int projectSize;
}

package com.GDGSocialMedia.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Data
public class Comment {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String content;

    @ManyToOne
    private User user;

    @ManyToMany
    private List<User> liked=new ArrayList<>();

    private LocalDateTime createdAt;

    public Comment(){

    }
}

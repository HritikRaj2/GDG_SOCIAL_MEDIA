package com.GDGSocialMedia.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    private String content;
    private String image;


    @ManyToOne
    private User user;

    private LocalDateTime timestamp;


    @JsonIgnore
    @ManyToOne
    private Chat chat;
}

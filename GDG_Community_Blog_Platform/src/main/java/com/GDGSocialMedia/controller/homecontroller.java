package com.GDGSocialMedia.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class homecontroller {


    @GetMapping("/home")
    public String homeControllerhandler(){
        return "this is home controller";
    }
}

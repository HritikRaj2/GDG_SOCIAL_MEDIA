package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.Chat;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.request.CreateChatRequest;
import com.GDGSocialMedia.services.ChatSevice;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private ChatSevice chatSevice;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest req) throws Exception {
        User reqUser= userService.findUserByJwt(jwt);

        User user2=userService.findUserById(req.getUserId());
        Chat chat=chatSevice.createChat(reqUser,user2);
        return chat;
    }

    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt){
        User user= userService.findUserByJwt(jwt);

        List<Chat> chats= chatSevice.findUsersChat(user.getId());

        return chats;

    }



}

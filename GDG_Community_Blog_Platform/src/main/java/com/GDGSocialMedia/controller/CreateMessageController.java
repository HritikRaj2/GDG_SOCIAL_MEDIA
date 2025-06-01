package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.Message;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.services.MessageService;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CreateMessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;


    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message req, @RequestHeader("Authorization")String jwt, @PathVariable Integer chatId) throws Exception {

        User user=userService.findUserByJwt(jwt);
        Message message=messageService.createMessage(user,chatId,req);

        return message;
    }

    @GetMapping("/api/messsages/get/chat/{chatId}")
    public List<Message> findChatMessages(@PathVariable Integer chatId,@RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserByJwt(jwt);
        List<Message> messages=messageService.findChatMessages(chatId);
        return messages;
    }


}

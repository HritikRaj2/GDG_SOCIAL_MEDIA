package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Chat;
import com.GDGSocialMedia.models.Message;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.ChatRepository;
import com.GDGSocialMedia.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatSevice chatSevice;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {


        Chat chat=chatSevice.findChatById(chatId);

        Message message=new Message();
        message.setChat(chat);
        message.setContent(req.getContent());
        message.setImage(req.getImage());
        message.setUser(user);
        message.setTimestamp(LocalDateTime.now());
        Message savedMessages=messageRepository.save(message);
        chat.getMessages().add(savedMessages);
        chatRepository.save(chat);
        return savedMessages;
    }

    @Override
    public List<Message> findChatMessages(Integer chatId) throws Exception {
        Chat chat=chatSevice.findChatById(chatId);


        return messageRepository.findByChatId(chatId);
    }
}

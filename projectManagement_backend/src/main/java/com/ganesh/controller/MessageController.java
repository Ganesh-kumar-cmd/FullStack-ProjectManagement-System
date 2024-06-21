package com.ganesh.controller;


import com.ganesh.model.Chat;
import com.ganesh.model.Message;
import com.ganesh.model.User;
import com.ganesh.repository.MessageRepository;
import com.ganesh.repository.UserRepository;
import com.ganesh.request.CreateMessageRequest;
import com.ganesh.service.MessageService;
import com.ganesh.service.ProjectService;
import com.ganesh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message>sendMessage(@RequestBody CreateMessageRequest request)
        throws Exception{
        User user = userService.findUserById(request.getSenderId());
        //if(user==null) throw new Exception("User not found with id "+request.getSenderId());
        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();
        if(chats==null)throw new Exception("Chat not found");
        Message sendMessage = messageService.sendMessage(request.getSenderId(),
                request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sendMessage);
    }
    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>>getMessageByChatId(@PathVariable Long projectId)
        throws Exception{
        List<Message>messages=messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }

}

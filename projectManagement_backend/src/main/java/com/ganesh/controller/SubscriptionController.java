package com.ganesh.controller;

import com.ganesh.model.PlanType;
import com.ganesh.model.Subscription;
import com.ganesh.model.User;
import com.ganesh.service.SubscriptionService;
import com.ganesh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<Subscription>getUserSubscription(
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        Subscription subscription = subscriptionService.getUserSubscription(user.getId());

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription>upgradeSubscription(
            @RequestHeader("Authorization")String jwt,
            @RequestParam PlanType planType) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(),planType);

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }
}

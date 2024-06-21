package com.ganesh.service;

import com.ganesh.model.PlanType;
import com.ganesh.model.Subscription;
import com.ganesh.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUserSubscription(Long userId)throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}

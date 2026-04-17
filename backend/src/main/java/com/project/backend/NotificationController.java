package com.project.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/notifications")
public class NotificationController {

    private List<Notification> notifications = new ArrayList<>();

    // 👉 Add notification
    @PostMapping
    public void addNotification(@RequestBody Notification notification) {
        notifications.add(notification);
    }

    // 👉 Get notifications for user
    @GetMapping("/{user}")
    public List<Notification> getUserNotifications(@PathVariable String user) {
        return notifications.stream()
                .filter(n -> n.getUser().equals(user))
                .toList();
    }
}
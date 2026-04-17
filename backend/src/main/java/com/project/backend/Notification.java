package com.project.backend;

public class Notification {

    private String message;
    private String user;

    public Notification(String message, String user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public String getUser() {
        return user;
    }
}
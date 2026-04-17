package com.project.backend;

public class Product {

    private int id;
    private String name;
    private double price;
    private String imageUrl;

    // ✅ UPDATED CONSTRUCTOR
    public Product(int id, String name, double price, String imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // GETTERS

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // SETTER (optional but good)
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
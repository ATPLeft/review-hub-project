package com.project.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getProducts() {

        List<Product> products = new ArrayList<>();

        products.add(new Product(1, "Laptop", 50000,
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"));

        products.add(new Product(2, "Mobile", 20000,
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"));

        products.add(new Product(3, "Headphones", 3000,
                "https://images.unsplash.com/photo-1518441902110-9f3f8b66d6d8"));

        products.add(new Product(4, "Smart Watch", 5000,
                "https://images.unsplash.com/photo-1517433456452-f9633a875f6f"));

        products.add(new Product(5, "Keyboard", 1500,
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c"));

        products.add(new Product(6, "Mouse", 800,
                "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"));

        products.add(new Product(7, "Gaming Chair", 12000,
                "https://images.unsplash.com/photo-1582582494700-f9f9d61d5c2b"));

        products.add(new Product(8, "Tablet", 25000,
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3"));

        products.add(new Product(9, "Bluetooth Speaker", 4000,
                "https://images.unsplash.com/photo-1585386959984-a4155224a1f9"));

        products.add(new Product(10, "Camera", 45000,
                "https://images.unsplash.com/photo-1519183071298-a2962e402c5d"));

        return products;
    }
}
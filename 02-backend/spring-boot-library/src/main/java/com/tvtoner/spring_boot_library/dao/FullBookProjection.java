package com.tvtoner.spring_boot_library.dao;

import org.springframework.data.rest.core.config.Projection;

import com.tvtoner.spring_boot_library.entity.Book;

@Projection(name = "fullBook", types = Book.class)
public interface FullBookProjection {

    long getId();

    String getTitle();

    String getAuthor();

    String getDescription();

    int getCopies();

    int getCopiesAvailable();

    String getCategory();

    String getImg();
}

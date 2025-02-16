package com.tvtoner.spring_boot_library.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.tvtoner.spring_boot_library.entity.Book;

@RepositoryRestResource(excerptProjection = FullBookProjection.class)
public interface BookRepository extends JpaRepository<Book, Long> {

}

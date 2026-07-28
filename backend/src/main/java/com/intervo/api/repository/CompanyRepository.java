package com.intervo.api.repository;

import com.intervo.api.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Company> findAllByOrderByNameAsc();
}

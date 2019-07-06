package es.emilio.repository;

import es.emilio.domain.Departamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Departamento entity.
 */
@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {

    @Query(value = "select distinct departamento from Departamento departamento left join fetch departamento.tareas",
        countQuery = "select count(distinct departamento) from Departamento departamento")
    Page<Departamento> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct departamento from Departamento departamento left join fetch departamento.tareas")
    List<Departamento> findAllWithEagerRelationships();

    @Query("select departamento from Departamento departamento left join fetch departamento.tareas where departamento.id =:id")
    Optional<Departamento> findOneWithEagerRelationships(@Param("id") Long id);

}

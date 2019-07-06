package es.emilio.service;

import es.emilio.domain.Tarea;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Tarea}.
 */
public interface TareaService {

    /**
     * Save a tarea.
     *
     * @param tarea the entity to save.
     * @return the persisted entity.
     */
    Tarea save(Tarea tarea);

    /**
     * Get all the tareas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Tarea> findAll(Pageable pageable);


    /**
     * Get the "id" tarea.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Tarea> findOne(Long id);

    /**
     * Delete the "id" tarea.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

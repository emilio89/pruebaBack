package es.emilio.service.impl;

import es.emilio.service.EmpresaService;
import es.emilio.domain.Empresa;
import es.emilio.repository.EmpresaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Empresa}.
 */
@Service
@Transactional
public class EmpresaServiceImpl implements EmpresaService {

    private final Logger log = LoggerFactory.getLogger(EmpresaServiceImpl.class);

    private final EmpresaRepository empresaRepository;

    public EmpresaServiceImpl(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    /**
     * Save a empresa.
     *
     * @param empresa the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Empresa save(Empresa empresa) {
        log.debug("Request to save Empresa : {}", empresa);
        return empresaRepository.save(empresa);
    }

    /**
     * Get all the empresas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Empresa> findAll() {
        log.debug("Request to get all Empresas");
        return empresaRepository.findAll();
    }


    /**
     * Get one empresa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Empresa> findOne(Long id) {
        log.debug("Request to get Empresa : {}", id);
        return empresaRepository.findById(id);
    }

    /**
     * Delete the empresa by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Empresa : {}", id);
        empresaRepository.deleteById(id);
    }
}

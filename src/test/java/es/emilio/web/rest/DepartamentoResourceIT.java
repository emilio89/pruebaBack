package es.emilio.web.rest;

import es.emilio.PruebaBackApp;
import es.emilio.domain.Departamento;
import es.emilio.repository.DepartamentoRepository;
import es.emilio.service.DepartamentoService;
import es.emilio.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static es.emilio.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link DepartamentoResource} REST controller.
 */
@SpringBootTest(classes = PruebaBackApp.class)
public class DepartamentoResourceIT {

    private static final String DEFAULT_NOMBRE_DEPARTAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_DEPARTAMENTO = "BBBBBBBBBB";

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Mock
    private DepartamentoRepository departamentoRepositoryMock;

    @Mock
    private DepartamentoService departamentoServiceMock;

    @Autowired
    private DepartamentoService departamentoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDepartamentoMockMvc;

    private Departamento departamento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DepartamentoResource departamentoResource = new DepartamentoResource(departamentoService);
        this.restDepartamentoMockMvc = MockMvcBuilders.standaloneSetup(departamentoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Departamento createEntity(EntityManager em) {
        Departamento departamento = new Departamento()
            .nombreDepartamento(DEFAULT_NOMBRE_DEPARTAMENTO);
        return departamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Departamento createUpdatedEntity(EntityManager em) {
        Departamento departamento = new Departamento()
            .nombreDepartamento(UPDATED_NOMBRE_DEPARTAMENTO);
        return departamento;
    }

    @BeforeEach
    public void initTest() {
        departamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartamento() throws Exception {
        int databaseSizeBeforeCreate = departamentoRepository.findAll().size();

        // Create the Departamento
        restDepartamentoMockMvc.perform(post("/api/departamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departamento)))
            .andExpect(status().isCreated());

        // Validate the Departamento in the database
        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Departamento testDepartamento = departamentoList.get(departamentoList.size() - 1);
        assertThat(testDepartamento.getNombreDepartamento()).isEqualTo(DEFAULT_NOMBRE_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void createDepartamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departamentoRepository.findAll().size();

        // Create the Departamento with an existing ID
        departamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartamentoMockMvc.perform(post("/api/departamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departamento)))
            .andExpect(status().isBadRequest());

        // Validate the Departamento in the database
        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreDepartamentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = departamentoRepository.findAll().size();
        // set the field null
        departamento.setNombreDepartamento(null);

        // Create the Departamento, which fails.

        restDepartamentoMockMvc.perform(post("/api/departamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departamento)))
            .andExpect(status().isBadRequest());

        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartamentos() throws Exception {
        // Initialize the database
        departamentoRepository.saveAndFlush(departamento);

        // Get all the departamentoList
        restDepartamentoMockMvc.perform(get("/api/departamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreDepartamento").value(hasItem(DEFAULT_NOMBRE_DEPARTAMENTO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDepartamentosWithEagerRelationshipsIsEnabled() throws Exception {
        DepartamentoResource departamentoResource = new DepartamentoResource(departamentoServiceMock);
        when(departamentoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restDepartamentoMockMvc = MockMvcBuilders.standaloneSetup(departamentoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDepartamentoMockMvc.perform(get("/api/departamentos?eagerload=true"))
        .andExpect(status().isOk());

        verify(departamentoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDepartamentosWithEagerRelationshipsIsNotEnabled() throws Exception {
        DepartamentoResource departamentoResource = new DepartamentoResource(departamentoServiceMock);
            when(departamentoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restDepartamentoMockMvc = MockMvcBuilders.standaloneSetup(departamentoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDepartamentoMockMvc.perform(get("/api/departamentos?eagerload=true"))
        .andExpect(status().isOk());

            verify(departamentoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDepartamento() throws Exception {
        // Initialize the database
        departamentoRepository.saveAndFlush(departamento);

        // Get the departamento
        restDepartamentoMockMvc.perform(get("/api/departamentos/{id}", departamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(departamento.getId().intValue()))
            .andExpect(jsonPath("$.nombreDepartamento").value(DEFAULT_NOMBRE_DEPARTAMENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDepartamento() throws Exception {
        // Get the departamento
        restDepartamentoMockMvc.perform(get("/api/departamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartamento() throws Exception {
        // Initialize the database
        departamentoService.save(departamento);

        int databaseSizeBeforeUpdate = departamentoRepository.findAll().size();

        // Update the departamento
        Departamento updatedDepartamento = departamentoRepository.findById(departamento.getId()).get();
        // Disconnect from session so that the updates on updatedDepartamento are not directly saved in db
        em.detach(updatedDepartamento);
        updatedDepartamento
            .nombreDepartamento(UPDATED_NOMBRE_DEPARTAMENTO);

        restDepartamentoMockMvc.perform(put("/api/departamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartamento)))
            .andExpect(status().isOk());

        // Validate the Departamento in the database
        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeUpdate);
        Departamento testDepartamento = departamentoList.get(departamentoList.size() - 1);
        assertThat(testDepartamento.getNombreDepartamento()).isEqualTo(UPDATED_NOMBRE_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartamento() throws Exception {
        int databaseSizeBeforeUpdate = departamentoRepository.findAll().size();

        // Create the Departamento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepartamentoMockMvc.perform(put("/api/departamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departamento)))
            .andExpect(status().isBadRequest());

        // Validate the Departamento in the database
        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDepartamento() throws Exception {
        // Initialize the database
        departamentoService.save(departamento);

        int databaseSizeBeforeDelete = departamentoRepository.findAll().size();

        // Delete the departamento
        restDepartamentoMockMvc.perform(delete("/api/departamentos/{id}", departamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Departamento> departamentoList = departamentoRepository.findAll();
        assertThat(departamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Departamento.class);
        Departamento departamento1 = new Departamento();
        departamento1.setId(1L);
        Departamento departamento2 = new Departamento();
        departamento2.setId(departamento1.getId());
        assertThat(departamento1).isEqualTo(departamento2);
        departamento2.setId(2L);
        assertThat(departamento1).isNotEqualTo(departamento2);
        departamento1.setId(null);
        assertThat(departamento1).isNotEqualTo(departamento2);
    }
}

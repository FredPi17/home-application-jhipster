package com.fred.homeapp.web.rest;

import com.fred.homeapp.HomeApplicationApp;

import com.fred.homeapp.domain.Courbes;
import com.fred.homeapp.repository.CourbesRepository;
import com.fred.homeapp.service.CourbesService;
import com.fred.homeapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.fred.homeapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CourbesResource REST controller.
 *
 * @see CourbesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HomeApplicationApp.class)
public class CourbesResourceIntTest {

    @Autowired
    private CourbesRepository courbesRepository;

    @Autowired
    private CourbesService courbesService;

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

    private MockMvc restCourbesMockMvc;

    private Courbes courbes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourbesResource courbesResource = new CourbesResource(courbesService);
        this.restCourbesMockMvc = MockMvcBuilders.standaloneSetup(courbesResource)
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
    public static Courbes createEntity(EntityManager em) {
        Courbes courbes = new Courbes();
        return courbes;
    }

    @Before
    public void initTest() {
        courbes = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourbes() throws Exception {
        int databaseSizeBeforeCreate = courbesRepository.findAll().size();

        // Create the Courbes
        restCourbesMockMvc.perform(post("/api/courbes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courbes)))
            .andExpect(status().isCreated());

        // Validate the Courbes in the database
        List<Courbes> courbesList = courbesRepository.findAll();
        assertThat(courbesList).hasSize(databaseSizeBeforeCreate + 1);
        Courbes testCourbes = courbesList.get(courbesList.size() - 1);
    }

    @Test
    @Transactional
    public void createCourbesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courbesRepository.findAll().size();

        // Create the Courbes with an existing ID
        courbes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourbesMockMvc.perform(post("/api/courbes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courbes)))
            .andExpect(status().isBadRequest());

        // Validate the Courbes in the database
        List<Courbes> courbesList = courbesRepository.findAll();
        assertThat(courbesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCourbes() throws Exception {
        // Initialize the database
        courbesRepository.saveAndFlush(courbes);

        // Get all the courbesList
        restCourbesMockMvc.perform(get("/api/courbes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courbes.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCourbes() throws Exception {
        // Initialize the database
        courbesRepository.saveAndFlush(courbes);

        // Get the courbes
        restCourbesMockMvc.perform(get("/api/courbes/{id}", courbes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courbes.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCourbes() throws Exception {
        // Get the courbes
        restCourbesMockMvc.perform(get("/api/courbes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourbes() throws Exception {
        // Initialize the database
        courbesService.save(courbes);

        int databaseSizeBeforeUpdate = courbesRepository.findAll().size();

        // Update the courbes
        Courbes updatedCourbes = courbesRepository.findById(courbes.getId()).get();
        // Disconnect from session so that the updates on updatedCourbes are not directly saved in db
        em.detach(updatedCourbes);

        restCourbesMockMvc.perform(put("/api/courbes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourbes)))
            .andExpect(status().isOk());

        // Validate the Courbes in the database
        List<Courbes> courbesList = courbesRepository.findAll();
        assertThat(courbesList).hasSize(databaseSizeBeforeUpdate);
        Courbes testCourbes = courbesList.get(courbesList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCourbes() throws Exception {
        int databaseSizeBeforeUpdate = courbesRepository.findAll().size();

        // Create the Courbes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourbesMockMvc.perform(put("/api/courbes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courbes)))
            .andExpect(status().isBadRequest());

        // Validate the Courbes in the database
        List<Courbes> courbesList = courbesRepository.findAll();
        assertThat(courbesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourbes() throws Exception {
        // Initialize the database
        courbesService.save(courbes);

        int databaseSizeBeforeDelete = courbesRepository.findAll().size();

        // Delete the courbes
        restCourbesMockMvc.perform(delete("/api/courbes/{id}", courbes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Courbes> courbesList = courbesRepository.findAll();
        assertThat(courbesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Courbes.class);
        Courbes courbes1 = new Courbes();
        courbes1.setId(1L);
        Courbes courbes2 = new Courbes();
        courbes2.setId(courbes1.getId());
        assertThat(courbes1).isEqualTo(courbes2);
        courbes2.setId(2L);
        assertThat(courbes1).isNotEqualTo(courbes2);
        courbes1.setId(null);
        assertThat(courbes1).isNotEqualTo(courbes2);
    }
}

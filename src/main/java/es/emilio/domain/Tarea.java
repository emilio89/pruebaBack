package es.emilio.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tarea.
 */
@Entity
@Table(name = "tarea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tarea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToMany(mappedBy = "tareas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Departamento> departamentos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Tarea titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Tarea descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Departamento> getDepartamentos() {
        return departamentos;
    }

    public Tarea departamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
        return this;
    }

    public Tarea addDepartamento(Departamento departamento) {
        this.departamentos.add(departamento);
        departamento.getTareas().add(this);
        return this;
    }

    public Tarea removeDepartamento(Departamento departamento) {
        this.departamentos.remove(departamento);
        departamento.getTareas().remove(this);
        return this;
    }

    public void setDepartamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tarea)) {
            return false;
        }
        return id != null && id.equals(((Tarea) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tarea{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}

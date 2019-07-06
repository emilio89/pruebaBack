package es.emilio.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Departamento.
 */
@Entity
@Table(name = "departamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Departamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_departamento", nullable = false)
    private String nombreDepartamento;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "departamento")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Empleado> empleados = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "departamento_tarea",
               joinColumns = @JoinColumn(name = "departamento_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tarea_id", referencedColumnName = "id"))
    private Set<Tarea> tareas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("departamentos")
    private Empresa empresa;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDepartamento() {
        return nombreDepartamento;
    }

    public Departamento nombreDepartamento(String nombreDepartamento) {
        this.nombreDepartamento = nombreDepartamento;
        return this;
    }

    public void setNombreDepartamento(String nombreDepartamento) {
        this.nombreDepartamento = nombreDepartamento;
    }

    public Set<Empleado> getEmpleados() {
        return empleados;
    }

    public Departamento empleados(Set<Empleado> empleados) {
        this.empleados = empleados;
        return this;
    }

    public Departamento addEmpleado(Empleado empleado) {
        this.empleados.add(empleado);
        empleado.setDepartamento(this);
        return this;
    }

    public Departamento removeEmpleado(Empleado empleado) {
        this.empleados.remove(empleado);
        empleado.setDepartamento(null);
        return this;
    }

    public void setEmpleados(Set<Empleado> empleados) {
        this.empleados = empleados;
    }

    public Set<Tarea> getTareas() {
        return tareas;
    }

    public Departamento tareas(Set<Tarea> tareas) {
        this.tareas = tareas;
        return this;
    }

    public Departamento addTarea(Tarea tarea) {
        this.tareas.add(tarea);
        tarea.getDepartamentos().add(this);
        return this;
    }

    public Departamento removeTarea(Tarea tarea) {
        this.tareas.remove(tarea);
        tarea.getDepartamentos().remove(this);
        return this;
    }

    public void setTareas(Set<Tarea> tareas) {
        this.tareas = tareas;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public Departamento empresa(Empresa empresa) {
        this.empresa = empresa;
        return this;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Departamento)) {
            return false;
        }
        return id != null && id.equals(((Departamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Departamento{" +
            "id=" + getId() +
            ", nombreDepartamento='" + getNombreDepartamento() + "'" +
            "}";
    }
}

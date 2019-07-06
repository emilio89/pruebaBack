package es.emilio.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_empleado", nullable = false)
    private Long idEmpleado;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "salario")
    private Integer salario;

    @Column(name = "apellido")
    private String apellido;

    @ManyToOne
    @JsonIgnoreProperties("empleados")
    private Departamento departamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdEmpleado() {
        return idEmpleado;
    }

    public Empleado idEmpleado(Long idEmpleado) {
        this.idEmpleado = idEmpleado;
        return this;
    }

    public void setIdEmpleado(Long idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public Empleado nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getSalario() {
        return salario;
    }

    public Empleado salario(Integer salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Integer salario) {
        this.salario = salario;
    }

    public String getApellido() {
        return apellido;
    }

    public Empleado apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public Empleado departamento(Departamento departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", idEmpleado=" + getIdEmpleado() +
            ", nombre='" + getNombre() + "'" +
            ", salario=" + getSalario() +
            ", apellido='" + getApellido() + "'" +
            "}";
    }
}

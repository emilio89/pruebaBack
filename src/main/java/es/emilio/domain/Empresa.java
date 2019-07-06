package es.emilio.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Empresa.
 */
@Entity
@Table(name = "empresa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_empresa")
    private String nombreEmpresa;

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Departamento> departaments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public Empresa nombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
        return this;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public Set<Departamento> getDepartaments() {
        return departaments;
    }

    public Empresa departaments(Set<Departamento> departamentos) {
        this.departaments = departamentos;
        return this;
    }

    public Empresa addDepartament(Departamento departamento) {
        this.departaments.add(departamento);
        departamento.setEmpresa(this);
        return this;
    }

    public Empresa removeDepartament(Departamento departamento) {
        this.departaments.remove(departamento);
        departamento.setEmpresa(null);
        return this;
    }

    public void setDepartaments(Set<Departamento> departamentos) {
        this.departaments = departamentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", nombreEmpresa='" + getNombreEmpresa() + "'" +
            "}";
    }
}

# Kudu: Creación de Tablas 🐐

Apache Kudu es un almacén analítico optimizado para cargas de trabajo de lectura/escritura concurrente en tiempo real. Crearemos dos tablas: una de referencia con los metadatos de las plantas de ICE, y una de resultados donde Flink almacenará los datos enriquecidos.

Abre **Hue** desde el Real-time Data Mart DataHub → Quick Links:

![Hue Data Explorer Link](../../assets/images/lab_images/lab1/image42.png)

---

## Tabla 1 — Referencia de medidores eléctricos

Esta tabla contiene los metadatos estáticos de las plantas de generación de ICE:

```sql
USE default;

DROP TABLE IF EXISTS default.USERNAME_electric_meter_sites;

CREATE TABLE USERNAME_electric_meter_sites (
  meter_id           STRING,
  site               STRING,
  latitude           DOUBLE,
  longitude          DOUBLE,
  utility_provider   STRING,
  voltage_level      STRING,
  installation_year  INT,
  region             STRING,
  status             STRING,
  peak_demand_kw     DOUBLE,
  PRIMARY KEY (meter_id)
)
PARTITION BY HASH PARTITIONS 4
STORED AS KUDU;
```

Inserta los datos de las plantas de ICE:

```sql
INSERT INTO default.USERNAME_electric_meter_sites VALUES
  ('CR-ICE-REV-001', 'Reventazon',  9.9200,  -83.4900, 'ICE', 'High Voltage',   2016, 'Caribe',       'Active',      15.2),
  ('CR-ICE-ARE-002', 'Arenal',     10.7667, -84.9833, 'ICE', 'High Voltage',   2019, 'Huetar Norte', 'Active',      18.4),
  ('CR-ICE-CAC-003', 'Cachi',       9.8333, -83.7500, 'ICE', 'Medium Voltage', 2017, 'Central',      'Maintenance', 12.7),
  ('CR-ICE-TEJ-004', 'Tejona',     10.7333, -85.5167, 'ICE', 'Low Voltage',    2020, 'Guanacaste',   'Active',      16.9);
```

---

## Tabla 2 — Resultados enriquecidos (output de Flink)

Esta tabla recibirá el output del job de SQL Stream Builder en tiempo real:

```sql
USE default;

DROP TABLE IF EXISTS default.USERNAME_electric_meter_enriched_kudu;

CREATE TABLE USERNAME_electric_meter_enriched_kudu (
  event_time              TIMESTAMP,
  meter_id                STRING,
  site                    STRING,
  latitude                DOUBLE,
  longitude               DOUBLE,
  voltage_v               DOUBLE,
  current_a               DOUBLE,
  frequency_hz            DOUBLE,
  power_factor            DOUBLE,
  active_power_kw         DOUBLE,
  reactive_power_kvar     DOUBLE,
  apparent_power_kva      DOUBLE,
  energy_kwh_cumulative   DOUBLE,
  anomaly                 STRING,
  utility_provider        STRING,
  voltage_level           STRING,
  installation_year       INT,
  region                  STRING,
  meter_status            STRING,
  distance                DOUBLE,
  PRIMARY KEY (event_time, meter_id)
)
PARTITION BY HASH PARTITIONS 8
STORED AS KUDU;
```

!!! tip "Tip"
    Recuerda reemplazar `USERNAME` con tu usuario asignado (ej. `user001`). Si configuraste el selector de usuario en la página de inicio, los bloques de código ya están actualizados automáticamente.

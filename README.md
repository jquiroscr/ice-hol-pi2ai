# Introducción y Prerrequisitos 🪖

## Introducción

En este laboratorio aprenderás a construir un pipeline completo de analítica en tiempo real utilizando datos de medidores eléctricos similares a los empleados por el Instituto Costarricense de Electricidad (ICE). El escenario simula la ingesta de telemetría desde el edge hasta el almacenamiento y consulta analítica, replicando una arquitectura real de *Data in Motion*.

![Arquitectura del pipeline](../../assets/images/lab_images/lab1/image47.png)

!!! tip "Objetivo del Lab"
    Al finalizar, cada participante habrá construido un pipeline funcional de extremo a extremo capaz de:

    - Recibir telemetría eléctrica en tiempo real desde un broker MQTT
    - Publicar y validar los mensajes contra un schema Avro en el Schema Registry
    - Enriquecer los datos de stream con información de referencia en Kudu
    - Consultar los resultados en tiempo real mediante SQL analítico

---

## 1.1 Configuración del Workload Password

El Workload Password es la contraseña que utilizarás para autenticarte en todos los servicios de la plataforma CDP (NiFi, Kafka, Kudu, SSB, Hue, etc.). Es importante configurarla antes de continuar.

**Paso 1** — Accede a tu perfil en CDP Public Cloud con las credenciales proporcionadas por el instructor:

![Perfil CDP](../../assets/images/lab_images/lab1/image43.png)

**Paso 2** — Haz clic en **Set Workload Password**:

![Set Workload Password](../../assets/images/lab_images/lab1/image16.png)

![Confirmar password](../../assets/images/lab_images/lab1/image63.png)

!!! warning "Importante"
    Esta contraseña se utilizará en todos los servicios del lab. Usa el user_id asignado por el instructor (ej. `user001`).

---

## 1.2 DataHubs requeridos

Los siguientes DataHubs deben estar en estado **Running** antes de iniciar el lab:

| DataHub | Servicios |
|---|---|
| Streams Messaging DataHub | `kafka-grupo-ice` |
| Real Time Data Mart DataHub | `kudu-grupo-ice` |
| Cloudera Streaming Analytics | `flink-grupo-ice` |

!!! warning "Nota para el Facilitador"
    Los tres DataHubs deben estar provisionados con al menos 48 horas de anticipación. Verificar que todos los participantes tengan permisos de MLUser o superior en el entorno CDP asignado.

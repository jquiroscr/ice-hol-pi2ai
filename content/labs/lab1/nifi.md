# Apache NiFi 💧

Apache NiFi es la plataforma de integración de datos de CDP. Utilizaremos el servicio **Dataflow Kubernetes (CDF-K)** para desplegar un flujo preconfigurado que lee mensajes MQTT, los valida contra el schema Avro y los publica en Kafka.

---

## 3.1 Desplegar el flujo desde el Catalog

### Paso 1 — Acceder al Dataflow

Desde el menú principal de CDP navega al servicio **Dataflow**:

![Dataflow](../../assets/images/lab_images/lab1/image13.png)

---

### Paso 2 — Localizar el flujo sensor-pi-flow

En el Catalog busca el flujo **sensor-pi-flow**:

![Catalog](../../assets/images/lab_images/lab1/image15.png)

![Flow Detail](../../assets/images/lab_images/lab1/image66.png)

---

### Paso 3 — Crear un nuevo Deployment

Haz clic en **Deploy** → **Create New Deployment**:

![Deploy Button](../../assets/images/lab_images/lab1/image25.png)

![Deployment Config](../../assets/images/lab_images/lab1/image49.png)

---

### Paso 4 — Configurar parámetros

En el campo **Deployment Name** usa tu user_id:

```
USERNAME-sensor-pi-flow
```

Desactiva **"Automatically start the flow"** y haz clic en **Next**:

![Deployment Name](../../assets/images/lab_images/lab1/image33.png)

Actualiza los parámetros del flujo. El campo **Schema_Name** debe ser:

```
USERNAME-SensorReading
```

![Parameters](../../assets/images/lab_images/lab1/image59.png)

![Schema Name](../../assets/images/lab_images/lab1/image60.png)

Haz clic en **Apply** y luego **Next**:

![Apply Parameters](../../assets/images/lab_images/lab1/image27.png)

!!! warning "Parámetros críticos"
    - **Schema_Name**: `USERNAME-SensorReading`
    - **Kafka Broker**: URL del broker de tu Streams Messaging DataHub
    - **MQTT Broker**: `tcp://{{ vm_ip }}:1883`

---

### Paso 5 — Sizing y despliegue

Los valores de Sizing y KPIs pueden dejarse en sus valores predeterminados:

![Sizing](../../assets/images/lab_images/lab1/image28.png)

Revisa el resumen y haz clic en **Deploy**:

![Deploying](../../assets/images/lab_images/lab1/image50.png)

![Deploy Review](../../assets/images/lab_images/lab1/image26.png)

Una vez completado, verás el estado en **verde** en el dashboard:

![Green Status](../../assets/images/lab_images/lab1/image14.png)

---

### Paso 6 — Explorar el Canvas de NiFi

Ve a **Actions** → **View in NiFi**:

![View in NiFi](../../assets/images/lab_images/lab1/image58.png)

Haz doble clic en el Processor Group:

![Processor Group](../../assets/images/lab_images/lab1/image65.png)

Haz doble clic en el processor **Enviar Dato**:

![Enviar Dato](../../assets/images/lab_images/lab1/image11.png)

En el processor **PublishKafkaRecord**, haz clic derecho → **Data Provenance** para ver el linaje:

![Data Provenance](../../assets/images/lab_images/lab1/image12.png)

![Provenance Line](../../assets/images/lab_images/lab1/image52.png)

![Record Detail](../../assets/images/lab_images/lab1/image23.jpg)

![Record Structure](../../assets/images/lab_images/lab1/image32.png)

![Lineage](../../assets/images/lab_images/lab1/image45.png)

---

## 3.2 Verificar datos en SMM

Desde el menú principal: **Environment** → **ice-hol-cdp-env** → **DataHubs** → **Kafka-grupo-ice**:

![SMM Navigation](../../assets/images/lab_images/lab1/image29.png)

Busca tu topic en **Topics**:

![Topics List](../../assets/images/lab_images/lab1/image9.png)

![Topic Icon](../../assets/images/lab_images/lab1/image57.png)

Haz clic en estadísticas del topic:

![Throughput](../../assets/images/lab_images/lab1/image41.png)

![Metrics](../../assets/images/lab_images/lab1/image64.png)

En el **Data Explorer** verás los mensajes fluyendo en tiempo real:

![Data Explorer](../../assets/images/lab_images/lab1/image62.png)

!!! success "¡Checkpoint!"
    Si ves mensajes en el Data Explorer, el pipeline NiFi → Kafka está funcionando correctamente. Puedes continuar con la creación de las tablas en Kudu.

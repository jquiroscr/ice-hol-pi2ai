# HOL — PI Systems 2 AI · Grupo ICE Costa Rica

Hands on Lab: NiFi · Kafka · Flink · Kudu

## Publicar la guía localmente

```bash
python3 -m venv ~/mkdocs_venv
source ~/mkdocs_venv/bin/activate
cd instructor/mkdocs
pip install -r requirements.txt
mkdocs serve
```

Abre `http://127.0.0.1:8000` en tu navegador.

## Publicar a GitHub Pages

```bash
mkdocs gh-deploy -r origin --no-history
```

La guía quedará disponible en: `https://<tu-org>.github.io/<repo>/`

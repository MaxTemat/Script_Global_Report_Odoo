{
    "name": "Script Global Report",
    "version": "19.0.1.0.0",
    "category": "Technical",
    "website": "https://github.com/MaxTemat?tab=repositories",
    "summary": "Gestion globale des options d'impression des rapports",
    "description": """
Script Global Report
====================

Ajoute une fenêtre de choix lors de l'impression d'un rapport :

- Imprimer
- Télécharger en PDF
- Ouvrir dans le navigateur

Le module est conçu pour fonctionner globalement avec les rapports Odoo.
""",
    "author": "SCRIPT CONSULTING",
    "license": "LGPL-3",
    "depends": [
        "web",
    ],
    "data": [
    ],
    "assets": {
        "web.assets_backend": [
            "script_global_report/static/src/css/report_print_dialog.css",
            "script_global_report/static/src/js/report_print_dialog.js",
            "script_global_report/static/src/xml/report_print_dialog.xml",
        ],
    },
    "installable": True,
    "application": False,
}
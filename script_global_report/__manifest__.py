{
    "name": "Script Global Report",
    "version": "19.0.1.0.0",
    "category": "Technical",
    "website": "https://github.com/MaxTemat/Script_Global_Report_Odoo",
    "summary": "A choice window for every report: print, download as PDF or open in the browser",
    "description": """
Script Global Report
====================

Adds a choice window when you print any Odoo report:

- Print (direct printing)
- Download as PDF
- Open in the browser

The module works globally with all the Odoo PDF and HTML reports.
English and French translations included.
""",
    "author": "SCRIPT CONSULTING",
    "maintainer": "SCRIPT CONSULTING",
    "license": "LGPL-3",
    "depends": [
        "web",
    ],
    "data": [
    ],
    "images": [
        "static/description/screenshot_1_print_dialog.png",
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

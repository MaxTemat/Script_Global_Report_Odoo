/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

/**
 * ============================================================
 * Dialogue global des rapports
 * ============================================================
 */

class ScriptGlobalReportDialog extends Component {

    static template = "script_global_report.ReportPrintDialog";

    static components = {
        Dialog,
    };

    setup() {
        this.report = this.props.report;
    }

    close() {
        this.props.close();
    }

    /**
     * Imprimer
     */
    print() {
        const url = this._getUrl("pdf");

        const win = window.open(
            url,
            "_blank",
            "width=1200,height=900,resizable=yes,scrollbars=yes"
        );

        if (win) {
            win.focus();

            win.onload = () => {
                win.print();
            };
        }

        this.close();
    }

    /**
     * Télécharger le PDF
     */
    download() {
        const url = this._getUrl("pdf");

        const link = document.createElement("a");

        link.href = url;
        link.download = "";

        document.body.appendChild(link);
        link.click();
        link.remove();

        this.close();
    }

    /**
     * Ouvrir dans le navigateur
     */
    openBrowser() {
        const url = this._getUrl("html");

        window.open(
            url,
            "_blank"
        );

        this.close();
    }

    /**
     * Construction de l'URL du rapport.
     */
    _getUrl(type) {
        const reportName = this.report.report_name;
        const recordIds = this.report.record_ids || [];

        let url = `/report/${type}/${reportName}`;

        if (recordIds.length) {
            url += `/${recordIds.join(",")}`;
        }

        return url;
    }
}

/**
 * Récupération des IDs concernés par le rapport.
 */
function getReportRecordIds(action) {

    if (action.context?.active_ids) {
        return action.context.active_ids;
    }

    if (action.res_ids) {
        return action.res_ids;
    }

    if (action.res_id) {
        return [action.res_id];
    }

    return [];
}

/**
 * ============================================================
 * Handler global pour les ir.actions.report
 * ============================================================
 *
 * Depuis Odoo 15 (OWL), l'ActionService n'est plus une classe
 * patchable : il est construit par une fonction fermée
 * (makeActionManager) dans action_service.js. Le point d'extension
 * officiel pour intercepter TOUS les rapports avant leur exécution
 * normale est le registre "ir.actions.report handlers", consulté
 * par _executeReportAction avant le comportement par défaut.
 *
 * Retourner une valeur "truthy" empêche Odoo d'exécuter le
 * comportement natif (ouverture directe du PDF/HTML).
 */
registry.category("ir.actions.report handlers").add(
    "script_global_report.print_dialog",
    async (action, options, env) => {
        // Seuls les rapports imprimables (PDF/HTML) déclenchent la fenêtre
        // de choix ; les autres types (ex: qweb-text) suivent le
        // comportement natif d'Odoo.
        if (!["qweb-pdf", "qweb-html"].includes(action.report_type)) {
            return false;
        }

        const report = {
            id: action.id,
            report_name: action.report_name,
            report_type: action.report_type,
            record_ids: getReportRecordIds(action),
            data: action.data || {},
        };

        env.services.dialog.add(ScriptGlobalReportDialog, {
            report,
            close: () => {},
        });

        return true;
    }
);

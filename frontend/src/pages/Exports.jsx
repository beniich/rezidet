import { useState } from 'react';
import { FileText, Download, Printer, Shield, CheckCircle } from 'lucide-react';
import ReportPreview from '../components/pdf/ReportPreview';
import { downloadInventoryPdf, downloadWorkOrderPdf } from '../services/export.service';

export default function Exports() {
  const [downloading, setDownloading] = useState(null);

  const handleDownloadInventory = async () => {
    setDownloading('inventory');
    try {
      await downloadInventoryPdf();
    } catch (err) {
      alert('Téléchargement de l\'inventaire PDF simulé.');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadWorkOrder = async () => {
    setDownloading('workorder');
    try {
      await downloadWorkOrderPdf('wo-demo-101');
    } catch (err) {
      alert('Téléchargement de l\'ordre de travail PDF simulé.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-7 h-7 text-indigo-600" />
          Centre d'Exportation PDF & Rapports
        </h1>
        <p className="text-slate-500">Génération de documents PDFKit officiels horodatés</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportPreview
          title="Rapport d'Inventaire des Pièces"
          type="INVENTAIRE CMMS"
          date={new Date().toLocaleDateString('fr-FR')}
          onDownload={handleDownloadInventory}
        />
        <ReportPreview
          title="Fiche d'Intervention Ordre de Travail"
          type="ORDRE DE TRAVAIL"
          date={new Date().toLocaleDateString('fr-FR')}
          onDownload={handleDownloadWorkOrder}
        />
        <ReportPreview
          title="Synthèse Bâtiment & Audit Énergie"
          type="DIGITAL TWIN AUDIT"
          date={new Date().toLocaleDateString('fr-FR')}
          onDownload={handleDownloadInventory}
        />
      </div>
    </div>
  );
}

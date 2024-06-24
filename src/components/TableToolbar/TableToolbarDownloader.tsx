import { TableDataModel, TableRowModel } from "../../types/table.types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FileStatus } from "../../types/file.types";
import { UUID } from "../../types/table.types";
import DownloadIcon from "../../assets/file-download.svg";
import { getSelectedIds } from "./TableToolbarSelectAll";

export type PrepareDownloadParams<T> = {
  selectedIds: string[];
  tableRows: TableRowModel<T>[];
};

export const prepareDownloads = <T extends { status: FileStatus }>({
  selectedIds,
  tableRows,
}: PrepareDownloadParams<T>): TableRowModel<T>[] => {
  const testSelected = (id: UUID) => selectedIds.includes(id);
  return tableRows.filter(
    ({ id, status }) => testSelected(id) && status === FileStatus.Available,
  );
};

export type TableToolbarDownloaderProps<T> = {
  tableData: TableDataModel<T>;
};

const DownloadsEmptyContent = () => {
  return (
    <>
      <DialogTitle className="font-bold">
        🏰 Your files are in another castle!
      </DialogTitle>
      <p>
        We didn't find any available downloads for you. Please select at least
        one Available item from the list.
      </p>
    </>
  );
};

// Constrain the downloader to accept a type that includes at least path and status
export const TableToolbarDownloader = <
  T extends { path: string; status: FileStatus },
>({
  tableData,
}: TableToolbarDownloaderProps<T>) => {
  // Prepare available downloads. Starts as an empty array.
  const [downloadableRows, setDownloadableRows] = useState<TableRowModel<T>[]>(
    [],
  );

  const [isOpen, setIsOpen] = useState(false);

  // This useEffect hook runs when `tableData` changes
  useEffect(() => {
    const selectedIds = getSelectedIds(tableData.selected);
    const preparedIds = prepareDownloads({
      selectedIds,
      tableRows: tableData.rows,
    });
    setDownloadableRows([...preparedIds]);
  }, [tableData]);

  /*
  Note on `Dialog`. Why choose `@headlessui/react` for the Downloader dialog?

  Dialogs (or Modals) are very challenging to implement in a fully acessible and aria complaint way.
  Let's choose to offload some of that complexity and focus control to a proven solution.
  A "headless UI" library includes only the accessibility logic. It completely lacks all styling.
  This makes it a perfect fit for this challenge, where we are instructed not to rely too heavily
  on component libraries for styling! 
  */
  return (
    <>
      <button
        onMouseDown={() => setIsOpen(true)}
        data-testid="table-toolbar-download-button"
      >
        <img src={DownloadIcon} alt="Download Icon" className="button-icon" />
        Download Selected
      </button>
      {isOpen ? <div className="dialog-overlay"></div> : null}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="table-toolbar-dialog-root"
      >
        <div className="dialog-panel">
          <DialogPanel className="dialog-panel-inner">
            {downloadableRows.length === 0 ? (
              <DownloadsEmptyContent />
            ) : (
              <>
                <DialogTitle className="font-bold">
                  Available downloads
                </DialogTitle>
                <p>You're about to download from these paths:</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "monospace",
                  }}
                >
                  {downloadableRows.map((row) => (
                    <div key={`download-item-${row.id}`}>{row.path}</div>
                  ))}
                </div>
              </>
            )}
            <div className="dialog-controls">
              <button onMouseDown={() => setIsOpen(false)}>Close</button>
              {downloadableRows.length > 0 ? (
                <button onMouseDown={() => setIsOpen(false)}>
                  Download Files (.zip)
                </button>
              ) : null}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

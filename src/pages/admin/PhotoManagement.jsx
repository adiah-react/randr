import { ExternalLink, ImageIcon, QrCode, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Button } from "../../components/ui/Button";
import { deletePhoto, subscribeToPhotos } from "../../lib/firebaseService";

export function PhotoManagement() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (photo) => {
    setDeletingId(photo.id);
    await deletePhoto(photo.id, photo.storagePath);
    setDeletingId(null);
    setConfirmDelete(null);
    // List updates automatically via the real-time listener
  };

  const uploadUrl = `${window.location.origin}/upload`;

  return (
    <AdminLayout title="Photo Gallery">
      {/* Share / Upload link banner */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-6 mb-6 flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-wedding-gold/10 flex items-center justify-center flex-shrink-0">
            <QrCode size={20} className="text-wedding-gold" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900">Guest Upload Link</h2>
            <p className="text-sm text-gray-500 mt-0 5">
              Share this link (or turn it into a QR code) so guests can add
              their photos.
            </p>
            <code className="text-xs text-wedding-gold mt-1 inline-block break-all">
              {uploadUrl}
            </code>
          </div>
        </div>
        <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="whitespace-nowrap">
            <ExternalLink size={16} className="mr-2" />
            Open Upload Page
          </Button>
        </a>
      </div>

      {/* Photo grid */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon size={20} className="text-wedding-gold" />
            <h2 className="text-lg font-serif text-gray-900">
              Uploaded Photos
            </h2>
          </div>
          <span className="text-sm text-gray-40">
            {photos.length} photo{photos.length === 1 ? "" : "s"}
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse text-gray-400">Loading photos...</div>
          </div>
        ) : photos.length === 0 ? (
          <div className="p-16 text-center">
            <ImageIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No photos yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Photos guests upload will appear here for you to review.
            </p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-sm overflow-hidden border border-gray-100 bg-gray-50"
              >
                <button
                  onClick={() => setLightbox(photo)}
                  className="block w-full"
                  title="View larger"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Photo by ${photo.uploaderName}`}
                    className="w-full aspect-square object-cover group-hover:opacity-90 transition-opacity"
                  />
                </button>

                {/* Info footer */}
                <div className="p-2 5">
                  {photo.caption && (
                    <p className="text-xs text-gray-700 line-clamp-2 mb-1">
                      {photo.caption}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-400 truncate">
                    by {photo.uploaderName}
                  </p>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => setConfirmDelete(photo)}
                  disabled={deletingId === photo.id}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                  title="Delete photo"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>
          <div
            className="max-w-3xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.caption || `Photo by ${lightbox.uploaderName}`}
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
            />
            <div className="text-center text-white mt-4">
              {lightbox.caption && (
                <p className="font-light">{lightbox.caption}</p>
              )}
              <p className="text-sm text-white/60 mt-1">
                - {lightbox.uploaderName}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items_center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative bg-white w-full max-w-sm p-8 rounded-sm shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-serif text-gray-900 mb-2">
              Delete this photo?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently remove the photo uploaded by{" "}
              <span className="font-medium">{confirmDelete.uploaderName}</span>{" "}
              from the gallery. This can&apos;t be undone.
            </p>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 border-red-500"
                onClick={() => handleDelete(confirmDelete)}
                disabled={deletingId === confirmDelete.id}
              >
                {deletingId === confirmDelete.id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

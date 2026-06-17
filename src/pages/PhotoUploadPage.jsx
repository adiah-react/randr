import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  ImageIcon,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { uploadPhoto } from "../lib/firebaseService";

export function PhotoUploadPage() {
  const [uploaderName, setUploaderName] = useState("");
  const [caption, setCaption] = useState("");
  const [selected, setSelected] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError("");
    setSelected({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const clearSelection = () => {
    if (selected) URL.revokeObjectURL(selected.preview);
    setSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selected) return;
    setIsUploading(true);
    setError("");
    const url = await uploadPhoto(selected.file, uploaderName, caption);
    setIsUploading(false);

    if (url) {
      setUploadedCount((c) => c + 1);
      setShowSuccess(true);
      clearSelection();
      setCaption("");
      // Auto-hide success after a moment so they can upload more
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      setError("Something went wrong uploading your photo. Please try again.");
    }
  };

  return (
    <PageTransition className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-12 rounded-full bg-wedding-gold/10 mb-4">
            <Camera className="w-7 h-7 text-wedding-gold" />
          </div>
          <h1 className="text-3xl font-serif text-wedding-black mb-2">
            Share Your Photos
          </h1>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            Help us capture every moment of Rhiannon &amp; Rashaad&apos;s big
            day. Upload your favorite snapshots to our shared gallery!
          </p>
        </div>

        {/* Success Banner */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm flex items-center gap-2 text-sm"
            >
              <Check size={16} />
              Photo uploaded! Thank you so much.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Card */}
        <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-6 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="uploader-name"
              className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
            >
              Your Name
            </label>
            <input
              id="uploader-name"
              type="text"
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              placeholder="e.g. Aunt Mary"
              className="w-full border border-gray-200 rounded-sm py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors text-sm"
            />
          </div>

          {/* File picker / preview */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
              Photo
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              id="photo-input"
            />

            {selected ? (
              <div className="relative rounded-sm overflow-hidden border border-gray-200">
                <img
                  src={selected.preview}
                  alt="Selected preview"
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={clearSelection}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
                  aria-label="Remove photo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="photo-input"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-sm py-12 cursor-pointer hover:border-wedding-gold hover:bg-gray-50 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-gray-300" />
                <span className="text-sm text-gray-500 font-medium">
                  Tap to choose or take a photo
                </span>
                <span className="text-xs text-gray-400">
                  JPG, PNG up to ~10MB
                </span>
              </label>
            )}
          </div>

          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
            >
              Caption{" "}
              <span className="text-gray-300 normal-case">(optional)</span>
            </label>
            <input
              id="caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="A little note about this moment..."
              className="w-full border border-gray-200 rounded-sm py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 flex items-center gap-1 5">
              <X size={14} /> {error}
            </p>
          )}

          {/* Upload button */}
          <Button
            onClick={handleUpload}
            disabled={!selected || isUploading}
            size="lg"
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={18} className="mr-2" />
                Upload Photo
              </>
            )}
          </Button>
        </div>

        {uploadedCount > 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            You&apos;ve shared {uploadedCount} photo
            {uploadedCount > 1 ? "s" : ""} - thank you! 💛
          </p>
        )}
      </div>
    </PageTransition>
  );
}

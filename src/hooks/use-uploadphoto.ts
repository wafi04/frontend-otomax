import { useState } from "react";
import { toast } from "sonner"; // atau toast library lain yang Anda gunakan

// Types
export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface UseUploadPhotoReturn {
  uploadPhoto: (file: File) => Promise<UploadResult | null>;
  isUploading: boolean;
  error: string | null;
  progress: number;
}

export function useUploadPhoto(): UseUploadPhotoReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const CLOUDINARY_CLOUD_NAME = "dikf91ikq";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";

  const uploadPhoto = async (file: File): Promise<UploadResult | null> => {
    if (!file) {
      setError("No file selected");
      return null;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("File must be an image");
      toast.error("File harus berupa gambar");
      return null;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError("File size too large (max 10MB)");
      toast.error("Ukuran file terlalu besar (maksimal 10MB)");
      return null;
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const xhr = new XMLHttpRequest();

      return new Promise((resolve, reject) => {
        // Track upload progress
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100
            );
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", () => {
          setIsUploading(false);

          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              const result: UploadResult = {
                url: response.secure_url,
                publicId: response.public_id,
                width: response.width,
                height: response.height,
                format: response.format,
                bytes: response.bytes,
              };

              toast.success("Foto berhasil diupload!");
              resolve(result);
            } catch (parseError) {
              setError("Failed to parse response");
              toast.error("Gagal memproses response");
              reject(parseError);
            }
          } else {
            const errorMsg = `Upload failed with status ${xhr.status}`;
            setError(errorMsg);
            toast.error("Upload gagal");
            reject(new Error(errorMsg));
          }
        });

        xhr.addEventListener("error", () => {
          setIsUploading(false);
          const errorMsg = "Network error occurred";
          setError(errorMsg);
          toast.error("Terjadi kesalahan jaringan");
          reject(new Error(errorMsg));
        });

        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        );
        xhr.send(formData);
      });
    } catch (err) {
      setIsUploading(false);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      toast.error("Upload gagal");
      return null;
    }
  };

  return {
    uploadPhoto,
    isUploading,
    error,
    progress,
  };
}
